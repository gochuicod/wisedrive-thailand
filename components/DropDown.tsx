'use client';

import React from 'react';
import { BaseDropDown, DropDownSize, DropDownVariant } from '@/styles/dropdown';

// --- Definition Types ---
export interface DropDownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onToggle'> {
  size?: DropDownSize;
  variant?: DropDownVariant;
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: () => void;
}

// --- App Component ---
export const DropDown: React.FC<DropDownProps> = ({
  size,
  variant,
  title,
  children,
  isOpen = false,
  onOpenChange,
  className,
  ...props
}) => {
  const handleToggle = () => {
    if (onOpenChange) {
      onOpenChange();
    }
  };

  return (
    <BaseDropDown
      className={className}
      size={size}
      variant={variant}
      title={title}
      isOpen={isOpen}
      onOpenChange={handleToggle}
      {...props}
    >
      {children}
    </BaseDropDown>
  );
};
