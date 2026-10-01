export type Product = "Poster" | "T-shirt" | "Collector's card";
export type Frame = "None" | "Black" | "Silver";
export type ShirtColor = "Black" | "White";
export type Currency = "SEK" | "EUR" | "USD" | "GBP" | "NOK" | "DKK";

export interface Item {
  id: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  product: Product;
  size: string;
  frame: Frame;
  color: ShirtColor;
  date: string;
  qty: number;
  unitPriceSEK: number;
}

export interface Order {
  no: string;
  date: string;
  items: Item[];
  subtotal: number;
  discount: number;
  total: number;
  currency: Currency;
  rate: number;
  code?: string;
}

export interface Profile {
  name: string | null;
  birthYear: string | null;
  favourite: { id: number; title: string } | null;
}
