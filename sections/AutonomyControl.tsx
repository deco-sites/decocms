import { useScript } from "@deco/deco/hooks";
import AutonomyControlCards from "../islands/AutonomyControlCards.tsx";

/**
 * @titleBy title
 */
interface Card {
  /**
   * @title Card Title
   */
  title: string;
  /**
   * @title Description (before highlight)
   */
  descriptionBefore: string;
  /**
   * @title Highlighted Text (green)
   */
  descriptionHighlighted: string;
  /**
   * @title Description (after highlight)
   */
  descriptionAfter: string;
  /**
   * @title Card Image
   * @format image-uri
   */
  image: string;
}

interface Props {
  /**
   * @title Eyebrow Tag
   * @description Small label above the title (e.g., "THE FIX:")
   */
  eyebrow?: string;
  /**
   * @title Main Title
   * @description The title displayed in green
   */
  title?: string;
  /**
   * @title Subtitle
   * @description Text below the main title
   */
  subtitle?: string;
  /**
   * @title Cards
   * @description The two feature cards
   */
  cards?: Card[];
  /**
   * @title Footer Text (Line 1 - Green)
   */
  footerLine1?: string;
  /**
   * @title Footer Text (Line 2 - White)
   */
  footerLine2?: string;
}

export default function AutonomyControl({
  eyebrow = "THE FIX:",
  title = "Autonomy with control",
  subtitle = "AI-native organizations need two things at the same time:",
  cards = [
    {
      title: "A builder framework",
      descriptionBefore: "So teams can ",
      descriptionHighlighted:
        "create prototypes, automate workflows, ship internal apps, and iterate quickly",
      descriptionAfter:
        ". Self-serve for internal AI builders, complete extensibility for engineers.",
      image:
        "https://assets.decocache.com/decocms/e18a9e46-5818-4035-b656-d8b7174584fc/builder-framework.png",
    },
    {
      title: "A path to production that doesn't reset",
      descriptionBefore: "So validated use cases are ",
      descriptionHighlighted: "reliable, governed, and continuously improved",
      descriptionAfter: ", without being rebuilt from scratch.",
      image:
        "https://assets.decocache.com/decocms/3d1321b2-a609-4d25-83e0-9d44147c5744/path-prod.png",
    },
  ],
  footerLine1 = "decoCMS is designed for that middle path:",
  footerLine2 = "fast iteration and durable production systems.",
}: Props) {
  const sectionId = `autonomy-control-${
    Math.random().toString(36).substr(2, 9)
  }`;

  return (
    <section class="w-full bg-dc-50 flex flex-col items-center p-2">
      <div
        id={sectionId}
        class="bg-[#07401a] rounded-[24px] flex flex-col gap-14 items-center justify-center overflow-hidden px-6 md:px-16 py-16 md:py-20 relative w-full max-w-[1424px]"
      >
        {/* ASCII Dithering Animation - Full background */}
        <canvas
          id={`dither-canvas-${sectionId}`}
          class="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Header Content */}
        <div class="flex flex-col gap-2 items-center text-center relative z-10">
          {eyebrow && (
            <div class="font-mono text-dc-50 text-sm sm:text-base uppercase leading-5 mb-4">
              {eyebrow}
            </div>
          )}
          <h2 class="text-[#d0ec1a] text-4xl md:text-5xl lg:text-[56px] font-medium leading-none tracking-tight max-w-[992px]">
            {title}
          </h2>
          <p class="text-dc-100 text-xl md:text-2xl lg:text-[32px] font-normal leading-relaxed max-w-[992px]">
            {subtitle}
          </p>
        </div>

        {/* Cards Section */}
        <div class="w-full max-w-[1312px] relative z-10">
          <AutonomyControlCards cards={cards} />
        </div>

        {/* Footer Text */}
        <p class="text-center text-2xl md:text-[32px] font-medium leading-snug tracking-tight max-w-[926px] relative z-10">
          <span class="text-[#d0ec1a]">
            {footerLine1}
            <br />
          </span>
          <span class="text-dc-50">{footerLine2}</span>
        </p>
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
              if (canvas.width === 0 || canvas.height === 0) {
                resizeCanvas();
                animationRef = requestAnimationFrame(animate);
                return;
              }

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const imageData = ctx.createImageData(canvas.width, canvas.height);
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns - slower and more subtle
                  const waveBase = Math.sin(nx * 8 + time * 0.003) * 0.2;
                  const waveSecond = Math.cos(ny * 10 + time * 0.002) * 0.15;
                  const waveThird =
                    Math.sin((nx + ny) * 6 + time * 0.002) * 0.12;
                  const waveFourth =
                    Math.cos((nx - ny) * 5 + time * 0.0015) * 0.08;

                  // Pulsing effect - subtle
                  const pulse = Math.sin(time * 0.003) * 0.08;

                  // Moving diagonal stripes - subtle
                  const stripes =
                    Math.sin(nx * 12 + ny * 12 + time * 0.003) * 0.1;

                  let intensity =
                    0.5 +
                    waveBase +
                    waveSecond +
                    waveThird +
                    waveFourth +
                    pulse +
                    stripes;

                  const noise = (Math.random() - 0.5) * 0.06;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  // Dark green colors for the particles
                  // Darker: #052e12 (darker than #07401a)
                  // Base: #07401a (the background)
                  if (ditherResult) {
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
                        // Slightly lighter green for texture
                        data[pixelIndex] = 10; // R
                        data[pixelIndex + 1] = 75; // G
                        data[pixelIndex + 2] = 30; // B
                        data[pixelIndex + 3] = 40; // Alpha - subtle texture
                      }
                    }
                  } else {
                    // Darker spots
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
                        data[pixelIndex] = 5; // R
                        data[pixelIndex + 1] = 46; // G
                        data[pixelIndex + 2] = 18; // B
                        data[pixelIndex + 3] = 25; // Alpha - very subtle
                      }
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

export function Preview() {
  return <AutonomyControl />;
}
