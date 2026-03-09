'use client';

import { HighlightedHeading } from '@/components/HighlightedHeading';
import { Badge } from '@/components/Badge';
import { GoogleRatingCard } from '@/components/GoogleRatingCard';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import { Parallax } from '@/components/Parallax';

import { useTranslations } from 'next-intl';

export const Reviews = () => {
  const t = useTranslations('Reviews');

  return (
    <Parallax speed={0.04}>
      <section
        className="w-full flex md:px-relaxed md:py-relaxed px-tight py-relaxed mx-auto items-center justify-center overflow-visible bg-[#F9FAFB]"
        id="reviews"
      >
      {/* Outer container */}
      <div className="w-full max-w-[1034px] flex flex-col items-center gap-10 md:px-4 px-0 overflow-visible">
        {/* Heading */}
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Left Wrapper - Badge & Heading */}
          <div className="flex flex-col md:items-start items-center gap-2 flex-grow">
            <Badge size="lg">{t('badge_text')}</Badge>
            <HighlightedHeading
              text={t('heading')}
              highlight={t('heading_highlighted_word')}
              className="text-h4 font-heading font-bold text-center"
            />
            <p className="md:text-left text-center">{t('description')}</p>
          </div>

          {/* Right Wrapper - Subtitle */}
          <div className="flex items-center justify-center md:justify-end flex-grow">
            <GoogleRatingCard
              rating="4.8"
              buttonLabel="See Reviews"
              // onButtonClick={() => alert('See Reviews clicked')}
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex items-center justify-center overflow-visible">
          <ReviewsCarousel />
        </div>
      </div>
    </section>
    </Parallax>
  );
};

export default Reviews;
