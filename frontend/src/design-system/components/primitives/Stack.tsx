/**
 * Design System - Stack Component
 * 
 * Layout component that stacks children vertically or horizontally with configurable gap.
 */

import React from 'react';
import { cn } from '../../../lib/utils/cn';

export interface StackProps {
  children?: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  className?: string;
}

const gapMap = {
  none: 'gap-0',
  xs: 'gap-2',    // 8px
  sm: 'gap-3',    // 12px
  md: 'gap-4',    // 16px
  lg: 'gap-6',    // 24px
  xl: 'gap-8',    // 32px
};

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  gap = 'md',
  align,
  justify,
  className,
}) => {
  const isVertical = direction === 'vertical';
  
  const gapClass = typeof gap === 'number' 
    ? `gap-${gap}`
    : gapMap[gap];

  return (
    <div
      className={cn(
        'flex',
        isVertical ? 'flex-col' : 'flex-row',
        gapClass,
        align && alignMap[align],
        justify && justifyMap[justify],
        className
      )}
    >
      {children}
    </div>
  );
};

