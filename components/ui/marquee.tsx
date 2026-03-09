import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  repeat?: number
  [key: string]: any
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group relative overflow-hidden",
        className
      )}
    >
      <style>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100%));
          }
        }
        @keyframes scroll-vertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-100%));
          }
        }
        .marquee-content {
          animation: ${vertical ? "scroll-vertical" : "scroll"} ${vertical ? "20" : "20"}s linear infinite;
          ${reverse ? "animation-direction: reverse;" : ""}
        }
        .group:hover .marquee-content {
          ${pauseOnHover ? "animation-play-state: paused;" : ""}
        }
      `}</style>
      <div
        className={cn(
          "marquee-content flex gap-4",
          vertical && "flex-col"
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-4 shrink-0",
                vertical && "flex-col"
              )}
            >
              {children}
            </div>
          ))}
      </div>
    </div>
  )
}
