import React from 'react';

// --- Styling Types ---
export type HeadingAlign = 'left' | 'center' | 'right';

interface BaseHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  align?: HeadingAlign;
  leading?: string; // <--- 1. Add Prop definition
  children: React.ReactNode;
}

// --- Style Definitions ---
const baseStyles = 'text-h4 font-bold uppercase text-[#1E2939]';
export const highlightSpanStyles = 'text-[#193CB8]';

const alignments: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// --- Base Component ---
export const BaseHeading: React.FC<BaseHeadingProps> = ({
  className = '',
  align = 'left',
  leading, // <--- 2. Destructure prop
  children,
  ...props
}) => {
  // 3. Add `leading` to the class string.
  // We place it after `baseStyles` but before `className` to allow manual overrides if needed.
  const combinedClasses = `
    ${baseStyles}
    ${alignments[align]}
    ${leading || ''}
    ${className}
  `.trim();

  return (
    <h4 className={combinedClasses} {...props}>
      {children}
    </h4>
  );
};
