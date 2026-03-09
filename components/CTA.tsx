'use client';

import React, { ComponentProps } from 'react';
import { AppButton } from '@/components/AppButton';
import { HighlightedHeading } from '@/components/HighlightedHeading';

// 1. Extract types
type ButtonVariant = ComponentProps<typeof AppButton>['variant'];
type ButtonSize = ComponentProps<typeof AppButton>['size'];

// 2. Define Helper Type for Position
type IconPosition = 'left' | 'right';

// 3. Define Base Props
interface BaseCTAProps {
  heading: string;
  highlighted: string;
  subheading: string;
  invertedGradient?: boolean;

  // Button 1 Props
  button1Text: string;
  button1Icon?: React.ReactNode;
  button1IconPosition?: IconPosition; // New Prop
  button1Href: string;
  button1Variant?: ButtonVariant;
  button1Size?: ButtonSize;
}

// 4. Define Single Button State
interface SingleButtonCTA extends BaseCTAProps {
  buttons?: false;
}

// 5. Define Double Button State
interface DoubleButtonCTA extends BaseCTAProps {
  buttons: true;

  // Button 2 Props
  button2Text: string;
  button2Icon?: React.ReactNode;
  button2IconPosition?: IconPosition; // New Prop
  button2Href: string;
  button2Variant?: ButtonVariant;
  button2Size?: ButtonSize;
}

type CTAProps = SingleButtonCTA | DoubleButtonCTA;

const CTA = (props: CTAProps) => {
  const {
    heading,
    highlighted,
    subheading,
    invertedGradient = false,

    // Button 1 Destructuring
    button1Text,
    button1Icon,
    button1IconPosition = 'left', // Default to left
    button1Href,
    button1Variant,
    button1Size = 'sm',
  } = props;

  // Define Gradient Strings
  const normalGradient =
    'bg-gradient-to-r from-[#003ECC]/80 via-[#13398F]/60 to-[#13398F]/30';
  const invertedGradientClass =
    'bg-gradient-to-r from-[#13398F]/30 via-[#13398F]/60 to-[#003ECC]/80';

  return (
    <section className="flex flex-col items-center w-full md:py-relaxed md:px-relaxed px-tight py-relaxed max-w-[1034px] gap-8 mx-auto lg:px-0">
      <div
        className="relative min-h-[192px] w-full flex flex-col items-center justify-center p-8 gap-6 rounded-2xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/cta/wd-cta-1-bg.webp)' }}
      >
        <div
          className={`absolute inset-0 z-0 ${invertedGradient ? invertedGradientClass : normalGradient}`}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center lg:justify-between gap-6 w-full">
          <div className="flex flex-col md:items-start items-center text-center md:text-left">
            <HighlightedHeading
              text={heading}
              textClassName="font-heading text-white font-body"
              highlight={highlighted}
              highlightClassName="font-heading text-accent-500 "
              className="text-h5 md:text-start text-center"
            />
            <p className='text-body-md text-white'>{subheading}</p>
          </div>

          <div className="flex flex-col gap-2 md:gap-4 shrink-0">
            {/* Button 1 */}
            <AppButton
              href={button1Href}
              variant={button1Variant}
              size={button1Size}
              className="px-4 py-2"
              // Conditionally pass left or right icon based on the position prop
              leftIcon={
                button1IconPosition === 'left' ? button1Icon : undefined
              }
              rightIcon={
                button1IconPosition === 'right' ? button1Icon : undefined
              }
            >
              {button1Text}
            </AppButton>

            {/* Button 2 */}
            {props.buttons && (
              <AppButton
                href={props.button2Href}
                variant={props.button2Variant}
                size={props.button2Size || 'sm'}
                className="px-4 py-2"
                // Logic for Button 2 Position (defaults to left if undefined)
                leftIcon={
                  (props.button2IconPosition || 'left') === 'left'
                    ? props.button2Icon
                    : undefined
                }
                rightIcon={
                  props.button2IconPosition === 'right'
                    ? props.button2Icon
                    : undefined
                }
              >
                {props.button2Text}
              </AppButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
