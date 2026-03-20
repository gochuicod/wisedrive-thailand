import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Prevent browsers from serving stale HTML after a deploy.
        // Static assets (_next/static) are excluded — they use content-hashed
        // filenames and are safe to cache indefinitely.
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
