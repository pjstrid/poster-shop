import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/settingsSlice";
import { themes } from "./colors";

export function useTheme() {
  const name = useAppSelector((s) => s.settings.theme);
  const dispatch = useAppDispatch();

  return { t: themes[name], name, toggle: () => dispatch(toggleTheme()) };
}
