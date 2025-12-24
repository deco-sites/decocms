import { useScript } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Título
   * @description Texto principal do CTA
   */
  title?: string;

  /**
   * @title Texto do Botão
   * @description Texto do botão principal
   */
  buttonText?: string;

  /**
   * @title URL do Botão
   * @description Link para onde o botão deve direcionar
   */
  buttonUrl?: string;
}

export default function FinalCTASimple({
  title = "Ready to get started?",
  buttonText = "Book a demo",
  buttonUrl = "https://deco.cx/discord",
}: Props) {
  const sectionId = `final-cta-simple-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="w-full bg-dc-50">
      <div class="relative z-10 pt-20 md:pt-40 px-4 md:px-8 lg:px-16 mb-[-100px]">
        <div class="w-full max-w-[1440px] mx-auto">
          <div class="bg-primary-light rounded-[20px] md:rounded-[40px] flex flex-col justify-center items-start overflow-hidden relative">
            {/* ASCII Dithering Animation - Right Side */}
            <div class="absolute top-0 right-0 w-1/2 md:w-2/5 h-full overflow-hidden pointer-events-none z-0">
              <canvas
                id={`dither-canvas-${sectionId}`}
                class="absolute inset-0 w-full h-full"
                style={{ imageRendering: "pixelated" }}
              />
            </div>

            {/* Main Content */}
            <div class="w-full p-8 md:p-12 lg:p-20 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-32 relative z-10">
              {/* Left Content - Title */}
              <div class="flex-shrink-0 lg:max-w-[533px]">
                <h2 class="text-primary-dark text-3xl md:text-4xl lg:text-[56px] font-medium leading-[1.1] tracking-[-0.03em]">
                  {title}
                </h2>
              </div>

              {/* Right Content - Button */}
              <div class="flex-1 flex flex-col items-start lg:items-stretch w-full lg:w-auto">
                <a
                  href={buttonUrl}
                  class="w-full lg:w-auto min-w-[280px] px-6 py-4 bg-primary-dark rounded-xl flex justify-center items-center hover:bg-primary-dark/90 transition-colors"
                >
                  <span class="text-primary-light text-base font-medium leading-snug">
                    {buttonText}
                  </span>
                </a>
              </div>
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

            // Bayer matrix 8x8 for sophisticated dithering
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

                  // Create diagonal gradient from top-right corner
                  // More visible at top-right, fading towards bottom-left
                  const diagonalDist = Math.sqrt(
                    Math.pow(1 - nx, 2) + Math.pow(ny, 2),
                  );
                  const cornerIntensity = Math.max(0, 1 - diagonalDist * 1.5);

                  // Flowing waves emanating from top-right corner
                  const wave1 = Math.sin(
                    (nx * 4 + ny * 2 + time * 0.0003),
                  ) * 0.08 * cornerIntensity;
                  const wave2 = Math.cos(
                    (nx * 6 - ny * 3 + time * 0.0002),
                  ) * 0.06 * cornerIntensity;
                  const wave3 = Math.sin(
                    ((1 - nx) * 5 + ny * 4 + time * 0.00025),
                  ) * 0.05 * cornerIntensity;

                  // Radial pattern from corner
                  const radialWave = Math.sin(
                    diagonalDist * 8 - time * 0.0004,
                  ) * 0.04 * cornerIntensity;

                  // Base intensity: high (lime green visible) where no dithering needed
                  // Lower values = more dark green dots
                  let intensity = 0.98 - (cornerIntensity * 0.6) + wave1 +
                    wave2 + wave3 + radialWave;

                  // Add subtle noise for organic feel
                  const noise = (Math.random() - 0.5) * 0.02 * cornerIntensity;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  // Get Bayer matrix threshold
                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  // Apply dithering with design system colors
                  // When intensity > threshold: show lime green (#D0EC1A)
                  // When intensity <= threshold: show dark green (#07401A)
                  const ditherResult = intensity > threshold;
                  const r = ditherResult ? 0xd0 : 0x07; // #D0EC1A : #07401A
                  const g = ditherResult ? 0xec : 0x40;
                  const b = ditherResult ? 0x1a : 0x1a;

                  // Apply to pixel grid
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

export function Preview() {
  return <FinalCTASimple />;
}

