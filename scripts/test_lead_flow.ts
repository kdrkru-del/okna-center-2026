import assert from 'assert';

// 1. Setup minimal browser/window mocks for Node environment
const mockYmCalls: any[] = [];

// Clean in-memory storage for rate limiter and cookies
const mockStorage: Record<string, string> = {};

(global as any).window = {
  location: {
    href: 'https://окнацентр.рф/remont-plastikovyh-okon/',
    origin: 'https://окнацентр.рф',
    pathname: '/remont-plastikovyh-okon/',
    search: '',
  },
  sessionStorage: {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, val: string) => {
      mockStorage[key] = String(val);
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
  },
  localStorage: {
    getItem: (key: string) => mockStorage[key] || null,
    setItem: (key: string, val: string) => {
      mockStorage[key] = String(val);
    },
    removeItem: (key: string) => {
      delete mockStorage[key];
    },
  },
  ym: (id: number, action: string, target?: any, params?: any) => {
    mockYmCalls.push({ id, action, target, params });
  },
  __okna_page_loaded_at: Date.now() - 2000, // 2s ago
};

(global as any).document = {
  cookie: '',
};

// Import ACTUAL modules from src
import { submitLead, FORMSUBMIT_ENDPOINT } from '../src/lib/submitLead';
import { reachGoal, METRIKA_ID, buildConfirmLeadUrl } from '../src/components/YandexMetrika';
import { checkRateLimit, isSubmittingLocked, setSubmittingLock } from '../src/lib/rateLimiter';

async function runTests() {
  console.log('--- RUNNING REAL TESTS FOR src/lib/submitLead.ts & YandexMetrika.tsx ---');

  // TEST 1: Consent validation (152-FZ)
  mockYmCalls.length = 0;
  const resNoConsent = await submitLead({
    phone: '+7 (924) 111-22-33',
    consent: false,
  });
  assert.strictEqual(resNoConsent.ok, false, 'Must reject when consent is false');
  assert.ok(
    resNoConsent.error?.includes('согласие'),
    'Error message must state that 152-FZ consent is required'
  );
  assert.strictEqual(
    mockYmCalls.some((c) => c.target === 'lead_submit'),
    false,
    'Must NOT trigger lead_submit goal when consent is missing'
  );
  console.log('✔ Test 1: Missing consent strictly rejected without network or Metrika trigger');

  // TEST 2: Invalid phone number
  mockYmCalls.length = 0;
  const resBadPhone = await submitLead({
    phone: '+7 (924) 111-22', // only 8 digits
    consent: true,
  });
  assert.strictEqual(resBadPhone.ok, false, 'Must reject incomplete phone');
  assert.strictEqual(
    mockYmCalls.some((c) => c.target === 'lead_submit'),
    false,
    'Must NOT trigger lead_submit goal on bad phone'
  );
  console.log('✔ Test 2: Incomplete phone strictly rejected without Metrika trigger');

  // TEST 3: Honeypot bot protection
  mockYmCalls.length = 0;
  const resHoneypot = await submitLead({
    phone: '+7 (924) 111-22-33',
    consent: true,
    website: 'http://spam-bot.com', // bot filled hidden honeypot
  });
  assert.strictEqual(resHoneypot.ok, true, 'Bot honeypot returns fake success to trap bot');
  assert.strictEqual(
    mockYmCalls.some((c) => c.target === 'lead_submit'),
    false,
    'Must NOT trigger real lead_submit goal for honeypot bot'
  );
  console.log('✔ Test 3: Honeypot bot trapped silently without polluting Metrika goals');

  // TEST 4: Primary channel (Lead Gateway) success
  mockYmCalls.length = 0;
  process.env.NEXT_PUBLIC_LEAD_GATEWAY_URL = 'https://mock-gateway.okna.ru/api/leads';

  // Mock global.fetch for Gateway success
  const fetchHistory: any[] = [];
  (global as any).fetch = async (url: string, options: any) => {
    fetchHistory.push({ url, options });
    if (url.includes('mock-gateway')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: true, id: 'gw_123' }),
      };
    }
    return { ok: false, status: 404 };
  };

  const resGwSuccess = await submitLead({
    phone: '+7 (924) 222-33-44',
    consent: true,
    name: 'Тестовый Клиент',
    city: 'Владивосток',
    service: 'Ремонт окон',
  });

  assert.strictEqual(resGwSuccess.ok, true, 'Gateway success returns ok: true');
  assert.ok(
    fetchHistory.some((f) => f.url.includes('mock-gateway')),
    'Gateway URL was called'
  );
  assert.ok(
    mockYmCalls.some((c) => c.target === 'lead_submit'),
    'lead_submit goal WAS fired after Gateway confirmation'
  );
  console.log('✔ Test 4: Primary channel (Lead Gateway) success confirmed and lead_submit goal recorded');

  // TEST 5: Fallback to FormSubmit when Gateway fails (500 or timeout)
  mockYmCalls.length = 0;
  fetchHistory.length = 0;

  (global as any).fetch = async (url: string, options: any) => {
    fetchHistory.push({ url, options });
    if (url.includes('mock-gateway')) {
      // Simulate gateway crash
      throw new Error('Gateway 502 Bad Gateway');
    }
    if (url.includes('formsubmit.co')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ success: 'true', message: 'Form submitted successfully' }),
      };
    }
    return { ok: false, status: 500 };
  };

  const resFallback = await submitLead({
    phone: '+7 (924) 333-44-55',
    consent: true,
    name: 'Клиент Резерв',
    city: 'Уссурийск',
    service: 'Замена уплотнителя',
  });

  assert.strictEqual(resFallback.ok, true, 'Fallback submission succeeds');
  assert.ok(
    fetchHistory.some((f) => f.url.includes('formsubmit.co')),
    'FormSubmit fallback was reached when Gateway crashed'
  );
  assert.ok(
    mockYmCalls.some((c) => c.target === 'lead_submit'),
    'lead_submit goal WAS fired after FormSubmit confirmation'
  );
  console.log('✔ Test 5: Fallback to FormSubmit succeeds when Gateway fails, lead_submit goal recorded');

  // TEST 6: Error handling when BOTH channels fail
  mockYmCalls.length = 0;
  fetchHistory.length = 0;

  (global as any).fetch = async (url: string, options: any) => {
    fetchHistory.push({ url, options });
    if (url.includes('mock-gateway')) {
      throw new Error('Gateway Offline');
    }
    if (url.includes('formsubmit.co')) {
      return {
        ok: false,
        status: 500,
        json: async () => ({ success: false, message: 'Mail server error' }),
      };
    }
    return { ok: false, status: 500 };
  };

  const resBothFail = await submitLead({
    phone: '+7 (924) 444-55-66',
    consent: true,
    city: 'Уссурийск',
  });

  assert.strictEqual(resBothFail.ok, false, 'Must return ok: false when both channels fail');
  assert.ok(
    resBothFail.error?.includes('8 (950) 2-800-300'),
    'City-aware phone for Ussuriysk must be displayed in error message'
  );
  assert.strictEqual(
    mockYmCalls.some((c) => c.target === 'lead_submit'),
    false,
    'Must NEVER trigger lead_submit goal if submission failed on both channels'
  );
  console.log('✔ Test 6: Both channels failed handled honestly, NO lead_submit goal fired, city phone shown');

  // TEST 7: Metrika Goal Deduplication and Non-Interference
  mockYmCalls.length = 0;

  // Action A: Click phone
  reachGoal('click_phone', { href: 'tel:+74232725725' });
  assert.strictEqual(mockYmCalls.length, 1);
  assert.strictEqual(mockYmCalls[0].target, 'click_phone');

  // Action B: Click phone AGAIN immediately with same href (double-click) -> must deduplicate
  reachGoal('click_phone', { href: 'tel:+74232725725' });
  assert.strictEqual(mockYmCalls.length, 1, 'Immediate double-click on same phone must be deduplicated');

  // Action C: Click WhatsApp immediately (different action) -> must NOT be blocked!
  reachGoal('click_whatsapp', { href: 'https://wa.me/79940100300' });
  assert.strictEqual(mockYmCalls.length, 2, 'Distinct action (WhatsApp) must NOT be suppressed by phone dedup');
  assert.strictEqual(mockYmCalls[1].target, 'click_whatsapp');

  console.log('✔ Test 7: Metrika deduplication filters duplicate clicks without blocking distinct user actions');

  // TEST 8: Anti-Fraud CROAgent Clickbot Filter
  mockYmCalls.length = 0;
  // Activate CROAgent clickbot sensor
  (global as any).window.CROAgent = {
    isClickbot: () => true,
  };

  reachGoal('click_phone', { href: 'tel:+74232725725' });
  assert.strictEqual(
    mockYmCalls.some((c) => c.target === 'click_phone'),
    false,
    'Clickbot must NOT trigger conversion goals'
  );
  assert.ok(
    mockYmCalls.some((c) => c.target === 'bot_detected'),
    'Clickbot triggers verified bot_detected goal (679698809)'
  );

  // Deactivate CROAgent
  delete (global as any).window.CROAgent;
  console.log('✔ Test 8: CROAgent clickbot sensor protects ad bidding by converting to bot_detected');

  // TEST 9: Synchronous Concurrency Mutex Race Condition Test
  mockYmCalls.length = 0;
  // Set fetch to take 100ms
  (global as any).fetch = async (url: string) => {
    await new Promise((r) => setTimeout(r, 100));
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    };
  };

  const payload = {
    phone: '+7 (924) 555-66-77',
    consent: true,
    name: 'Гонка Запросов',
  };

  // Launch two calls simultaneously
  const [res1, res2] = await Promise.all([
    submitLead(payload),
    submitLead(payload),
  ]);

  // Exactly one must proceed, the second must be synchronously rejected
  const successes = [res1, res2].filter((r) => r.ok);
  const rejections = [res1, res2].filter((r) => !r.ok && r.error?.includes('уже отправляется'));

  assert.strictEqual(successes.length, 1, 'Exactly one concurrent submission must proceed');
  assert.strictEqual(rejections.length, 1, 'Concurrent double-click must be rejected immediately with lock message');
  assert.strictEqual(isSubmittingLocked(), false, 'Mutex lock must be released after completion');
  console.log('✔ Test 9: Concurrent race condition eliminated: atomic lock rejects second call and releases cleanly');

  // TEST 10: Informational Lead Confirmation URL & 152-FZ Privacy
  const confirmUrl = buildConfirmLeadUrl({
    leadId: 'lead_test_123',
    clientId: '1731320000123456789',
    status: 'qualified_lead',
    channel: 'email',
    manager: 'Данил',
    phone: '+7 (924) 123-45-67',
  });

  const parsedUrl = new URL(confirmUrl);
  assert.strictEqual(parsedUrl.searchParams.get('lid'), 'lead_test_123');
  assert.strictEqual(parsedUrl.searchParams.get('cid'), '1731320000123456789');
  assert.strictEqual(parsedUrl.searchParams.get('status'), 'qualified_lead');
  assert.strictEqual(
    parsedUrl.searchParams.get('phone'),
    null,
    'Must NEVER transmit raw phone number in URL query string (152-FZ privacy leak protection)'
  );
  assert.strictEqual(parsedUrl.searchParams.get('p_mask'), '***4567', 'Only masked suffix is permitted');
  console.log('✔ Test 10: Lead confirmation URL strictly masks phone number for privacy');

  console.log('================================================================');
  console.log('🎉 ALL 10 TEST SUITES FOR REAL SOURCE MODULES PASSED SUCCESSFULLY!');
  console.log('================================================================');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
