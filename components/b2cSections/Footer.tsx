'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FOOTER_LINKS } from '@/constants';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const pathname = usePathname();
  const isEnterprisePage = pathname?.includes('/enterprise-solutions');
  const locale = useLocale();
  const scrollTo = useSmoothScroll();

  const withLocale = (href: string) => `/${locale}${href}`;
  const resolveHref = (href: string) =>
    href.startsWith('#') ? href : `/${locale}${href}`;

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#122D7B] to-[#171F51]',
        !isEnterprisePage ? 'min-h-[419px]' : 'min-h-[263px]',
        'px-relaxed',
        'py-footer',
      )}
    >
      <div className={cn('flex flex-col', 'justify-end items-center', 'gap-8')}>
        {/* Top section */}
        <div
          className={cn(
            'flex lg:flex-row flex-col',
            'lg:justify-between items-center',
            'w-full',
          )}
        >
          {/* White logo on left side */}
          <Image
            src="/wd_logo_white.webp"
            alt="Wisedrive logo white"
            width={200}
            height={60}
          />
          {/* Socials and address on right side */}
          <div
            className={cn(
              'flex ',
              !isEnterprisePage
                ? 'lg:flex-row flex-col justify-end items-center'
                : 'flex-col justify-end lg:items-end items-center',
              'lg:gap-8',
              'lg:mt-0 mt-4',
            )}
          >
            {/* Socials */}
            <div className={cn('flex flex-row', 'gap-4')}>
              {/* Instagram */}
              {/* <span className="opacity-80">
                <Image
                  src="/icons/componentIcons/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </span> */}
              {/* Facebook */}
              {/* <span className="opacity-80">
                <Image
                  src="/icons/componentIcons/fb.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </span> */}
              {/* Tiktok */}
              {/* <span className="opacity-80">
                <Image
                  src="/icons/componentIcons/tiktok.svg"
                  alt="Tiktok"
                  width={24}
                  height={24}
                />
              </span> */}
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/wisedrive" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/icons/componentIcons/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/66645893636" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src="/icons/componentIcons/whatsapp.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                />
              </a>
            </div>
            {/* Address */}
            <span
              className={cn(
                'lg:w-[45%] md:w-[70%] w-full',
                'text-wdBlue',
                'font-normal',
                'font-gilroy',
                'text-lg',
                'lg:mt-0 mt-4',
                !isEnterprisePage
                  ? 'lg:text-start md:text-center text-start'
                  : 'lg:text-end text-center',
              )}
            >
              {t('address')}
            </span>
          </div>
        </div>
        {/* Middle section */}
        {!isEnterprisePage && (
          <div
            className={cn(
              'flex',
              'md:flex-row flex-col',
              'gap-8',
              'justify-between items-start',
              'font-body',
              'w-full',
            )}
          >
            {/* First Column */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div
                key={category}
                className={cn(
                  'flex flex-col',
                  'gap-2',
                  'lg:w-[288px] w-full',
                  'lg:min-h-[158px] min-h-[95px]',
                )}
              >
                {/* Category Title (e.g., Products) */}
                <h4
                  className={cn(
                    'text-wdOrange',
                    'text-xl',
                    'font-bold',
                    'tracking-tight',
                  )}
                >
                  {t(category)}
                </h4>

                {/* List of Links */}
                <ul className={cn('flex flex-col', 'gap-2')}>
                  {links.map((link) => {
                    const isExternal = link.href.startsWith('http');
                    return (
                      <li key={link.key}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'text-wdBlue',
                              'text-sm',
                              'hover:text-white',
                              'transition-colors',
                              'cursor-pointer',
                              'font-normal',
                            )}
                          >
                            {/* Use the key from constants to look up the translation */}
                            {t(link.key)}
                          </a>
                        ) : (
                          <Link
                            href={resolveHref(link.href)}
                            onClick={(e) => scrollTo(e, resolveHref(link.href))}
                            className={cn(
                              'text-wdBlue',
                              'text-sm',
                              'hover:text-white',
                              'transition-colors',
                              'cursor-pointer',
                              'font-normal',
                            )}
                          >
                            {/* Use the key from constants to look up the translation */}
                            {t(link.key)}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
        {/* --- BOTTOM ROW: Copyright --- */}
        <div
          className={cn(
            'w-full',
            'pt-6',
            'flex',
            'justify-center',
            'mt-4',
            'border-t border-wd-blue',
          )}
        >
          <p
            className={cn(
              'text-sm',
              'text-white',
              'font-normal',
              'font-gilroy',
              'text-center',
            )}
          >
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </div>
  );
}
