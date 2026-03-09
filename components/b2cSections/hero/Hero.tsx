'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { AppButton } from '@/components/AppButton';
import { ChevronsDown, Calendar } from 'lucide-react';
import Counter from '@/components/Counter';
import Image from 'next/image';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useState, useEffect } from 'react';

export default function Hero() {
  const t = useTranslations('B2CHero');
  const scrollTo = useSmoothScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={cn('w-full px-tight py-4 flex justify-center items-center')}>
      <div
        className={cn(
          'relative',
          'bg-black',
          'w-full',
          'mx-auto',
          'lg:min-h-[848px] lg:max-w-[1920px] md:min-h-[584px] min-h-[600px]',
          'md:max-h-[880px] max-h-[800px]',
          'aspect-[9/16] md:aspect-[16/9] lg:aspect-[21/9]',
          'lg:rounded-5xl md:rounded-[24px] rounded-[16px]',
          'overflow-hidden',
          'flex flex-col justify-end',
        )}
      >
        {/* Hero Image */}
        <Image
          src="/b2cHero/b2c-hero-new.webp"
          alt="wisedrive hero image"
          width={1920}
          height={1080}
          className={cn(
            'absolute',
            'md:bottom-0 bottom-[200px] left-0 right-0',
            'w-full h-auto',
            'object-cover',
            'z-0',
            '[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]',
            'md:scale-100 scale-[200%]',
            'animate-in fade-in duration-500',
          )}
        />

        {/* Content Overlay */}
        <div
          className={cn(
            'relative z-10',
            'w-full h-full',
            'lg:min-h-[848px] md:min-h-[584px] min-h-[600px]',
            'md:max-h-auto max-h-[800px]',
            'flex flex-col justify-between items-center',
            'text-white',
            'p-tight',
            'animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300',
          )}
        >
          {/* Content Wrapper */}
          <div
            className={cn(
              'lg:max-w-[1248px] md:max-w-[1000px]',
              'flex flex-col',
              'justify-between',
              'h-full',
              'p-4 md:p-0',
            )}
          >
            {/* Top Content Group */}
            <div
              className={cn(
                'flex lg:flex-row flex-col',
                'justify-between',
                'lg:items-end items-center',
                'mb-12',
                'gap-8',
                'md:pt-14 pt-2',
              )}
            >
            {/* Left Text */}
            <div className="flex flex-col gap-4 lg:max-w-[60%] md:max-w-[95%]">
              <h1
                className={cn(
                  'text-h1 uppercase font-heading font-semibold',
                  'text-center lg:text-left',
                )}
              >
                {t('heading')}
              </h1>
              <p className="font-body lg:text-body-lg text-body-md text-center lg:text-left text-gray-200">
                {t('description')}
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-auto md:w-full w-fit shrink-0 lg:justify-end justify-center">
              <AppButton
                href="https://wisedrive.com/#services"
                variant="default"
                size={isMobile ? 'sm' : 'md'}
                leftIcon={<Calendar className="size-5" />}
                className="w-full sm:w-auto justify-center lg:text-body-lg text-body-md"
              >
                {t('book_your_inspection_button')}
              </AppButton>
              <AppButton
                href="#our-brands"
                variant="glass"
                size={isMobile ? 'sm' : 'md'}
                rightIcon={<ChevronsDown className="size-5" />}
                className="w-full sm:w-auto justify-center lg:text-body-lg text-body-md"
                onClick={(e) => scrollTo(e, '#our-brands')}
              >
                {t('how_it_works_button')}
              </AppButton>
            </div>
            </div>

          {/* Bottom Counter Bar */}
          <div
            className={cn(
              'w-full',
              'flex flex-col md:flex-row items-center justify-center gap-2',
              'py-4 px-6 md:px-2',
              'rounded-xl border border-white/10',
              'bg-white/5 backdrop-blur-md',
              'text-center',
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-xl pointer-events-none" />
            <span className="font-body font-bold text-sm md:text-base opacity-90">
              {t('counter_text_1')}
            </span>
            <Counter currency="RM" amount={664002} />
            <span className="font-body font-bold text-sm md:text-base opacity-90">
              {t('counter_text_2')}
            </span>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
