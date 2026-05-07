import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'high-contrast';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default to dark
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: () => {
        const { theme } = get();
        if (theme === 'light') set({ theme: 'dark' });
        else if (theme === 'dark') set({ theme: 'high-contrast' });
        else set({ theme: 'light' });
      },
    }),
    {
      name: 'ide-theme',
    }
  )
);
