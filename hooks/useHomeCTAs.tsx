'use client';

import { useTranslations } from 'next-intl';
import {
  Calendar,
  MessageSquareMore,
  SquareArrowOutUpRight,
} from 'lucide-react';
import { HOME_CTA_CONFIG } from '@/constants';

export const useHomeCTAs = () => {
  const t = useTranslations('CTAs');

  return {
    confidence: {
      ...HOME_CTA_CONFIG.confidence,
      heading: t('confidence.heading'),
      highlighted: t('confidence.highlighted'),
      subheading: t('confidence.subheading'),
      button1Text: t('confidence.btn1'),
      button1Icon: <Calendar className="size-6" />,
      button1Href: 'https://wisedrive.com/#services',
      button2Text: t('confidence.btn2'),
      button2Icon: <MessageSquareMore className="size-6" />,
      button2Href: 'https://wa.me/60126152559',
    },
    consultation: {
      ...HOME_CTA_CONFIG.consultation,
      heading: t('consultation.heading'),
      highlighted: t('consultation.highlighted'),
      subheading: t('consultation.subheading'),
      button1Text: t('consultation.btn1'),
      button1Icon: <MessageSquareMore className="size-6" />,
      button1Href: 'https://wa.me/60126152559',
    },
    secure: {
      ...HOME_CTA_CONFIG.secure,
      heading: t('secure.heading'),
      highlighted: t('secure.highlighted'),
      subheading: t('secure.subheading'),
      button1Text: t('secure.btn1'),
      button1Icon: <SquareArrowOutUpRight className="size-6" />,
    },
  };
};
