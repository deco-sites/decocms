import { useScript } from "@deco/deco/hooks";

export interface ButtonProps {
  /**
   * @title Texto do botão
   * @description Texto a ser exibido no botão
   */
  text: string;
  /**
   * @title URL do botão
   * @description Link para onde o botão deve direcionar
   */
  url: string;
}

export interface Props {
  /**
   * @title Título principal
   * @description Texto principal do CTA
   */
  title: string;
  /**
   * @title Botão principal (escuro)
   * @description Configuração do botão principal de demo
   */
  primaryButton: ButtonProps;
  /**
   * @title Botão secundário (claro)
   * @description Configuração do botão de contato
   */
  secondaryButton: ButtonProps;
}

export default function FinalCTA({
  title = "Join our thriving community of AI builders",
  primaryButton = { text: "Join our Discord community", url: "https://deco.cx/discord" },
  secondaryButton = { text: "Get started building", url: "#get-started" },
}: Props) {
  const sectionId = `final-cta-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="w-full bg-[#FAF9F7]">
      <div class="relative z-10 pt-20 md:pt-40 px-4 md:px-8 lg:px-16 mb-[-100px]">
        <div class="w-full max-w-[1440px] mx-auto">
          <div class="bg-[#D0EC1A] rounded-[20px] md:rounded-[40px] flex flex-col justify-center items-start overflow-hidden relative">
            {/* Main Content */}
            <div class="w-full p-8 md:p-12 lg:p-20 flex flex-col lg:flex-row justify-start items-center gap-6 lg:gap-6 relative z-10">
              {/* Left Content - Title */}
              <div class="flex-1 flex flex-col justify-start items-start gap-6 lg:gap-10">
                <h2 class="w-full text-[#07401A] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight lg:leading-[56px]">
                  {title}
                </h2>
              </div>

              {/* Right Content - Buttons */}
              <div class="flex-1 flex flex-col justify-start items-start gap-2 w-full">
                {/* Primary Button - Dark */}
                <a
                  href={primaryButton.url}
                  class="w-full px-5 py-6 bg-[#07401A] rounded-xl flex justify-between items-center group hover:bg-[#07401A]/90 transition-colors duration-300"
                >
                  <span class="text-[#D0EC1A] text-base md:text-lg font-medium leading-snug">
                    {primaryButton.text}
                  </span>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    class="text-[#D0EC1A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>

                {/* Secondary Button - Light */}
                <a
                  href={secondaryButton.url}
                  class="w-full px-5 py-3 bg-[#FAF9F7] rounded-xl flex justify-between items-center group hover:bg-[#F5F4F0] transition-colors duration-300"
                >
                  <span class="text-[#1C1917] text-base md:text-lg font-medium leading-snug">
                    {secondaryButton.text}
                  </span>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    class="text-[#1C1917] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Dithering Animation at Bottom */}
            <div class="w-full h-16 md:h-20 relative overflow-hidden">
              <canvas
                id={`dither-canvas-${sectionId}`}
                class="absolute inset-0 w-full h-full pointer-events-none"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dithering Animation Script */}
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

            // Set canvas size to match container
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
            const cellSize = 2;

            const animate = () => {
              if (canvas.width === 0 || canvas.height === 0) return;

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              // Create noise texture for dithering base
              const imageData = ctx.createImageData(
                canvas.width,
                canvas.height,
              );
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  // Normalized coordinates
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Create extremely subtle dithering with gentle flowing movement
                  const edgeOffset = Math.sin(nx * 2 + time * 0.0002) * 0.05;
                  const animatedEdgeStart = 0.8 + edgeOffset;

                  const bottomEdge = Math.max(
                    0,
                    (ny - animatedEdgeStart) / 0.2,
                  );
                  const bottomFocus = Math.pow(bottomEdge, 4);

                  // Flowing waves that create organic movement
                  const wave1 = Math.sin(nx * 3 + time * 0.0003) * 0.06 *
                    bottomFocus;
                  const wave2 = Math.cos(nx * 5 + time * 0.0002) * 0.04 *
                    bottomFocus;
                  const wave3 = Math.sin((nx + ny) * 2 + time * 0.0001) * 0.03 *
                    bottomFocus;

                  // Minimal base intensity with gentle organic flow
                  let intensity = 0.94 + (bottomFocus * 0.12) + wave1 + wave2 +
                    wave3;

                  // Clamp intensity to 0-1 range
                  intensity = Math.max(0, Math.min(1, intensity));

                  // Get Bayer matrix threshold
                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  // Apply dithering with design system colors
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
                      data[pixelIndex] = r; // Red
                      data[pixelIndex + 1] = g; // Green
                      data[pixelIndex + 2] = b; // Blue
                      data[pixelIndex + 3] = 255; // Alpha
                    }
                  }
                }
              }

              ctx.putImageData(imageData, 0, 0);

              time += 16;
              animationRef = requestAnimationFrame(animate);
            };

            // Start animation
            animate();

            // Cleanup on page unload
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
