import React from 'react';
import { BaseNewsBlogCard } from '@/styles/newsblogscard';

// --- Definition Types ---
export interface NewsBlogCardProps extends React.HTMLAttributes<HTMLElement> {
  thumbnail?: string;
  category?: string;
  date?: string;
  readTime?: number;
  title: string;
  description?: string;
  url?: string;
}

// --- Component ---
export const NewsBlogsCard: React.FC<NewsBlogCardProps> = ({
  thumbnail,
  category,
  date,
  readTime,
  title,
  description,
  url,
  className,
  ...props
}) => {
  return (
    <BaseNewsBlogCard
      thumbnail={thumbnail}
      category={category}
      date={date}
      readTime={readTime}
      title={title}
      description={description}
      url={url}
      className={className}
      {...props}
    />
  );
};

export default NewsBlogsCard;
