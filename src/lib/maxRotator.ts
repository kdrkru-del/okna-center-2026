import { MAX_MANAGERS, MAX_BRAND, MaxManager } from '@/data/max_config';
import { reachGoal } from '@/components/YandexMetrika';

export interface AssignedManagerRecord {
  managerId: 'manager_1' | 'manager_2';
  managerNumber: 1 | 2;
  managerName: string;
  managerLabel: string;
  url: string;
  sequenceNumber: number;
  assignedAt: string;
  channel: 'max_click' | 'lead_form';
  isStickyRepeat?: boolean;
}

export interface MaxStatsSummary {
  maxCounterTotal: number;
  leadCounterTotal: number;
  manager1Clicks: number;
  manager2Clicks: number;
  manager1Leads: number;
  manager2Leads: number;
}

const VISITOR_STORAGE_KEY = '_okna_max_visitor_mgr_v2';
const VISITOR_COOKIE_NAME = '_okna_max_mgr_v2';
const LOCAL_FALLBACK_SEQ_KEY = '_okna_max_fallback_seq_v2';
const LOCAL_STATS_KEY = '_okna_max_local_stats_v2';
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

const ABACUS_BASE = `https://abacus.jasoncameron.dev`;
const NS = MAX_BRAND.counterNamespace;

declare global {
  interface Window {
    __okna_assigned_manager?: AssignedManagerRecord | null;
    __okna_preview_manager?: MaxManager;
    __oknaMaxDiagnostics?: {
      getAssignedManager: () => AssignedManagerRecord | null;
      clearVisitorAssignment: () => void;
      allocateNextManager: (channel?: 'max_click' | 'lead_form', ignoreSticky?: boolean) => Promise<AssignedManagerRecord>;
      getServerStats: () => Promise<MaxStatsSummary>;
    };
  }
}

let inFlightAllocation: Promise<AssignedManagerRecord> | null = null;

/**
 * Resolves manager strictly by 1-based sequence number:
 * Odd (1, 3, 5...) -> Менеджер №1
 * Even (2, 4, 6...) -> Менеджер №2
 */
export function getManagerBySequence(seq: number): MaxManager {
  const normalized = Math.abs(Math.floor(seq));
  return normalized % 2 === 1 ? MAX_MANAGERS[0] : MAX_MANAGERS[1];
}

/**
 * Reads any existing sticky manager assignment for the current visitor.
 */
export function getStickyVisitorManager(): AssignedManagerRecord | null {
  if (typeof window === 'undefined') return null;

  if (window.__okna_assigned_manager) {
    return window.__okna_assigned_manager;
  }

  const rawCandidates: string[] = [];

  try {
    const fromLocal = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    if (fromLocal) rawCandidates.push(fromLocal);
  } catch {}

  try {
    const fromSession = window.sessionStorage.getItem(VISITOR_STORAGE_KEY);
    if (fromSession) rawCandidates.push(fromSession);
  } catch {}

  try {
    const match = document.cookie.match(
      new RegExp('(^|;\\s*)' + VISITOR_COOKIE_NAME + '=([^;]*)')
    );
    if (match && match[2]) {
      rawCandidates.push(decodeURIComponent(match[2]));
    }
  } catch {}

  for (const raw of rawCandidates) {
    try {
      const parsed = JSON.parse(raw) as AssignedManagerRecord;
      if (
        parsed &&
        (parsed.managerId === 'manager_1' || parsed.managerId === 'manager_2') &&
        parsed.url
      ) {
        const canonicalMgr =
          parsed.managerId === 'manager_1' ? MAX_MANAGERS[0] : MAX_MANAGERS[1];
        const record: AssignedManagerRecord = {
          ...parsed,
          managerNumber: canonicalMgr.number,
          managerName: canonicalMgr.name,
          managerLabel: canonicalMgr.label,
          url: canonicalMgr.url,
        };
        window.__okna_assigned_manager = record;
        return record;
      }
    } catch {}
  }

  return null;
}

/**
 * Saves sticky manager assignment for the current visitor across all browser storages.
 */
export function saveStickyVisitorManager(record: AssignedManagerRecord): void {
  if (typeof window === 'undefined') return;

  window.__okna_assigned_manager = record;
  const serialized = JSON.stringify(record);

  try {
    window.localStorage.setItem(VISITOR_STORAGE_KEY, serialized);
  } catch {}

  try {
    window.sessionStorage.setItem(VISITOR_STORAGE_KEY, serialized);
  } catch {}

  try {
    document.cookie = `${VISITOR_COOKIE_NAME}=${encodeURIComponent(
      serialized
    )}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=/; SameSite=Lax`;
  } catch {}
}

/**
 * Clears sticky visitor assignment (used for testing/verification of independent sessions).
 */
export function clearStickyVisitorManager(): void {
  if (typeof window === 'undefined') return;
  window.__okna_assigned_manager = null;
  try {
    window.localStorage.removeItem(VISITOR_STORAGE_KEY);
  } catch {}
  try {
    window.sessionStorage.removeItem(VISITOR_STORAGE_KEY);
  } catch {}
  try {
    document.cookie = `${VISITOR_COOKIE_NAME}=; max-age=0; path=/; SameSite=Lax`;
  } catch {}
}

/**
 * Atomically increments the server-side Round Robin counter and returns the new sequence integer.
 * Falls back to local atomic sequence if network is unreachable.
 */
async function hitAtomicServerCounter(counterKey: string): Promise<number> {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 1800) : null;

  try {
    const res = await fetch(`${ABACUS_BASE}/hit/${NS}/${counterKey}`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller?.signal,
    });
    if (timeoutId) clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (typeof data?.value === 'number' && data.value >= 1) {
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(LOCAL_FALLBACK_SEQ_KEY, String(data.value));
          } catch {}
        }
        return data.value;
      }
    }
  } catch {
    if (timeoutId) clearTimeout(timeoutId);
  }

  // Fallback atomic local sequence if external counter is blocked or offline
  if (typeof window !== 'undefined') {
    try {
      const prev = parseInt(window.localStorage.getItem(LOCAL_FALLBACK_SEQ_KEY) || '0', 10) || 0;
      const next = prev + 1;
      window.localStorage.setItem(LOCAL_FALLBACK_SEQ_KEY, String(next));
      return next;
    } catch {}
  }

  return Date.now() % 2 === 1 ? 1 : 2;
}

/**
 * Peeks at the current server counter without incrementing it, so buttons can display
 * an accurate preview href before click.
 */
export async function peekNextManagerPreview(): Promise<MaxManager> {
  const sticky = getStickyVisitorManager();
  if (sticky) {
    return sticky.managerId === 'manager_1' ? MAX_MANAGERS[0] : MAX_MANAGERS[1];
  }

  if (typeof window !== 'undefined' && window.__okna_preview_manager) {
    return window.__okna_preview_manager;
  }

  try {
    const res = await fetch(`${ABACUS_BASE}/get/${NS}/${MAX_BRAND.maxCounterKey}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      const currentVal = typeof data?.value === 'number' ? data.value : 0;
      const nextMgr = getManagerBySequence(currentVal + 1);
      if (typeof window !== 'undefined') {
        window.__okna_preview_manager = nextMgr;
      }
      return nextMgr;
    }
  } catch {}

  return MAX_MANAGERS[0];
}

/**
 * Records analytics & per-manager statistics on server and Yandex.Metrika.
 */
function recordManagerAnalytics(
  record: AssignedManagerRecord,
  channel: 'max_click' | 'lead_form',
  placement: string
): void {
  const metricKey =
    channel === 'max_click'
      ? record.managerNumber === 1
        ? 'max_clicks_m1'
        : 'max_clicks_m2'
      : record.managerNumber === 1
      ? 'lead_submit_m1'
      : 'lead_submit_m2';

  // Non-blocking server stat counter increment
  fetch(`${ABACUS_BASE}/hit/${NS}/${metricKey}`, {
    method: 'GET',
    cache: 'no-store',
    keepalive: true,
  }).catch(() => {});

  // Local stats journal
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem(LOCAL_STATS_KEY);
      const stats = raw
        ? JSON.parse(raw)
        : { m1Clicks: 0, m2Clicks: 0, m1Leads: 0, m2Leads: 0, history: [] };
      if (channel === 'max_click') {
        if (record.managerNumber === 1) stats.m1Clicks = (stats.m1Clicks || 0) + 1;
        else stats.m2Clicks = (stats.m2Clicks || 0) + 1;
      } else {
        if (record.managerNumber === 1) stats.m1Leads = (stats.m1Leads || 0) + 1;
        else stats.m2Leads = (stats.m2Leads || 0) + 1;
      }
      stats.history = [
        {
          ts: new Date().toISOString(),
          channel,
          placement,
          manager: record.managerLabel,
          seq: record.sequenceNumber,
          sticky: Boolean(record.isStickyRepeat),
        },
        ...(Array.isArray(stats.history) ? stats.history.slice(0, 49) : []),
      ];
      window.localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(stats));
    } catch {}
  }

  // Yandex.Metrika goals
  if (channel === 'max_click') {
    reachGoal('max_click', {
      managerId: record.managerId,
      managerName: record.managerName,
      placement,
      sequenceNumber: record.sequenceNumber,
      isStickyRepeat: Boolean(record.isStickyRepeat),
    });
    reachGoal(`max_click_manager_${record.managerNumber}`, {
      placement,
      sequenceNumber: record.sequenceNumber,
    });
  } else {
    reachGoal(`lead_assigned_manager_${record.managerNumber}`, {
      placement,
      sequenceNumber: record.sequenceNumber,
    });
  }
}

/**
 * Allocates or retrieves the assigned MAX manager for the visitor using strict 50/50 Round Robin.
 * - If the visitor already has a sticky manager assigned, returns that same manager.
 * - Otherwise, atomically increments the server-side counter and assigns Manager 1 (odd) or Manager 2 (even).
 */
export async function allocateVisitorMaxManager(
  channel: 'max_click' | 'lead_form' = 'max_click',
  placement: string = 'site',
  ignoreSticky: boolean = false
): Promise<AssignedManagerRecord> {
  if (!ignoreSticky) {
    const existing = getStickyVisitorManager();
    if (existing) {
      const repeatRecord: AssignedManagerRecord = {
        ...existing,
        isStickyRepeat: true,
      };
      recordManagerAnalytics(repeatRecord, channel, placement);
      return repeatRecord;
    }
  }

  if (inFlightAllocation && !ignoreSticky) {
    return inFlightAllocation;
  }

  const allocationTask = (async (): Promise<AssignedManagerRecord> => {
    const counterKey =
      channel === 'lead_form' ? MAX_BRAND.leadCounterKey : MAX_BRAND.maxCounterKey;
    const seq = await hitAtomicServerCounter(counterKey);
    const mgr = getManagerBySequence(seq);

    const record: AssignedManagerRecord = {
      managerId: mgr.id,
      managerNumber: mgr.number,
      managerName: mgr.name,
      managerLabel: mgr.label,
      url: mgr.url,
      sequenceNumber: seq,
      assignedAt: new Date().toISOString(),
      channel,
      isStickyRepeat: false,
    };

    if (!ignoreSticky) {
      saveStickyVisitorManager(record);
    }

    recordManagerAnalytics(record, channel, placement);
    return record;
  })();

  if (!ignoreSticky) {
    inFlightAllocation = allocationTask;
    try {
      return await allocationTask;
    } finally {
      inFlightAllocation = null;
    }
  }

  return allocationTask;
}

/**
 * Fetches current server-side statistics across both managers.
 */
export async function getServerMaxStats(): Promise<MaxStatsSummary> {
  const keys = [
    MAX_BRAND.maxCounterKey,
    MAX_BRAND.leadCounterKey,
    'max_clicks_m1',
    'max_clicks_m2',
    'lead_submit_m1',
    'lead_submit_m2',
  ];

  const values = await Promise.all(
    keys.map(async (k) => {
      try {
        const res = await fetch(`${ABACUS_BASE}/get/${NS}/${k}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          return typeof data?.value === 'number' ? data.value : 0;
        }
      } catch {}
      return 0;
    })
  );

  return {
    maxCounterTotal: values[0],
    leadCounterTotal: values[1],
    manager1Clicks: values[2],
    manager2Clicks: values[3],
    manager1Leads: values[4],
    manager2Leads: values[5],
  };
}

if (typeof window !== 'undefined') {
  window.__oknaMaxDiagnostics = {
    getAssignedManager: getStickyVisitorManager,
    clearVisitorAssignment: clearStickyVisitorManager,
    allocateNextManager: (channel = 'max_click', ignoreSticky = false) =>
      allocateVisitorMaxManager(channel, 'diagnostics', ignoreSticky),
    getServerStats: getServerMaxStats,
  };
}
