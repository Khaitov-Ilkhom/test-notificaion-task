import {create} from "zustand";

export const useThemeStore = create((set) => {
  let initialTheme: string = "light";

  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialTheme = prefersDark ? "dark" : "light";
    }
  }

  return {
    themeMode: initialTheme,

    toggleTheme: () =>
        set((state: { themeMode: string; }) => {
          const newTheme = state.themeMode === "light" ? "dark" : "light";
          if (typeof window !== "undefined") {
            localStorage.setItem("theme", newTheme);
          }
          return {themeMode: newTheme};
        }),

    setTheme: (mode: string) =>
        set(() => {
          if (typeof window !== "undefined") {
            localStorage.setItem("theme", mode);
          }
          return {themeMode: mode};
        }),
  };
});
