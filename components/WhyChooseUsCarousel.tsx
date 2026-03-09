'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';
import { AppButton } from './AppButton';
import { HighlightedHeading } from './HighlightedHeading';
import { ArrowRight } from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// 1. Helper component to access Swiper context for the button
const NextSlideButton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const swiper = useSwiper();
  return (
    <AppButton
      variant="tertiary"
      size="sm"
      onClick={() => swiper.slideNext()}
      rightIcon={<ArrowRight className="size-4" />}
      className={className}
    >
      {text}
    </AppButton>
  );
};

// Helper to render dots that control the swiper
const CarouselPagination = ({
  total,
  current,
}: {
  total: number;
  current: number;
}) => {
  const swiper = useSwiper();
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => swiper.slideToLoop(idx)} // slideToLoop handles loop mode better
          className={cn(
            'rounded-full transition-all duration-300',
            current === idx
              ? 'w-[15px] h-[15px] bg-primary-semantic'
              : 'w-[10px] h-[10px] border-2 border-primary-semantic',
          )}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
};

// 2. Props Interface
interface SlideData {
  id: string;
  imgSrc: string;
  imgAlt: string;
  panelHeading: string;
  panelText: string;
  buttonText: string;
}

interface WhyChooseUsCarouselProps {
  badgeText?: string;
  headingText?: string;
  headingTextHighlight?: string;
  slides: SlideData[];
}

export default function WhyChooseUsCarousel({
  badgeText = 'Why Choose Us',
  headingText = 'What our ai does for you',
  headingTextHighlight = 'ai',
  slides,
}: WhyChooseUsCarouselProps) {
  return (
    <div
      className={cn(
        'max-w-[1034px] mx-auto',
        'lg:mt-[104px] mt-[64px]',
        'lg:mb-auto mb-[164px]',
        'flex lg:flex-row flex-col-reverse',
        'lg:px-0 md:px-relaxed px-tight relative',
      )}
    >
      {/* LEFT SIDE: SWIPER (Image + Floating Panel) */}
      <div className="lg:w-[50%] w-full relative z-0">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={500}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          className="!overflow-visible"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              {/* Image Container */}
              <div
                className={cn(
                  'relative overflow-hidden rounded-3xl',
                  'lg:min-h-0 md:min-h-[438px] min-h-[319px]',
                  'lg:h-[438px] w-full',
                  'aspect-16/9',
                )}
              >
                <Image
                  src={slide.imgSrc}
                  alt={slide.imgAlt}
                  width={1920}
                  height={1080}
                  className={cn(
                    'absolute left-1/2 -translate-x-1/2 -top-[50px]',
                    'w-full h-full object-cover scale-[200%]',
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0037B6]/40 to-[#2165FF]/5 z-0" />
              </div>

              {/* Floating Swiper Panel */}
              <div
                className={cn(
                  'absolute z-10',
                  'lg:bottom-0 bottom-[-30%]',
                  'left-1/2 -translate-x-1/2 lg:left-0',
                  'lg:translate-x-[85%]',
                  'lg:w-auto w-[85%] lg:mx-0 mx-auto',
                  'md:top-auto top-[65%]',
                )}
              >
                <div
                  className={cn(
                    'relative shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.01)] backdrop-blur-[2px]',
                    'lg:max-w-[591px] min-h-[211px]',
                    'gap-2 md:p-8 p-4 flex flex-col rounded-2xl',
                  )}
                  style={{ background: 'rgba(255, 255, 255, 0.01)' }}
                >
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/80 pointer-events-none rounded-2xl -z-10" />

                  <span className="text-h5 font-bold font-heading lg:text-start text-center uppercase">
                    {slide.panelHeading}
                  </span>

                  <span className="md:mt-6 md:mb-4 lg:text-body-lg text-body-md lg:text-start text-center">
                    {slide.panelText}
                  </span>

                  {/* --- NEW: Control Row (Pagination + Button) --- */}
                  <div className="flex md:flex-row flex-col-reverse w-full items-center justify-between gap-4 md:mt-0 mt-8">
                    {/* Pagination on the left */}
                    <CarouselPagination total={slides.length} current={index} />

                    {/* Button on the right */}
                    <NextSlideButton
                      text={slide.buttonText}
                      className="lg:text-body-lg text-body-md"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT SIDE: STATIC HEADINGS */}
      <div
        className={cn(
          'flex flex-col lg:items-end items-center lg:justify-start justify-center',
          'lg:w-[50%] w-full lg:mb-0 mb-8 lg:pl-8',
        )}
      >
        <Badge>{badgeText}</Badge>
        <HighlightedHeading
          text={headingText}
          highlight={headingTextHighlight}
          className="font-heading lg:text-end text-center"
        />
      </div>
    </div>
  );
}
