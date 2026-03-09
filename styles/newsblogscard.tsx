import React from 'react';
import Image from 'next/image';

// --- Styling Types ---
export interface BaseNewsBlogCardProps extends React.HTMLAttributes<HTMLElement> {
  thumbnail?: string;
  category?: string;
  date?: string;
  readTime?: number;
  title: string;
  description?: string;
  url?: string;
}

// --- Style Definitions ---

// Desktop / Tablet vertical card
const cardContainer = `
  group
  flex flex-col
  w-full max-w-[340px]
  bg-white
  border border-[#E5E7EB] rounded-2xl
  shadow-sm
  overflow-hidden
  transition-all duration-300 ease-in-out
  hover:shadow-lg
`;

// Mobile horizontal compact card
const cardContainerMobile = `
  group
  flex flex-row
  w-full
  bg-white
  border border-[#E5E7EB] rounded-2xl
  shadow-sm
  overflow-hidden
  transition-all duration-300 ease-in-out
  hover:shadow-lg
  p-3 gap-3
  items-center
`;

const thumbnailWrapper = `
  relative w-full aspect-[4/3] overflow-hidden
`;

const thumbnailMobileWrapper = `
  relative w-[80px] h-[80px] rounded-xl overflow-hidden flex-shrink-0
`;

const categoryBadge = `
  absolute top-3 left-3 z-10
  px-3 py-1
  bg-primary-400 text-white
  text-xs font-semibold uppercase tracking-wide
  rounded-2xl
`;

const metaRow = `
  flex items-center gap-3
  text-xs text-[#6B7280]
  font-body
`;

const cardBody = `
  flex flex-col gap-1.5 p-4
`;

const titleStyle = `
  font-body font-bold text-[15px] leading-[20px]
  text-[#1E2939]
  line-clamp-2
`;

const descriptionStyle = `
  font-body font-normal text-[13px] leading-[18px]
  text-[#6B7280]
  line-clamp-2
`;

const readMoreStyle = `
  inline-flex items-center gap-1
  text-[var(--color-primary)] text-sm font-semibold
  transition-all duration-200
  group-hover/readmore:translate-x-1
  mt-1
`;

// --- Icons ---
const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 6V12L16 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlaceholderImage = () => (
  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-400"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path
        d="M21 15L16 10L5 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// --- Base Component ---
export const BaseNewsBlogCard: React.FC<BaseNewsBlogCardProps> = ({
  thumbnail,
  category,
  date,
  readTime,
  title,
  description,
  url,
  className = '',
  ...props
}) => {
  const CardContent = (
    <>
      {/* Desktop / Tablet Card (hidden on small screens) */}
      <div className={`${cardContainer} hidden sm:flex group/card`}>
        {/* Thumbnail */}
        <div className={`${thumbnailWrapper} relative`}>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <PlaceholderImage />
          )}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(0deg, rgba(15, 1, 211, 0.4) 0%, rgba(255, 255, 255, 0) 38%), linear-gradient(180deg, rgba(15, 1, 211, 0.4) 0%, rgba(255, 255, 255, 0) 35%)',
            }}
          ></div>
          {category && <span className={categoryBadge}>{category}</span>}
        </div>

        {/* Body */}
        <div className={cardBody}>
          {/* Meta */}
          <div className={metaRow}>
            {date && (
              <span className="inline-flex items-center gap-1">
                <CalendarIcon />
                {date}
              </span>
            )}
            {readTime && (
              <span className="inline-flex items-center gap-1">
                <ClockIcon />
                {readTime} min read
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={titleStyle}>{title}</h3>

          {/* Description */}
          {description && <p className={descriptionStyle}>{description}</p>}

          {/* Read More button styled div */}
          <div className={readMoreStyle}>
            <span>Read More</span>
            <span className="transition-transform duration-300 group-hover/card:translate-x-1 ml-1">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Card (visible only on small screens) */}
      <div className={`${cardContainerMobile} flex sm:hidden group/card`}>
        {/* Thumbnail */}
        <div className={thumbnailMobileWrapper}>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <h3 className={`${titleStyle} text-[14px]`}>{title}</h3>
          <div className={metaRow}>
            {date && (
              <span className="inline-flex items-center gap-1">
                <CalendarIcon />
                {date}
              </span>
            )}
          </div>
          {/* Light indicator for mobile */}
          <div className="text-[12px] font-semibold text-primary-600 flex items-center gap-1">
            Read More <ArrowIcon />
          </div>
        </div>
      </div>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block no-underline ${className}`}
        {...props}
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className={`${className}`} {...props}>
      {CardContent}
    </div>
  );
};
