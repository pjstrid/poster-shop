import { Currency } from "@/types/shop";

export const CURRENCIES = [
  { code: "SEK", flag: "🇸🇪", sym: "kr" },
  { code: "EUR", flag: "🇪🇺", sym: "€" },
  { code: "USD", flag: "🇺🇸", sym: "$" },
  { code: "GBP", flag: "🇬🇧", sym: "£" },
  { code: "NOK", flag: "🇳🇴", sym: "kr" },
  { code: "DKK", flag: "🇩🇰", sym: "kr" },
];

export const FALLBACK_RATES: Record<Currency, number> = {
  SEK: 1,
  EUR: 0.087,
  USD: 0.094,
  GBP: 0.074,
  NOK: 1.0,
  DKK: 0.65,
};

export function formatPrice(sek: number, code: Currency, rate: number): string {
  const c = CURRENCIES.find((x) => x.code === code)!;
  const n = Math.round(sek * rate);
  return c.sym === "kr" ? `${n} kr` : `${c.sym}${n}`;
}
