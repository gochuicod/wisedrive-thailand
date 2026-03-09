import React from "react";

// --- Styling Types ---
interface BaseFeatureStatProps extends React.HTMLAttributes<HTMLDivElement> {
  statValue: string;
  statLabel: string;
  backgroundImage?: string;
}

// --- Container ---
const containerBase = `
  relative
  flex flex-col items-center justify-end
  lg:w-[182px] lg:h-[440px] md:w-[162px] md:h-[340px] w-[171px] h-[300px]
  rounded-full
  overflow-hidden
  border border-[#8A38F5]/30
  box-border
  shadow-[inset_0px_0px_22px_#00005A,inset_0px_0px_20px_#00005A]
`;

// --- Image Layers ---
const imageLayer =
  "absolute inset-0 bg-cover bg-center bg-no-repeat z-0";

const imageTone = `
  absolute inset-0
  backdrop-brightness-[0.95]
  backdrop-contrast-[1.05]
  backdrop-saturate-[0.9]
  z-5
`;

const imageFade = `
  absolute inset-0
  bg-[linear-gradient(180deg,rgba(0,0,90,0)_0%,rgba(0,0,90,0.25)_50%,#0037B6_80%)]
  z-10
`;

const vignetteOverlay = `
  absolute inset-0
  rounded-full
  shadow-[inset_0px_0px_22px_#00005A,inset_0px_0px_20px_#00005A]

  z-15
  pointer-events-none
`;

// --- Dial ---
const dialWrapper =
  "absolute bottom-[12px] z-30 flex items-center justify-center lg:w-[162px] lg:h-[162px] md:w-[142px] md:h-[142px] w-[150px] h-[150px]";

// Radial glow instead of drop shadow
const dialGlow = `
  absolute inset-[-12px]
  rounded-full
  bg-[radial-gradient(circle,rgba(2,217,255,0.45)_0%,rgba(2,217,255,0.15)_45%,rgba(2,217,255,0)_70%)]
  blur-xl
  z-0
`;

// --- Glass Styles ---
const outerGlassStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  borderRadius: "50%",
  backdropFilter: "blur(14px)",
  border: "2px solid white",
  boxShadow: `
    inset 6px 6px 12px rgba(255,255,255,0.35),
    inset -6px -10px 20px rgba(0,40,120,0.6),
    inset 0 0 32px rgba(0,163,255,0.65),
    0 0 20px rgba(2,217,255,0.4)
  `,
};

const innerGlassStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.01)",
  borderRadius: "50%",
  backdropFilter: "blur(6px)", 
  boxShadow: `
    inset 0 1px 2px rgba(255,255,255,0.35),
    inset 0 -10px 18px rgba(0,81,255,0.15),
    inset 0 0 14px rgba(0,163,255,0.12)
  `,

};

// Typography
const valueText =
  "font-heading font-bold text-[40px] leading-[48px] text-[#F0B100] uppercase tracking-[0.04em]";
const labelText =
  "font-body font-semibold text-sm text-white text-center drop-shadow-[0px_1px_1px_rgba(23,9,92,0.75)]";

// --- Tick Marks ---
const TickMarks = () => (
  <svg viewBox="0 0 162 162" className="absolute inset-0">
    {/* top */}
    <rect x="80.5" y="0" width="1" height="12" fill="white" />
    {/* bottom */}
    <rect x="80.5" y="149" width="1" height="12" fill="white" />
    {/* left */}
    <rect x="0" y="80.5" width="18" height="1" fill="white" />
    {/* right */}
    <rect x="142" y="80.5" width="18" height="1" fill="white" />
    <g transform="rotate(45 81 81)">
      <rect x="80.5" y="0" width="1" height="12" fill="white" />
      <rect x="80.5" y="149" width="1" height="12" fill="white" />
      <rect x="0" y="80.5" width="12" height="1" fill="white" />
      <rect x="149" y="80.5" width="12" height="1" fill="white" />
    </g>
  </svg>
);

// --- Component ---
export const BaseFeatureStat: React.FC<BaseFeatureStatProps> = ({
  statValue,
  statLabel,
  backgroundImage,
  className = "",
  ...props
}) => {
  return (
    <div className={`${containerBase} ${className}`} {...props}>
      {/* Image */}
      <div
        className={imageLayer}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={imageTone} />
      <div className={imageFade} />
      <div className={vignetteOverlay} />

      {/* Dial */}
      <div className={dialWrapper}>
        <div className={dialGlow} />

        <div className="absolute inset-0 z-10" style={outerGlassStyle} />

        <div className="absolute inset-0 z-50 p-2">
          <TickMarks />
        </div>

        <div
          className="absolute w-[125px] h-[125px] z-30 flex flex-col items-center justify-center"
          style={innerGlassStyle}
        >
          <h3 className={valueText}>{statValue}</h3>
          <span className={labelText}>{statLabel}</span>
        </div>
      </div>
    </div>
  );
};
