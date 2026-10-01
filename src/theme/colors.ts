export const themes = {
  dark: {
    app: "#232c3a",
    header: "#1a212c",
    fg: "#ffffff",
    fg2: "rgba(255,255,255,0.7)",
    accent: "#e6d5b8",
    btn: "#3d4f6b",
    btnLine: "#ffffff",
    btnFg: "#ffffff",
    surface: "#2c3748",
    line: "rgba(255,255,255,0.14)",
    danger: "#ff8f94",
    ok: "#8fe0a8",
  },
  light: {
    app: "#c2d1f3",
    header: "#a8bce8",
    fg: "#000000",
    fg2: "rgba(0,0,0,0.7)",
    accent: "#1e3a6e",
    btn: "#8aa3db",
    btnLine: "#000000",
    btnFg: "#000000",
    surface: "#d6e1f8",
    line: "rgba(0,0,0,0.16)",
    danger: "#a4151b",
    ok: "#0d5c2c",
  },
} as const;

export type ThemeName = keyof typeof themes;
export type Theme = (typeof themes)[ThemeName];

export const fonts = {
  display: "BebasNeue_400Regular",
  sans: "Inter_400Regular",
  sansSemi: "Inter_600SemiBold",
  sansBold: "Inter_700Bold",
  receipt: "CourierPrime_400Regular",
};
