import { Currency } from "@/types/shop";

export type Rates = Partial<Record<Currency, number>>;

type RateResponce = {
  base: string;
  date: string;
  rates: Rates;
};

const URL =
  "https://api.frankfurter.dev/v1/latest?base=SEK&symbols=EUR,USD,GBP,NOK,DKK";

export async function getRates(): Promise<RateResponce> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Currency error ${res.status}`);

  return (await res.json()) as RateResponce;
}
