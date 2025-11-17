/**
 * Design System - Tag Component
 * 
 * Badge with optional close button.
 */

import React from 'react';
import { cn } from '../../../lib/utils/cn';

export interface TagProps {
  children?: React.ReactNode;
  variant?: 'neutral' | 'primary' | 'success' | 'warning';
  onClose?: () => void;
  className?: string;
}

const variantMap = {
  neutral: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
  success: 'bg-success-100 text-success-700 hover:bg-success-200',
  warning: 'bg-warning-100 text-warning-700 hover:bg-warning-200',
};

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'neutral',
  onClose,
  className,
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium',
        variantMap[variant],
        className
      )}
    >
      {children}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 rounded-full"
          aria-label="Remove tag"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

