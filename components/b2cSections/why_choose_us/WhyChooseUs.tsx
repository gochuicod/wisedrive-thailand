import WhyChooseUsCarousel from '@/components/WhyChooseUsCarousel';
import { useTranslations } from 'next-intl';
import { Parallax } from '@/components/Parallax';

export default function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');

  const slideKeys = ['slide_1', 'slide_2', 'slide_3', 'slide_4'] as const;

  const slides = slideKeys.map((key) => ({
    id: key,
    imgSrc: t(`slides.${key}.image`),
    imgAlt: t(`slides.${key}.image_alt_text`),
    panelHeading: t(`slides.${key}.panel_heading`),
    panelText: t(`slides.${key}.panel_text`),
    buttonText: t(`slides.${key}.button_text`),
  }));

  return (
    <Parallax speed={0.05}>
      <WhyChooseUsCarousel
        badgeText={t('badge_text')}
        headingText={t('heading')}
        headingTextHighlight={t('heading_highlighted_word')}
        slides={slides}
      />
    </Parallax>
  );
}
