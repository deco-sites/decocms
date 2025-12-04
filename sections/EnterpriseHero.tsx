import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Badge Text
   * @description Small badge text above the title
   */
  badge?: string;
  /**
   * @title Title Line 1
   * @description First line of the main title
   */
  titleLine1?: string;
  /**
   * @title Title Line 2 (Highlighted)
   * @description Second line in accent color
   */
  titleLine2?: string;
  /**
   * @title Subtitle
   * @description Description text below the title
   */
  subtitle?: string;
  /**
   * @title Primary Button Text
   */
  primaryButtonText?: string;
  /**
   * @title Primary Button URL
   */
  primaryButtonUrl?: string;
  /**
   * @title Trusted Companies Title
   * @description Text above company logos
   */
  trustedByText?: string;
  /**
   * @title Partner Logos
   * @description Partner logos for the trust signal
   */
  partnerLogos?: ImageWidget[];
}

export default function EnterpriseHero({
  badge = "Ahead of the curve: Built on new MCP standards",
  titleLine1 = "Govern AI at scale",
  titleLine2 = "without slowing down.",
  subtitle = "Empower every team to build production AI apps with enterprise security, observability, and control. Deploy anywhere. Own everything.",
  primaryButtonText = "Schedule Enterprise Demo",
  primaryButtonUrl = "https://form.typeform.com/to/LxKZbN9N?typeform-source=www.decocms.com",
  trustedByText = "Trusted by forward-thinking engineering teams",
  partnerLogos = [],
}: Props) {
  const sectionId = `enterprise-hero-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-primary-dark pt-6 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div
          class="absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(208,236,26,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(208,236,26,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* ASCII Dithering Animation */}
        <div class="absolute bottom-0 left-0 right-0 h-[45%] overflow-hidden pointer-events-none z-[1]">
          <canvas
            id={`dither-canvas-${sectionId}`}
            class="absolute inset-0 w-full h-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Hero Content */}
        <div class="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-24 md:py-32 lg:py-40 text-center flex-1 flex flex-col items-center justify-center">
          {/* Badge */}
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light/10 border border-primary-light/30 text-primary-light text-xs font-semibold uppercase tracking-wide mb-8">
            <span class="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
            {badge}
          </div>

          {/* Title */}
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-medium tracking-tight text-dc-50 mb-6 leading-tight">
            {titleLine1}
            <br class="hidden md:block" />
            <span class="text-primary-light">{titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p class="max-w-2xl mx-auto text-lg md:text-xl text-dc-300 leading-relaxed mb-10">
            {subtitle}
          </p>

          {/* Button */}
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href={primaryButtonUrl}
              class="w-full sm:w-auto px-8 py-4 bg-primary-light text-primary-dark rounded-xl font-semibold text-lg hover:bg-primary-light/90 transition-all shadow-lg inline-flex items-center justify-center"
            >
              {primaryButtonText}
            </a>
          </div>
        </div>

        {/* Trusted By Section */}
        <div class="relative z-10 pb-10 pt-5 px-4">
          <p class="text-sm font-mono text-primary-light uppercase tracking-wider mb-6 text-center">
            {trustedByText}
          </p>
          {partnerLogos && partnerLogos.length > 0 && (
            <div class="flex flex-wrap justify-center gap-6 sm:gap-9 items-center">
              {partnerLogos.map((logo, index) => (
                <div key={index} class="h-8 sm:h-10 lg:h-12 flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={120}
                    height={48}
                    loading="lazy"
                    class="h-full w-auto object-contain opacity-80"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ASCII Dithering Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const canvas = document.getElementById(
              `dither-canvas-${sectionId}`
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
                canvas.height
              );
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns
                  const waveBase = Math.sin(nx * 4 + time * 0.0004) * 0.15;
                  const waveSecond = Math.cos(nx * 7 + time * 0.0003) * 0.1;
                  const waveThird =
                    Math.sin((nx + ny) * 3 + time * 0.0002) * 0.08;

                  // Gradient from top (transparent/dark) to bottom (more green)
                  const verticalGradient = Math.pow(ny, 0.8);

                  let intensity =
                    0.95 -
                    verticalGradient * 0.5 +
                    waveBase +
                    waveSecond +
                    waveThird;

                  const noise = (Math.random() - 0.5) * 0.03 * verticalGradient;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  // primary-dark: #07401A, primary-light with low opacity for dither
                  const r = ditherResult ? 0x07 : 0x0a;
                  const g = ditherResult ? 0x40 : 0x50;
                  const b = ditherResult ? 0x1a : 0x22;

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
                      const pixelIndex =
                        ((y + dy) * canvas.width + (x + dx)) * 4;
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
