'use client';

import { usePathname } from 'next/navigation';
import { StickyBanner } from '@/components/StickyBanner';

export function StickyBannerWrapper() {
  const pathname = usePathname();
  const isEnterprisePage = pathname.includes('enterprise-solutions');

  return <StickyBanner isHidden={isEnterprisePage} />;
}
