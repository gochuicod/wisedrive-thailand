'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Icons & UI
import { AppButton } from '@/components/AppButton';
import { DropdownButton } from '@/components/DropdownButton';
import { CircleCheck, HeartHandshake, Calendar } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

// Hooks
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { NAV_LINKS, ENTERPRISE_LINKS } from '@/constants';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  // FIX: Handle hash safely and subscribe to changes
  const [hash, setHash] = useState('');

  useEffect(() => {
    // 1. Define the update function
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    // 2. Set initial hash (wrapped in setTimeout to avoid "synchronous" linter error)
    // This moves the update to the end of the event loop, preventing the cascade warning.
    const timeoutId = setTimeout(() => {
      handleHashChange();
    }, 0);

    // 3. Listen for hash changes (e.g., user clicks a link)
    window.addEventListener('hashchange', handleHashChange);

    // 4. Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]); // Re-run if the page path changes

  // Check if we are on the enterprise page
  const isEnterprisePage = pathname?.includes('/enterprise-solutions');

  // --- 2. SELECT WHICH LINKS TO RENDER ---
  const currentLinks = isEnterprisePage ? ENTERPRISE_LINKS : NAV_LINKS;

  // Language Setup
  const localeLabels: Record<string, string> = {
    en: 'EN',
    my: 'BM',
  };

  const languageItems = [
    {
      label: 'English',
      onClick: () => router.replace(pathname, { locale: 'en' }),
    },
    {
      label: 'Bahasa Melayu',
      onClick: () => router.replace(pathname, { locale: 'my' }),
    },
  ];

  return (
    <nav
      className={cn(
        'px-tight py-navbar',
        'flex flex-row',
        'justify-between items-center',
        'sticky top-0 z-50',
        'bg-white',
      )}
    >
      {/* 1. LOGO (Always Visible - Always goes to Home) */}
      <Link
        href="/"
        onClick={(e) => scrollTo(e, '/')}
        className="relative block w-32 lg:w-40 shrink-0"
      >
        <Image
          src="/wd_logo.webp"
          alt="Wisedrive"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
      </Link>

      {/* 2. DESKTOP MENU */}
      <div
        className={cn('hidden', 'lg:flex flex-row', 'items-center', 'gap-8')}
      >
        {/* Dynamic Mapping based on currentLinks */}
        {currentLinks.map((link) => {
          // Logic: Check if it's the active path
          const isActive =
            pathname === link.href || pathname + hash === link.href;

          // Logic: Is this a "Section" link (contains #)?
          const isHashLink = link.href.includes('#');

          // RESULT: Only bold if it is Active AND NOT a hash link
          const isBold = isActive && !isHashLink;

          return (
            <Link
              key={link.key}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href, () => setIsOpen(false))}
              className={`text-h6 transition-colors duration-200 ${
                isBold ? 'font-semibold text-primary-600' : 'hover:text-primary-600'
              }`}
            >
              {t(link.label)}
            </Link>
          );
        })}

        <div className="flex flex-row gap-4">
          <AppButton
            href="https://wisedrive.com/#services"
            variant="default"
            size="sm"
            leftIcon={
              !isEnterprisePage ? (
                <CircleCheck className="size-4" />
              ) : (
                <Calendar className="size-4" />
              )
            }
          >
            {t('inspect_with_confidence_button')}
          </AppButton>
          {!isEnterprisePage && (
            <AppButton
              href="/enterprise-solutions"
              variant="tertiary"
              size="sm"
              leftIcon={<HeartHandshake className="size-4" />}
            >
              {t('partner_with_us_button')}
            </AppButton>
          )}
          <DropdownButton
            variant="tertiary"
            size="sm"
            items={languageItems}
            menuAlign="right"
          >
            {localeLabels[locale] || 'EN'}
          </DropdownButton>
        </div>
      </div>

      {/* 3. MOBILE MENU */}
      <div className="flex lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <SheetTrigger asChild>
            <button className="p-2 text-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#193CB8"
                className="md:size-6 size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className={cn(
              'sm:w-[350px] w-[300px]',
              'max-h-[360px]',
              'mt-4 me-4',
              'rounded-3xl shadow-lg',
            )}
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Mobile navigation links
            </SheetDescription>

            <div className={cn('flex flex-col', 'gap-3 mt-10', 'text-start')}>
              {/* Dynamic Mapping based on currentLinks */}
              {currentLinks.map((link) => {
                const isActive = pathname === link.href;
                const isHashLink = link.href.includes('#');

                // Only bold if active AND not a hash link
                const isBold = isActive && !isHashLink;

                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-h6 transition-colors duration-200 ${
                      isBold ? 'font-bold text-[#003CC5] underline underline-offset-4 decoration-4' : 'font-normal hover:text-[#003CC5] hover:underline hover:underline-offset-4 hover:decoration-4'
                    }`}
                  >
                    {t(link.label)}
                  </Link>
                );
              })}

              <AppButton
                href="https://wisedrive.com/#services"
                variant="default"
                size="sm"
                leftIcon={<CircleCheck className="size-4" />}
                className="w-full"
              >
                {t('inspect_with_confidence_button')}
              </AppButton>
              <AppButton
                href="/enterprise-solutions"
                onClick={(e) => scrollTo(e, '/enterprise-solutions', () => setIsOpen(false))}
                variant="tertiary"
                size="sm"
                leftIcon={<HeartHandshake className="size-4" />}
                className="w-full"
              >
                {t('partner_with_us_button')}
              </AppButton>

              <DropdownButton
                variant="tertiary"
                size="sm"
                items={languageItems}
                menuAlign="right"
                className="w-fit self-end"
              >
                {localeLabels[locale] || 'EN'}
              </DropdownButton>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
