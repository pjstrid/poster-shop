import { useAppSelector } from "@/store/hooks";
import { FALLBACK_RATES, formatPrice } from "@/utils/formatPrice";

export function useFormatPrice() {
  const currency = useAppSelector((s) => s.settings.currency);
  const rates = useAppSelector((s) => s.settings.rates);

  const rate =
    currency === "SEK" ? 1 : (rates[currency] ?? FALLBACK_RATES[currency]);

  return (sek: number) => formatPrice(sek, currency, rate);
}
