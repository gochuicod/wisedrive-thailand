import React from "react";
import { BaseIconBox } from "@/styles/iconbox";

// --- Definition Types ---
export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Component ---
export const IconBox: React.FC<IconBoxProps> = ({
  title,
  description,
  icon,
  className,
  ...props
}) => {
  return (
    <BaseIconBox
      className={className}
      icon={icon}
      title={title}
      description={description}
      {...props}
    />
  );
};