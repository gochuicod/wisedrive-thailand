import React from "react";
import { BaseBadge, BadgeSize } from "@/styles/badge";

// --- Definition Types ---
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize;
  children: React.ReactNode;
}

// --- Component ---
export const Badge: React.FC<BadgeProps> = ({
  children,
  size,
  className,
  ...props
}) => {
  return (
    <BaseBadge className={className} size={size} {...props}>
      {children}
    </BaseBadge>
  );
};