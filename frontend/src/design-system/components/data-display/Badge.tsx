/**
 * Design System - Badge Component
 * 
 * Small label for statuses and categories.
 */

import React, { HTMLAttributes } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'primary';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
}

const variantMap = {
  neutral: 'bg-gray-100 text-gray-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  error: 'bg-error-100 text-error-700',
  info: 'bg-info-100 text-info-700',
  primary: 'bg-primary-100 text-primary-700',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  className,
  children,
  ...rest
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantMap[variant],
        sizeMap[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

