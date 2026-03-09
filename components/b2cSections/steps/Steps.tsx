import { HighlightedHeading } from '@/components/HighlightedHeading';
import { StepCard } from '@/components/StepCard';
import { Disclaimer } from '@/components/Disclaimer';
import { useTranslations } from 'next-intl';

// 1. Configuration: Define the keys for your steps here.
// This makes it easy to add a 5th step later just by adding a string here and in your JSON.
const STEPS_KEYS = ['step_1', 'step_2', 'step_3', 'step_4'] as const;

export const Steps = () => {
  const t = useTranslations('Steps');

  return (
    <section
      className="w-full flex flex-col px-2 py-relaxed lg:py-tight mx-auto items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/stepsSection/wisedrive-steps-section.webp)',
      }}
    >
      {/* Outer container */}
      <div className="w-full max-w-[1248px] flex flex-col items-center justify-center gap-6 px-4">
        {/* --- Header Section --- */}
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Left Wrapper - Badge & Heading */}
          <div className="flex-1 flex flex-col md:items-start items-center gap-2 flex-grow">
            <HighlightedHeading
              text={t('heading')}
              textClassName="text-white"
              highlight={t('heading_highlighted_word')}
              highlightClassName="text-accent-500"
              className="text-h4 font-heading font-bold text-center md:text-left"
            />
            <Disclaimer>{t('disclaimer_text')}</Disclaimer>
          </div>

          {/* Right Wrapper - Subtitle */}
          <div className="flex-1 flex flex-col md:items-start items-center flex-grow text-center md:text-left gap-4">
            <p className="font-poppins text-[16px] text-white">
              {t('subtitle_question')}
            </p>
            <HighlightedHeading
              text={t('subtitle_heading')}
              textClassName="text-white lg:text-body-md text-body-sm normal-case leading-none font-normal"
              highlight={t('subtitle_heading_highlighted_word')}
              highlightClassName="text-accent-500 font-body lg:text-body-md text-body-sm"
              leading="leading-[10px]"
              className="lg:text-start text-center"
            />
          </div>
        </div>

        {/* --- Steps Grid Section --- */}
        <div className="flex flex-wrap md:flex-row items-start justify-center gap-6 mt-8 w-full mx-auto md:flex-nowrap">
          {STEPS_KEYS.map((key) => (
            <StepCard
              key={key}
              heading={t(`steps.${key}.heading`)}
              className="md:w-full w-[40%]" 
            >
              <p>{t(`steps.${key}.description`)}</p>
            </StepCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
