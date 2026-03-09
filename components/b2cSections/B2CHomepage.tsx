'use client';

import OurBrands from '@/components/b2cSections/brands/OurBrands';
import Highlights from '@/components/b2cSections/highlights/Highlights';
import Hero from '@/components/b2cSections/hero/Hero';
import FAQSection from '@/components/b2cSections/faq/FAQSection';
import Reviews from '@/components/b2cSections/reviews/Reviews';
import Advantage from '@/components/b2cSections/advantage/Advantage';
import Steps from '@/components/b2cSections/steps/Steps';
import HighlightPill from '@/components/b2cSections/highlightpill/HighlightPill';
import Inspection from '@/components/b2cSections/inspection/Inspection';
import EnterpriseSolutions from '@/components/b2cSections/enterprise_solutions/EnterpriseSolutions';
import WhyChooseUs from '@/components/b2cSections/why_choose_us/WhyChooseUs';
import CTA from '@/components/CTA';
import { useHomeCTAs } from '@/hooks/useHomeCTAs';
import { FixedPopUp } from '@/components/FixedPopUp';
import NewsBlogArticles from './news&blogs/NewsBlogArticles';

export default function B2CHomepage() {
  const ctas = useHomeCTAs();

  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <OurBrands />
      <Advantage />
      <Highlights />
      <CTA {...ctas.confidence} />
      <WhyChooseUs />
      <EnterpriseSolutions />
      <HighlightPill />
      <Inspection />
      <Steps />
      <CTA {...ctas.consultation} />
      <FAQSection />
      <Reviews />
      {/* insert blogs and articles page */}
      <NewsBlogArticles />
      <CTA {...ctas.secure} />
      <FixedPopUp />
    </div>
  );
}
