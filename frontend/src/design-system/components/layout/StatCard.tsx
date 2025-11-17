/**
 * Design System - StatCard Component
 * 
 * Card for displaying metrics with optional trend indicator.
 */

import React from 'react';
import { cn } from '../../../lib/utils/cn';

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  trend,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white border border-gray-200 rounded-lg p-6 shadow-sm',
        'hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-success-600' : 'text-error-600'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

