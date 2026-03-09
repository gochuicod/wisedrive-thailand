import React from "react";
import { BaseGoogleRatingCard } from "@/styles/googlecardrating";

// --- Definition Types ---
export interface GoogleRatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: string;
  buttonLabel: string;
  // onButtonClick?: () => void;
}

// --- Component ---
export const GoogleRatingCard: React.FC<GoogleRatingCardProps> = ({
  rating,
  buttonLabel,
  // onButtonClick,
  className,
  ...props
}) => {
  return (
    <BaseGoogleRatingCard
      rating={rating}
      buttonText={buttonLabel}
      // onButtonClick={onButtonClick}
      className={className}
      {...props}
    />
  );
};