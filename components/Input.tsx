import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  italicPlaceholder?: boolean;
  error?: string;
  variant?: 'input' | 'textarea';
  rows?: number;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      description,
      label,
      italicPlaceholder = false,
      error,
      variant = 'input',
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const baseStyles = cn(
      `
      w-full px-4 py-2
      bg-white
      border rounded-[8px]
      text-sm md:text-body text-[#4D525C]
      placeholder:text-[#99A1AF]
      ${italicPlaceholder ? 'placeholder:italic' : ''}
      focus:outline-none focus:ring-2
      ${variant === 'textarea' ? 'max-h-[55px] lg:max-h-[84px]' : ''}
    `,
      error
        ? 'border-red-500 focus:ring-red-500/20'
        : 'border-[#193CB8] focus:ring-[#193CB8]/20 focus:border-[#122C7B]',
      className,
    );

    return (
      <div className="flex flex-col items-start w-full">
        {label && (
          <label className="mb-1 text-body font-bold text-[#4D525C]">
            {label}
          </label>
        )}

        {variant === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={baseStyles}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={baseStyles}
            {...props}
          />
        )}

        {/* Error OR description */}
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

Input.displayName = 'Input';
export default Input;