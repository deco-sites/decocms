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

  // Render a single logo card - dynamic sizing based on viewport
  const LogoCard = ({ logo }: { logo: Logo }) => {
    return (
      <div 
        class="flex-shrink-0 bg-white border-[1.2px] border-dc-200 flex items-center justify-center overflow-hidden"
        style={{
          width: "clamp(52px, 9.5dvh, 100px)",
          height: "clamp(52px, 9.5dvh, 100px)",
          borderRadius: "clamp(13px, 2.4dvh, 25px)"
        }}
      >
        <Image
          src={logo.image}
          alt={logo.alt || "Integration logo"}
          width={64}
          height={64}
          class="object-contain"
          style={{
            width: "clamp(32px, 6dvh, 64px)",
            height: "clamp(32px, 6dvh, 64px)"
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
      style={{ height: "clamp(200px, 44dvh, 460px)" }}
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
          left: "clamp(8px, 2vw, 16px)",
          width: "clamp(56px, 10.5dvh, 108px)",
          height: "calc(100% - clamp(28px, 5.5dvh, 60px))"
        }}
      >
        {/* Gradient mask - fade on top edge */}
        <div
          class="absolute top-0 inset-x-0 z-10 pointer-events-none"
          style={{
            height: "clamp(25px, 4dvh, 40px)",
            background: "linear-gradient(to bottom, #F1F0EE 0%, transparent 100%)"
          }}
        />
        {/* Gradient mask - fade on bottom edge */}
        <div
          class="absolute bottom-0 inset-x-0 z-10 pointer-events-none"
          style={{
            height: "clamp(40px, 6dvh, 60px)",
            background: "linear-gradient(to top, #F1F0EE 0%, transparent 100%)"
          }}
        />

        {hasVertical && (
          <div
            ref={verticalTrackRef}
            class={`flex flex-col ${verticalHeight > 0 ? 'animate-scroll-vertical' : ''}`}
            style={{ animationDirection: 'reverse', gap: 'clamp(8px, 1.2dvh, 12px)' }}
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
          height: "clamp(52px, 9.5dvh, 100px)"
        }}
      >
        {/* Gradient mask - fade on right edge */}
        <div
          class="absolute right-0 inset-y-0 z-10 pointer-events-none"
          style={{
            width: "clamp(40px, 6dvh, 60px)",
            background: "linear-gradient(to left, #F1F0EE 0%, transparent 100%)"
          }}
        />

        {hasHorizontal && (
          <div
            ref={horizontalTrackRef}
            class={`flex ${horizontalWidth > 0 ? 'animate-scroll-horizontal' : ''}`}
            style={{ gap: 'clamp(8px, 1.2dvh, 12px)' }}
          >
            {duplicatedHorizontal.map((logo, index) => (
              <LogoCard key={`h-${index}`} logo={logo} />
            ))}
          </div>
        )}
      </div>

      {/* Featured deco logo card - bottom-left corner - dynamic sizing */}
      <div class="absolute left-0 bottom-0 z-20">
        <div 
          class="bg-[#d0ec1a] border-[1.5px] border-[#bddf4a] flex items-center justify-center overflow-hidden"
          style={{
            width: "clamp(96px, 19dvh, 176px)",
            height: "clamp(96px, 19dvh, 176px)",
            borderRadius: "clamp(24px, 4.8dvh, 44px)"
          }}
        >
          <Image
            src={featuredLogo}
            alt="deco logo"
            width={110}
            height={110}
            class="object-contain"
            style={{
              width: "clamp(60px, 12dvh, 110px)",
              height: "clamp(60px, 12dvh, 110px)"
            }}
          />
        </div>
      </div>
    </div>
  );
}

