import React from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, options, label, placeholder, description, error, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col items-start w-full">
        {/* Label */}
        {label && (
          <label className="mb-1 text-body font-bold text-[#4D525C]">
            {label}
          </label>
        )}

        {/* Select Wrapper */}
        <div className="relative w-full">
          <select
            ref={ref}
            defaultValue=""
            className={cn(
              `
              appearance-none
              w-full px-4 py-2
              bg-white
              rounded-[8px]
              text-sm md:text-body
              invalid:text-[#99A1AF]
              focus:outline-none focus:ring-2
            `,
              error
                ? 'border border-red-500 focus:ring-red-500/20'
                : 'border border-[#193CB8] focus:ring-[#193CB8]/20 focus:border-[#122C7B]',
              className,
            )}
            {...props}
          >
            {/* Placeholder */}
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}

            {/* Options */}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Dropdown Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#193CB8]">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Error OR Description */}
        {error ? (
          <span className="mt-1 text-xs text-red-500">{error}</span>
        ) : (
          description && (
            <span className="mt-1 text-xs text-[#4D525C]">{description}</span>
          )
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
