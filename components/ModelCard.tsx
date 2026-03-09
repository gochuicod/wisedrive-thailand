'use client';

import React from "react";
import { BaseModelCard } from "@/styles/modelcard";

export interface ModelCardProps {
  title: string;
  subtitle: string;
  image: string;
  content: string;
  className?: string;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  title,
  subtitle,
  image,
  className,
  content
}) => {
  return (
    <BaseModelCard
      title={title}
      subtitle={subtitle}
      imageSrc={image}
      className={className}
      content={content}
    />
  );
};