import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";
import LogoCarousel from "../islands/LogoCarousel.tsx";
import MobileLogoGrid from "../islands/MobileLogoGrid.tsx";

/**
 * @titleBy alt
 */
interface Logo {
  /** @title Logo Image */
  image: ImageWidget;
  /** @title Alt Text */
  alt?: string;
}

export interface Props {
  /**
   * @title Badge Label
   * @description Label shown in the badge (e.g., "Introducing:")
   */
  badgeLabel?: string;

  /**
   * @title Badge Text
   * @description The eyebrow text above the title
   */
  badgeText?: string;

  /**
   * @title Badge Text (Mobile)
   * @description Shorter badge text for mobile screens
   */
  badgeTextMobile?: string;

  /**
   * @title Badge URL
   * @description Link for the badge
   */
  badgeUrl?: string;

  /**
   * @title Title Line 1
   * @description First line of the title (black text)
   */
  titleLine1?: string;

  /**
   * @title Title Line 2 (Highlighted)
   * @description Second line of the title (green text)
   */
  titleLine2?: string;

  /**
   * @title Subtitle
   * @description Description text below the title
   * @format textarea
   */
  subtitle?: string;

  /**
   * @title CTA Button Text
   * @description Text for the call-to-action button
   */
  ctaText?: string;

  /**
   * @title CTA Button URL
   * @description Link for the CTA button
   */
  ctaUrl?: string;

  /**
   * @title Left Logos
   * @description API logos that slide from left to right toward the center
   */
  leftLogos?: Logo[];

  /**
   * @title Right Logos
   * @description AI model logos that slide from right to left toward the center
   */
  rightLogos?: Logo[];

  /**
   * @title Center Logo
   * @description The main deco logo in the center card
   */
  centerLogo?: ImageWidget;

  /**
   * @title Animation Duration
   * @description Duration for one complete carousel cycle in seconds (lower = faster)
   */
  carouselDuration?: number;
}

// Default placeholder logos for preview
const defaultLeftLogos: Logo[] = [
  { image: "https://placehold.co/64x64/ffffff/78726e?text=1", alt: "API Logo 1" },
  { image: "https://placehold.co/64x64/ffffff/78726e?text=2", alt: "API Logo 2" },
  { image: "https://placehold.co/64x64/ffffff/78726e?text=3", alt: "API Logo 3" },
  { image: "https://placehold.co/64x64/ffffff/78726e?text=4", alt: "API Logo 4" },
  { image: "https://placehold.co/64x64/ffffff/78726e?text=5", alt: "API Logo 5" },
  { image: "https://placehold.co/64x64/ffffff/78726e?text=6", alt: "API Logo 6" },
  { image: "https://placehold.co/64x64/ffffff/78726e?text=7", alt: "API Logo 7" },
  { image: "https://placehold.co/64x64/ffffff/78726e?text=8", alt: "API Logo 8" },
];

const defaultRightLogos: Logo[] = [
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=A", alt: "AI Logo A" },
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=B", alt: "AI Logo B" },
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=C", alt: "AI Logo C" },
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=D", alt: "AI Logo D" },
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=E", alt: "AI Logo E" },
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=F", alt: "AI Logo F" },
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=G", alt: "AI Logo G" },
  { image: "https://placehold.co/64x64/ffffff/8caa25?text=H", alt: "AI Logo H" },
];

export default function HeroAIPlatform({
  badgeLabel = "Introducing:",
  badgeText = "deco MCP Mesh — The Enterprise Context Control Plane",
  badgeTextMobile = "The Enterprise Context Control Plane",
  badgeUrl = "/mesh",
  titleLine1 = "Build your",
  titleLine2 = "internal AI Platform",
  subtitle = "The composable internal AI operating system on MCP: open-source, self-hosted and designed to scale AI adoption beyond ungoverned pilots.",
  ctaText = "Book a demo",
  ctaUrl = "#contact",
  leftLogos = defaultLeftLogos,
  rightLogos = defaultRightLogos,
  centerLogo = "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/deco-logo.svg",
  carouselDuration = 20,
}: Props) {
  const sectionId = `hero-ai-platform-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        {/* ASCII Dithering Animation Background - Desktop only (at bottom) */}
        <div class="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 h-[570px] w-[2562px] overflow-hidden pointer-events-none z-[1]">
          <canvas
            id={`dither-canvas-${sectionId}`}
            class="absolute inset-0 w-full h-full opacity-100"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* MOBILE LAYOUT */}
        <div class="flex flex-col md:hidden relative z-10 min-h-[calc(100dvh-16px)] pb-4">
          {/* CSS for responsive title sizing by screen width */}
          <style>
            {`
              .mobile-hero-title {
                font-size: 28px;
              }
              @media (min-width: 375px) {
                .mobile-hero-title {
                  font-size: 32px;
                }
              }
              @media (min-width: 390px) {
                .mobile-hero-title {
                  font-size: 36px;
                }
              }
              @media (min-width: 430px) {
                .mobile-hero-title {
                  font-size: 40px;
                }
              }
            `}
          </style>

          {/* ASCII Dithering Animation - starts BELOW navbar on mobile, flipped */}
          <div class="absolute top-[56px] left-1/2 -translate-x-1/2 h-[35dvh] w-[2562px] overflow-hidden pointer-events-none z-[1] scale-y-[-1] opacity-20">
            <canvas
              id={`dither-canvas-mobile-${sectionId}`}
              class="absolute inset-0 w-full h-full"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Content with padding - starts below navbar */}
          <div class="flex flex-col flex-1 pt-[64px] px-4">
            {/* Top section: Logo Grid Animation */}
            <div class="flex-shrink-0">
              <MobileLogoGrid
                horizontalLogos={rightLogos}
                verticalLogos={leftLogos}
                featuredLogo={centerLogo}
                duration={carouselDuration}
              />
            </div>

            {/* Spacer - flexible gap between animation and text */}
            <div class="flex-1 min-h-[8px] max-h-[16px]" />

            {/* Bottom section: Badge + Title + Subtitle + Button - fixed at bottom */}
            <div class="flex-shrink-0 flex flex-col gap-[clamp(10px,1.5dvh,16px)] w-full">
              {/* Badge - between animation and title */}
              {badgeText && (
                <a
                  href={badgeUrl}
                  class="self-start bg-dc-50 border border-dc-200 rounded-full py-1 px-3 flex items-center gap-2 hover:bg-white hover:border-dc-300 transition-all group"
                >
                  <span class="text-dc-500 text-[clamp(13px,3.2vw,15px)] font-normal leading-[1.4]">
                    {badgeTextMobile || badgeText}
                  </span>
                  <Icon
                    name="arrow_outward"
                    size="small"
                    class="text-dc-400"
                  />
                </a>
              )}

              {/* Title - responsive sizing with breakpoints */}
              <h1 class="mobile-hero-title font-sans leading-[1.05] text-dc-900 font-medium tracking-[-0.8px] text-left">
                {titleLine1}
                <br />
                <span class="text-[#8caa25]">{titleLine2}</span>
              </h1>

              {/* Subtitle - responsive sizing */}
              <p 
                class="text-dc-500 font-normal leading-[1.4] text-left"
                style={{ fontSize: "clamp(15px, 4vw, 19px)" }}
              >
                {subtitle}
              </p>

              {/* CTA Button - Full width */}
              {ctaText && (
                <a
                  href={ctaUrl}
                  class="w-full inline-flex items-center justify-center h-[44px] px-8 py-2 bg-[#d0ec1a] text-[#07401a] text-sm font-medium rounded-lg hover:bg-[#c4e016] transition-colors mt-1"
                >
                  {ctaText}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div class="hidden md:flex flex-col items-center pt-32 lg:pt-40 px-6 relative z-10">
          {/* Hero Text Content */}
          <div class="flex flex-col items-center gap-6 w-full max-w-[1066px]">
            {/* Badge */}
            {badgeText && (
              <a
                href={badgeUrl}
                class="backdrop-blur-sm bg-white/80 border border-dc-200 rounded-full py-1.5 px-3 flex items-center gap-2 hover:bg-white/95 hover:border-dc-300 transition-all group"
              >
                {badgeLabel && (
                  <span class="text-primary-dark text-sm font-semibold">
                    {badgeLabel}
                  </span>
                )}
                <span class="text-dc-600 text-sm font-medium">
                  {badgeText}
                </span>
                <Icon
                  name="arrow_forward"
                  size="small"
                  class="text-dc-400 group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            )}

            {/* Title */}
            <h1 class="font-sans text-5xl md:text-6xl lg:text-[80px] text-dc-900 font-medium leading-none tracking-[-1.6px] text-center">
              {titleLine1}
              <br />
              <span class="text-[#8caa25]">{titleLine2}</span>
            </h1>

            {/* Subtitle */}
            <p class="text-dc-500 text-lg md:text-xl font-normal leading-[1.4] text-center max-w-[664px]">
              {subtitle}
            </p>

            {/* CTA Button */}
            {ctaText && (
              <a
                href={ctaUrl}
                class="inline-flex items-center justify-center h-[44px] px-8 py-2 bg-[#d0ec1a] text-[#07401a] text-sm font-medium rounded-lg hover:bg-[#c4e016] transition-colors"
              >
                {ctaText}
              </a>
            )}
          </div>
        </div>

        {/* Logo Carousel Section - Desktop only */}
        <div class="hidden md:block relative z-10 mt-auto pb-20 px-6">
          <div class="w-full max-w-[1576px] mx-auto">
            <LogoCarousel
              leftLogos={leftLogos}
              rightLogos={rightLogos}
              centerLogo={centerLogo}
              duration={carouselDuration}
            />
          </div>
        </div>
      </div>

      {/* ASCII Dithering Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            // Setup animation for a single canvas
            const setupCanvas = (canvasId: string) => {
              const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
              if (!canvas) return null;

              const ctx = canvas.getContext("2d");
              if (!ctx) return null;

              const resizeCanvas = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
              };

              resizeCanvas();
              return { canvas, ctx, resizeCanvas };
            };

            // Setup both desktop and mobile canvases
            const desktop = setupCanvas(`dither-canvas-${sectionId}`);
            const mobile = setupCanvas(`dither-canvas-mobile-${sectionId}`);

            if (!desktop && !mobile) return;

            const resizeAll = () => {
              desktop?.resizeCanvas();
              mobile?.resizeCanvas();
            };

            globalThis.addEventListener("resize", resizeAll);

            // Bayer matrix 8x8 for dithering
            const bayerMatrix8x8 = [
              [0, 32, 8, 40, 2, 34, 10, 42],
              [48, 16, 56, 24, 50, 18, 58, 26],
              [12, 44, 4, 36, 14, 46, 6, 38],
              [60, 28, 52, 20, 62, 30, 54, 22],
              [3, 35, 11, 43, 1, 33, 9, 41],
              [51, 19, 59, 27, 49, 17, 57, 25],
              [15, 47, 7, 39, 13, 45, 5, 37],
              [63, 31, 55, 23, 61, 29, 53, 21],
            ];

            let time = 0;
            const cellSize = 3;
            let animationRef: number;

            const renderToCanvas = (
              canvas: HTMLCanvasElement,
              ctx: CanvasRenderingContext2D,
            ) => {
              if (canvas.width === 0 || canvas.height === 0) return;

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const imageData = ctx.createImageData(canvas.width, canvas.height);
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  const waveBase = Math.sin(nx * 4 + time * 0.0004) * 0.15;
                  const waveSecond = Math.cos(nx * 7 + time * 0.0003) * 0.1;
                  const waveThird = Math.sin((nx + ny) * 3 + time * 0.0002) * 0.08;

                  const verticalGradient = Math.pow(ny, 0.8);

                  let intensity = 0.95 - (verticalGradient * 0.5) + waveBase +
                    waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.03 * verticalGradient;
                  intensity += noise;
                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  const r = ditherResult ? 0xf1 : 0xe7;
                  const g = ditherResult ? 0xf0 : 0xe5;
                  const b = ditherResult ? 0xee : 0xe4;

                  for (let dy = 0; dy < cellSize && y + dy < canvas.height; dy++) {
                    for (let dx = 0; dx < cellSize && x + dx < canvas.width; dx++) {
                      const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                      data[pixelIndex] = r;
                      data[pixelIndex + 1] = g;
                      data[pixelIndex + 2] = b;
                      data[pixelIndex + 3] = 255;
                    }
                  }
                }
              }

              ctx.putImageData(imageData, 0, 0);
            };

            const animate = () => {
              if (desktop) renderToCanvas(desktop.canvas, desktop.ctx);
              if (mobile) renderToCanvas(mobile.canvas, mobile.ctx);

              time += 16;
              animationRef = requestAnimationFrame(animate);
            };

            animate();

            const cleanup = () => {
              globalThis.removeEventListener("resize", resizeAll);
              if (animationRef) {
                cancelAnimationFrame(animationRef);
              }
            };

            globalThis.addEventListener("beforeunload", cleanup);

            return cleanup;
          }, sectionId),
        }}
      />
    </section>
  );
}

export function Preview() {
  return <HeroAIPlatform />;
}

