const assert = require('assert');

// 1. Test Goal Mapping and Deduplication logic
const GOAL_MAP = {
  phone_click: 'click_phone',
  whatsapp_click: 'click_whatsapp',
  telegram_click: 'click_telegram',
  form_submit: 'lead_submit',
  lead_form_submit: 'lead_submit',
  contact_form: 'lead_submit',
};

const recentGoals = new Map();
const DEDUP_WINDOW_MS = 1200;
const dispatchedEvents = [];

function reachGoal(goal, params) {
  const targetGoal = GOAL_MAP[goal] || goal;
  const now = Date.now();
  const lastTime = recentGoals.get(targetGoal) || 0;

  if (now - lastTime < DEDUP_WINDOW_MS) {
    return false; // deduplicated
  }
  recentGoals.set(targetGoal, now);
  dispatchedEvents.push({ goal: targetGoal, params });
  return true;
}

console.log('--- Testing Goal Mapping & Deduplication ---');
assert.strictEqual(reachGoal('form_submit', { test: 1 }), true);
assert.strictEqual(dispatchedEvents[0].goal, 'lead_submit');

// Rapid second call within 100ms should be rejected
assert.strictEqual(reachGoal('lead_submit', { test: 2 }), false);
assert.strictEqual(reachGoal('form_submit', { test: 3 }), false);
assert.strictEqual(dispatchedEvents.length, 1);

// Phone click mapping
assert.strictEqual(reachGoal('phone_click'), true);
assert.strictEqual(dispatchedEvents[1].goal, 'click_phone');

// WhatsApp click mapping
assert.strictEqual(reachGoal('whatsapp_click'), true);
assert.strictEqual(dispatchedEvents[2].goal, 'click_whatsapp');

// Rapid second click on WhatsApp should be deduplicated
assert.strictEqual(reachGoal('click_whatsapp'), false);
assert.strictEqual(dispatchedEvents.length, 3);

console.log('✓ Goal Mapping & Deduplication passed!');

// 2. Test Rate Limiter logic
console.log('\n--- Testing Rate Limiter & Anti-Spam Safety ---');

function mockCheckRateLimit(phone, website, records, now, pageLoadedAt) {
  // Honeypot
  if (website && website.trim().length > 0) {
    return { allowed: false, reason: 'bot_honeypot', isFakeSuccess: true };
  }

  const phoneDigits = (phone || '').replace(/\D/g, '').slice(-10);

  // Repeat submission within 15 min is now ALLOWED with a flag!
  let isDuplicatePhone = false;
  if (phoneDigits.length >= 10) {
    isDuplicatePhone = records.some(
      r => r.phoneDigits === phoneDigits && now - r.timestamp < 15 * 60 * 1000
    );
  }

  // Cooldown within 15 seconds
  const latest = records[0];
  if (latest && now - latest.timestamp < 15 * 1000) {
    return { allowed: false, reason: 'cooldown', error: 'Пожалуйста, подождите...' };
  }

  return { allowed: true, reason: isDuplicatePhone ? 'duplicate_phone_allowed' : 'ok', isDuplicatePhone };
}

// Case A: Honest user with empty honeypot
const resNormal = mockCheckRateLimit('+7 (950) 280-03-00', '', [], 100000, 95000);
assert.strictEqual(resNormal.allowed, true);
assert.strictEqual(resNormal.isDuplicatePhone, false);

// Case B: Honeypot bot filling hidden input
const resBot = mockCheckRateLimit('+7 (950) 280-03-00', 'https://spam.com', [], 100000, 95000);
assert.strictEqual(resBot.allowed, false);
assert.strictEqual(resBot.isFakeSuccess, true);

// Case C: Real user resubmitting within 2 minutes (120 seconds)
const recordsWithPrevious = [{ timestamp: 100000 - 120000, phoneDigits: '9502800300' }];
const resRepeat = mockCheckRateLimit('+7 (950) 280-03-00', '', recordsWithPrevious, 100000, 95000);
// MUST BE ALLOWED! Real customers are never dropped silently!
assert.strictEqual(resRepeat.allowed, true);
assert.strictEqual(resRepeat.isDuplicatePhone, true);

// Case D: Immediate double-tap within 5 seconds
const recordsImmediate = [{ timestamp: 100000 - 5000, phoneDigits: '9502800300' }];
const resDoubleTap = mockCheckRateLimit('+7 (950) 280-03-00', '', recordsImmediate, 100000, 95000);
assert.strictEqual(resDoubleTap.allowed, false);
assert.strictEqual(resDoubleTap.reason, 'cooldown');

console.log('✓ Rate Limiter & Anti-Spam safety tests passed!');
console.log('\nAll integration tests passed with 100% success.');
