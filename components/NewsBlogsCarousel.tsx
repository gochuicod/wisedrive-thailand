'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { NewsBlogsCard } from '@/components/NewsBlogsCard';

interface BlogEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  'read-time': number;
  category: string;
  'thumbnail-path': string;
  url?: string;
}

// Transform blog data from i18n object to array
const transformBlogsData = (
  blogs: Record<string, Omit<BlogEntry, 'id'>>,
): BlogEntry[] => {
  return Object.entries(blogs).map(([key, blog]) => ({
    id: key,
    ...blog,
  }));
};

export const NewsBlogsCarousel = () => {
  const t = useTranslations('NewsBlogs');
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Get blog data from translations
  const blogsData = useMemo(() => {
    const blogsObj = t.raw('blogs') as Record<string, Omit<BlogEntry, 'id'>>;
    return transformBlogsData(blogsObj);
  }, [t]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(blogsData.length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, blogsData.length]);

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
          {blogsData.map((blog) => (
            <CarouselItem
              key={blog.id}
              className="basis-[364px] pl-6 flex-shrink-0"
            >
              <NewsBlogsCard
                thumbnail={blog['thumbnail-path'] || undefined}
                category={blog.category}
                date={blog.date}
                readTime={blog['read-time']}
                title={blog.title}
                description={blog.description}
                url={blog.url}
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

export default NewsBlogsCarousel;
