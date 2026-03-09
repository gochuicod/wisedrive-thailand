'use client';

import { PopUp } from '@/components/PopUp';

interface FixedPopUpProps {
  onClose?: () => void;
  onCtaClick?: () => void;
  imageSrc?: string;
}

export function FixedPopUp({
  onClose,
  onCtaClick,
  imageSrc,
}: FixedPopUpProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <PopUp
        onClose={onClose}
        onCtaClick={onCtaClick}
        imageSrc={imageSrc}
      />
    </div>
  );
}
