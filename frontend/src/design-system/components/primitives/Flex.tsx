/**
 * Design System - Flex Component
 * 
 * Simple wrapper around flexbox with convenient props.
 */

import React from 'react';
import { cn } from '../../../lib/utils/cn';

export interface FlexProps {
  children?: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  className?: string;
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapMap = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const wrapMap = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const directionMap = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  column: 'flex-col',
  'column-reverse': 'flex-col-reverse',
};

export const Flex: React.FC<FlexProps> = ({
  children,
  align,
  justify,
  gap,
  wrap = 'nowrap',
  direction = 'row',
  className,
}) => {
  const gapClass = typeof gap === 'number' 
    ? `gap-${gap}`
    : gap && gapMap[gap];

  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        align && alignMap[align],
        justify && justifyMap[justify],
        gapClass,
        wrapMap[wrap],
        className
      )}
    >
      {children}
    </div>
  );
};

