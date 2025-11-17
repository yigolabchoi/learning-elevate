/**
 * Design System - Card Component
 * 
 * Container with optional header, body, and footer.
 */

import React, { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'muted';
  children?: ReactNode;
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const variantMap = {
  default: 'bg-white border border-gray-200 shadow-sm',
  outlined: 'bg-white border-2 border-gray-300',
  muted: 'bg-gray-50 border border-gray-200',
};

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
} = ({ variant = 'default', className, children, ...rest }) => {
  return (
    <div className={cn('rounded-lg', variantMap[variant], className)} {...rest}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, children, className }) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200', className)}>
      {children || (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({ className, children, ...rest }) => {
  return (
    <div className={cn('px-6 py-4', className)} {...rest}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...rest }) => {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-200 bg-gray-50', className)} {...rest}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

