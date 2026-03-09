"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";
import { getStickyBannerData } from "@/constants";
import { AppButton } from "@/components/AppButton";

interface StickyBannerProps {
  className?: string;
  isHidden?: boolean;
}

export const StickyBanner: React.FC<StickyBannerProps> = ({
  className = "",
  isHidden = false,
}) => {
  const t = useTranslations("StickyBanner");
  const bannerData = getStickyBannerData(t);
  const [isVisible, setIsVisible] = useState(true);

  if (isHidden || !isVisible) return null;

  return (
    <div
      className={`
        /* Layout & Positioning */
         relative w-full z-50
        hidden md:flex flex-row justify-center items-center
        
        /* Padding & Gap */
        px-4 py-4 md:px-12 md:py-0
        gap-4 md:gap-6
        
        /* Sizing */
        min-h-[64px]
        
        /* Styling (Primary/800) */
        bg-[#0D2059]
        text-white
        
        ${className}
      `}
    >
      {/* --- Content Group (Text + Button) --- */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
        
        {/* Main Text */}
        <span className="font-poppins text-[14px] leading-[17px] font-normal text-white">
          {bannerData.text}
        </span>

        {/* CTA Button */}
        <AppButton
          href={bannerData.ctaLink}
          variant="outline"
          size="sm"
          rightIcon={<ArrowRight size={16} />}
        >
          {bannerData.ctaLabel}
        </AppButton>
      </div>

      {/* --- Close Button (Absolute Positioned) --- */}
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close banner"
        className={`
          /* Position: Absolute Right (from Figma) */
          absolute right-2 md:right-4 top-1/2 -translate-y-1/2
          
          /* Sizing */
          w-[30px] h-[30px]
          flex items-center justify-center
          
          /* Styling */
          rounded hover:bg-white/10 transition-colors
        `}
      >
        <X size={20} className="text-white" />
      </button>
    </div>
  );
}
