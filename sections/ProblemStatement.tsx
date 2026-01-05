import { useScript } from "@deco/deco/hooks";

/**
 * @title Problem Statement Section
 * @description Seção que destaca o problema com MCP quando escala
 */
interface Props {
  /**
   * @title Texto Principal (Parte 1)
   * @description Primeira parte do título principal (antes do destaque)
   */
  mainTextPart1?: string;
  /**
   * @title Texto Principal (Parte 2 - Destacada)
   * @description Segunda parte do título em destaque vermelho
   */
  mainTextPart2?: string;
  /**
   * @title Descrição
   * @description Texto descritivo abaixo do título principal
   */
  description?: string;
}

export default function ProblemStatement({
  mainTextPart1 = "MCP is quickly becoming the standard for agentic systems—",
  mainTextPart2 = "until you have to connect 10, 30, or 100 servers.",
  description = `Then the context window starts exploding with tool schemas and descriptions, the model picks the wrong tool (or the wrong params), tokens get burned on definitions instead of work, and governance fractures into "tokens everywhere, logs nowhere."`,
}: Props) {
  const sectionId = `problem-statement-${Math.random().toString(36).substr(2, 9)}`;

  // Split text into words for animation
  const words1 = mainTextPart1.split(" ");
  const words2 = mainTextPart2.split(" ");

  return (
    <div
      id={sectionId}
      class="relative w-full bg-dc-50 overflow-hidden"
    >
      {/* Left Fire Animation - Narrow strip on edge only */}
      <canvas
        id={`fire-canvas-left-${sectionId}`}
        class="absolute left-0 top-0 h-full w-24 md:w-32 lg:w-40 pointer-events-none z-0"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Right Fire Animation - Narrow strip on edge only */}
      <canvas
        id={`fire-canvas-right-${sectionId}`}
        class="absolute right-0 top-0 h-full w-24 md:w-32 lg:w-40 pointer-events-none z-0"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Content Container */}
      <div class="relative z-10 flex flex-col items-center gap-6 md:gap-8 px-6 sm:px-12 md:px-20 lg:px-40 py-16 md:py-20 lg:py-24">
        {/* Main Heading with word-by-word animation */}
        <h2 class="text-center text-dc-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-heading-lg font-medium leading-tight tracking-tight max-w-5xl">
          {/* Part 1 - Dark text */}
          {words1.map((word, index) => (
            <>
              <span
                class="animated-word inline-block opacity-0"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {word}
              </span>{" "}
            </>
          ))}
          {/* Part 2 - Red text */}
          {words2.map((word, index) => (
            <>
              <span
                class="animated-word inline-block opacity-0 text-red-500"
                style={{ animationDelay: `${(words1.length + index) * 80}ms` }}
              >
                {word}
              </span>{" "}
            </>
          ))}
        </h2>

        {/* Description with fade in */}
        <p
          class="text-center text-dc-500 text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-4xl animated-description opacity-0"
          style={{ animationDelay: `${(words1.length + words2.length) * 80 + 200}ms` }}
        >
          {description}
        </p>
      </div>

      {/* Animation Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes wordFadeIn {
              0% {
                opacity: 0;
                transform: translateY(12px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animated-word.animate {
              animation: wordFadeIn 0.5s ease-out forwards;
            }

            .animated-description.animate {
              animation: wordFadeIn 0.8s ease-out forwards;
            }
          `,
        }}
      />

      {/* Fire Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            // Simplified Perlin-like noise (based on the shader reference)
            function fade(t: number): number {
              return t * t * t * (t * (t * 6 - 15) + 10);
            }

            function lerp(a: number, b: number, t: number): number {
              return a + t * (b - a);
            }

            // Permutation table for noise
            const perm: number[] = [];
            for (let i = 0; i < 256; i++) perm[i] = i;
            for (let i = 255; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [perm[i], perm[j]] = [perm[j], perm[i]];
            }
            for (let i = 0; i < 256; i++) perm[256 + i] = perm[i];

            function grad(hash: number, x: number, y: number): number {
              const h = hash & 3;
              const u = h < 2 ? x : y;
              const v = h < 2 ? y : x;
              return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
            }

            function noise(x: number, y: number): number {
              const X = Math.floor(x) & 255;
              const Y = Math.floor(y) & 255;
              x -= Math.floor(x);
              y -= Math.floor(y);
              const u = fade(x);
              const v = fade(y);
              const A = perm[X] + Y;
              const B = perm[X + 1] + Y;
              return lerp(
                lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
                lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
                v
              );
            }

            // Fractal Brownian Motion (fbm) - creates organic fire-like patterns
            function fbm(x: number, y: number, octaves: number = 4, persistence: number = 0.5): number {
              let value = 0;
              let amplitude = 1;
              let frequency = 1;
              let maxValue = 0;
              
              for (let i = 0; i < octaves; i++) {
                value += amplitude * Math.abs(noise(x * frequency, y * frequency));
                maxValue += amplitude;
                amplitude *= persistence;
                frequency *= 2;
              }
              
              return value / maxValue;
            }

            function initFireCanvas(canvasId: string, isLeft: boolean) {
              const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
              if (!canvas) return null;

              const ctx = canvas.getContext("2d");
              if (!ctx) return null;

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
              const waveSpeed = 0.05; // Faster animation
              const waveFrequency = 3;

              const animate = () => {
                if (canvas.width === 0 || canvas.height === 0) {
                  animationRef = requestAnimationFrame(animate);
                  return;
                }

                const imageData = ctx.createImageData(canvas.width, canvas.height);
                const data = imageData.data;

                for (let y = 0; y < canvas.height; y += cellSize) {
                  for (let x = 0; x < canvas.width; x += cellSize) {
                    const nx = x / canvas.width;
                    const ny = y / canvas.height;

                    // FBM noise for irregular flame edge (scrolls upward like rising flames)
                    const edgeNoiseY = ny * 5 - time * waveSpeed * 2;
                    const edgeNoise = fbm(0.5, edgeNoiseY, 4, 0.65);
                    
                    // Secondary edge noise for more variation
                    const edgeNoise2 = fbm(1.5, ny * 8 - time * waveSpeed * 1.5, 3, 0.55) * 0.5;
                    
                    // Tertiary noise for extra irregularity
                    const edgeNoise3 = fbm(2.5, ny * 12 - time * waveSpeed * 2.5, 2, 0.4) * 0.25;
                    
                    // Irregular edge offset - more dramatic flame boundary
                    const edgeOffset = (edgeNoise * 0.45 + edgeNoise2 + edgeNoise3) - 0.25;

                    // Horizontal gradient with irregular edge
                    const horizontalGradient = isLeft ? (1 - nx) : nx;
                    // Add edge offset to create flame-like irregular boundary
                    const adjustedGradient = horizontalGradient + edgeOffset;
                    const edgeFade = Math.pow(Math.max(0, adjustedGradient), 1.3);

                    // FBM noise for internal fire texture
                    const noiseX = nx * waveFrequency;
                    const noiseY = ny * waveFrequency * 2 - time * waveSpeed;
                    const fireNoise = fbm(noiseX, noiseY, 4, 0.5);
                    
                    // Secondary noise layer for more variation  
                    const noiseX2 = nx * waveFrequency * 2 + 100;
                    const noiseY2 = ny * waveFrequency * 3 - time * waveSpeed * 0.8;
                    const fireNoise2 = fbm(noiseX2, noiseY2, 3, 0.4) * 0.25;

                    // Combine - irregular flame edge with internal texture
                    const baseIntensity = edgeFade * 0.75;
                    let intensity = baseIntensity * (0.55 + fireNoise * 0.45 + fireNoise2);
                    intensity = Math.max(0, Math.min(1, intensity));

                    // Bayer dithering
                    const matrixX = Math.floor(x / cellSize) % 8;
                    const matrixY = Math.floor(y / cellSize) % 8;
                    const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                    const ditherResult = intensity > threshold;

                    // Fire color based on intensity (red-300 palette) - lighter, more subtle
                    let r: number, g: number, b: number;
                    
                    if (!ditherResult || intensity < 0.20) {
                      // Background (dc-50)
                      r = 0xfa; g = 0xfa; b = 0xf9;
                    } else if (intensity < 0.40) {
                      // red-100
                      r = 0xfe; g = 0xe2; b = 0xe2;
                    } else if (intensity < 0.55) {
                      // red-200
                      r = 0xfe; g = 0xca; b = 0xca;
                    } else if (intensity < 0.70) {
                      // red-300 (main fire color)
                      r = 0xfc; g = 0xa5; b = 0xa5;
                    } else if (intensity < 0.85) {
                      // red-400
                      r = 0xf8; g = 0x71; b = 0x71;
                    } else {
                      // red-500 (hottest core - only at very edge)
                      r = 0xef; g = 0x44; b = 0x44;
                    }

                    // Fill cell with even squares
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

                // Slow time increment
                time += 0.016;
                animationRef = requestAnimationFrame(animate);
              };

              animate();

              return () => {
                globalThis.removeEventListener("resize", resizeCanvas);
                if (animationRef) {
                  cancelAnimationFrame(animationRef);
                }
              };
            }

            // Initialize both fire canvases
            const cleanupLeft = initFireCanvas(`fire-canvas-left-${sectionId}`, true);
            const cleanupRight = initFireCanvas(`fire-canvas-right-${sectionId}`, false);

            const cleanup = () => {
              cleanupLeft?.();
              cleanupRight?.();
            };

            globalThis.addEventListener("beforeunload", cleanup);
          }, sectionId),
        }}
      />

      {/* Text Animation Script - Intersection Observer based */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const words = section.querySelectorAll(".animated-word");
            const description = section.querySelector(".animated-description");

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    // Animate words
                    words.forEach((word) => {
                      word.classList.add("animate");
                    });
                    // Animate description
                    if (description) {
                      description.classList.add("animate");
                    }
                    // Unobserve after triggering
                    observer.unobserve(entry.target);
                  }
                });
              },
              {
                threshold: 0.2,
                rootMargin: "0px 0px -50px 0px",
              }
            );

            observer.observe(section);
          }, sectionId),
        }}
      />
    </div>
  );
}

export function Preview() {
  return <ProblemStatement />;
}

