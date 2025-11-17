/**
 * Design System - Text Component
 * 
 * Generic text component with variant support.
 */

import React, { ElementType } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface TextProps {
  as?: ElementType;
  variant?: 'body' | 'caption' | 'small';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse';
  className?: string;
  children?: React.ReactNode;
}

const variantMap = {
  body: 'text-base leading-normal',      // 16px, 1.5
  caption: 'text-sm leading-normal',     // 14px, 1.5
  small: 'text-xs leading-normal',       // 12px, 1.5
};

const weightMap = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorMap = {
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  muted: 'text-gray-500',
  inverse: 'text-white',
};

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  className,
  children,
}) => {
  return (
    <Component
      className={cn(
        variantMap[variant],
        weightMap[weight],
        colorMap[color],
        className
      )}
    >
      {children}
    </Component>
  );
};

