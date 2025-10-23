import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

type Mode = 'light' | 'dark';

export type Theme = {
  background: string;
  card: string;
  text: string;
  border: string;
  primary: string;
  headerBackground: string;
  headerText: string;
};

const light: Theme = {
  background: '#FFFFFF',
  card: '#F7F7F8',
  text: '#111827',
  border: '#E5E7EB',
  primary: '#2563EB',
  headerBackground: '#E2E8F0',
  headerText: '#0F172A',
};

const dark: Theme = {
  background: '#0F1B2B',
  card: '#122633',
  text: '#E6F0FA',
  border: '#244055',
  primary: '#60A5FA',
  headerBackground: '#0F2B3D',
  headerText: '#E6F0FA',
};

type ThemeContextValue = {
  theme: Theme;
  mode: Mode;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sys = useColorScheme();
  const mode: Mode = sys === 'dark' ? 'dark' : 'light';
  const theme = useMemo(() => (mode === 'dark' ? dark : light), [mode]);

  return (
    <ThemeContext.Provider value={{ theme, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const themes = { light, dark };

export default ThemeProvider;
