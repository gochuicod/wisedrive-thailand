import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  CarFront,
  ShieldPlus,
  Coins,
  Store,
  SquareArrowOutUpRight,
  LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Parallax } from '@/components/Parallax';

import { HighlightedHeading } from '@/components/HighlightedHeading';
import { AppButton } from '@/components/AppButton';

// 1. Define the structure for our data
interface SolutionPill {
  id: string;
  icon: LucideIcon;
  widthDesktop: string; // e.g., 'md:w-[55%]'
  widthMobile: string; // e.g., 'w-[90%]'
  alignSelf: 'self-start' | 'self-end';
  justifyContent: 'justify-end' | 'justify-start';
  rounded: 'rounded-e-full' | 'rounded-s-full';
  margin: string; // e.g., 'me-4' or nothing
}

export default function EnterpriseSolutions() {
  const t = useTranslations('EnterpriseSolutions');

  // 2. Configuration array for the pills
  // This abstracts the layout logic away from the rendering logic
  const pills: SolutionPill[] = [
    {
      id: 'pill_1_text',
      icon: CarFront,
      widthDesktop: 'md:w-[55%]',
      widthMobile: 'w-[90%]',
      alignSelf: 'self-start',
      justifyContent: 'justify-end',
      rounded: 'rounded-e-full',
      margin: 'me-4',
    },
    {
      id: 'pill_2_text',
      icon: ShieldPlus,
      widthDesktop: 'md:w-[45%]',
      widthMobile: 'w-[90%]',
      alignSelf: 'self-end',
      justifyContent: 'justify-start',
      rounded: 'rounded-s-full',
      margin: '',
    },
    {
      id: 'pill_3_text',
      icon: Coins,
      widthDesktop: 'md:w-[45%]',
      widthMobile: 'w-[80%]',
      alignSelf: 'self-start',
      justifyContent: 'justify-end',
      rounded: 'rounded-e-full',
      margin: 'me-4',
    },
    {
      id: 'pill_4_text',
      icon: Store,
      widthDesktop: 'md:w-[55%]',
      widthMobile: 'w-[80%]',
      alignSelf: 'self-end',
      justifyContent: 'justify-start',
      rounded: 'rounded-s-full',
      margin: '',
    },
  ];

  return (
    <Parallax speed={0.03}>
      <div className={cn('flex flex-col w-full gap-4 my-relaxed py-relaxed')}>
      {/* Heading and description */}
      <div className={cn('flex flex-col items-center gap-px px-relaxed')}>
        <HighlightedHeading text={t('heading')} className="text-center font-heading" />
        <p className={cn('md:w-[45%] w-full text-center')}>
          {t('description')}
        </p>
      </div>

      {/* Optimized Items Section */}
      <div className="flex flex-col md:gap-4 gap-2 text-primary-semantic">
        {/* We map through the pills in pairs of 2 using a simple logic,
            or simply map all of them if the specific row-grouping isn't strictly necessary.
            However, based on your design (Rows of 2), here is the cleanest mapping:
        */}
        <div className="flex flex-col md:gap-4 gap-2">
          {/* Row 1 */}
          <div className="flex md:flex-row flex-col md:gap-0 gap-2">
            {pills.slice(0, 2).map((pill) => (
              <PillItem key={pill.id} pill={pill} t={t} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex md:flex-row flex-col md:gap-0 gap-2">
            {pills.slice(2, 4).map((pill) => (
              <PillItem key={pill.id} pill={pill} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Highlight Image */}
      <Image
        src="/enterprise_solutions/highlight-image-new.webp"
        alt="Enterprise solutions"
        width={1920}
        height={1080}
        className="max-w-[1248px] aspect-[3.5/0.8] mx-auto w-full object-cover"
      />

      {/* CTA Button */}
      <AppButton
        href="/enterprise-solutions"
        variant="default"
        size="md"
        rightIcon={<SquareArrowOutUpRight className="size-4" />}
        className="w-fit mx-auto"
      >
        {t('cta_button_text')}
      </AppButton>
      </div>
    </Parallax>
  );
}

// 3. Extracted Sub-component for cleanliness
function PillItem({
  pill,
  t,
}: {
  pill: SolutionPill;
  t: (key: string) => string;
}) {
  const Icon = pill.icon;

  return (
    <span
      className={cn(
        'flex flex-row gap-2 bg-primary-50 px-6 py-2 text-body-md items-center', // Base styles
        pill.widthDesktop,
        pill.widthMobile,
        pill.alignSelf,
        pill.justifyContent,
        pill.rounded,
        pill.margin,
      )}
    >
      <Icon className="size-6" />
      {t(`pills.${pill.id}`)}
    </span>
  );
}
