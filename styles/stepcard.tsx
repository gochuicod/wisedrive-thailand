import React from "react";

// --- Styling Types ---
interface BaseStepCardProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  children: React.ReactNode;
}

// --- Style Definitions ---
const containerBase = "flex flex-col items-start gap-5 max-w-[288px]";
const headingBase = "font-bold text-[20px] leading-[24px] tracking-[0.04em] uppercase";
const headingNumber = "text-accent-500 font-bold text-[20px] leading-[24px] tracking-[0.04em] uppercase font-heading";
const headingText = "text-white font-heading";
const contentBase = "font-body font-normal text-body text-white ";

// --- Base Component ---
export const BaseStepCard: React.FC<BaseStepCardProps> = ({
  heading,
  children,
  className = "",
  ...props
}) => {
  // Split heading into number and text
  const headingParts = heading.split('. ');
  const number = headingParts[0]; // e.g., "01"
  const text = headingParts.slice(1).join('. '); // e.g., "DISCOVERY"

  return (
    <div className={`${containerBase} ${className}`} {...props}>
      {/* Heading with separate number and text styling */}
      <h6 className={headingBase}>
        <span className={headingNumber}>{number}</span>
        <span className={headingText}>. {text}</span>
      </h6>

      {/* Content Area */}
      <div className={contentBase}>
        {children}
      </div>
    </div>
  );
};