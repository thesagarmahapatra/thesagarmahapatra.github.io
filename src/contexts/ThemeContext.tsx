import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'onedark' | 'dracula' | 'matrix' | 'nord' | 'gruvbox' | 'amber' | 'blue' | 'white';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  availableThemes: ThemeMode[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: ThemeMode[] = [
  'onedark',
  'dracula',
  'matrix',
  'nord',
  'gruvbox',
  'amber',
  'blue',
  'white'
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('onedark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('terminal-theme') as ThemeMode;
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('terminal-theme', theme);
    document.documentElement.className = `theme-${theme}`;
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};