export const DISCOUNT_CODES: Record<string, number> = {
  POSTER10: 10,
  POSTER20: 20,
};

export function getDiscountPercent(code: string): number | null {
  const trimmed = code.trim().toUpperCase();
  return DISCOUNT_CODES[trimmed] ?? null;
}
