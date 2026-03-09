import React from "react";
import Image from "next/image";

interface BaseModelCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  content: string;
  className?: string;
}

export const BaseModelCard: React.FC<BaseModelCardProps> = ({
  title,
  subtitle,
  imageSrc,
  content,
  className = "",
}) => {
  return (
    <div
      className={`
        w-full md:max-w-[398px] min-h-[370px]
        p-4 gap-4
        
        flex flex-col items-center

        bg-gradient-to-r from-[#FFFFFF] to-[rgba(228,247,255,0.6)]
        shadow-[inset_0px_0px_20px_rgba(106,200,255,0.2)]
        rounded-2xl
        
        ${className}
      `}
    >
      {/* --- Image Section --- */}
      <div className="relative w-full aspect-[358/180] shrink-0 rounded-3xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* --- Content Section --- */}
      <div className="flex flex-col items-center max-w-[400px] gap-1 grow">
        
        {/* Text Group */}
        <div className="flex flex-col items-center gap-6 grow">
          <div className="flex flex-col items-center gap-2 w-full">
            {/* Title */}
            <p className="text-body-lg font-bold text-center">
              {title}
            </p>
            
            {/* Subtitle */}
            <p className="text-body-sm text-center" dangerouslySetInnerHTML={{ __html: subtitle }} />

            {/* Content */}
            <p className="text-body-sm text-center">
              {content}
            </p>
          </div>


          
        </div>
      </div>
    </div>
  );
};