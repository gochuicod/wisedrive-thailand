'use client';

import { AppButton } from '@/components/AppButton';
import { IconBox } from '@/components/IconBox';
import { Badge } from '@/components/Badge';
import { DropDown } from '@/components/DropDown';
import { HighlightedHeading } from '@/components/HighlightedHeading';
import { FunnelCard } from '@/components/FunnelCard';
import { GoogleRatingCard } from '@/components/GoogleRatingCard';
import { ReviewCard } from '@/components/ReviewCard';
import { StepCard } from '@/components/StepCard';
import { FeatureStat } from '@/components/FeatureStat';
import { ModelCard } from '@/components/ModelCard';
import { PopUp } from '@/components/PopUp';

import Image from 'next/image';

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M13.3333 13.3333H2.66667V2.66667H8V1.33333H2.66667C1.92667 1.33333 1.33333 1.93333 1.33333 2.66667V13.3333C1.33333 14.0667 1.92667 14.6667 2.66667 14.6667H13.3333C14.0667 14.6667 14.6667 14.0667 14.6667 13.3333V8H13.3333V13.3333ZM9.33333 1.33333V2.66667H12.3933L4.98 10.08L5.92 11.02L13.3333 3.60667V6.66667H14.6667V1.33333H9.33333Z" 
      fill="currentColor"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12H19" />
    <path d="M12 5L19 12L12 19" />
  </svg>
);

// --- Showcase Component ---

const ComponentShowcase = () => {
  return (
    <div className="py-10 px-10 font-sans min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-16 text-gray-800 uppercase tracking-widest">
        Component Showcase
      </h1>

      {/* =========================================
          SECTION 1: BUTTONS
      ========================================= */}

      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-700 border-b pb-2">
          Buttons: All Variants
        </h2>

        {/* Default Variant */}
        <div className="mb-8 p-6 rounded-lg bg-gray-300">
          <h3 className="text-lg font-semibold text-white mb-4">Glass</h3>
          <div className="flex flex-row gap-6 items-center flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="default"
                size="lg"
                rightIcon={<ArrowRightIcon />}
              >
                Default (LG)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">LG</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="default"
                size="md"
                rightIcon={<ArrowRightIcon />}
              >
                Default (MD)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">MD</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="default"
                size="sm"
                rightIcon={<ArrowRightIcon />}
              >
                Default (SM)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">SM</span>
            </div>
          </div>
        </div>

        {/* Glass Variant */}
        <div className="mb-8 p-6 rounded-lg bg-[linear-gradient(132.85deg,#1e1e2e_0%,#4a4a6a_100%)]">
          <h3 className="text-lg font-semibold text-white mb-4">Glass</h3>
          <div className="flex flex-row gap-6 items-center flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="glass"
                size="lg"
                rightIcon={<ArrowRightIcon />}
              >
                Glass (LG)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">LG</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="glass"
                size="md"
                rightIcon={<ArrowRightIcon />}
              >
                Glass (MD)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">MD</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="glass"
                size="sm"
                rightIcon={<ArrowRightIcon />}
              >
                Glass (SM)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">SM</span>
            </div>
          </div>
        </div>

        {/* Secondary Variant */}
        <div className="mb-8 p-6 rounded-lg bg-[linear-gradient(132.85deg,#2BA3FF_0%,#374EFF_99.57%)]">
          <h3 className="text-lg font-semibold text-white mb-4">
            Secondary (Outlined)
          </h3>
          <div className="flex flex-row gap-6 items-center flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRightIcon />}
              >
                Secondary (LG)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">LG</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="secondary"
                size="md"
                rightIcon={<ArrowRightIcon />}
              >
                Secondary (MD)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">MD</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <AppButton
                variant="secondary"
                size="sm"
                rightIcon={<ArrowRightIcon />}
              >
                Secondary (SM)
              </AppButton>
              <span className="text-xs text-gray-300 font-mono">SM</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 2: FEATURE ICON BOXES
      ========================================= */}

      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">
          Feature Icon Boxes
        </h2>

        {/* Grid to show them side-by-side */}
        <div className="flex flex-wrap items-start justify-center gap-12 bg-gray-50 p-10 rounded-lg border border-dashed border-gray-300">
          {/* 1. Large Variation */}
          <div className="flex flex-col items-center gap-4">
            <IconBox
              title="Verified Cars"
              description="Every car undergoes a strict 200-point inspection process."
              icon={
                <Image
                  src="/icons/iconBox/audit.svg"
                  alt="Audit"
                  width={96}
                  height={96}
                />
              }
            />
            <span className="text-xs text-blue-500 font-mono mt-4">
              Size: LG (288px)
            </span>
          </div>

          {/* 2. Medium Variation */}
          <div className="flex flex-col items-center gap-4">
            <IconBox
              title="Secure"
              description="Transactions are fully insured and protected."
              icon={
                <Image
                  src="/icons/iconBox/fraud.svg"
                  alt="Fraud Protection"
                  width={96}
                  height={96}
                />
              }
            />
            <span className="text-xs text-blue-500 font-mono mt-4">
              Size: MD (162px)
            </span>
          </div>

          {/* 3. Small Variation */}
          <div className="flex flex-col items-center gap-4 ">
            <IconBox
              title="Fast"
              description="Quick processing and instant approval."
              icon={
                <Image
                  src="/icons/iconBox/clock.svg"
                  alt="Fast Processing"
                  width={96}
                  height={96}
                />
              }
            />
            <span className="text-xs text-blue-500 font-mono mt-4">
              Size: SM (162px)
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 3: BADGES (Text Tags)
      ========================================= */}

      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-700 border-b pb-2">
          Badges / Text Tags
        </h2>
        <div className="flex flex-col gap-8 items-start">
          {/* Large */}
          <div className="flex flex-col gap-2">
            <Badge size="lg">Our Brands</Badge>
            <span className="text-xs text-gray-400 font-mono">
              Size: LG | 20px | Tracking 4px
            </span>
          </div>

          {/* Medium */}
          <div className="flex flex-col gap-2">
            <Badge size="md">Our Brands</Badge>
            <span className="text-xs text-gray-400 font-mono">
              Size: MD | 16px | Tracking 2px
            </span>
          </div>

          {/* Small */}
          <div className="flex flex-col gap-2">
            <Badge size="sm">Our Brands</Badge>
            <span className="text-xs text-gray-400 font-mono">
              Size: SM | 16px | Tracking Normal
            </span>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 4: DROPDOWNS
      ========================================= */}

      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">
          DropDowns (Accordions)
        </h2>

        <div className="flex flex-col gap-8 w-full">
          {/* 1. Large Variation (501px) */}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs text-gray-400 font-mono mb-2">
              Size: LG (501px)
            </span>
            <div className="w-full max-w-[501px]">
              <DropDown
                size="lg"
                title="What is the inspection process?"
              >
                Our engineers conduct a comprehensive 200-point inspection
                covering the engine, suspension, interior, and exterior to ensure
                the car is in perfect condition before listing.
              </DropDown>
            </div>
          </div>

          {/* 2. Medium Variation (358px) */}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs text-gray-400 font-mono mb-2">
              Size: MD (358px)
            </span>
            <div className="w-full max-w-[358px]">
              <DropDown size="md" title="Is there a warranty?">
                Yes, all our cars come with a standard 6-month warranty that
                covers major mechanical and electrical components, ensuring you
                have peace of mind with your purchase.
              </DropDown>
            </div>
          </div>

          {/* 3. Small Variation (358px) */}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs text-gray-400 font-mono mb-2">
              Size: SM (358px)
            </span>
            <div className="w-full max-w-[358px]">
              <DropDown size="sm" title="How does financing work?">
                We partner with multiple banks to provide you with the best
                interest rates. The process is paperless and approvals are
                typically received within 24 hours.
              </DropDown>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6 text-gray-700 border-b pb-2">
          Badges / Text Tags
        </h2>
        <div className="flex flex-col gap-8 items-start">
          <HighlightedHeading
            text='Where Human Expertise Meets AI technology'
            highlight='AI technology'
            align='center'
          />
        </div>
      </div>

{/* =========================================
          SECTION 5: FUNNEL CARDS
      ========================================= */}
      
      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">Funnel Cards (CTA)</h2>
        
        <div className="flex flex-col md:flex-col lg:flex-row w-full gap-8 mx-auto">
          {/* Card 1: Dealership */}
          <div className="w-full md:w-full lg:w-4/5">
            <FunnelCard 
              title="Representing a Dealership or Bank? "
              backgroundImage="/cta/wd-cta-1-bg.webp"
            >
              <AppButton 
                onClick={() => alert('Clicked Dealership')}
                rightIcon={<ExternalLinkIcon className="text-white" />}
              >
                Join Partner Network
              </AppButton>
            </FunnelCard>
          </div>
          {/* Card 2: Individual */}
          <div className="w-full md:w-full lg:w-1/5">
            <FunnelCard 
              title="Representing a Dealership or Bank? "
              backgroundImage="/cta/wd-funnel-cta.webp"
            >
              <AppButton 
                onClick={() => alert('Clicked Individual')}
                rightIcon={<ExternalLinkIcon className="text-white" />}
              >
                Join Network
              </AppButton>
            </FunnelCard>
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 6: SOCIAL PROOF / RATING CARD
      ========================================= */}
      
      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">Google Rating Card</h2>
        
        <div className="flex justify-center">
          <GoogleRatingCard 
            rating="4.8"
            buttonLabel="See Reviews"
            // onButtonClick={() => alert('Opening Reviews...')}
          />
        </div>
      </div>

       {/* =========================================
          SECTION 7: REVIEW CARDS
      ========================================= */}
      
      <div className="mb-12 p-8 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">Review Cards</h2>
        
        <div className="flex flex-wrap items-start justify-center gap-8">
          
          {/* Variant 1 (Tall) */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-gray-400">Variant 1 (H: 354px)</span>
            <ReviewCard 
              variant="v1"
              reviewText="Perkhidmatan pemeriksaan Wisedrive benar-benar mengubah pengalaman saya! Saya melihat sebuah kereta terpakai yang kelihatan sempurna, tetapi pemeriksaan menyeluruh mereka mendedahkan beberapa masalah tersembunyi."
              reviewerName="Ali Z."
              reviewDate="August 28, 2025"
            />
          </div>

          {/* Variant 2 (Short) */}
          <div className="flex flex-col items-center gap-2">
             <span className="text-xs font-mono text-gray-400">Variant 2 (H: 314px)</span>
            <ReviewCard 
              variant="v2"
              reviewText="Proses yang sangat mudah dan pantas. Laporan yang diterima sangat teliti dan membantu saya membuat keputusan yang tepat."
              reviewerName="Sarah L."
              reviewDate="Sept 12, 2025"
            />
          </div>
        </div>
      </div>

      {/* =========================================
          SECTION 8: PROCESS STEPS (Dark Mode)
      ========================================= */}
      
      <div className="mb-12 p-8 bg-gray-900 rounded-xl shadow-sm border border-gray-800">
        <h2 className="text-xl font-bold mb-10 text-white border-b border-gray-700 pb-2">Process Step Cards</h2>
        
        <div className="flex flex-wrap items-start justify-center gap-12">
          
          {/* Step 1 */}
          <StepCard heading="01. DISCOVERY">
            <p>We analyze market trends and identify the best value vehicles currently available.</p>
          </StepCard>

          {/* Step 2 */}
          <StepCard heading="02. VETTING">
            <p>Our team verifies the service history and ensures the documentation is authentic.</p>
          </StepCard>

          {/* Step 3 (From your Figma Data) */}
          <StepCard heading="03. INSPECTION">
            <p>Physical checks + OBD-II/ECM/BCM scans + photo-AI exterior review.</p>
            <p>We call out critical faults, repair estimates, and fair price guidance.</p>
          </StepCard>

        </div>
      </div>

      {/* =========================================
          SECTION 9: FEATURE STAT (Glass Dial)
      ========================================= */}
      
      <div className="mb-12 p-8 bg-gray-100 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">Feature Stat Cards</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-12 bg-gray-50 p-10">
          
          {/* Card 1: Engine */}
          <FeatureStat 
            value="20x"
            label="more accurate engine analysis"
            image="/featurestat/image.png" // Replace with your actual asset
          />

          {/* Card 2: No Image (Gradient only) */}
          <FeatureStat 
            value="95%"
            label="reduction in human error"
            image='/featurestat/image.png'
          />

           {/* Card 3: Variant Data */}
           <FeatureStat 
            value="75%"
            label="faster reporting"
            image="/featurestat/image.png" 
          />

          {/* Card 4: Variant Data */}
           <FeatureStat 
            value="99%"
            label="diagnostic accuracy"
            image="/featurestat/image.png" 
          />

        </div>
      </div>

      <div className="mb-12 p-8 bg-gray-100 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">Feature Stat Cards</h2>
        <div className="flex flex-wrap items-center justify-center gap-12 bg-gray-50 p-10">
              <ModelCard 
                title="Volume License / Enterprise Subscription"
                subtitle="<strong>Best for:</strong> Banks, Insurers, OEMs, and Large Dealer Groups"
                image="/model_card/model-card-1.webp"
                content='test content'
              />
              <ModelCard 
                title="API & White Label Integration"
                subtitle="<strong>Best for:</strong> Superapps, Fintechs, and Major Marketplaces"
                image="/model_card/model-card-2.webp"
                content='test content'

              />
          </div>
      </div>

      {/* =========================================
          SECTION 10: POPUP BANNER
      ========================================= */}
      
      <div className="mb-12 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-10 text-gray-700 border-b pb-2">PopUp Banner</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-12 bg-gray-50 p-10 rounded-lg">
          {/* <PopUp 
            title="Premium Check"
            description="Get a detailed analysis of your vehicle with our advanced inspection system."
            features={[
              "Banks & Financiers",
              "Insurance Companies",
              "Dealership Networks & OEMs",
              "Marketplaces & Platforms"
            ]}
            ctaLabel="Partner With Us"
            onCtaClick={() => alert('PopUp CTA Clicked!')}
            imageSrc="/icons/componentIcons/car-check.svg"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;
