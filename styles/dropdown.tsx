import React from 'react';
import { ChevronDown } from 'lucide-react';

// --- Styling Types ---
export type DropDownSize = 'sm' | 'md' | 'lg';
export type DropDownVariant = 'default' | 'gradient';

interface BaseDropDownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "onToggle"> {
  size?: DropDownSize;
  variant?: DropDownVariant;
  title: string;
  isOpen: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
}

// --- Style Definitions ---
const containerBase = `
  flex flex-col justify-start items-start
  px-6 py-4
  transition-all duration-300 ease-in-out
  cursor-pointer
  overflow-hidden
  w-full
`;

const activeStyle =
  'bg-[#E9EEFC] shadow-[2px_2px_4px_rgba(25,33,61,0.06)]';
const inactiveStyle = 'bg-[#F9FAFB]';

// Gradient variant styles
const gradientStyle = `
  bg-gradient-to-r from-white to-[rgba(228,247,255,0.6)]
  shadow-[inset_-8px_-8px_24px_rgba(0,183,255,0.08)]
  backdrop-blur-[2px]
  rounded-lg
  max-w-[500px]
`;

const headerBase = 'flex flex-row justify-between items-center w-full select-none';
const arrowBtnBase =
  'flex items-center justify-center w-[29.33px] h-[29.33px] rounded-[5.33px] transition-transform duration-300';

// --- Size Variants ---
const sizes: Record<
  DropDownSize,
  { root: string; titleSize: string; content: string }
> = {
  lg: {
    root: 'w-full',
    titleSize: 'text-[16px] leading-[19px]',
    content: 'font-body font-normal text-[16px] leading-[19px] text-[#364153]',
  },
  md: {
    root: 'w-full',
    titleSize: 'text-[14px] leading-[17px]',
    content:
      'font-body font-normal text-[14px] leading-[17px] text-[#364153] text-justify',
  },
  sm: {
    root: 'w-full',
    titleSize: 'text-[14px] leading-[17px]',
    content:
      'font-body font-normal text-[14px] leading-[17px] text-[#364153] text-justify',
  },
};

// --- Helper Icon ---
// We use ChevronDown from lucide-react and rotate it.
// 0deg = Down (Inactive/Closed)
// 180deg = Up (Active/Open)

// --- Base Component ---
export const BaseDropDown: React.FC<BaseDropDownProps> = ({
  size = 'lg',
  variant = 'default',
  title,
  isOpen,
  onOpenChange,
  children,
  className = '',
  ...props
}) => {
  const styles = sizes[size];

  // Dynamic Classes based on isOpen state and variant
  const variantClasses = variant === 'gradient' 
    ? gradientStyle 
    : (isOpen ? activeStyle : inactiveStyle);
  const containerClasses = `${containerBase} ${styles.root} ${variantClasses} ${className}`;

  return (
    <div className={containerClasses} onClick={onOpenChange} {...props}>
      {/* Header Row */}
      <div className={headerBase}>
        <span className={`font-body text-[#1E2939] ${styles.titleSize} flex-grow ease-in-out duration-100 ${isOpen ? 'font-semibold' : 'font-normal'}`}>{title}</span>

        {/* Toggle Icon */}
        {/* Rotate 180 when open (Up), 0 when closed (Down) */}
        <div
          className={`${arrowBtnBase} ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <ChevronDown className="w-[21.33px] h-[21.33px] text-[#193CB8]" />
        </div>
      </div>

      {/* Content Row */}
      {isOpen && (
        <div className={`w-full animate-fadeIn ${styles.content} mt-4`}>
          {children}
        </div>
      )}
    </div>
  );
};
