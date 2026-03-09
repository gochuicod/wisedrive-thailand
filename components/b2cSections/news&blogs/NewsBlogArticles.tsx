'use client';

import React, { useMemo, useState } from 'react';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import { Badge } from '@/components/Badge';
import { Parallax } from '@/components/Parallax';
import { useTranslations } from 'next-intl';
import NewsBlogsCarousel from '@/components/NewsBlogsCarousel';
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

const INITIAL_VISIBLE = 3;

export const NewsBlogArticles = () => {
  const t = useTranslations('NewsBlogs');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const blogsData = useMemo(() => {
    const blogsObj = t.raw('blogs') as Record<string, Omit<BlogEntry, 'id'>>;
    return Object.entries(blogsObj).map(([key, blog]) => ({
      id: key,
      ...blog,
    }));
  }, [t]);

  const visibleBlogs = blogsData.slice(0, visibleCount);
  const hasMore = visibleCount < blogsData.length;

  return (
    <Parallax speed={0.04}>
      <section
        className="w-full flex md:px-relaxed md:py-relaxed px-tight py-relaxed mx-auto items-center justify-center overflow-visible"
        id="news-blogs"
      >
        {/* Outer container */}
        <div className="w-full max-w-[1034px] flex flex-col items-center gap-10 md:px-4 px-0 overflow-visible">
          {/* Heading */}
          <div className="w-full flex flex-col md:flex-row gap-8 ">
            {/* Left Wrapper - Badge & Heading */}
            <div className="flex flex-col md:items-start items-center gap-2 flex-grow">
              <Badge size="lg">{t('badge_text')}</Badge>
              <HighlightedHeading
                text={t('heading')}
                highlight={t('heading_highlighted_word')}
                className="text-h4 font-heading font-bold text-center"
              />
            </div>

            {/* Right Wrapper - Description */}
            <div className="flex items-center justify-center md:justify-end flex-grow md:max-w-[50%] w-full">
              <p className="md:text-left text-center">{t('description')}</p>
            </div>
          </div>

          {/* Desktop / Tablet — Carousel */}
          <div className="w-full hidden sm:flex items-center justify-center overflow-visible">
            <NewsBlogsCarousel />
          </div>

          {/* Mobile — Vertical List */}
          <div className="w-full flex sm:hidden flex-col items-center gap-4 px-2">
            {visibleBlogs.map((blog) => (
              <NewsBlogsCard
                key={blog.id}
                thumbnail={blog['thumbnail-path'] || undefined}
                category={blog.category}
                date={blog.date}
                readTime={blog['read-time']}
                title={blog.title}
                description={blog.description}
                url={blog.url}
              />
            ))}
            {hasMore && (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="mt-2 px-6 py-2 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default NewsBlogArticles;
