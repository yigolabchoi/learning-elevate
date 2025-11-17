/**
 * Design System - Page Component
 * 
 * Wrapper for page content with consistent padding and max-width.
 */

import React, { HTMLAttributes } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface PageProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children?: React.ReactNode;
}

const maxWidthMap = {
  sm: 'max-w-3xl',    // 768px
  md: 'max-w-5xl',    // 1024px
  lg: 'max-w-7xl',    // 1280px
  xl: 'max-w-[1536px]',
  full: 'max-w-full',
};

export const Page: React.FC<PageProps> = ({
  maxWidth = 'lg',
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8 py-6',
        maxWidthMap[maxWidth],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

