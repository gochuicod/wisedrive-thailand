import React from "react";
import Image from "next/image";

interface BaseInfrastructureCardProps {
  title: string;
  tag: string;
  description: string;
  imageSrc: string;
  className?: string;
}

export const BaseInfrastructureCard: React.FC<BaseInfrastructureCardProps> = ({
  title,
  tag,
  description,
  imageSrc,
  className = "",
}) => {
  return (
    <div
      className={`
        /* Frame 1000008688 - Main Container */
        flex flex-col items-center
        lg:flex-row lg:items-end lg:justify-center
        xl:flex-row xl:items-end xl:justify-center
        w-full md:max-w-[720px] lg:max-w-[1248px] xl:max-w-[1248px]
        relative
        ${className}
      `}
    >
      {/* --- IMAGE CONTAINER --- */}
      {/* Order 0 in Desktop, Order 0 in Mobile */}
      <div
        className={`
          relative shrink-0
          /* Responsive Widths */
          w-full h-[280px]
          md:w-[720px] md:h-[336px]
          lg:w-[720px] lg:h-[440px]
          xl:w-[720px] xl:h-[440px]
          
          /* Border Radius */
          rounded-2xl lg:rounded-[24px] xl:rounded-[24px]
          overflow-hidden
          
          /* Overlap Margins */
          /* Mobile/Tablet: Pull card UP (margin-bottom negative) */
          /* Desktop: Pull card LEFT (margin-right negative) */
          mb-[-75px] z-0
          lg:mb-0 lg:mr-[-75px]
          xl:mb-0 xl:mr-[-75px]
        `}
      >
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          priority
        />

        {/* --- Gradients (Rectangles 1048/1050 from CSS) --- */}
        <div 
          className="absolute inset-x-0 bottom-[-20%] top-[75%] bg-gradient-to-b from-[#2165FF00] to-[#0037B6] opacity-90" 
          aria-hidden="true"
        />
        <div 
          className="absolute inset-x-0 bottom-[-21%] top-[74%] bg-gradient-to-b from-[#003CC500] to-[#001D5F] mix-blend-multiply opacity-80" 
          aria-hidden="true"
        />
      </div>

      {/* --- CONTENT CARD --- */}
      {/* Order 1 in Mobile, Order 1 in Desktop */}
      <div
        className={`
          relative z-10
          flex flex-col items-center justify-center
          
          /* Container Sizing & Padding */
          py-4 lg:py-4 xl:py-4
          px-4
          
          /* Widths */
          w-full
          lg:w-auto lg:h-auto
          xl:w-auto xl:h-auto
        `}
      >
        <div
          className={`
            /* Card Style (Glassmorphism) */
            bg-gradient-to-r from-[rgba(255,255,255,0.7)] to-[rgba(228,247,255,0.9)]
            backdrop-blur-[20px]
            rounded-lg md:rounded-2xl lg:rounded-2xl xl:rounded-2xl
            
            /* Dimensions */
            w-full md:w-[608px] lg:w-[603px] xl:w-[603px]
            min-h-[264px] md:min-h-[196px] lg:min-h-[228px] xl:min-h-[228px]
            
            /* Spacing inside card */
            p-4 md:p-6 lg:p-6 xl:p-6
            flex flex-col gap-4 md:gap-8 lg:gap-8 xl:gap-8
            
            /* Alignment */
            items-center lg:items-end xl:items-end
          `}
        >
          {/* Content Wrapper */}
          <div className="flex flex-col gap-2 md:gap-4 xl:gap-6 w-full md:max-w-[576px] xl:max-w-[555px]">
            
            {/* Title */}
            <h5 className="font-heading font-bold text-[24px] leading-[28px] tracking-[0.04em] uppercase text-[#002476] text-center lg:text-left xl:text-left">
              {title}
            </h5>

            {/* Tag & Desc Wrapper */}
            <div className="flex flex-col gap-2 w-full">
              {/* Tag */}
              <span className="font-heading font-semibold text-[16px] md:text-[16px] lg:text-[20px] xl:text-[20px] leading-[24px] tracking-[2px] lg:tracking-[4px] xl:tracking-[4px] uppercase text-[#1E2939] text-center lg:text-justify xl:text-justify">
                {tag}
              </span>
              
              {/* Description */}
              <p className="font-poppins font-normal text-[14px] md:text-[14px] xl:text-[16px] leading-[17px] xl:leading-[19px] text-justify text-[#1E2939]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};