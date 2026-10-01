import { createContext, useContext } from "react";
import { themes, type ThemeName } from "./colors";

export const ThemeContext = createContext<{
  name: ThemeName;
  toggle: () => void;
}>({
  name: "dark",
  toggle: () => {},
});

export function useTheme() {
  const { name, toggle } = useContext(ThemeContext);

  return { t: themes[name], name, toggle };
}
