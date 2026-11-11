/**
 * Helper to auto-format and mask Russian phone numbers: +7 (999) 000-00-00
 * Supports:
 * - Empty initial state with placeholder
 * - Full clipboard pasting (+7999..., 8999..., 7999..., with spaces/dashes)
 * - Free editing, backspacing and deletion of digits
 * - Accurate 10-digit national validation
 */

export function formatRussianPhone(input: string): string {
  if (!input) return "";

  const trimmed = input.trim();
  // Allow clearing when backspacing past prefix
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

  // Extract digits
  let digits = input.replace(/\D/g, "");
  if (!digits) return "";

  // If user pasted or typed with leading 7 or 8 (e.g. 8950..., 7950...)
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }

  // Limit to 10 national digits
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

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  cleanPhone?: string; // e.g. +79991234567
  digitsCount: number;
}

/**
 * Extracts normalized clean phone (+79XXXXXXXXX).
 */
export function cleanRussianPhoneDigits(phone: string): string {
  let digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }
  return digits.length > 0 ? `+7${digits.slice(0, 10)}` : "";
}

/**
 * Validates Russian national phone number (strictly 10 national digits after +7 or 8).
 */
export function validateRussianPhone(phone: string): PhoneValidationResult {
  if (!phone || !phone.trim()) {
    return {
      isValid: false,
      error: "Пожалуйста, укажите номер телефона",
      digitsCount: 0,
    };
  }

  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }

  if (digits.length === 0) {
    return {
      isValid: false,
      error: "Пожалуйста, укажите номер телефона",
      digitsCount: 0,
    };
  }

  if (digits.length < 10) {
    return {
      isValid: false,
      error: `Номер телефона неполный: введено ${digits.length} из 10 цифр`,
      digitsCount: digits.length,
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      error: "Слишком много цифр в номере телефона",
      digitsCount: digits.length,
    };
  }

  return {
    isValid: true,
    cleanPhone: `+7${digits}`,
    digitsCount: 10,
  };
}
