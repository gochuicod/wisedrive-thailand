import React from "react";
import Image from "next/image";
// import { AppButton } from "@/components/AppButton";

// --- Styling Types ---
interface BaseGoogleRatingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: string; // e.g., "4.8"
  buttonText: string;
  onButtonClick?: () => void;
}

const containerBase = `
  flex flex-col items-start justify-center 
  p-4 gap-2 
  w-[258.52px] 
  bg-primary-50
  rounded-lg 
  shadow-sm
`;
const topRowBase = "flex flex-row items-start gap-2 w-full";
const logoWrapperBase = "flex-none w-[56.25px] h-[56.25px]";
const infoColBase = "flex flex-col items-start gap-2";
// "Google Rating" Label:
const labelTextBase = "font-body font-bold text-[20px] leading-[24px] text-[#1E2939]";
// Rating Row: Score + Stars
const ratingRowBase = "flex flex-row items-center gap-2";
const scoreTextBase = "font-body font-bold text-[20px] leading-[24px] text-[#FFB234]";

const GoogleLogo = () => (
  <Image
    src="/icons/componentIcons/google-logo.svg"
    alt="Google Logo"
    width={56}
    height={56}
    className="w-full h-full"
  />
);

const StarIcon = () => (
  <Image
    src="/icons/componentIcons/star.svg"
    alt="Star Icon"
    width={12}
    height={12}
    className="w-full h-full"
  />
);


// --- Base Component ---
export const BaseGoogleRatingCard: React.FC<BaseGoogleRatingCardProps> = ({
  rating,
  buttonText,
  onButtonClick,
  className = "",
  ...props
}) => {
  return (
    <div className={`${containerBase} ${className}`} {...props}>
      {/* Top Row: Logo + Info */}
      <div className={topRowBase}>
        <div className={logoWrapperBase}>
          <GoogleLogo />
        </div>

        <div className={infoColBase}>
          <span className={labelTextBase}>Google Rating</span>
          <div className={ratingRowBase}>
            <span className={scoreTextBase}>{rating}</span>
            {/* 5 Stars Fixed */}
            <div className="flex gap-0">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button
      <AppButton 
        variant="tertiary" 
        size="sm"
        onClick={onButtonClick}
        className="w-full"
      >
        {buttonText}
      </AppButton> */}
    </div>
  );
};