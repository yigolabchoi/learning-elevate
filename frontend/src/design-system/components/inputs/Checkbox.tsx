/**
 * Design System - Checkbox Component
 * 
 * Checkbox input with label support.
 */

import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helperText, error, className, id, ...rest }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={cn(
              'w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-600',
              'focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error && 'border-error-500',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
            }
            {...rest}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {helperText && !error && (
          <p id={`${checkboxId}-helper`} className="text-xs text-gray-500 ml-6">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${checkboxId}-error`} className="text-xs text-error-600 ml-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

