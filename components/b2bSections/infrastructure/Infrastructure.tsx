"use client";

import { useState, useEffect, useMemo } from "react";
import { Coins, Aperture, Workflow, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { HighlightedHeading } from "@/components/HighlightedHeading";
import { AppButton } from "@/components/AppButton";
import { InfrastructureCard } from "@/components/InfrastructureCard";
import { Parallax } from "@/components/Parallax";

// Transform infrastructure cards data from i18n
const transformCardsData = (cards: Record<string, { title: string; tag: string; description: string; image: string }>) => {
  return Object.entries(cards).map(([key, card]) => ({
    title: card.title,
    tag: card.tag,
    description: card.description,
    image: card.image,
  }));
};

// Transform button labels from i18n
const transformButtonLabels = (labels: Record<string, string>) => {
  return Object.entries(labels).map(([key, label]) => label);
};

// Get icon for button based on index
const getButtonIcon = (index: number) => {
  const icons = [
    <Coins size={20} key="coins" />,
    <Aperture size={20} key="aperture" />,
    <Workflow size={20} key="workflow" />,
    <Store size={20} key="store" />,
  ];
  return icons[index] || icons[0];
};

export const Infrastructure = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get data from translations
  const infrastructureData = useMemo(() => {
    const rawData = t.raw("Infrastructure");
    return rawData;
  }, [t]);

  const cards = useMemo(() => transformCardsData(infrastructureData.cards), [infrastructureData]);

  const buttons = useMemo(() => {
    const labels = transformButtonLabels(infrastructureData.button_labels);
    return labels.map((label, index) => ({
      label: label,
      icon: getButtonIcon(index),
    }));
  }, [infrastructureData]);
  
  return (
    <Parallax speed={0.04}>
      <section
        className="w-full flex md:px-relaxed md:py-relaxed py-relaxed px-tight mx-auto items-center justify-center overflow-hidden"
        id="audience"
      >
        {/* Outer container */}
        <div className="w-full max-w-[1248px] flex flex-col items-center gap-12">
          {/* Header Section */}
          <div className="w-full md:max-w-[686px] lg:md:max-w-[1248px] flex flex-col gap-8 items-center justify-center">
            <div className="flex-1 flex flex-col items-center gap-2">
              <HighlightedHeading
                text={infrastructureData.heading}
                className="font-heading text-center"
              />
              <p className="font-poppins text-[16px] text-[#1E2939] leading-[19px] text-center">
                {infrastructureData.description}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-row gap-2 md:gap-4 flex-wrap justify-center items-center max-w-[1000px]">
              {buttons.map((button, index) => (
                <AppButton
                  key={index}
                  variant={activeTab === index ? "default" : "tertiary"}
                  size={isMobile ? "sm" : "lg"}
                  onClick={() => setActiveTab(index)}
                  leftIcon={button.icon}
                >
                  {button.label}
                </AppButton>
              ))}
            </div>
          </div>

          {/* Content Section - The Card */}
          <div className="w-full max-w-[1248px] flex justify-center mt-4">
            <InfrastructureCard
              title={cards[activeTab].title}
              tag={cards[activeTab].tag}
              description={cards[activeTab].description}
              image={cards[activeTab].image}
            />
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default Infrastructure;
