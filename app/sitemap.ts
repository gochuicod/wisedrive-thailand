import { MetadataRoute } from 'next';

const baseUrl = 'https://wisedrive.my';
const locales = ['en', 'in'];

const routes = [
  '',
  '/enterprise-solutions',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cancellation-and-refund-policy',
  '/inspection-terms-and-conditions',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
