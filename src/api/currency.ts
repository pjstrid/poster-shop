import { Currency } from "@/types/shop";

type RateResponce = {
  base: string;
  date: string;
  rates: Partial<Record<Currency, number>>;
};

const URL =
  "https://api.frankfurter.dev/v1/latest?base=SEK&symbols=EUR,USD,GBP,NOK,DKK";

export async function getRates(): Promise<RateResponce> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Currency error ${res.status}`);

  return (await res.json()) as RateResponce;
}
