import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WiseDrive - Enterprise Solutions',
  description: 'Eliminate uncertainty in asset valuation. Secure your portfolio with real-time AI inspections, ECU data analysis, and seamless enterprise workflow integration.',
  openGraph: {
    title: 'WiseDrive - Enterprise Solutions',
    description: 'Eliminate uncertainty in asset valuation. Secure your portfolio with real-time AI inspections, ECU data analysis, and seamless enterprise workflow integration.',
    url: 'https://wisedrive.my/enterprise-solutions',
    siteName: 'WiseDrive',
    images: [
      {
        url: '/opengraph/b2b-opengraph.png',
        width: 1200,
        height: 630,
        alt: 'WiseDrive - Enterprise Solutions',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WiseDrive - Enterprise Solutions',
    description: 'Eliminate uncertainty in asset valuation. Secure your portfolio with real-time AI inspections, ECU data analysis, and seamless enterprise workflow integration.',
    images: ['/twitter-card/b2b-twitter-card.png'],
  },
};

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
