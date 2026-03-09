import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['th', 'en', 'my'],

  // Used when no locale matches
  defaultLocale: 'th',

  // Disable automatic locale detection from Accept-Language header
  localeDetection: false,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will preserve the locale automatically
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
