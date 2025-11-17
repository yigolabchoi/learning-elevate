/**
 * Design System - Alert Component
 * 
 * Alert messages with variants for different states.
 */

import React from 'react';
import { cn } from '../../../lib/utils/cn';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const variantMap = {
  info: {
    container: 'bg-info-50 border-info-200 text-info-900',
    icon: 'text-info-600',
    iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  success: {
    container: 'bg-success-50 border-success-200 text-success-900',
    icon: 'text-success-600',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    container: 'bg-warning-50 border-warning-200 text-warning-900',
    icon: 'text-warning-600',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  error: {
    container: 'bg-error-50 border-error-200 text-error-900',
    icon: 'text-error-600',
    iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  onClose,
  className,
  children,
}) => {
  const styles = variantMap[variant];

  return (
    <div
      role="alert"
      className={cn('border rounded-lg p-4', styles.container, className)}
    >
      <div className="flex items-start gap-3">
        <svg
          className={cn('w-6 h-6 flex-shrink-0 mt-0.5', styles.icon)}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={styles.iconPath}
          />
        </svg>
        <div className="flex-1 min-w-0">
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          {description && <p className="text-sm opacity-90">{description}</p>}
          {children}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

