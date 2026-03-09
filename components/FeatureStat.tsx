
import React from "react";
import { BaseFeatureStat } from "@/styles/featurestat";

// --- Definition Types ---
export interface FeatureStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  image?: string;
}

// --- Component ---
export const FeatureStat: React.FC<FeatureStatProps> = ({
  value,
  label,
  image,
  className,
  ...props
}) => {
  return (
    <BaseFeatureStat
      statValue={value}
      statLabel={label}
      backgroundImage={image}
      className={className}
      {...props}
    />
  );
};