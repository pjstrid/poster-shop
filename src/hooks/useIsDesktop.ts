import { useWindowDimensions } from "react-native";

export const useIsDesktop = () => {
  const { width } = useWindowDimensions();

  return { isDesktop: width >= 768 };
};
