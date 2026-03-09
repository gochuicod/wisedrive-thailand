import React from 'react';
import { Link } from '@/i18n/routing';

// --- Styling Types ---
export type ButtonVariant = 'default' | 'glass' | 'secondary' | 'tertiary' | 'outline' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  href?: string;
  target?: string; // Added to allow opening in new tab
  download?: string | boolean; // Added to support file downloads
}

// --- Style Definitions ---
const baseStyles =
  'inline-flex items-center justify-center font-body gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed no-underline';

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-[linear-gradient(132.85deg,#2BA3FF_0%,#374EFF_99.57%)] text-white hover:shadow-lg hover:brightness-110',
  glass:
    'bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-white/30 hover:border-white/30',
  secondary: 'border-2 border-white text-white hover:bg-primary/5',
  tertiary:
    'bg-transparent border border-primary-semantic text-primary-semantic rounded hover:bg-primary/10 transition-colors cursor-pointer',
  outline:
    'border border-white text-white bg-transparent hover:bg-white hover:text-[#0D2059] transition-colors',
  success:
    'bg-green-500 text-white hover:shadow-lg hover:brightness-110'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-[32px] px-4 text-[14px] rounded',
  md: 'h-[56px] px-6 text-[16px] rounded-lg',
  lg: 'h-[56px] px-6 text-[20px] rounded-lg',
};

// --- Base Component ---
export const BaseButton: React.FC<BaseButtonProps> = ({
  className = '',
  variant = 'default',
  size = 'md',
  isLoading = false,
  href,
  type = 'button',
  children,
  target,
  download,
  ...props
}) => {
  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // 1. Check if it's an external link, phone number, or email
  const isExternal =
    href &&
    (href.startsWith('http') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:'));

  // EXTERNAL LINK / PHONE / WHATSAPP MODE
  if (isExternal && href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target || (href.startsWith('http') ? '' : undefined)}
        rel={target === '' ? 'noopener noreferrer' : undefined}
        download={download}
        {...(props as any)}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </a>
    );
  }

  // DOWNLOAD LINK MODE
  if (href && download) {
    return (
      <a
        href={href}
        className={combinedClasses}
        download={download}
        target={target}
        {...(props as any)}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </a>
    );
  }

  // INTERNAL LINK MODE (Next-Intl)
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        target={target}
        {...(props as any)}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </Link>
    );
  }

  // BUTTON MODE
  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
};
