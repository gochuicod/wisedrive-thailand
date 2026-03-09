import { HighlightedHeading } from '@/components/HighlightedHeading';
import { Badge } from '@/components/Badge';
import Image from 'next/image';
import { Parallax } from '@/components/Parallax';

import { useTranslations } from 'next-intl';

const WiseDriveAdvantage = () => (
  <Image
    src="/advantage/wd-advantage-new.webp"
    alt="WiseDrive Advantage Image"
    width={1920}
    height={1020}
    className="w-full h-full object-contain md:max-w-[600px] lg:max-w-[716px]"
  />
);

export const FAQSection = () => {
  const t = useTranslations('Advantage');

  return (
    <Parallax speed={0.04}>
      <section
        className="w-full flex px-tight py-relaxed mx-auto items-center justify-center"
        id="about"
      >
      {/* Outer container */}
      <div className="w-full lg:max-w-[1248px] md:max-w-[720px] flex flex-col items-center justify-center gap-6">
        {/* Heading */}
        <div className="w-full flex flex-col lg:flex-row gap-8 items-center ">
          {/* Left Wrapper - Badge & Heading */}
          <div className="flex-1 flex flex-col lg:items-start items-center gap-2 flex-grow">
            <div className="flex flex-col gap-1 lg:items-start items-center">
              <Badge>{t('badge_text')}</Badge>
              <HighlightedHeading
                text={t('heading')}
                highlight={t('heading_highlighted_word')}
                className="font-heading text-center lg:text-left md:max-w-none lg:max-w-none max-w-[358px]"
              />
            </div>
            <p className="md:max-w-[528px] text-center lg:text-left text-body">
              {t('description')}
            </p>
          </div>

          {/* Right Wrapper - Image */}
          <div className="flex-1 flex items-center justify-center flex-grow w-full h-full">
            <WiseDriveAdvantage />
          </div>
        </div>
      </div>
    </section>
    </Parallax>
  );
};

export default FAQSection;
