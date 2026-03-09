"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { AppButton } from "./AppButton";
import { HighlightedHeading } from "./HighlightedHeading";
import { getPopUpData } from "@/constants";
import { useTranslations } from "next-intl";

interface PopUpProps {
  onClose?: () => void;
  onCtaClick?: () => void;
  imageSrc?: string;
  ctaLink?: string;
  className?: string;
}

export const PopUp: React.FC<PopUpProps> = ({
  onClose,
  onCtaClick,
  imageSrc = "/icons/componentIcons/popup-icon.webp",
  ctaLink = "/enterprise-solutions",
  className = "",
}) => {
  const t = useTranslations("PopUp");
  const popUpData = getPopUpData(t);
  const { title, description, features, ctaLabel } = popUpData;
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        /* Layout & Positioning (Fixed to screen bottom-left as per standard icky banner behavior) */
        fixed bottom-8 left-4 md:left-12 xl:left-20 z-50
        
        /* Dimensions from CSS - full width on mobile, fixed on tablet+ */
        w-[calc(100%-32px)] md:w-[315px]
        
        /* Styling (Card) */
        bg-white
        rounded-[40px]
        shadow-[0px_4px_25px_rgba(44,87,241,0.3)]
        
        /* Box Model */
        flex flex-col items-center p-4
        
        /* Animation/Isolation */
        isolate
        ${className}
      `}
    >
      {/* --- Close Button --- */}
      <button
        onClick={handleClose}
        aria-label="Close"
        className={`
            /* Absolute Positioning from CSS */
            absolute right-[2px] top-[1px]
            
            /* Sizing */
            w-[44px] h-[44px]
            
            /* Layout */
            flex items-center justify-center
            
            /* Styling */
            rounded-lg transition-colors z-20
        `}
      >
        {/* Color #717680 from CSS */}
        <X size={24} color="#717680" strokeWidth={2} />
      </button>

      {/* --- Content Wrapper --- */}
      <div className="flex flex-col items-center w-[283px] pt-2 pb-0 relative z-10">
        
        {/* --- Image Section --- */}
        <div className="relative flex-none mb-0">
           <Image 
             src={imageSrc} 
             alt="Icon" 
             width={1920} 
             height={1080} 
             className="object-cover w-[130px] h-[58px]"
           />
        </div>

        {/* --- Text & Features --- */}
        <div className="flex flex-col items-center gap-2 w-full text-center mt-2">
            
            {/* Heading */}
            <HighlightedHeading
              text={title}
              className="font-heading text-h5 text-center"
            />

            {/* Feature Pills (Recreating the wrapped layout) */}
            <div className="flex flex-wrap justify-center content-center gap-1 w-full my-1">
                {features.map((feature: string, index: number) => (
                    <div 
                        key={index} 
                        className="flex flex-row justify-center items-center px-2 py-1 bg-[#E9EEFC] rounded-[4px]"
                    >
                        <span className="font-poppins font-normal text-[12px] leading-[16px] text-center text-[#364153]">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            {/* Description Text (Poppins Caption) */}
            <p className="font-poppins font-normal text-[12px] leading-[16px] text-[#364153] px-2 mb-4 h-auto min-h-[32px] flex items-center justify-center">
                {description}
            </p>
        </div>

        {/* --- CTA Button --- */}
        <AppButton
          onClick={onCtaClick}
          variant="default"
          size="sm"
          rightIcon={<ArrowUpRight size={16} />}
          href={ctaLink}

        >
          {ctaLabel}
        </AppButton>
      </div>
    </div>
  );
};