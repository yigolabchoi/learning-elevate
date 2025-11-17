/**
 * Design System - Avatar Component
 * 
 * Round or square avatar with initials fallback.
 */

import React from 'react';
import { cn } from '../../../lib/utils/cn';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  className,
}) => {
  const initials = name ? getInitials(name) : '?';

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0 overflow-hidden',
        'bg-linear-to-br from-primary-400 to-primary-600 text-white font-semibold',
        sizeMap[size],
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

