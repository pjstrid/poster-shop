import { useWindowDimensions } from "react-native";

const MAX_WIDTH = 1440;

export function useShopGrid() {
  const { width } = useWindowDimensions();

  const columns = width < 700 ? 2 : width < 1024 ? 3 : 5;
  const gap = columns === 2 ? 16 : 24;
  const rowGap = columns === 2 ? 28 : 40;
  const bottomPadding = columns === 2 ? 16 : 48;

  const padding = Math.max(
    bottomPadding,
    (width - MAX_WIDTH) / 2 + bottomPadding,
  );

  const contentWidth = width - padding * 2;
  const itemWidth = (contentWidth - gap * (columns - 1)) / columns;

  return { columns, gap, rowGap, padding, itemWidth };
}
