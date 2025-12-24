import { useEffect, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Logo {
  /** @title Logo Image */
  image: ImageWidget;
  /** @title Alt Text */
  alt?: string;
}

export interface Props {
  /** @title Left Logos (slide left to right toward center) */
  leftLogos?: Logo[];
  /** @title Right Logos (slide right to left toward center) */
  rightLogos?: Logo[];
  /** @title Center Logo */
  centerLogo?: ImageWidget;
  /** @title Animation Duration (seconds for one complete cycle) */
  duration?: number;
}

export default function LogoCarousel({
  leftLogos = [],
  rightLogos = [],
  centerLogo = "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/deco-logo.svg",
  duration = 20,
}: Props) {
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  useEffect(() => {
    // Calculate the width of one set of logos for animation
    if (leftTrackRef.current && leftLogos.length > 0) {
      const totalWidth = leftTrackRef.current.scrollWidth;
      setLeftWidth(totalWidth / 2); // We duplicate once, so divide by 2
    }
    if (rightTrackRef.current && rightLogos.length > 0) {
      const totalWidth = rightTrackRef.current.scrollWidth;
      setRightWidth(totalWidth / 2);
    }
  }, [leftLogos, rightLogos]);

  // Render a single logo card
  const LogoCard = ({ logo }: { logo: Logo }) => (
    <div class="flex-shrink-0 w-[99px] h-[99px] bg-white border-[1.5px] border-dc-200 rounded-[24px] flex items-center justify-center overflow-hidden">
      <Image
        src={logo.image}
        alt={logo.alt || "Integration logo"}
        width={64}
        height={64}
        class="w-16 h-16 object-contain"
      />
    </div>
  );

  // Duplicate logos once for seamless infinite scroll
  const duplicatedLeftLogos = [...leftLogos, ...leftLogos];
  const duplicatedRightLogos = [...rightLogos, ...rightLogos];

  // Check if logos are configured
  const hasLeftLogos = leftLogos.length > 0;
  const hasRightLogos = rightLogos.length > 0;

  return (
    <div class="relative w-full h-[192px]">
      {/* Inject CSS keyframes for smooth GPU-accelerated animation */}
      <style>
        {`
          @keyframes scrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-${leftWidth}px); }
          }
          @keyframes scrollRight {
            from { transform: translateX(-${rightWidth}px); }
            to { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scrollLeft ${duration}s linear infinite;
            will-change: transform;
          }
          .animate-scroll-right {
            animation: scrollRight ${duration}s linear infinite;
            will-change: transform;
          }
        `}
      </style>

      {/* Center deco logo card - positioned absolutely in the center */}
      <div class="absolute left-1/2 top-0 -translate-x-1/2 z-20">
        <div class="w-[192px] h-[192px] bg-[#d0ec1a] border-[2px] border-[#bddf4a] rounded-[47px] flex items-center justify-center overflow-hidden shadow-lg">
          <Image
            src={centerLogo}
            alt="deco logo"
            width={124}
            height={124}
            class="w-[124px] h-[124px] object-contain"
          />
        </div>
      </div>

      {/* Left side - logos sliding from left toward center (right direction) */}
      <div class="absolute left-0 top-[46px] h-[99px] w-[calc(50%-96px)] overflow-hidden">
        {/* Gradient mask - fade on left edge */}
        <div
          class="absolute left-0 inset-y-0 z-10 pointer-events-none"
          style={{
            width: "120px",
            background: "linear-gradient(to right, #F1F0EE 0%, #F1F0EE 20%, transparent 100%)"
          }}
        />
        {/* Gradient mask - fade before center card */}
        <div
          class="absolute right-0 inset-y-0 z-10 pointer-events-none"
          style={{
            width: "100px",
            background: "linear-gradient(to left, #F1F0EE 0%, #F1F0EE 30%, transparent 100%)"
          }}
        />

        {hasLeftLogos && (
          <div
            ref={leftTrackRef}
            class={`flex gap-4 ${leftWidth > 0 ? 'animate-scroll-right' : ''}`}
          >
            {duplicatedLeftLogos.map((logo, index) => (
              <LogoCard key={`left-${index}`} logo={logo} />
            ))}
          </div>
        )}
      </div>

      {/* Right side - logos sliding from right toward center (left direction) */}
      <div class="absolute right-0 top-[46px] h-[99px] w-[calc(50%-96px)] overflow-hidden">
        {/* Gradient mask - fade before center card */}
        <div
          class="absolute left-0 inset-y-0 z-10 pointer-events-none"
          style={{
            width: "100px",
            background: "linear-gradient(to right, #F1F0EE 0%, #F1F0EE 30%, transparent 100%)"
          }}
        />
        {/* Gradient mask - fade on right edge */}
        <div
          class="absolute right-0 inset-y-0 z-10 pointer-events-none"
          style={{
            width: "120px",
            background: "linear-gradient(to left, #F1F0EE 0%, #F1F0EE 20%, transparent 100%)"
          }}
        />

        {hasRightLogos && (
          <div
            ref={rightTrackRef}
            class={`flex gap-4 ${rightWidth > 0 ? 'animate-scroll-left' : ''}`}
          >
            {duplicatedRightLogos.map((logo, index) => (
              <LogoCard key={`right-${index}`} logo={logo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
