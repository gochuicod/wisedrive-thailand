import { DropDown } from '@/components/DropDown';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import { Badge } from '@/components/Badge';
import { Parallax } from '@/components/Parallax';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';

export const FAQSection = () => {
  const t = useTranslations('FAQSection');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Create an array of FAQ items from the translations
  const faqItems = useMemo(() => 
    Array.from({ length: 14 }, (_, i) => ({
      id: `faq-${i}`,
      question: t(`q${i + 1}.question`),
      answer: t(`q${i + 1}.answer`),
    })), [t]
  );

  // Split into two columns (7 items each)
  const column1 = faqItems.slice(0, 7);
  const column2 = faqItems.slice(7, 14);

  const handleDropdownToggle = (id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Parallax speed={0.02}>
      <section
        className="w-full flex md:px-relaxed md:py-relaxed px-tight py-relaxed mx-auto items-center justify-center"
        id="faqs"
      >
      {/* Outer container */}
      <div className="w-full max-w-[1034px] flex flex-col items-center gap-6">
        {/* Heading */}
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Left Wrapper - Badge & Heading */}
          <div className="flex-1 flex flex-col md:items-start items-center gap-1 flex-grow">
            <Badge size="lg">{t('badge_text')}</Badge>
            <HighlightedHeading
              text={t('heading')}
              highlight={t('heading_highlighted_word')}
              className="font-heading md:text-start text-center"
            />
          </div>

          {/* Right Wrapper - Subtitle */}
          <div className="flex-1 flex items-center flex-grow">
            <p className="text-body md:text-start text-center">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Column 1 */}
          <div className="flex-1 border border-[#D1D5DC] rounded-2xl overflow-hidden flex flex-col h-fit">
            {column1.map((faq) => (
              <DropDown
                key={faq.id}
                title={faq.question}
                isOpen={openDropdownId === faq.id}
                onOpenChange={() => handleDropdownToggle(faq.id)}
              >
                <p className="font-poppins text-[16px] text-[#364153]">
                  {faq.answer}
                </p>
              </DropDown>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex-1 border border-[#D1D5DC] rounded-2xl overflow-hidden flex flex-col h-fit">
            {column2.map((faq) => (
              <DropDown
                key={faq.id}
                title={faq.question}
                isOpen={openDropdownId === faq.id}
                onOpenChange={() => handleDropdownToggle(faq.id)}
              >
                <p className="font-poppins text-[16px] text-[#364153]">
                  {faq.answer}
                </p>
              </DropDown>
            ))}
          </div>
        </div>
      </div>
    </section>
    </Parallax>
  );
};

export default FAQSection;
