'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { IconBox } from '@/components/IconBox';
import { useTranslations } from 'next-intl';

const HIGHLIGHT_ITEMS = [
  { id: 1, key: 'highlight_1', iconSrc: '/icons/iconBox/data.webp' },
  { id: 2, key: 'highlight_2', iconSrc: '/icons/iconBox/clock.webp' },
  { id: 3, key: 'highlight_3', iconSrc: '/icons/iconBox/report.webp' },
  { id: 4, key: 'highlight_4', iconSrc: '/icons/iconBox/audit.webp' },
  { id: 5, key: 'highlight_5', iconSrc: '/icons/iconBox/fraud.webp' },
  { id: 6, key: 'highlight_6', iconSrc: '/icons/iconBox/data.webp' },
];

const fadeUpAnimation = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .highlight-item {
    opacity: 0;
    transform: translateY(100px);
  }
`;

export const Highlights: React.FC = () => {
  const t = useTranslations('Highlights');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{fadeUpAnimation}</style>
      <section
        ref={sectionRef}
        className="flex flex-col items-center w-full px-tight lg:mx-auto"
        id="features"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 w-full md:w-fit lg:w-fit justify-items-center">
          {HIGHLIGHT_ITEMS.map((item) => {
            const title = t(`${item.key}.title`);
            const description = t(`${item.key}.description`);
            const delay = (item.id - 1) * 0.1;

            return (
              <div
                key={item.id}
                className="highlight-item"
                style={{
                  animation: isVisible ? `fadeUp 1s ease-out ${0.3 + delay}s forwards` : 'none',
                }}
              >
                <IconBox
                  title={title}
                  description={description}
                  icon={
                    <Image
                      src={item.iconSrc}
                      alt={title}
                      width={84}
                      height={79}
                      style={{ objectFit: 'contain' }}
                    />
                  }
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Highlights;