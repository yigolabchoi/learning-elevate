/**
 * Design System - Theme Provider
 * 
 * Provides theme context to the entire application.
 * Currently supports light theme only, but structured for future dark mode support.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { colors, typography, spacing, radii, shadows } from '../tokens';

export interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: typeof shadows;
  mode: 'light' | 'dark';
}

const lightTheme: Theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  mode: 'light',
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  theme = lightTheme 
}) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export the default light theme
export { lightTheme };

