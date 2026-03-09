'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { AppButton } from '@/components/AppButton';
import { ChevronsDown, Calendar } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Hero() {
  const t = useTranslations('B2BHero');
  const [isMobile, setIsMobile] = useState(false);
  const scrollTo = useSmoothScroll();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={cn('w-full px-tight py-4 flex justify-center items-center')} id="overview">
      <div
        className={cn(
          'relative',
          'bg-[#DBEAFE]',
          'w-full',
          'lg:min-h-[848px] lg:max-w-[1920px] md:min-h-[584px] min-h-[600px]',
          'md:max-h-auto max-h-[800px]',
          'aspect-[9/16] md:aspect-[16/9] lg:aspect-[21/9]',
          'lg:rounded-5xl md:rounded-[24px] rounded-[16px]',
          'overflow-hidden',
          'flex flex-col justify-center items-center',
        )}
      >
        {/* ================= BACKGROUND STACK ================= */}
        <div className="absolute inset-0 z-0">
          {/* Hero image */}
          <div
            className="
              absolute inset-0 w-full h-full
              bg-[url('/b2b_hero/hero-b2b-new.webp')]
              bg-contain bg-bottom bg-no-repeat

              /* Subtle zoom for small screens */
              scale-[2.5]        /* mobile */
              md:scale-[1]     /* tablet */
              lg:scale-[1]     /* laptop */
              origin-bottom
            "
          />

          {/* Blue fade (gradient) */}
          <div
            className="
              absolute
              left-0 right-0
              xl:top-[370px] lg:top-[450px] md:top-[400px] top-[670px]
              h-[100px]
              bg-gradient-to-t from-[#2C99FF] to-transparent
              -z-10
            "
          />
        </div>

        {/* Content Overlay */}
        <div
          className={cn(
            'relative z-10',
            'w-full h-full',
            'lg:min-h-[848px] md:min-h-[584px] min-h-[600px]',
            'md:max-h-auto w-full lg:max-w-[1284px]',
            'flex flex-col justify-between items-center',
            'text-header',
            'p-tight',
          )}
        >
          {/* Top Content Group */}
          <div
            className={cn(
              'flex lg:flex-row flex-col',
              'justify-between',
              'lg:items-end items-center',
              'mb-12',
              'gap-4',
              'py-12',
            )}
          >
            {/* Left Text */}
            <div className="flex flex-col gap-4 lg:max-w-[905px]">
              <h1
                className={cn(
                  'lg:text-h1 md:text-h2 text-h3 uppercase font-heading font-semibold',
                  'text-center lg:text-left',
                )}
              >
                {t('heading')}
              </h1>
              <p className="text-body-sm md:text-body-md lg:max-w-[800px] lg:text-start text-center">
                {t('description')}
              </p>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-auto md:w-full w-fit shrink-0 lg:justify-end justify-center">
              <AppButton
                href="/enterprise-solutions#contact-us"
                variant="default"
                size={isMobile ? 'sm' : 'md'}
                leftIcon={<Calendar className="size-5" />}
                className="w-full sm:w-auto justify-center lg:text-body-lg text-body-md"
                onClick={(e) => scrollTo(e, '/enterprise-solutions#contact-us')}
              >
                {t('partner_with_button')}
              </AppButton>
              <AppButton
                href="/enterprise-solutions#tech-stack"
                variant="tertiary"
                size={isMobile ? 'sm' : 'md'}
                rightIcon={<ChevronsDown className="size-5" />}
                className="w-full sm:w-auto justify-center lg:text-body-lg text-body-md"
                onClick={(e) => scrollTo(e, '/enterprise-solutions#tech-stack')}
              >
                {t('view_enterprise_solution_button')}
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
