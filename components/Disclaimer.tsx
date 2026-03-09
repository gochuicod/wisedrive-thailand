import React from "react";
import { CircleAlert } from "lucide-react";

export interface DisclaimerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 px-2 py-2 w-fit h-fit bg-[#0D2059] border border-dashed border-[#D3DCF8] rounded-lg ${className || ""}`}
      {...props}
    >
      {/* Icon */}
      <CircleAlert className="w-4 h-4 flex-shrink-0 text-[#D3DCF8]" />

      {/* Text */}
      <p className="font-normal text-xs text-primary-100">
        {children || "Steps process may change for enterprise plans"}
      </p>
    </div>
  );
};

export default Disclaimer;
