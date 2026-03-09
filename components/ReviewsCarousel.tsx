'use client';

import React, { useMemo } from 'react';
import { ReviewCard } from '@/components/ReviewCard';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';

// Transform review data from i18n
const transformReviewsData = (
  reviews: Record<string, { customer_name: string; content: string }>,
) => {
  return Object.entries(reviews).map((entry, index) => {
    const [key, review] = entry;
    return {
      id: index + 1,
      reviewText: review.content,
      reviewerName: review.customer_name,
      reviewDate: '',
      rating: 5,
    };
  });
};

export const ReviewsCarousel = () => {
  const t = useTranslations();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Get review data from translations
  const reviewsData = useMemo(() => {
    const reviewsObj = t.raw('Reviews.reviews');
    return transformReviewsData(reviewsObj);
  }, [t]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    // Set count based on the actual number of review items
    setCount(reviewsData.length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, reviewsData.length]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Carousel Container */}
      <Carousel
        opts={{
          align: 'center',
          loop: true,
          skipSnaps: false,
          duration: 25,
        }}
        setApi={setApi}
        className="w-full relative [&>div]:overflow-visible [clip-path:inset(0_-100vw_0_-100vw)]"
      >
        <CarouselContent className="-ml-6">
          {reviewsData.map((review, index) => (
            <CarouselItem
              key={review.id}
              className="basis-[344px] pl-6 flex-shrink-0"
            >
              <ReviewCard
                variant={index % 2 === 0 ? 'v1' : 'v2'}
                reviewText={review.reviewText}
                reviewerName={review.reviewerName}
                reviewDate={review.reviewDate}
                rating={review.rating}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Controls Container - Left Button + Pagination + Right Button */}
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {/* Previous Button */}
        <button
          onClick={() => api?.scrollPrev()}
          className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Previous"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-6 md:h-6"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="flex gap-1 md:gap-2 justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                index === current
                  ? 'bg-[var(--color-primary)]'
                  : 'border border-[var(--color-primary)] bg-transparent'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => api?.scrollNext()}
          className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Next"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="md:w-6 md:h-6"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
