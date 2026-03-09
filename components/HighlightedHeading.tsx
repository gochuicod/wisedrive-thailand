import React from 'react';
import { BaseHeading, HeadingAlign } from '@/styles/heading';

export interface HighlightedHeadingProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'children'
> {
  align?: HeadingAlign;
  text: string;
  highlight?: string;
  textClassName?: string;
  highlightClassName?: string;
  leading?: string; // <--- 1. Add Prop definition
}

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// --- Component ---
export const HighlightedHeading: React.FC<HighlightedHeadingProps> = ({
  align,
  text,
  highlight,
  textClassName = 'text-header',
  highlightClassName = 'text-header-accent',
  leading,
  className,
  ...props
}) => {
  if (!highlight) {
    return (
      <BaseHeading
        align={align}
        leading={leading} // <--- 3. Pass to BaseHeading
        className={`${textClassName} ${className}`}
        {...props}
      >
        {text}
      </BaseHeading>
    );
  }

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'i');
  const parts = text.split(regex);

  return (
    <BaseHeading
      align={align}
      leading={leading} // <--- 4. Pass to BaseHeading
      className={className}
      {...props}
    >
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className={highlightClassName}>
            {part}
          </span>
        ) : (
          <span key={index} className={textClassName}>
            {part}
          </span>
        ),
      )}
    </BaseHeading>
  );
};
