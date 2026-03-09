import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Oswald, Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import '@/app/globals.css';

import Navbar from '@/components/b2cSections/Navbar';
import Footer from '@/components/b2cSections/Footer';
import { StickyBannerWrapper } from '@/components/StickyBannerWrapper';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';


const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WiseDrive - AI-Powered Car Inspections',
  description: 'Avoid hidden repair costs. Get a professional AI engine health check and extended warranty to protect your investment. Buy with data, not just a gut feeling.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'WiseDrive - AI-Powered Car Inspections',
    description: 'Avoid hidden repair costs. Get a professional AI engine health check and extended warranty to protect your investment. Buy with data, not just a gut feeling.',
    url: 'https://wisedrive.my',
    siteName: 'WiseDrive',
    images: [
      {
        url: '/opengraph/b2c-opengraph.png',
        width: 1200,
        height: 630,
        alt: 'WiseDrive - AI-Powered Car Inspections',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WiseDrive - AI-Powered Car Inspections',
    description: 'Avoid hidden repair costs. Get a professional AI engine health check and extended warranty to protect your investment. Buy with data, not just a gut feeling.',
    images: ['/twitter-card/b2c-twitter-card.png'],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${oswald.variable} ${poppins.variable} font-body flex min-h-screen flex-col`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <SpeedInsights />
          <Analytics />
          <StickyBannerWrapper />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
