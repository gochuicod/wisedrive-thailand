import React from "react";
import { BaseStepCard } from "@/styles/stepcard";

// --- Definition Types ---
export interface StepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  children: React.ReactNode;
}

// --- Component ---
export const StepCard: React.FC<StepCardProps> = ({
  heading,
  children,
  className,
  ...props
}) => {
  return (
    <BaseStepCard
      heading={heading}
      className={className}
      {...props}
    >
      {children}
    </BaseStepCard>
  );
};