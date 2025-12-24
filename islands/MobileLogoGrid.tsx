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
  /** @title Horizontal Logos (slide right to left) - Tool logos */
  horizontalLogos?: Logo[];
  /** @title Vertical Logos (slide top to bottom) - AI model logos */
  verticalLogos?: Logo[];
  /** @title Featured Logo */
  featuredLogo?: ImageWidget;
  /** @title Animation Duration (seconds for one complete cycle) */
  duration?: number;
}

export default function MobileLogoGrid({
  horizontalLogos = [],
  verticalLogos = [],
  featuredLogo = "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/deco-logo.svg",
  duration = 15,
}: Props) {
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const verticalTrackRef = useRef<HTMLDivElement>(null);
  const [horizontalWidth, setHorizontalWidth] = useState(0);
  const [verticalHeight, setVerticalHeight] = useState(0);

  useEffect(() => {
    if (horizontalTrackRef.current && horizontalLogos.length > 0) {
      const totalWidth = horizontalTrackRef.current.scrollWidth;
      setHorizontalWidth(totalWidth / 2);
    }
    if (verticalTrackRef.current && verticalLogos.length > 0) {
      const totalHeight = verticalTrackRef.current.scrollHeight;
      setVerticalHeight(totalHeight / 2);
    }
  }, [horizontalLogos, verticalLogos]);

  // Render a single logo card - responsive sizing based on viewport height
  const LogoCard = ({ logo }: { logo: Logo }) => {
    return (
      <div 
        class="flex-shrink-0 bg-white border-[1.2px] border-dc-200 flex items-center justify-center overflow-hidden"
        style={{
          width: "clamp(56px, 9vh, 100px)",
          height: "clamp(56px, 9vh, 100px)",
          borderRadius: "clamp(14px, 2.2vh, 25px)"
        }}
      >
        <Image
          src={logo.image}
          alt={logo.alt || "Integration logo"}
          width={65}
          height={65}
          class="object-contain"
          style={{
            width: "clamp(36px, 6vh, 65px)",
            height: "clamp(36px, 6vh, 65px)"
          }}
        />
      </div>
    );
  };

  // Duplicate logos for seamless infinite scroll
  const duplicatedHorizontal = [...horizontalLogos, ...horizontalLogos];
  const duplicatedVertical = [...verticalLogos, ...verticalLogos];

  const hasHorizontal = horizontalLogos.length > 0;
  const hasVertical = verticalLogos.length > 0;

  return (
    <div 
      class="relative w-full"
      style={{ height: "clamp(220px, 45vh, 420px)" }}
    >
      {/* Inject CSS keyframes */}
      <style>
        {`
          @keyframes scrollHorizontal {
            from { transform: translateX(0); }
            to { transform: translateX(-${horizontalWidth}px); }
          }
          @keyframes scrollVertical {
            from { transform: translateY(0); }
            to { transform: translateY(-${verticalHeight}px); }
          }
          .animate-scroll-horizontal {
            animation: scrollHorizontal ${duration}s linear infinite;
            will-change: transform;
          }
          .animate-scroll-vertical {
            animation: scrollVertical ${duration}s linear infinite;
            will-change: transform;
          }
        `}
      </style>

      {/* Vertical column on LEFT - logos sliding top to bottom */}
      <div 
        class="absolute top-0 overflow-hidden"
        style={{
          left: "clamp(8px, 2vw, 19px)",
          width: "clamp(60px, 10vh, 110px)",
          height: "calc(100% - clamp(36px, 6vh, 60px))"
        }}
      >
        {/* Gradient mask - fade on top edge */}
        <div
          class="absolute top-0 inset-x-0 z-10 pointer-events-none"
          style={{
            height: "30px",
            background: "linear-gradient(to bottom, #F1F0EE 0%, transparent 100%)"
          }}
        />
        {/* Gradient mask - fade on bottom edge */}
        <div
          class="absolute bottom-0 inset-x-0 z-10 pointer-events-none"
          style={{
            height: "50px",
            background: "linear-gradient(to top, #F1F0EE 0%, transparent 100%)"
          }}
        />

        {hasVertical && (
          <div
            ref={verticalTrackRef}
            class={`flex flex-col gap-2 ${verticalHeight > 0 ? 'animate-scroll-vertical' : ''}`}
            style={{ animationDirection: 'reverse' }}
          >
            {duplicatedVertical.map((logo, index) => (
              <LogoCard key={`v-${index}`} logo={logo} />
            ))}
          </div>
        )}
      </div>

      {/* Horizontal row at BOTTOM - logos sliding right to left */}
      <div 
        class="absolute right-0 overflow-hidden"
        style={{
          left: "clamp(40px, 8vw, 70px)",
          bottom: "0",
          height: "clamp(56px, 9vh, 100px)"
        }}
      >
        {/* Gradient mask - fade on right edge */}
        <div
          class="absolute right-0 inset-y-0 z-10 pointer-events-none"
          style={{
            width: "50px",
            background: "linear-gradient(to left, #F1F0EE 0%, transparent 100%)"
          }}
        />

        {hasHorizontal && (
          <div
            ref={horizontalTrackRef}
            class={`flex gap-2 ${horizontalWidth > 0 ? 'animate-scroll-horizontal' : ''}`}
          >
            {duplicatedHorizontal.map((logo, index) => (
              <LogoCard key={`h-${index}`} logo={logo} />
            ))}
          </div>
        )}
      </div>

      {/* Featured deco logo card - large, bottom-left corner - responsive sizing */}
      <div class="absolute left-0 bottom-0 z-20">
        <div 
          class="bg-[#d0ec1a] border-[1.5px] border-[#bddf4a] flex items-center justify-center overflow-hidden"
          style={{
            width: "clamp(100px, 18vh, 180px)",
            height: "clamp(100px, 18vh, 180px)",
            borderRadius: "clamp(24px, 4vh, 45px)"
          }}
        >
          <Image
            src={featuredLogo}
            alt="deco logo"
            width={120}
            height={120}
            class="object-contain"
            style={{
              width: "clamp(64px, 12vh, 120px)",
              height: "clamp(64px, 12vh, 120px)"
            }}
          />
        </div>
      </div>
    </div>
  );
}

