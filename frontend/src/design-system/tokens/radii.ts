/**
 * Design System - Border Radius Tokens
 * 
 * Defines consistent border radius values.
 */

export const radii = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px (default for cards/buttons)
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',  // Fully rounded (pills, avatars)
} as const;

export type RadiiToken = typeof radii;
export type RadiusSize = keyof typeof radii;

