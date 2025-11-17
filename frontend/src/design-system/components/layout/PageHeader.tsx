/**
 * Design System - PageHeader Component
 * 
 * Page header with title, subtitle, and optional actions.
 */

import React, { ReactNode } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  className,
}) => {
  return (
    <div className={cn('mb-6', className)}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-base text-gray-600">{subtitle}</p>}
        </div>
        {actions && <div className="flex-shrink-0 flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
};

