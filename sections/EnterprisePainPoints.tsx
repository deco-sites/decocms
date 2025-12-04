import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface PainPoint {
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Descrição
   */
  description: string;
}

export interface Props {
  /**
   * @title Título Principal
   */
  title?: string;
  /**
   * @title Título Destacado
   * @description Parte do título em cor de destaque
   */
  titleHighlight?: string;
  /**
   * @title Descrição
   * @format textarea
   */
  description?: string;
  /**
   * @title Pain Points
   * @description Lista de problemas
   */
  painPoints?: PainPoint[];
  /**
   * @title Imagem do lado direito
   * @description Imagem ilustrativa
   */
  sideImage?: ImageWidget;
}

export default function EnterprisePainPoints({
  title = "Your teams are building AI.",
  titleHighlight = "Are you governing it?",
  description = "Business teams are prototyping in Lovable, n8n, and ChatGPT—but prototypes don't ship. Engineering becomes a bottleneck. Shadow IT spreads. Compliance gets nervous. You're stuck choosing between innovation velocity and control.",
  painPoints = [
    {
      title: "Shadow IT Chaos",
      description: "Ungoverned tools leading to data leaks.",
    },
    {
      title: "Prototypes Never Ship",
      description: "No auth, no audit trails, no prod infra.",
    },
    {
      title: "Cost Surprises",
      description: "Runaway token usage and fragmented billing.",
    },
  ],
  sideImage = "https://assets.decocache.com/decocms/50b732a5-9e11-4bb8-b087-cf1561cf3500/govern.png",
}: Props) {
  const sectionId = `pain-points-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="w-full bg-dc-50">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-10">
        <div class="flex flex-col lg:flex-row gap-6 items-center">
          {/* Left Content */}
          <div class="flex-1 flex flex-col gap-6 p-8 lg:pl-8 lg:pr-20 lg:py-8 justify-center animate-on-scroll opacity-0 translate-y-8">
            <div class="flex flex-col gap-6">
              {/* Title */}
              <h2 class="text-3xl sm:text-4xl lg:text-[48px] font-medium text-dc-800 tracking-tight !leading-[48px]">
                {title}
                <br />
                <span class="text-[#8CAA25]">{titleHighlight}</span>
              </h2>

              {/* Description */}
              <p class="text-base lg:text-[18px] text-dc-500 leading-[24px]">
                {description}
              </p>

              {/* Pain Points List */}
              <div class="flex flex-col gap-4 mt-4">
                {painPoints?.map((point, i) => (
                  <div
                    key={i}
                    class="flex gap-4 items-start animate-on-scroll opacity-0 translate-y-4"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div class="mt-1 p-1 bg-red-100 rounded text-red-600 flex-shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <h4 class="font-semibold text-dc-900">{point.title}</h4>
                      <p class="text-sm text-dc-500">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image Area with ASCII Animation */}
          <div class="flex-1 min-h-[400px] lg:min-h-[540px] border-[0.5px] border-[#8CAA25] rounded-2xl overflow-hidden relative animate-on-scroll opacity-0 translate-y-8">
            {/* ASCII Dithering Animation Background - Full area with gradient */}
            <canvas
              id={`dither-canvas-${sectionId}`}
              class="absolute inset-0 w-full h-full"
              style={{ imageRendering: "pixelated" }}
            />
            {/* Image overlay */}
            {sideImage && (
              <Image
                src={sideImage}
                alt="Illustration"
                width={794}
                height={780}
                class="absolute inset-0 w-full h-full object-cover object-center z-10"
              />
            )}
          </div>
        </div>
      </div>

      {/* Scroll Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const elements = section.querySelectorAll(".animate-on-scroll");

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    observer.unobserve(el);
                  }
                });
              },
              { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
            );

            elements.forEach((el) => {
              const element = el as HTMLElement;
              element.style.transition =
                "opacity 0.6s ease-out, transform 0.6s ease-out";
              observer.observe(el);
            });
          }, sectionId),
        }}
      />

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
              if (canvas.width === 0 || canvas.height === 0) {
                animationRef = requestAnimationFrame(animate);
                return;
              }

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

                  // Wave patterns (same as EnterpriseHero)
                  const waveBase = Math.sin(nx * 4 + time * 0.0004) * 0.15;
                  const waveSecond = Math.cos(nx * 7 + time * 0.0003) * 0.1;
                  const waveThird = Math.sin((nx + ny) * 3 + time * 0.0002) * 0.08;

                  // Gradient from top (transparent/light) to bottom (more particles)
                  const verticalGradient = Math.pow(ny, 0.8);

                  let intensity = 0.95 - (verticalGradient * 0.5) + waveBase + waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.03 * verticalGradient;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  // primary-light: #D0EC1A, particles: #8CAA25
                  const r = ditherResult ? 0xd0 : 0x8c;
                  const g = ditherResult ? 0xec : 0xaa;
                  const b = ditherResult ? 0x1a : 0x25;

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
