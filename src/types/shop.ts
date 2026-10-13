export type Product = "Poster";
export type Frame = "None" | "Black" | "Silver";
export type Currency = "SEK" | "EUR" | "USD" | "GBP" | "NOK" | "DKK";

export interface Item {
  id: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  product: Product;
  size: string;
  frame: Frame;
  date?: string;
  qty: number;
  unitPriceSEK: number;
}
