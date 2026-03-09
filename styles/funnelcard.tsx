import React from "react";

// --- Styling Types ---

interface BaseFunnelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
}

// --- Style Definitions ---

const containerBase = "font-oswald flex flex-col items-center justify-center h-full lg:p-8 p-4 md:px-8 md:py-6 gap-4 w-full rounded-2xl relative overflow-hidden  bg-white bg-center bg-cover bg-no-repeat shadow-md";
const contentWrapperBase = "relative z-10 flex flex-col md:flex-row lg:flex-col justify-center items-center gap-4 w-full mx-auto";
const titleBase = "font-heading font-bold lg:text-2xl md:text-xl leading-7 tracking-wider uppercase text-white text-center";
const buttonBase = "flex items-center justify-center gap-2 px-4 py-2 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded hover:brightness-110 transition-all cursor-pointer";
const buttonTextBase = "font-body font-normal text-base text-white leading-none";

// --- Base Component ---
export const BaseFunnelCard: React.FC<BaseFunnelCardProps> = ({
  className = "",
  backgroundImage,
  children,
  ...props
}) => {

  return (
    <div 
      className={`${containerBase} ${className}`}
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      {...props}
    >
      {/* Content Stack */}
      <div className={contentWrapperBase}>
        {children}
      </div>
    </div>
  );
};

// Exporting specific sub-element styles for the Definition layer to use
export const funnelCardStyles = {
  title: titleBase,
  button: buttonBase,
  buttonText: buttonTextBase,
};