export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'home' },
  { href: '/#about', key: 'about', label: 'about' },
  { href: '/#features', key: 'features', label: 'features' },
  {
    href: '/#inspection_plan',
    key: 'inspection_plan',
    label: 'inspection_plan',
  },
  { href: '/#faqs', key: 'faqs', label: 'faqs' },
];

export const ENTERPRISE_LINKS = [
  {
    href: '/enterprise-solutions#tech-stack',
    key: 'tech_stack',
    label: 'our_tech_stack',
  },
  {
    href: '/enterprise-solutions#audience',
    key: 'audience',
    label: 'our_audience',
  },
  {
    href: '/enterprise-solutions#partnership-models',
    key: 'partnership_models',
    label: 'partnership_models',
  },
  {
    href: '/enterprise-solutions#contact-us',
    key: 'contact_us',
    label: 'contact_us',
  },
];

export const FOOTER_LINKS = {
  // products: [
  //   { href: '#inspections', key: 'car_inspections' },
  //   { href: '#luxury', key: 'luxury_inspection' },
  //   { href: '#service', key: 'car_service' },
  //   { href: '#repairs', key: 'car_repairs' },
  // ],
  company: [
    { href: '#about', key: 'about_us' },
    { href: '#our-brands', key: 'how_it_works' },
    { href: '/enterprise-solutions#contact-us', key: 'contact_us' },
  ],
  resources: [
    { href: 'https://www.wisedrive.com/sample-report?fbclid=IwY2xjawPEGNZleHRuA2FlbQIxMABicmlkETFoM3RnRGp3c0tzWERqVXBVc3J0YwZhcHBfaWQPNTE0NzcxNTY5MjI4MDYxAAEewlEBYRS0NjrvAJZGhiWSTLGjXQY__YcOtT-NjPWTZU8pNWRMiajXgA8Kajc_aem_rxCefHFkquLt4YG3NHvtNA', key: 'sample_report' },
    { href: '#faqs', key: 'faqs' },
    // { href: '#coverage', key: 'coverage_areas' },
    { href: '#reviews', key: 'customer_reviews' },
  ],
  policies: [
    { href: '/inspection-terms-and-conditions', key: 'inspection_terms' },
    { href: '/cancellation-and-refund-policy', key: 'refund_policy' },
    { href: '/terms-and-conditions', key: 'terms_conditions' },
    { href: '/privacy-policy', key: 'privacy_policy' },
  ],
};

export const SOCIALS = {
  instagram: 'https://instagram.com/wisedrive',
  linkedin: 'https://linkedin.com/company/wisedrive',
  twitter: 'https://twitter.com/wisedrive',
  whatsapp: 'https://wa.me/1234567890',
};

export const OUR_BRANDS_CARS = [
  {
    key: 'bmw',
    image: '/brands/bmw-new.webp',
  },
  {
    key: 'honda',
    image: '/brands/honda-new.webp',
  },
  {
    key: 'mazda',
    image: '/brands/mazda-new.webp',
  },
  {
    key: 'mercedez',
    image: '/brands/mercedez-new.webp',
  },
  {
    key: 'nissan',
    image: '/brands/nissan-new.webp',
  },
  {
    key: 'perodua',
    image: '/brands/perodua-new.webp',
  },
  {
    key: 'proton',
    image: '/brands/proton-new.webp',
  },
  {
    key: 'toyota',
    image: '/brands/toyota-new.webp',
  },
];

export const HOME_CTA_CONFIG = {
  confidence: {
    buttons: true,
    button1Href: '/enterprise-solutions',
    button1Variant: 'default',
    button2Href: '/enterprise-solutions',
    button2Variant: 'glass',
  },
  consultation: {
    buttons: false,
    button1Href: '/enterprise-solutions',
    button1Variant: 'glass',
    button1Size: 'md',
  },
  secure: {
    buttons: false,
    button1Href: '/enterprise-solutions',
    button1Variant: 'glass',
    button1Size: 'md',
    button1IconPosition: 'right',
    invertedGradient: true,
  },
} as const;

export const getStickyBannerData = (t: any) => ({
  text: t('text'),
  ctaLabel: t('ctaLabel'),
  ctaLink: t('ctaLink'),
});

export const getModelsData = (t: any) => [
  {
    id: 1,
    title: t('cards.card_1.heading'),
    // Use t.raw() because your data contains HTML tags like <strong>
    subtitle: t.raw('cards.card_1.subheading'),
    image: '/model_card/model-card-1-new.webp',
    content: t('cards.card_1.description'),
  },
  {
    id: 2,
    title: t('cards.card_2.heading'),
    subtitle: t.raw('cards.card_2.subheading'),
    image: '/model_card/model-card-2-new.webp',
    content: t('cards.card_2.description'),
  },
];

export const getPopUpData = (t: any) => ({
  title: t('title'),
  description: t('description'),
  features: t.raw('features'),
  ctaLabel: t('ctaLabel'),
});

export const cards = [
  {
    title: 'Banks & Financiers',
    tag: 'THE WISEDRIVE ADVANTAGE',
    description:
      'Secure your Loan-to-Value (LTV) ratios with hard technical data. We verify the true mileage and mechanical condition of collateral before approval. By detecting potential mechanical failures early, we reduce the risk of assets becoming Non-Performing Loans (NPLs) due to sudden depreciation or abandonment by the borrower.',
    image: '/infrastructure/infrastructure1.webp',
  },
  {
    title: 'Insurance Companies',
    tag: 'THE WISEDRIVE ADVANTAGE',
    description:
      'Reduce claim fraud and optimize premium calculations with verified vehicle data. Our technology detects odometer tampering and hidden mechanical issues before claims are filed, protecting your bottom line.',
    image: '/infrastructure/infrastructure2.webp',
  },
  {
    title: 'Dealership Networks & OEMs',
    tag: 'THE WISEDRIVE ADVANTAGE',
    description:
      'Enhance used vehicle inventory management and warranty claims processing. Verify true vehicle condition and maintenance history to improve customer satisfaction and reduce warranty costs.',
    image: '/infrastructure/infrastructure3.webp',
  },
  {
    title: 'Marketplaces & Platforms',
    tag: 'THE WISEDRIVE ADVANTAGE',
    description:
      'Build trust with buyers through transparent vehicle reports. Our technical data verification increases conversion rates and reduces post-purchase disputes on your platform.',
    image: '/infrastructure/infrastructure4.webp',
  },
];
