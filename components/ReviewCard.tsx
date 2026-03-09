import React from "react";
import { BaseReviewCard, ReviewCardVariant } from "@/styles/reviewcard";

// --- Definition Types ---
export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ReviewCardVariant;
  reviewText: string;
  reviewerName: string;
  reviewDate: string;
  reviewerImage?: string;
  rating?: number;
}

// --- Component ---
export const ReviewCard: React.FC<ReviewCardProps> = ({
  variant,
  reviewText,
  reviewerName,
  reviewDate,
  reviewerImage,
  rating,
  className,
  ...props
}) => {
  return (
    <BaseReviewCard
      variant={variant}
      reviewText={reviewText}
      reviewerName={reviewerName}
      reviewDate={reviewDate}
      reviewerImage={reviewerImage}
      rating={rating}
      className={className}
      {...props}
    />
  );
};