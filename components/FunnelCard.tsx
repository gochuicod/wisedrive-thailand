import React from "react";
import { BaseFunnelCard, funnelCardStyles } from "@/styles/funnelcard";

// --- Definition Types ---
export interface FunnelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

// --- Component ---
export const FunnelCard: React.FC<FunnelCardProps> = ({
  title,
  backgroundImage,
  children,
  className,
  ...props
}) => {
  return (
    <BaseFunnelCard 
      backgroundImage={backgroundImage}
      className={className} 
      {...props}
    >
      {/* Title */}
      <h6 className={funnelCardStyles.title}>
        {title}
      </h6>

      {/* Children (e.g., button content) */}
      {children}
    </BaseFunnelCard>
  );
};