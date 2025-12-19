import { useScript } from "@deco/deco/hooks";
import HeroCMSCards from "site/islands/HeroCMSCards.tsx";

export interface Card {
  /** @title Badge Text */
  badge: string;
  /** @title Card Title */
  title: string;
  /** @title Button Text */
  buttonText: string;
  /** @title Button Link */
  buttonLink?: string;
}

export interface StrategyButton {
  /** @title Strategy Text */
  text?: string;
  /** @title Strategy Link */
  link?: string;
}

export interface Props {
  /** @title Badge Text */
  badgeText?: string;
  /** @title Highlighted Title (green text) */
  highlightedTitle?: string;
  /** @title Main Title (dark text) */
  mainTitle?: string;
  /** @title Subtitle */
  subtitle?: string;
  /** @title Strategy Label */
  strategyLabel?: string;
  /** @title Strategy Button */
  strategyButton?: StrategyButton;
  /** @title Cards */
  cards?: Card[];
}

const ExternalLinkIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 7.5L17.5 2.5M17.5 2.5H12.5M17.5 2.5L10 10M8.33333 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H13.5C14.9001 17.5 15.6002 17.5 16.135 17.2275C16.6054 16.9878 16.9878 16.6054 17.2275 16.135C17.5 15.6002 17.5 14.9001 17.5 13.5V11.6667"
      stroke="#8CAA25"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeroCMS({
  badgeText,
  highlightedTitle,
  mainTitle,
  subtitle,
  strategyLabel,
  strategyButton,
  cards,
}: Props) {
  const sectionId = `hero-cms-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      {/* Main container */}
      <div class="bg-dc-100 rounded-[24px] flex flex-col min-h-[calc(100dvh-16px)] lg:h-[calc(100dvh-16px)] relative overflow-visible lg:overflow-hidden">
        {/* ASCII Dithering Animation Background - hidden on mobile */}
        <div class="hidden lg:block absolute bottom-0 left-0 right-0 h-[50%] overflow-hidden pointer-events-none z-[1]">
          <canvas
            id={`dither-canvas-${sectionId}`}
            class="absolute inset-0 w-full h-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Main Content */}
        <div class="flex flex-col gap-4 lg:gap-6 items-center w-full px-4 md:px-0 pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-0 relative z-10 flex-1">
          {/* Hero Text */}
          <div class="flex flex-col items-center w-full">
            <div class="flex flex-col gap-4 lg:gap-6 items-center justify-center text-center">
              {/* Badge */}
              {badgeText && (
                <div class="backdrop-blur-sm bg-white/80 border border-dc-200 rounded-full py-1.5 px-4">
                  <span class="text-dc-800 text-sm font-medium">
                    {badgeText}
                  </span>
                </div>
              )}

              {/* Title - narrower max-width to keep "Platform teams." together */}
              <h1 class="font-sans text-4xl md:text-6xl lg:text-[80px] text-dc-900 tracking-[-1.6px] leading-[1.05] max-w-[320px] md:max-w-[580px] lg:max-w-[920px] font-medium">
                <span class="text-[#8CAA25]">{highlightedTitle}</span>
                <span>{` ${mainTitle}`}</span>
              </h1>

              {/* Subtitle */}
              <p class="font-sans text-base md:text-lg lg:text-xl text-dc-500 leading-[1.5] text-center max-w-[360px] md:max-w-[540px] lg:max-w-[600px]">
                {subtitle}
              </p>

              {/* Strategy Label - wider to prevent line breaks */}
              <p class="font-sans text-base md:text-lg lg:text-xl text-dc-500 leading-[1.5] text-center max-w-[380px] md:max-w-[620px] lg:max-w-[720px]">
                {strategyLabel}
              </p>
            </div>
          </div>

          {/* Strategy Link and Cards */}
          <div class="flex flex-col gap-4 items-center mt-auto">
            {/* Read the Strategy Link - optional */}
            {strategyButton?.text && strategyButton?.link && (
              <a href={strategyButton.link} class="flex gap-2 items-center group">
                <span class="font-sans text-base md:text-lg lg:text-xl text-[#8CAA25] leading-[1.4] text-center whitespace-nowrap underline underline-offset-2 decoration-[#8CAA25] group-hover:brightness-90 transition-all">
                  {strategyButton.text}
                </span>
                <ExternalLinkIcon />
              </a>
            )}

            {/* Cards Container - different behavior on mobile vs desktop */}
            {/* Mobile: full cards visible, no clipping */}
            {/* Desktop: cards peek from bottom, clipped by section */}
            <div class="w-full flex justify-center items-start lg:h-[180px] xl:h-[220px] 2xl:h-[280px] overflow-visible">
              <HeroCMSCards cards={cards ?? []} />
            </div>
          </div>
        </div>
      </div>

      {/* ASCII Dithering Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const canvas = document.getElementById(
              `dither-canvas-${sectionId}`,
            ) as HTMLCanvasElement;

            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            let animationRef: number;

            const resizeCanvas = () => {
              const rect = canvas.getBoundingClientRect();
              canvas.width = rect.width;
              canvas.height = rect.height;
            };

            resizeCanvas();
            globalThis.addEventListener("resize", resizeCanvas);

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

            const animate = () => {
              if (canvas.width === 0 || canvas.height === 0) return;

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const imageData = ctx.createImageData(
                canvas.width,
                canvas.height,
              );
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns
                  const waveBase = Math.sin(nx * 4 + time * 0.0004) * 0.15;
                  const waveSecond = Math.cos(nx * 7 + time * 0.0003) * 0.1;
                  const waveThird = Math.sin((nx + ny) * 3 + time * 0.0002) *
                    0.08;

                  // Gradient from top (lighter/invisible) to bottom (more visible)
                  const verticalGradient = Math.pow(ny, 0.5);

                  let intensity = 0.95 - (verticalGradient * 0.5) + waveBase +
                    waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.02 * verticalGradient;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  // dc-100: #F1F0EE (background), dc-200: #E7E5E4
                  const r = ditherResult ? 0xf1 : 0xe7;
                  const g = ditherResult ? 0xf0 : 0xe5;
                  const b = ditherResult ? 0xee : 0xe4;

                  for (
                    let dy = 0;
                    dy < cellSize && y + dy < canvas.height;
                    dy++
                  ) {
                    for (
                      let dx = 0;
                      dx < cellSize && x + dx < canvas.width;
                      dx++
                    ) {
                      const pixelIndex = ((y + dy) * canvas.width + (x + dx)) *
                        4;
                      data[pixelIndex] = r;
                      data[pixelIndex + 1] = g;
                      data[pixelIndex + 2] = b;
                      data[pixelIndex + 3] = 255;
                    }
                  }
                }
              }

              ctx.putImageData(imageData, 0, 0);

              time += 16;
              animationRef = requestAnimationFrame(animate);
            };

            animate();

            const cleanup = () => {
              globalThis.removeEventListener("resize", resizeCanvas);
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
