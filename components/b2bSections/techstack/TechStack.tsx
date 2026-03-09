'use client';
import Image from 'next/image';
import { DropDown } from '@/components/DropDown';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Parallax } from '@/components/Parallax';

// Transform dropdowns data from i18n
const transformDropdownsData = (dropdowns: Array<{ id: string; title: string; description: string }>) => {
  return dropdowns.map((dropdown) => ({
    id: dropdown.id,
    title: dropdown.title,
    description: dropdown.description,
  }));
};

export const TechStack = () => {
  const t = useTranslations('TechStack');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Get data from translations
  const techStackData = useMemo(() => {
    return {
      title: t('title'),
      subheading: t('subheading'),
    };
  }, [t]);

  const dropdowns = useMemo(() => {
    const rawDropdowns = t.raw('dropdowns') as Array<{ id: string; title: string; description: string }>;
    return transformDropdownsData(rawDropdowns);
  }, [t]);

  const handleDropdownToggle = (id: string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Parallax speed={0.03}>
      <section
        className="w-full flex px-tight py-relaxed mx-auto items-center justify-center overflow-clip"
        id="tech-stack"
      >
        {/* Outer container */}
        <div className="w-full max-w-[1248px] flex flex-col items-center gap-6 aspect-auto">
          {/* Heading */}
          <div className="w-full flex flex-col md:flex-row gap-8">
            {/* Left Wrapper - Badge & Heading */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <HighlightedHeading
                text={techStackData.title}
                className="font-heading text-center"
              />
              <p className="font-poppins text-[16px] text-[#1E2939] leading-[19px] text-center">
                {techStackData.subheading}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="w-full flex lg:min-h-[600px] md:min-h-[500px] flex-col-reverse md:flex-row gap-6 py-6 items-center pt-0 pb-20 md:px-10 px-0">
            {/* Column 1 */}
            <div className="flex-1 h-fit border-none rounded-2xl flex flex-col gap-2 items-end justify-center md:pt-0 pt-[200px]">
              {dropdowns.map((dropdown) => (
                <DropDown
                  key={dropdown.id}
                  title={dropdown.title}
                  variant="gradient"
                  isOpen={openDropdownId === dropdown.id}
                  onOpenChange={() => handleDropdownToggle(dropdown.id)}
                >
                  <p>
                    {dropdown.description}
                  </p>
                </DropDown>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex-1 relative overflow-visible w-full h-fit ">
              <Image
                src="/techstack/tech-stack-img.webp"
                alt="Tech Stack Visualization"
                width={1920}
                height={1080}
                className="absolute overflow-visible lg:-right-[180px] lg:-top-[200px] md:-right-[140px] md:-top-[180px] -right-14  object-cover lg:w-[400px] lg:h-[600px] md:w-[650px] md:h-[350px] w-[320px] h-[220px]"
              />
            </div>
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default TechStack;
