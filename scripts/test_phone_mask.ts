import assert from 'assert';
import {
  cleanRussianPhoneDigits,
  formatRussianPhone,
  validateRussianPhone,
} from '../src/lib/phoneMask';

console.log('--- RUNNING REAL TESTS FOR src/lib/phoneMask.ts ---');

// 1. Empty and clearing checks (Backspace freedom)
assert.strictEqual(formatRussianPhone(''), '', 'Empty string should return empty');
assert.strictEqual(formatRussianPhone('+'), '', '+ alone should clear to empty');
assert.strictEqual(formatRussianPhone('+7'), '', '+7 alone should clear to empty');
assert.strictEqual(formatRussianPhone('+7 ('), '', '+7 ( alone should clear to empty');
assert.strictEqual(formatRussianPhone('8'), '', 'Single 8 should clear to empty');
assert.strictEqual(formatRussianPhone('7'), '', 'Single 7 should clear to empty');

// 2. Typing progressive digits
assert.strictEqual(formatRussianPhone('9'), '+7 (9', 'Typing 9 should start +7 (9');
assert.strictEqual(formatRussianPhone('924'), '+7 (924', 'Typing 924 should format +7 (924');
assert.strictEqual(formatRussianPhone('9241'), '+7 (924) 1', '4th digit should close parenthesis');
assert.strictEqual(formatRussianPhone('924123'), '+7 (924) 123', '6 digits format');
assert.strictEqual(formatRussianPhone('9241234'), '+7 (924) 123-4', '7th digit adds hyphen');
assert.strictEqual(formatRussianPhone('92412345'), '+7 (924) 123-45', '8 digits format');
assert.strictEqual(formatRussianPhone('924123456'), '+7 (924) 123-45-6', '9th digit adds second hyphen');
assert.strictEqual(formatRussianPhone('9241234567'), '+7 (924) 123-45-67', 'Full 10 digits formatted completely');

// 3. Pasting various real formats from clipboard
assert.strictEqual(
  formatRussianPhone('89241234567'),
  '+7 (924) 123-45-67',
  'Pasting 89241234567 should convert leading 8 to +7'
);
assert.strictEqual(
  formatRussianPhone('+79241234567'),
  '+7 (924) 123-45-67',
  'Pasting +79241234567 should format cleanly'
);
assert.strictEqual(
  formatRussianPhone('79241234567'),
  '+7 (924) 123-45-67',
  'Pasting 79241234567 should convert leading 7 to +7'
);
assert.strictEqual(
  formatRussianPhone('+7 (924) 123-45-67'),
  '+7 (924) 123-45-67',
  'Re-formatting already formatted string should remain idempotent'
);

// 4. Clean digits extraction
assert.strictEqual(
  cleanRussianPhoneDigits('+7 (924) 123-45-67'),
  '+79241234567',
  'cleanRussianPhoneDigits should return E.164-style standard clean phone'
);

// 5. Strict phone validation
const vEmpty = validateRussianPhone('');
assert.strictEqual(vEmpty.isValid, false);

const vShort = validateRussianPhone('+7 (924) 123-45');
assert.strictEqual(vShort.isValid, false);
assert.strictEqual(vShort.digitsCount, 8);

const vFull = validateRussianPhone('+7 (924) 123-45-67');
assert.strictEqual(vFull.isValid, true);
assert.strictEqual(vFull.cleanPhone, '+79241234567');
assert.strictEqual(vFull.digitsCount, 10);

console.log('✅ ALL REAL TESTS FOR src/lib/phoneMask.ts PASSED (15 assertions)');
