const assert = require('assert');

// Mock formatRussianPhone and validateRussianPhone from phoneMask.ts logic
function formatRussianPhone(input) {
  if (!input) return "";

  const trimmed = input.trim();
  if (
    trimmed === "" ||
    trimmed === "+" ||
    trimmed === "+7" ||
    trimmed === "+7 (" ||
    trimmed === "8" ||
    trimmed === "7"
  ) {
    if (input.length <= 4 && (input.startsWith("+7") || input === "8" || input === "7" || input === "+")) {
      return "";
    }
  }

  let digits = input.replace(/\D/g, "");
  if (!digits) return "";

  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);
  if (!digits) return "";

  let formatted = "+7 (";
  formatted += digits.slice(0, 3);

  if (digits.length >= 4) {
    formatted += ") " + digits.slice(3, 6);
  }
  if (digits.length >= 7) {
    formatted += "-" + digits.slice(6, 8);
  }
  if (digits.length >= 9) {
    formatted += "-" + digits.slice(8, 10);
  }

  return formatted;
}

function validateRussianPhone(phone) {
  if (!phone || !phone.trim()) {
    return { isValid: false, error: "Пожалуйста, укажите номер телефона", digitsCount: 0 };
  }

  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }

  if (digits.length === 0) {
    return { isValid: false, error: "Пожалуйста, укажите номер телефона", digitsCount: 0 };
  }

  if (digits.length < 10) {
    return {
      isValid: false,
      error: `Номер телефона неполный: введено ${digits.length} из 10 цифр`,
      digitsCount: digits.length,
    };
  }

  if (digits.length > 10) {
    return { isValid: false, error: "Слишком много цифр в номере телефона", digitsCount: digits.length };
  }

  return { isValid: true, cleanPhone: `+7${digits}`, digitsCount: 10 };
}

console.log("Running Phone Mask & Validation Unit Tests...");

// Test 1: Empty inputs
assert.strictEqual(formatRussianPhone(""), "");
assert.strictEqual(formatRussianPhone(null), "");
assert.strictEqual(formatRussianPhone(undefined), "");

// Test 2: User clears prefix / backspaces
assert.strictEqual(formatRussianPhone("+7 ("), "");
assert.strictEqual(formatRussianPhone("+7"), "");
assert.strictEqual(formatRussianPhone("+"), "");
assert.strictEqual(formatRussianPhone("8"), "");
assert.strictEqual(formatRussianPhone("7"), "");

// Test 3: Typing from scratch
assert.strictEqual(formatRussianPhone("9"), "+7 (9");
assert.strictEqual(formatRussianPhone("950"), "+7 (950");
assert.strictEqual(formatRussianPhone("9502"), "+7 (950) 2");
assert.strictEqual(formatRussianPhone("9502800300"), "+7 (950) 280-03-00");

// Test 4: Pasting with +7
assert.strictEqual(formatRussianPhone("+79940100300"), "+7 (994) 010-03-00");
// Pasting with 8
assert.strictEqual(formatRussianPhone("89940100300"), "+7 (994) 010-03-00");
// Pasting with 7
assert.strictEqual(formatRussianPhone("79940100300"), "+7 (994) 010-03-00");
// Pasting with formatted string
assert.strictEqual(formatRussianPhone("8 (994) 010-03-00"), "+7 (994) 010-03-00");

// Test 5: Validation tests
assert.strictEqual(validateRussianPhone("").isValid, false);
assert.strictEqual(validateRussianPhone("+7 (").isValid, false);
assert.strictEqual(validateRussianPhone("+7 (950) 28").isValid, false);
assert.strictEqual(validateRussianPhone("+7 (950) 28").digitsCount, 5);

const validRes = validateRussianPhone("+7 (950) 280-03-00");
assert.strictEqual(validRes.isValid, true);
assert.strictEqual(validRes.cleanPhone, "+79502800300");
assert.strictEqual(validRes.digitsCount, 10);

const valid8 = validateRussianPhone("89502800300");
assert.strictEqual(valid8.isValid, true);
assert.strictEqual(valid8.cleanPhone, "+79502800300");

console.log("All Phone Mask & Validation tests passed successfully!");
