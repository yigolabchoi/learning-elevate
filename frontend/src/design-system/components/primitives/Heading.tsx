/**
 * Design System - Heading Component
 * 
 * Semantic heading component with proper typography.
 */

import React from 'react';
import { cn } from '../../../lib/utils/cn';

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  className?: string;
  children?: React.ReactNode;
}

const levelMap = {
  1: { tag: 'h1' as const, classes: 'text-4xl font-bold leading-tight' },      // 36px
  2: { tag: 'h2' as const, classes: 'text-3xl font-bold leading-tight' },      // 30px
  3: { tag: 'h3' as const, classes: 'text-2xl font-semibold leading-tight' },  // 24px
  4: { tag: 'h4' as const, classes: 'text-xl font-semibold leading-tight' },   // 20px
};

const weightMap = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  weight,
  className,
  children,
}) => {
  const { tag: Component, classes } = levelMap[level];

  return (
    <Component
      className={cn(
        classes,
        weight && weightMap[weight],
        'text-gray-900',
        className
      )}
    >
      {children}
    </Component>
  );
};

