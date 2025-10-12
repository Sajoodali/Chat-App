import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,

      toggleTheme: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      setTheme: (isDark) => {
        set({ isDarkMode: isDark });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
