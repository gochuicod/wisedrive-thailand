import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { BaseButton, BaseButtonProps } from '@/styles/button';

// --- Types ---
export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownButtonProps extends Omit<
  BaseButtonProps,
  'href' | 'onClick'
> {
  items: DropdownItem[];
  dropDirection?: 'up' | 'down';
  menuAlign?: 'left' | 'right'; // 👈 NEW PROP
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// --- Helper Hook: Click Outside ---
function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// --- Icons ---
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    width="16"
    height="16"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// --- Main Component ---
export const DropdownButton: React.FC<DropdownButtonProps> = ({
  items,
  dropDirection = 'down',
  menuAlign = 'left',
  leftIcon,
  rightIcon,
  className = '',
  variant = 'default',
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsOpen(false));
  const toggleDropdown = () => setIsOpen(!isOpen);

  const verticalClasses =
    dropDirection === 'up'
      ? 'bottom-full mb-2 origin-bottom'
      : 'top-full mt-2 origin-top';

  const horizontalClasses = menuAlign === 'right' ? 'right-0' : 'left-0';

  return (
    <div
      // 1. We apply the passed 'className' to the wrapper container here
      className={`relative inline-block text-left ${className}`}
      ref={containerRef}
    >
      {/* Trigger Button */}
      <BaseButton
        variant={variant}
        onClick={toggleDropdown}
        {...props}
        // 2. FIX: Removed '${props.className}' here.
        // We only use the structural classes needed for the dropdown trigger.
        className="w-full justify-between group"
      >
        <div className="flex items-center gap-2">
          {leftIcon && <span>{leftIcon}</span>}
          <span>{children}</span>
        </div>

        <span
          className={`transition-transform duration-200 ${
            isOpen
              ? dropDirection === 'up'
                ? ''
                : 'rotate-180'
              : dropDirection === 'up'
                ? 'rotate-180'
                : ''
          }`}
        >
          {rightIcon || <ChevronDown />}
        </span>
      </BaseButton>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 w-56 min-w-[200px]
            rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
            animate-in fade-in zoom-in-95 duration-100
            ${verticalClasses}
            ${horizontalClasses}
            bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200
          `}
        >
          <div className="py-1">
            {items.map((item, index) => {
              const itemBaseClasses =
                'group flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors cursor-pointer';

              if (item.href) {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={itemBaseClasses}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && (
                      <span className="text-gray-400 group-hover:text-gray-600">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                  className={`${itemBaseClasses} ${
                    item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  } text-left`}
                >
                  {item.icon && (
                    <span className="text-gray-400 group-hover:text-gray-600">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
