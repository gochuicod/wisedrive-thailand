'use client';

import CTA from '@/components/CTA';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import { useHomeCTAs } from '@/hooks/useHomeCTAs';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const ctas = useHomeCTAs();
  const t = useTranslations('CancellationAndRefund');

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="py-16 px-4 md:px-8 lg:px-16 mx-auto gap-10 items-center justify-center max-w-[1248px]">
        <HighlightedHeading
          text={t('page_title')}
          className="font-heading text-heading text-center mb-12"
        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-10 text-gray-700 leading-relaxed text-body">
          
          {/* Within 10 Days Section */}
          <div id="within-ten-days">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('within_ten_days.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('within_ten_days.eligibility')}</li>
              <li>{t('within_ten_days.how_to_cancel')}</li>
              <li>{t('within_ten_days.coverage_termination')}</li>
              <li>{t('within_ten_days.refund_entitlement')}</li>
            </ol>
          </div>

          {/* After 10 Days Section */}
          <div id="after-ten-days">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('after_ten_days.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('after_ten_days.no_refund')}</li>
              <li>{t('after_ten_days.cancellation_allowed')}</li>
              <li>{t('after_ten_days.coverage_end')}</li>
            </ol>
          </div>

          {/* Refund Methods Section */}
          <div id="refund-methods">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('refund_methods.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('refund_methods.processing_time')}</li>
              <li>{t('refund_methods.original_method')}</li>
              <li>{t('refund_methods.alternative_arrangement')}</li>
            </ol>
          </div>

          <div className="pt-8">
            <CTA {...ctas.secure} />
          </div>
        </div>
      </section>
    </div>
  );
}
