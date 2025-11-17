/**
 * Design System - Switch Component
 * 
 * Toggle switch for on/off states.
 */

import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, helperText, className, id, checked, disabled, ...rest }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-labelledby={label ? `${switchId}-label` : undefined}
            disabled={disabled}
            onClick={() => {
              const checkbox = document.getElementById(switchId) as HTMLInputElement;
              checkbox?.click();
            }}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
              'transition-colors duration-200 ease-in-out',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              checked ? 'bg-primary-600' : 'bg-gray-200',
              className
            )}
          >
            <span
              className={cn(
                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0',
                'transition duration-200 ease-in-out',
                checked ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
          <input
            ref={ref}
            type="checkbox"
            id={switchId}
            checked={checked}
            disabled={disabled}
            className="sr-only"
            {...rest}
          />
          {label && (
            <label
              id={`${switchId}-label`}
              htmlFor={switchId}
              className="text-sm text-gray-700 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p id={`${switchId}-helper`} className="text-xs text-gray-500 ml-14">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

