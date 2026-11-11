/**
 * Anti-spam and IP / Device rate limiting engine for Okna Center forms.
 * Protects okna.c@mail.ru from inbox flooding, bots, and rapid repeat submissions
 * while ensuring that real customers NEVER receive fake success messages.
 */

export interface RateLimitCheckResult {
  allowed: boolean;
  reason:
    | 'ok'
    | 'cooldown'
    | 'short_term_limit'
    | 'daily_limit'
    | 'duplicate_phone_allowed'
    | 'bot_honeypot'
    | 'concurrent_lock';
  error?: string;
  isFakeSuccess?: boolean;
  fakeMessage?: string;
  clientIp?: string;
  todayCount?: number;
  isDuplicatePhone?: boolean;
}

interface SubmissionRecord {
  timestamp: number;
  ip: string;
  device: string;
  phoneDigits: string;
}

const STORAGE_KEY = '_okna_rate_v1';
const COOLDOWN_MS = 15 * 1000; // 15 seconds cooldown between identical rapid clicks
const SHORT_TERM_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const SHORT_TERM_MAX_SUBMISSIONS = 3; // Max 3 submissions per 10 minutes per IP/device
const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const DAILY_MAX_SUBMISSIONS = 6; // Max 6 submissions per 24 hours
const DUPLICATE_PHONE_NOTE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window to flag duplicate submissions

// Track in-flight submission lock to prevent concurrent spam
let isSubmittingLock = false;
let pageLoadTimestamp = typeof window !== 'undefined' ? Date.now() : 0;
let cachedIp: string | null = null;

// Global in-memory fallback
declare global {
  interface Window {
    __okna_rate_cache?: SubmissionRecord[];
    __okna_page_loaded_at?: number;
  }
}

if (typeof window !== 'undefined') {
  if (!window.__okna_page_loaded_at) {
    window.__okna_page_loaded_at = Date.now();
  }
  pageLoadTimestamp = window.__okna_page_loaded_at;
}

/**
 * Resolves the client's public IP address with a fast race/timeout.
 */
export async function getClientIp(): Promise<string> {
  if (cachedIp) return cachedIp;
  if (typeof window === 'undefined') return 'server';

  try {
    const stored = window.localStorage.getItem('_okna_last_ip');
    if (stored && stored.length >= 7) {
      cachedIp = stored;
    }
  } catch {}

  const timeoutPromise = new Promise<string>((resolve) =>
    setTimeout(() => resolve(''), 1000)
  );

  const fetchPromise = (async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      if (res.ok) {
        const data = await res.json();
        if (data && data.ip) return String(data.ip).trim();
      }
    } catch {}

    try {
      const res = await fetch('https://icanhazip.com');
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim()) return text.trim();
      }
    } catch {}

    return '';
  })();

  const resolved = await Promise.race([fetchPromise, timeoutPromise]);
  if (resolved) {
    cachedIp = resolved;
    try {
      window.localStorage.setItem('_okna_last_ip', resolved);
    } catch {}
    return resolved;
  }

  return cachedIp || 'unknown';
}

/**
 * Calculates a lightweight browser/device fingerprint.
 */
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'server';
  try {
    const nav = window.navigator;
    const scr = window.screen;
    const parts = [
      nav.userAgent || '',
      nav.language || '',
      scr.width || 0,
      scr.height || 0,
      scr.colorDepth || 0,
      new Date().getTimezoneOffset(),
      nav.hardwareConcurrency || 1,
    ];
    const str = parts.join('###');

    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
      hash = hash & hash;
    }
    return 'dev_' + Math.abs(hash).toString(36);
  } catch {
    return 'dev_unknown';
  }
}

/**
 * Reads and synchronizes records across localStorage, sessionStorage, cookies, and memory.
 */
function getStoredRecords(): SubmissionRecord[] {
  if (typeof window === 'undefined') return [];

  const rawCandidates: string[] = [];

  try {
    const local = window.localStorage.getItem(STORAGE_KEY);
    if (local) rawCandidates.push(local);
  } catch {}

  try {
    const session = window.sessionStorage.getItem(STORAGE_KEY);
    if (session) rawCandidates.push(session);
  } catch {}

  try {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + STORAGE_KEY + '=([^;]*)'));
    if (match && match[2]) {
      rawCandidates.push(decodeURIComponent(match[2]));
    }
  } catch {}

  if (window.__okna_rate_cache && Array.isArray(window.__okna_rate_cache)) {
    try {
      rawCandidates.push(JSON.stringify(window.__okna_rate_cache));
    } catch {}
  }

  const map = new Map<string, SubmissionRecord>();
  const now = Date.now();

  for (const raw of rawCandidates) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && item.timestamp && now - item.timestamp < DAILY_WINDOW_MS) {
            const key = `${item.timestamp}_${item.ip}_${item.phoneDigits}`;
            map.set(key, item);
          }
        }
      }
    } catch {}
  }

  return Array.from(map.values()).sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Saves records across all persistent storage layers.
 */
function persistRecords(records: SubmissionRecord[]): void {
  if (typeof window === 'undefined') return;

  const valid = records
    .filter((r) => Date.now() - r.timestamp < DAILY_WINDOW_MS)
    .slice(0, 30); // Keep max 30 records
  const json = JSON.stringify(valid);

  try {
    window.localStorage.setItem(STORAGE_KEY, json);
  } catch {}

  try {
    window.sessionStorage.setItem(STORAGE_KEY, json);
  } catch {}

  try {
    const expires = new Date(Date.now() + DAILY_WINDOW_MS).toUTCString();
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(json)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {}

  window.__okna_rate_cache = valid;
}

/**
 * Pre-checks whether a submission should be allowed, delayed, or flagged.
 * Real customers are NEVER silently absorbed or given false success messages.
 */
export async function checkRateLimit(
  phone: string,
  website?: string
): Promise<RateLimitCheckResult> {
  const now = Date.now();

  // 1. In-flight mutex lock (prevents double-tap on submit)
  if (isSubmittingLock) {
    return {
      allowed: false,
      reason: 'concurrent_lock',
      error: 'Заявка уже отправляется, пожалуйста, подождите пару секунд...',
    };
  }

  // 2. Honeypot check (strictly automated bots filling hidden honeypot input)
  if (website && website.trim().length > 0) {
    return {
      allowed: false,
      reason: 'bot_honeypot',
      isFakeSuccess: true,
      fakeMessage: 'Спасибо! Ваша заявка принята.',
    };
  }

  // 3. Fast submit check (if submission happened within <800ms of page load, delay gracefully without dropping)
  if (pageLoadTimestamp > 0 && now - pageLoadTimestamp < 800) {
    const delay = 800 - (now - pageLoadTimestamp);
    await new Promise((r) => setTimeout(r, delay));
  }

  // 4. Resolve IP and device
  const [ip, device] = await Promise.all([getClientIp(), Promise.resolve(getDeviceFingerprint())]);
  const phoneDigits = (phone || '').replace(/\D/g, '').slice(-10);

  const records = getStoredRecords();

  // Find relevant records for this IP or device
  const relevantRecords = records.filter(
    (r) => (ip !== 'unknown' && r.ip === ip) || (device !== 'dev_unknown' && r.device === device)
  );

  // Count how many from this address today
  const todayCount = relevantRecords.filter((r) => now - r.timestamp < DAILY_WINDOW_MS).length;

  // 5. Check if this is a repeat submission for the same phone number within 15 minutes
  let isDuplicatePhone = false;
  if (phoneDigits.length >= 10) {
    isDuplicatePhone = records.some(
      (r) => r.phoneDigits === phoneDigits && now - r.timestamp < DUPLICATE_PHONE_NOTE_WINDOW_MS
    );
  }

  // 6. Cooldown check (15 seconds between immediate clicks)
  const latestSubmission = relevantRecords[0];
  if (latestSubmission && now - latestSubmission.timestamp < COOLDOWN_MS) {
    const secondsLeft = Math.max(1, Math.ceil((COOLDOWN_MS - (now - latestSubmission.timestamp)) / 1000));
    return {
      allowed: false,
      reason: 'cooldown',
      error: `Заявка уже обрабатывается. Пожалуйста, подождите ${secondsLeft} сек. перед повторной отправкой либо позвоните нам: 8 (423) 2-725-725.`,
      clientIp: ip,
      todayCount,
    };
  }

  // 7. Short term limit (Max 3 submissions per 10 minutes)
  const last10mCount = relevantRecords.filter((r) => now - r.timestamp < SHORT_TERM_WINDOW_MS).length;
  if (last10mCount >= SHORT_TERM_MAX_SUBMISSIONS) {
    return {
      allowed: false,
      reason: 'short_term_limit',
      error:
        'Превышен лимит заявок с вашего адреса (не более 3 заявок за 10 минут). Ваши данные уже получены и обрабатываются. Телефон для связи: 8 (423) 2-725-725.',
      clientIp: ip,
      todayCount,
    };
  }

  // 8. Daily limit (Max 6 submissions per 24 hours)
  if (todayCount >= DAILY_MAX_SUBMISSIONS) {
    return {
      allowed: false,
      reason: 'daily_limit',
      error:
        'Лимит заявок с вашего адреса на сегодня исчерпан (максимум 6 в сутки). Ваша заявка уже находится в очереди на обработку. Для срочной связи звоните: 8 (423) 2-725-725.',
      clientIp: ip,
      todayCount,
    };
  }

  return {
    allowed: true,
    reason: isDuplicatePhone ? 'duplicate_phone_allowed' : 'ok',
    clientIp: ip,
    todayCount,
    isDuplicatePhone,
  };
}

/**
 * Sets the atomic mutex lock during an active submission.
 */
export function setSubmittingLock(locked: boolean): void {
  isSubmittingLock = locked;
}

/**
 * Records a successful submission into all storage layers.
 */
export async function recordSubmission(phone: string, ipOverride?: string): Promise<void> {
  const ip = ipOverride || (await getClientIp());
  const device = getDeviceFingerprint();
  const phoneDigits = (phone || '').replace(/\D/g, '').slice(-10);

  const records = getStoredRecords();
  records.unshift({
    timestamp: Date.now(),
    ip,
    device,
    phoneDigits,
  });

  persistRecords(records);
}
