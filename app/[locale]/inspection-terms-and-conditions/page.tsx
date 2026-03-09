

'use client';

import CTA from '@/components/CTA';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import { useHomeCTAs } from '@/hooks/useHomeCTAs';
import { useTranslations } from 'next-intl';

export default function InspectionTermsAndConditions() {
  const ctas = useHomeCTAs();
  const t = useTranslations('InspectionTermsAndConditions');

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="py-16 px-4 md:px-8 lg:px-16 mx-auto gap-10 items-center justify-center max-w-[1248px]">
        <HighlightedHeading
          text={t('page_title')}
          className="font-heading text-heading text-center mb-12"
        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-10 text-gray-700 leading-relaxed text-body">
          
          {/* Section 1: Definitions */}
          <div id="definitions">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('definitions.section_title')}</h3>
            <ul className="space-y-3 text-body">
              <li><strong className="text-gray-900">{t('definitions.we_us')}:</strong> {t('definitions.we_us_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.agreement')}:</strong> {t('definitions.agreement_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.cancellation_fee')}:</strong> {t('definitions.cancellation_fee_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.customer_you')}:</strong> {t('definitions.customer_you_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.fee')}:</strong> {t('definitions.fee_desc')} <a href="https://www.wisedrive.com" className="text-blue-600 hover:underline">https://www.wisedrive.com</a>.</li>
              <li><strong className="text-gray-900">{t('definitions.inspection')}:</strong> {t('definitions.inspection_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.inspection_note')}:</strong> {t('definitions.inspection_note_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.inspector')}:</strong> {t('definitions.inspector_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.report')}:</strong> {t('definitions.report_desc')}</li>
              <li><strong className="text-gray-900">{t('definitions.report_checklist')}:</strong> {t('definitions.report_checklist_desc')} <a href="https://www.wisedrive.com" className="text-blue-600 hover:underline">https://www.wisedrive.com</a>.</li>
              <li><strong className="text-gray-900">{t('definitions.vehicle')}:</strong> {t('definitions.vehicle_desc')}</li>
            </ul>
          </div>

          {/* Section 2: General Scope */}
          <div id="general">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('general_scope.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('general_scope.point_1')}</li>
              <li>{t('general_scope.point_2')}</li>
              <li>{t('general_scope.point_3')}</li>
              <li>{t('general_scope.point_4')}</li>
            </ol>
          </div>

          {/* Section 3: Road Test */}
          <div id="road-test">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('road_test.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('road_test.point_1')}
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {t.raw('road_test.point_1_items').map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </li>
              <li>{t('road_test.point_2')}</li>
              <li>{t('road_test.point_3')}</li>
              <li>{t('road_test.point_4')}</li>
              <li>{t('road_test.point_5')}</li>
              <li>{t('road_test.point_6')}</li>
              <li>{t('road_test.point_7')}</li>
              <li>{t('road_test.point_8')}</li>
            </ol>
          </div>

          {/* Section 4: Payment and Cancellation */}
          <div id="payment">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('payment_cancellation.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('payment_cancellation.point_1')}</li>
              <li>{t('payment_cancellation.point_2')}
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {t.raw('payment_cancellation.point_2_items').map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </li>
              <li>{t('payment_cancellation.point_3')}</li>
              <li>{t('payment_cancellation.point_4')}</li>
              <li>{t('payment_cancellation.point_5').split('support.my@wisedrive.com').map((part, idx, arr) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && <a href="mailto:support.my@wisedrive.com" className="text-blue-600 hover:underline">support.my@wisedrive.com</a>}
                </span>
              ))}</li>
              <li>{t('payment_cancellation.point_6')}</li>
              <li>{t('payment_cancellation.point_7')}</li>
            </ol>
          </div>

          {/* Section 5: Complaints */}
          <div id="complaints">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('complaints.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('complaints.point_1').split('+60 122559610').map((part, idx, arr) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && <a href="tel:+60122559610" className="text-blue-600 hover:underline">+60 122559610</a>}
                </span>
              ))}</li>
              <li>{t('complaints.point_2')}</li>
              <li>{t('complaints.point_3')}</li>
            </ol>
          </div>

          {/* Section 6: Matters Beyond Our Reasonable Control */}
          <div id="liability">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('matters_beyond_control.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('matters_beyond_control.point_1')}</li>
              <li>{t('matters_beyond_control.point_2')}</li>
              <li>{t('matters_beyond_control.point_3')}</li>
              <li>{t('matters_beyond_control.point_4')}</li>
              <li>{t('matters_beyond_control.point_5')}</li>
              <li>{t('matters_beyond_control.point_6')}</li>
              <li>{t('matters_beyond_control.point_7')}</li>
            </ol>
          </div>

          {/* Section 7: Enforcement of Terms */}
          <div id="enforcement">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('enforcement.section_title')}</h3>
            <ol className="list-decimal ml-6 space-y-4 text-body">
              <li>{t('enforcement.point_1')}</li>
              <li>{t('enforcement.point_2')}</li>
            </ol>
          </div>

          {/* Section 8: Advice Regarding Report */}
          <div id="advice">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('advice.section_title')}</h3>
            <p className="text-body">
              {t('advice.content')}
            </p>
          </div>

          <div className="pt-8">
            <CTA {...ctas.secure} />
          </div>
        </div>
      </section>
    </div>
  );
}
