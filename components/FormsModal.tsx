import React from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { HighlightedHeading } from './HighlightedHeading';

type FormsModalType = 'success' | 'error';

interface FormsModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: FormsModalType;
}

const modalContent: Record<FormsModalType, { title: string; message: string }> = {
  success: {
    title: 'Message Sent Successfully',
    message: "We've received your inquiry. A Wisedrive representative will be in touch shortly to schedule your consultation.",
  },
  error: {
    title: 'Something Went Wrong',
    message: 'We encountered an error processing your request. Please try again later or contact support.',
  },
};

const iconMap: Record<FormsModalType, React.ReactNode> = {
  success: <CheckCircle2 className="w-9 h-9 text-[#00A63E]" strokeWidth={1.5} />,
  error: <AlertCircle className="w-9 h-9 text-[#E53E3E]" strokeWidth={1.5} />,
};

export const FormsModal: React.FC<FormsModalProps> = ({
  isOpen,
  onClose,
  type = 'success',
}) => {
  if (!isOpen) return null;

  const { title, message } = modalContent[type];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center py-20 bg-[#0D2059]/50 z-50">
      {/* Modal Container */}
      <div className="relative flex flex-col items-center lg:-right-72 lg:-bottom-0 md:-bottom-64 -bottom-40 p-4 w-80 bg-white rounded-3xl shadow-[0px_4px_25px_rgba(44,87,241,0.3)] max-w-[320px] max-h-[180px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-[#717680]" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center py-2 gap-4 w-full">
          {/* Icon */}
          <div className="flex items-center justify-center w-9 h-9">
            {iconMap[type]}
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Title */}
            <HighlightedHeading
              text={title}
              className="font-heading text-xl w-full text-center leading-6"
            />

            {/* Supporting Text */}
            <p className="w-full text-center font-body font-normal text-caption leading-4 text-[#364153]">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
