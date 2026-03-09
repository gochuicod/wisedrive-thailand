import { HighlightedHeading } from '@/components/HighlightedHeading';
import { FeatureStat } from '@/components/FeatureStat';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility, otherwise use template literals
import React, { useRef, useEffect, useState } from 'react';

interface StatConfig {
  id: string; // Used for translation key (pill_1, pill_2, etc)
  image: string;
  alignment: string; // The specific flex alignment for this item
}

const fadeDownAnimation = `
  @keyframes fadeDown {
    from {
      opacity: 0;
      transform: translateY(-100px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .highlight-pill-item {
    opacity: 0;
    transform: translateY(-100px);
  }
`;

export const FAQSection = () => {
  const t = useTranslations('HighlightPills');
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

  // 1. Configuration: Define the data and visual layout rules here
  const statItems: StatConfig[] = [
    {
      id: 'pill_1',
      image: '/featurestat/engine.webp',
      alignment: 'items-center', // Vertical Center
    },
    {
      id: 'pill_2',
      image: '/featurestat/headlight.webp',
      alignment: 'items-end', // Bottom
    },
    {
      id: 'pill_3',
      image: '/featurestat/seat.webp',
      alignment: 'items-start', // Top
    },
    {
      id: 'pill_4',
      image: '/featurestat/wheel.webp',
      alignment: 'items-center', // Vertical Center
    },
  ];

  // 2. Helper to render a list of stats
  const renderStats = (items: StatConfig[]) => {
    return items.map((item, index) => {
      const delay = index * 0.1;
      return (
        <div
          key={item.id}
          className={cn('flex justify-center highlight-pill-item', item.alignment)}
          style={{
            animation: isVisible ? `fadeDown 1s ease-out ${0.3 + delay}s forwards` : 'none',
          }}
        >
          <FeatureStat
            value={t(`pills.${item.id}.value`)}
            label={t(`pills.${item.id}.label`)}
            image={item.image}
          />
        </div>
      );
    });
  };

  return (
    <>
      <style>{fadeDownAnimation}</style>
      <section
        ref={sectionRef}
        className="w-full flex px-tight py-relaxed mx-auto items-center justify-center"
      >
        <div className="w-full max-w-[1034px] flex flex-col items-center gap-10 px-4">
          {/* Heading */}
          <div className="flex flex-col items-center gap-1 flex-grow">
            <HighlightedHeading
              text={t('heading')}
              highlight={t('heading_highlighted_word')}
              className="md:text-h4 font-heading font-bold text-center"
            />
          </div>

          {/* Content Container */}
          <div className="w-full h-full lg:min-h-[608px] md:min-h-[508px] min-h-[700px] flex flex-row gap-4 lg:gap-8 justify-center">
            {/* Left Column (Items 1 & 2) */}
            <div className="flex md:flex-row justify-start flex-col gap-4 lg:gap-8">
              {renderStats(statItems.slice(0, 2))}
            </div>

            {/* Right Column (Items 3 & 4) */}
            <div className="flex md:flex-row justify-end flex-col gap-4 lg:gap-8">
              {renderStats(statItems.slice(2, 4))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
