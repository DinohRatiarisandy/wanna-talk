import { create } from "zustand";

type Theme = "dark" | "light";

type ThemeState = {
   theme: Theme;
   setTheme: (theme: Theme) => void;
   toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>(function (set) {
   return {
      theme: (localStorage.getItem("ui-theme") as Theme) || "dark",
      setTheme: (theme) => {
         localStorage.setItem("ui-theme", theme);
         document.documentElement.classList.remove("light", "dark");
         document.documentElement.classList.add(theme);
         set({ theme });
      },
      toggleTheme: () =>
         set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("ui-theme", newTheme);
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(newTheme);
            return { theme: newTheme };
         }),
   };
});
