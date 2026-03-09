import React from "react";
import { BaseInfrastructureCard } from "@/styles/infrastructurecard";

export interface InfrastructureCardProps {
  title: string;
  tag?: string;
  description: string;
  image: string;
  className?: string;
}

export const InfrastructureCard: React.FC<InfrastructureCardProps> = ({
  title,
  tag = "THE WISEDRIVE ADVANTAGE",
  description,
  image,
  className,
}) => {
  return (
    <BaseInfrastructureCard
      title={title}
      tag={tag}
      description={description}
      imageSrc={image}
      className={className}
    />
  );
};