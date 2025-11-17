/**
 * Design System - Box Component
 * 
 * A polymorphic div-like component that serves as the base for layout.
 */

import React, { ElementType, ComponentPropsWithoutRef } from 'react';
import { cn } from '../../../lib/utils/cn';

export interface BoxProps<T extends ElementType = 'div'> {
  as?: T;
  className?: string;
  children?: React.ReactNode;
}

export type PolymorphicBoxProps<T extends ElementType = 'div'> = BoxProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BoxProps<T>>;

export const Box = <T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: PolymorphicBoxProps<T>) => {
  const Component = as || 'div';
  
  return (
    <Component className={cn(className)} {...rest}>
      {children}
    </Component>
  );
};

