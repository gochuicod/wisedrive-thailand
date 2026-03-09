import React from "react";
import Image from "next/image";

// --- Styling Types ---
export type ReviewCardVariant = "v1" | "v2";

interface BaseReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ReviewCardVariant;
  reviewText: string;
  rating?: number; // 1-5
  reviewerName: string;
  reviewDate: string;
  reviewerImage?: string;
}

// --- Style Definitions ---
const containerBase = `
  box-border
  flex flex-col justify-between items-center
  p-4 gap-4
  w-full max-w-[320px]
  bg-white
  border border-[#99A1AF] rounded-2xl
  shadow-sm
  transition-all duration-300 ease-in-out
`;

const heights: Record<ReviewCardVariant, string> = {
  v1: "",
  v2: "",
};

// Internal Layout
const clientInfoWrapper = "flex flex-row items-center gap-2 w-full h-[52px] shrink-0 z-10 overflow-visible";
const avatarWrapper = "relative w-[40px] h-[40px] rounded-full overflow-hidden flex-none bg-gray-100";
const clientDetails = "flex flex-col justify-center items-start pl-2";
const clientName = "font-body font-bold text-[20px] leading-[24px] text-[#1E2939]";
const clientDate = "font-body font-normal text-[16px] leading-[19px] text-[#1E2939]";

const textWrapper = "flex flex-col items-center justify-center flex-grow w-full";
const reviewParagraph = "font-body font-normal text-[13.26px] leading-[20px] text-center text-[#1E2939] line-clamp-6";

// --- Assets ---
const StarIcon = () => (
  <Image
    src="/icons/componentIcons/star.svg" // Ensure this path is correct or use inline SVG
    alt="Star Icon"
    width={15}
    height={15}
    className="w-[15px] h-[15px]"
  />
);

const NoPhotoIcon = () => (
  <Image
    src="/icons/componentIcons/no-photo.svg" // Ensure this path is correct
    alt="No Photo"
    width={46}
    height={46}
    className="w-full h-full"
  />
);

// --- Base Component ---
export const BaseReviewCard: React.FC<BaseReviewCardProps> = ({
  variant = "v1",
  reviewText,
  rating = 5,
  reviewerName,
  reviewDate,
  reviewerImage,
  className = "",
  ...props
}) => {
  return (
    <div className={`${containerBase} ${heights[variant]} ${className}`} {...props}>

      {/* 1. Client Info (Top) */}
      <div className={clientInfoWrapper}>
        <div className={avatarWrapper}>
          {reviewerImage ? (
            <Image 
              src={reviewerImage} 
              alt={reviewerName} 
              fill // Use fill for responsive avatar
              className="object-cover" 
            />
          ) : (
            <NoPhotoIcon />
          )}
        </div>

        <div className={clientDetails}>
          <span className={clientName}>{reviewerName}</span>
          <span className={clientDate}>{reviewDate}</span>
        </div>
      </div>
      
      {/* 2. Review Text (Middle - Flex Grow) */}
      <div className={textWrapper}>
        <p className={reviewParagraph}>
          {reviewText}
        </p>
      </div>

      {/* 3. Stars (Bottom) */}
      <div className="flex flex-row gap-[3px] w-fit shrink-0 pb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i}>
             {/* Logic: You can add ternary here if you need empty stars, 
                 but Figma shows 5 filled stars usually */}
             <StarIcon />
          </div>
        ))}
      </div>

    </div>
  );
};