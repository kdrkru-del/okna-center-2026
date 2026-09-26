/**
 * Helper to auto-format and mask Russian phone numbers: +7 (999) 000-00-00
 */
export function formatRussianPhone(input: string): string {
  if (!input) return "+7 (";

  // Remove non-digit characters
  let digits = input.replace(/\D/g, "");

  // If input was like "+7" or "7" or "8" and nothing else
  if (digits === "7" || digits === "8") {
    return "+7 (";
  }

  // If user pasted or typed with leading 7 or 8 (e.g. 8950..., 7950...)
  if (digits.startsWith("7") || digits.startsWith("8")) {
    digits = digits.slice(1);
  }

  // Limit to 10 digits
  digits = digits.slice(0, 10);

  if (digits.length === 0) {
    return "+7 (";
  }

  let formatted = "+7 (";
  formatted += digits.slice(0, 3);

  if (digits.length > 3) {
    formatted += ") " + digits.slice(3, 6);
  }
  if (digits.length > 6) {
    formatted += "-" + digits.slice(6, 8);
  }
  if (digits.length > 8) {
    formatted += "-" + digits.slice(8, 10);
  }

  return formatted;
}
