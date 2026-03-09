

'use client';

import CTA from '@/components/CTA';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import { useHomeCTAs } from '@/hooks/useHomeCTAs';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const ctas = useHomeCTAs();
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="py-16 px-4 md:px-8 lg:px-16 mx-auto gap-10 items-center justify-center max-w-[1248px]">
        <HighlightedHeading
          text={t('page_title')}
          className="font-heading text-heading text-center mb-12"
        />

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-10 text-gray-700 leading-relaxed text-body">
          
          {/* What We Do With Your Information */}
          <div id="what-we-do">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('what_we_do.section_title')}</h3>
            <p className="text-body">{t('what_we_do.content')}</p>
          </div>

          {/* Consent */}
          <div id="consent">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('consent.section_title')}</h3>
            <p className="text-body">{t('consent.how_consent')}</p>
          </div>

          {/* Disclosure */}
          <div id="disclosure">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('disclosure.section_title')}</h3>
            <p className="text-body">{t('disclosure.content')}</p>
          </div>

          {/* Payment */}
          <div id="payment">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('payment.section_title')}</h3>
            <p className="text-body">{t('payment.content')}</p>
          </div>

          {/* Third Party Services */}
          <div id="third-party">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('third_party.section_title')}</h3>
            <p className="text-body">{t('third_party.content')}</p>
          </div>

          {/* Security */}
          <div id="security">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('security.section_title')}</h3>
            <p className="text-body">{t('security.content')}</p>
          </div>

          {/* Cookies */}
          <div id="cookies">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('cookies.section_title')}</h3>
            <p className="text-body">{t('cookies.content')}</p>
          </div>

          {/* Age of Consent */}
          <div id="age-consent">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('age_consent.section_title')}</h3>
            <p className="text-body">{t('age_consent.content')}</p>
          </div>

          {/* Changes to Privacy Policy */}
          <div id="changes">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('changes.section_title')}</h3>
            <p className="text-body">{t('changes.content')}</p>
          </div>

          {/* Contact Information */}
          <div id="contact">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-heading">{t('contact.section_title')}</h3>
            <p className="text-body">{t('contact.content')}</p>
          </div>

          <div className="pt-8">
            <CTA {...ctas.secure} />
          </div>
        </div>
      </section>
    </div>
  );
}
