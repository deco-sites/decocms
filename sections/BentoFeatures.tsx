import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy title
 */
interface FeatureCard {
  /**
   * @title Título
   * @description O título do card
   */
  title?: string;

  /**
   * @title Descrição
   * @description A descrição do card
   */
  description?: string;

  /**
   * @title Imagem decorativa
   * @description Imagem opcional para exibir no card
   */
  image?: ImageWidget;
}

/**
 * @titleBy lineNum
 */
interface CodeLine {
  /**
   * @title Número da linha
   */
  lineNum?: number;

  /**
   * @title Conteúdo
   * @description O código desta linha
   */
  content?: string;

  /**
   * @title Classes de highlight
   * @description Classes CSS para syntax highlighting (ex: text-purple-400, text-yellow-400, text-green-400)
   */
  highlightClasses?: string;
}

export interface Props {
  /**
   * @title Título da seção
   */
  sectionTitle?: string;

  /**
   * @title Subtítulo da seção
   */
  sectionSubtitle?: string;

  /**
   * @title Card Principal (Verde)
   */
  mainCard?: {
    /**
     * @title Título
     */
    title?: string;
    /**
     * @title Descrição
     */
    description?: string;
  };

  /**
   * @title Título do arquivo no Code Window
   */
  codeWindowTitle?: string;

  /**
   * @title Linhas de código
   * @description Cada linha do código exibido na janela
   */
  codeLines?: CodeLine[];

  /**
   * @title Card Secure Proxy API
   */
  secureProxyCard?: FeatureCard;

  /**
   * @title Card Org-First Auth
   */
  orgAuthCard?: FeatureCard;

  /**
   * @title Card Universal Vault
   */
  vaultCard?: FeatureCard;

  /**
   * @title Card Trace Everything
   */
  traceCard?: FeatureCard;

  /**
   * @title Card Typed Bindings
   */
  typedCard?: FeatureCard;
}

const defaultProps: Props = {
  sectionTitle: "System Architecture",
  sectionSubtitle:
    "Designed for context engineers who demand type safety, observability, and strict governance.",
  mainCard: {
    title: "Virtual MCP\nComposition",
    description:
      "Aggregate disparate MCP servers into a single, governed virtual endpoint using declarative TypeScript.",
  },
  codeWindowTitle: "mesh.config.ts",
  codeLines: [
    {
      lineNum: 1,
      content:
        '<span class="text-purple-400">const</span> mesh = <span class="text-yellow-400">createVirtualMCP</span> ({',
    },
    { lineNum: 2, content: "  sources: [" },
    { lineNum: 3, content: "    salesforce," },
    { lineNum: 4, content: "    slack," },
    { lineNum: 5, content: "    postgres" },
    { lineNum: 6, content: "  ]," },
    {
      lineNum: 7,
      content: '  policy: <span class="text-green-400">\'require-audit\'</span>',
    },
    { lineNum: 8, content: "});" },
  ],
  secureProxyCard: {
    title: "Secure Proxy API",
    description:
      "Credentials never leave the vault. The Mesh acts as an OAuth client, injecting tokens at request time based on UUID permissions.",
  },
  orgAuthCard: {
    title: "Org-First Auth",
    description:
      "Multi-tenant by default. Permissions, teams, and roles are scoped to the organization level.",
  },
  vaultCard: {
    title: "Universal Vault",
    description:
      "Credentials are isolated in the database and injected only at the proxy layer.",
  },
  traceCard: {
    title: "Trace Everything",
    description:
      "Full observability from User UI → Agent → Tool → DB. Debug latency and costs in real-time.",
  },
  typedCard: {
    title: "Typed Bindings",
    description:
      "Polymorphic tool contracts. Swap providers (e.g., Gmail → Outlook) without changing agent code.",
  },
};

export default function BentoFeatures({
  sectionTitle = defaultProps.sectionTitle,
  sectionSubtitle = defaultProps.sectionSubtitle,
  mainCard = defaultProps.mainCard,
  codeWindowTitle = defaultProps.codeWindowTitle,
  codeLines = defaultProps.codeLines,
  secureProxyCard = defaultProps.secureProxyCard,
  orgAuthCard = defaultProps.orgAuthCard,
  vaultCard = defaultProps.vaultCard,
  traceCard = defaultProps.traceCard,
  typedCard = defaultProps.typedCard,
}: Props) {
  const sectionId = `bento-features-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="w-full bg-dc-50 py-20 lg:py-40 px-4 sm:px-8 lg:px-16">
      <div class="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14">
        {/* Section Header */}
        <div class="flex flex-col gap-6 items-center text-center">
          <h2 class="text-3xl sm:text-4xl lg:text-6xl font-medium text-dc-800 tracking-tight">
            {sectionTitle}
          </h2>
          <p class="text-base sm:text-lg text-dc-500 max-w-2xl">
            {sectionSubtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div class="flex flex-col gap-3">
          {/* Row 1: Main Card + 2 Stacked Cards */}
          <div class="flex flex-col lg:flex-row gap-3">
            {/* Main Green Card */}
            <div
              class="relative bg-primary-light rounded-xl overflow-hidden h-auto lg:h-[630px] lg:w-[55%] min-h-[400px]"
              data-animate="card"
            >
              {/* ASCII Dithering Animation */}
              <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <canvas
                  id={`dither-canvas-${sectionId}`}
                  class="absolute inset-0 w-full h-full"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              {/* Content */}
              <div class="relative z-10 p-8 lg:p-12 flex flex-col gap-6 h-full">
                <div class="flex flex-col gap-4 max-w-72">
                  <h3 class="text-2xl lg:text-3xl font-medium text-primary-dark leading-tight">
                    {mainCard?.title}
                  </h3>
                  <p class="text-base lg:text-lg text-[#536619] leading-relaxed">
                    {mainCard?.description}
                  </p>
                </div>

                {/* Code Window - Positioned to overflow */}
                <div class="absolute bottom-0 right-0 lg:right-8 w-full max-w-lg lg:max-w-[520px] translate-y-1/3">
                  <div class="bg-emerald-950 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Window Header */}
                    <div class="flex items-center gap-4 px-5 py-4">
                      <div class="flex items-center gap-2">
                        <div class="w-4 h-4 rounded-full bg-red-400" />
                        <div class="w-4 h-4 rounded-full bg-yellow-400" />
                        <div class="w-4 h-4 rounded-full bg-green-400" />
                      </div>
                      <span class="text-gray-400 text-sm font-normal">
                        {codeWindowTitle}
                      </span>
                    </div>

                    {/* Code Content */}
                    <div class="px-6 pb-6">
                      <pre class="text-sm leading-7 font-mono">
                        {codeLines?.map((line) => (
                          <div class="flex" key={line.lineNum}>
                            <code
                              class={`text-white flex-1 ${line.highlightClasses || ""}`}
                              dangerouslySetInnerHTML={{
                                __html: line.content || "&nbsp;",
                              }}
                            />
                          </div>
                        ))}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2 Stacked Cards */}
            <div class="flex flex-col gap-3 lg:w-[45%]">
              {/* Secure Proxy Card */}
              <div
                class="bg-dc-100 border border-dc-200 rounded-xl p-8 lg:p-12 flex-1 flex flex-col justify-end min-h-64"
                data-animate="card"
              >
                <div class="flex flex-col gap-4">
                  <h3 class="text-2xl lg:text-3xl font-medium text-dc-900 leading-tight">
                    {secureProxyCard?.title}
                  </h3>
                  <p class="text-base lg:text-lg text-dc-500 leading-relaxed max-w-md">
                    {secureProxyCard?.description}
                  </p>
                </div>
              </div>

              {/* Org-First Auth Card */}
              <div
                class="bg-dc-100 border border-dc-200 rounded-xl p-8 lg:p-12 flex-1 flex flex-col justify-end min-h-64 relative overflow-hidden"
                data-animate="card"
              >
                {/* Decorative Icons Grid */}
                <div class="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                  <div class="relative w-64 h-52">
                    {/* Center Icon (larger) */}
                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-dc-50 border border-dc-300 rounded-3xl flex items-center justify-center">
                      <svg
                        class="w-12 h-12 text-dc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                    </div>

                    {/* Surrounding smaller icons */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45 * Math.PI) / 180;
                      const radius = 85;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <div
                          class="absolute w-14 h-14 bg-dc-50 border border-dc-200 rounded-2xl flex items-center justify-center opacity-50"
                          style={{
                            left: `calc(50% + ${x}px - 28px)`,
                            top: `calc(50% + ${y}px - 28px)`,
                          }}
                          key={i}
                        >
                          <div class="w-6 h-6 bg-dc-200 rounded-lg" />
                        </div>
                      );
                    })}

                    {/* Connection lines (SVG) */}
                    <svg class="absolute inset-0 w-full h-full pointer-events-none">
                      {[...Array(8)].map((_, i) => {
                        const angle = (i * 45 * Math.PI) / 180;
                        const innerRadius = 48;
                        const outerRadius = 60;
                        const x1 = 128 + Math.cos(angle) * innerRadius;
                        const y1 = 104 + Math.sin(angle) * innerRadius;
                        const x2 = 128 + Math.cos(angle) * outerRadius;
                        const y2 = 104 + Math.sin(angle) * outerRadius;
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#D6D3D1"
                            stroke-width="1.5"
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                <div class="flex flex-col gap-4 max-w-56">
                  <h3 class="text-2xl lg:text-3xl font-medium text-dc-900 leading-tight">
                    {orgAuthCard?.title}
                  </h3>
                  <p class="text-base lg:text-lg text-dc-500 leading-relaxed">
                    {orgAuthCard?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: 3 Equal Cards */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Universal Vault Card */}
            <div
              class="bg-dc-100 border border-dc-200 rounded-xl p-8 lg:p-12 flex flex-col justify-end min-h-64 lg:min-h-80"
              data-animate="card"
            >
              <div class="flex flex-col gap-4">
                <h3 class="text-2xl lg:text-3xl font-medium text-dc-900 leading-tight">
                  {vaultCard?.title}
                </h3>
                <p class="text-base lg:text-lg text-dc-500 leading-relaxed">
                  {vaultCard?.description}
                </p>
              </div>
            </div>

            {/* Trace Everything Card */}
            <div
              class="bg-dc-100 border border-dc-200 rounded-xl p-8 lg:p-12 flex flex-col justify-end min-h-64 lg:min-h-80"
              data-animate="card"
            >
              <div class="flex flex-col gap-4">
                <h3 class="text-2xl lg:text-3xl font-medium text-dc-900 leading-tight">
                  {traceCard?.title}
                </h3>
                <p class="text-base lg:text-lg text-dc-500 leading-relaxed">
                  {traceCard?.description}
                </p>
              </div>
            </div>

            {/* Typed Bindings Card */}
            <div
              class="bg-dc-100 border border-dc-200 rounded-xl p-8 lg:p-12 flex flex-col justify-end min-h-64 lg:min-h-80"
              data-animate="card"
            >
              <div class="flex flex-col gap-4">
                <h3 class="text-2xl lg:text-3xl font-medium text-dc-900 leading-tight">
                  {typedCard?.title}
                </h3>
                <p class="text-base lg:text-lg text-dc-500 leading-relaxed">
                  {typedCard?.description}
                </p>
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

            // Primary light color: #D0EC1A -> RGB(208, 236, 26)
            // #8CAA25 -> RGB(140, 170, 37)
            const lightColor = { r: 0xd0, g: 0xec, b: 0x1a };
            const darkColor = { r: 0x8c, g: 0xaa, b: 0x25 };

            const animate = () => {
              if (canvas.width === 0 || canvas.height === 0) return;

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const imageData = ctx.createImageData(canvas.width, canvas.height);
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns - flowing from top-left to bottom-right
                  const waveBase = Math.sin(nx * 5 + ny * 2 + time * 0.0003) * 0.2;
                  const waveSecond = Math.cos(nx * 3 - ny * 4 + time * 0.0004) * 0.15;
                  const waveThird = Math.sin((nx + ny) * 4 + time * 0.0002) * 0.1;

                  // Diagonal gradient from top-left (light) to bottom-right (dark)
                  const diagonalGradient = (nx + ny) / 2;

                  let intensity =
                    1 - diagonalGradient * 0.6 + waveBase + waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.04;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  const color = ditherResult ? lightColor : darkColor;

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
                      data[pixelIndex] = color.r;
                      data[pixelIndex + 1] = color.g;
                      data[pixelIndex + 2] = color.b;
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

      {/* GSAP Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const initGSAP = () => {
              const gsap = (globalThis as unknown as { gsap?: typeof import("gsap").gsap }).gsap;
              const ScrollTrigger = (globalThis as unknown as { ScrollTrigger?: typeof import("gsap/ScrollTrigger").ScrollTrigger }).ScrollTrigger;

              if (!gsap || !ScrollTrigger) {
                setTimeout(initGSAP, 100);
                return;
              }

              gsap.registerPlugin(ScrollTrigger);

              const section = document.querySelector(`[data-section-id="${sectionId}"]`) || document.currentScript?.closest("section");
              if (!section) return;

              // Animate header
              const header = section.querySelector("h2");
              const subtitle = section.querySelector("h2 + p");

              if (header) {
                gsap.fromTo(
                  header,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: header,
                      start: "top 85%",
                      toggleActions: "play none none none",
                    },
                  }
                );
              }

              if (subtitle) {
                gsap.fromTo(
                  subtitle,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: subtitle,
                      start: "top 85%",
                      toggleActions: "play none none none",
                    },
                  }
                );
              }

              // Animate cards with stagger
              const cards = section.querySelectorAll("[data-animate='card']");
              cards.forEach((card, index) => {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 40, scale: 0.98 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 90%",
                      toggleActions: "play none none none",
                    },
                  }
                );
              });
            };

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", initGSAP);
            } else {
              initGSAP();
            }
          }, sectionId),
        }}
      />
    </section>
  );
}

export function Preview() {
  return <BentoFeatures {...defaultProps} />;
}

