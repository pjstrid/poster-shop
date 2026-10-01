import { Item } from "@/types/shop";

export function unitPrice(i: Pick<Item, "product" | "size" | "frame">) {
  if (i.product === "T-shirt") return 249;
  if (i.product === "Collector's card") return 99;
  return (i.size === "30x50" ? 199 : 299) + (i.frame !== "None" ? 100 : 0);
}

export function variantLabel(i: Item) {
  if (i.product === "Poster")
    return `${i.size} · ${i.frame === "None" ? "No frame" : i.frame + " frame"}`;
  if (i.product === "T-shirt") return `Size ${i.size} · ${i.color}`;
  return `Watched ${i.date}`;
}
