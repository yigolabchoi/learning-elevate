import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // 기본 스타일
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',

          // 크기
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-6 py-3 text-lg',

          // 변형
          variant === 'primary' &&
            'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
          variant === 'secondary' &&
            'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
          variant === 'outline' &&
            'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
          variant === 'ghost' && 'text-gray-700 hover:bg-gray-100 active:bg-gray-200',
          variant === 'danger' &&
            'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',

          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            로딩 중...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

