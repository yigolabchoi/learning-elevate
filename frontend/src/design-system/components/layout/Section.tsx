/**
 * Design System - Section Component
 * 
 * Generic section wrapper with optional title and description.
 */

import React, { HTMLAttributes } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  className,
  children,
  ...rest
}) => {
  return (
    <section className={cn('mb-8', className)} {...rest}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

