'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 0 to 1, higher = more parallax effect
  className?: string;
  offset?: number; // additional offset in pixels
}

export function Parallax({
  children,
  speed = 0.5,
  className = '',
  offset = 0,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how far the element is from the viewport center
      const distanceFromCenter = elementTop + elementHeight / 2 - windowHeight / 2;

      // Only apply parallax when element is in view
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const parallaxOffset = -distanceFromCenter * speed + offset;
        setTranslateY(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      style={{
        transform: `translateY(${translateY}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
}
