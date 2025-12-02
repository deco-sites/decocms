import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface DifferentiatorItem {
  /**
   * @title Título
   * @description Título do diferencial
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição do diferencial
   */
  description: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal da seção
   */
  title?: string;
  /**
   * @title Subtítulo
   * @description Descrição abaixo do título
   */
  subtitle?: string;
  /**
   * @title Diferenciais
   * @description Lista de diferenciais (idealmente 4)
   * @maxItems 6
   */
  differentiators?: DifferentiatorItem[];
}

export default function MCPMeshWhyUs({
  title = "Why Deco MCP Mesh?",
  subtitle = "The open alternative for AI governance.",
  differentiators = [
    {
      title: "Open Source",
      description:
        "Full transparency. No proprietary code hidden in your security layer.",
    },
    {
      title: "Self-Host",
      description:
        "Keep your data and credentials on your infrastructure. Run on your Kubernetes or locally.",
    },
    {
      title: "No Vendor Lock-in",
      description:
        "Switch LLM providers or MCP tools without rewriting your applications.",
    },
    {
      title: "Unified Solution",
      description:
        "Don't pay separately for Gateway, Auth, and Observability. Everything in one package.",
    },
  ],
}: Props) {
  const sectionId = `whyus-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id={sectionId}
      class="w-full bg-dc-900 py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* ASCII Dithering Animation Background */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <canvas
          id={`dither-canvas-${sectionId}`}
          class="absolute inset-0 w-full h-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div class="mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2 class="text-dc-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-2 md:mb-4">
            {title}
          </h2>
          <p class="text-dc-400 text-base md:text-lg">{subtitle}</p>
        </div>

        {/* Differentiators Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {differentiators?.map((item, index) => (
            <div
              key={index}
              class="border-l-4 border-primary-light pl-4 md:pl-6 animate-on-scroll opacity-0 translate-x-[-20px]"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 class="text-dc-50 text-lg md:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p class="text-dc-400 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
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
                    el.style.transform = "translateY(0) translateX(0)";
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
            const cellSize = 4;

            const animate = () => {
              if (canvas.width === 0 || canvas.height === 0) return;

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const imageData = ctx.createImageData(canvas.width, canvas.height);
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns - slower and more subtle for background
                  const waveBase = Math.sin(nx * 3 + time * 0.0002) * 0.12;
                  const waveSecond = Math.cos(ny * 5 + time * 0.00015) * 0.08;
                  const waveThird = Math.sin((nx + ny) * 2 + time * 0.0001) * 0.06;

                  // Radial gradient from center
                  const centerX = 0.5;
                  const centerY = 0.5;
                  const distFromCenter = Math.sqrt(
                    Math.pow(nx - centerX, 2) + Math.pow(ny - centerY, 2)
                  );
                  const radialGradient = Math.min(distFromCenter * 1.5, 1);

                  let intensity = 0.15 + (radialGradient * 0.25) + waveBase + waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.02;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  // dc-900: #1C1917 (background), dc-800: #292524 (lighter)
                  const r = ditherResult ? 0x29 : 0x1c;
                  const g = ditherResult ? 0x25 : 0x19;
                  const b = ditherResult ? 0x24 : 0x17;

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
