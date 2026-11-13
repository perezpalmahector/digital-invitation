import type { ThemeConfig } from "../types/config/theme.types";

export const applyTheme = (theme: ThemeConfig): void => {
  const root = document.documentElement;

  root.style.setProperty("--rosa-palo", theme.colors.rosaPalo);
  root.style.setProperty("--dorado-champagne", theme.colors.doradoChampagne);
  root.style.setProperty("--blanco-hueso", theme.colors.blancoHueso);
  root.style.setProperty("--rosa-rubor", theme.colors.rosaRubor);
  root.style.setProperty("--crema-marfil", theme.colors.cremaMarfil);

  root.style.setProperty("--font-heading", theme.fonts.headings);
  root.style.setProperty("--font-body", theme.fonts.body);
};
