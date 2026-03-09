import React from "react";

// --- Styling Types ---
export type BadgeSize = "sm" | "md" | "lg";

interface BaseBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize;
  children: React.ReactNode;
}

// --- Style Definitions ---

const baseStyles = "font-heading font-semibold text-tagText text-tag uppercase inline-block";

const sizes: Record<BadgeSize, string> = {
  sm: "text-[16px] leading-[19px] tracking-normal",
  md: "text-[16px] leading-[19px] tracking-[2px]",
  lg: "text-tagText",
};

export const BaseBadge: React.FC<BaseBadgeProps> = ({
  className = "",
  size = "lg", // Defaulting to largest based on first Figma snippet
  children,
  ...props
}) => {
  const combinedClasses = `${baseStyles} ${sizes[size]} ${className}`;

  return (
    <span className={combinedClasses} {...props}>
      {children}
    </span>
  );
};