import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy name
 */
interface ContextStep {
  /**
   * @title Nome do Step
   * @description Nome do passo (ex: "Public Context")
   */
  name: string;
  /**
   * @title Descrição
   * @description Descrição curta do passo
   */
  description: string;
  /**
   * @title Ícone (Material Design)
   * @description Nome do ícone do Material Design
   */
  icon: string;
  /**
   * @title Destaque
   * @description Se este step deve ter destaque visual
   */
  highlighted?: boolean;
}

interface Props {
  /**
   * @title Badge
   * @description Texto do badge acima do título
   */
  badge?: string;
  /**
   * @title Título Linha 1
   * @description Primeira linha do título
   */
  titleLine1?: string;
  /**
   * @title Título Linha 2
   * @description Segunda linha do título
   */
  titleLine2?: string;
  /**
   * @title Destaque do Título
   * @description Palavra ou frase destacada no título (ex: "DecoCMS")
   */
  titleHighlight?: string;
  /**
   * @title Descrição
   * @description Texto descritivo abaixo do título
   */
  description?: string;
  /**
   * @title Texto Botão Principal
   * @description Texto do botão principal (CTA)
   */
  primaryButtonText?: string;
  /**
   * @title Link Botão Principal
   * @description URL do botão principal
   */
  primaryButtonLink?: string;
  /**
   * @title Texto Botão Secundário
   * @description Texto do botão secundário
   */
  secondaryButtonText?: string;
  /**
   * @title Link Botão Secundário
   * @description URL do botão secundário
   */
  secondaryButtonLink?: string;
  /**
   * @title Steps do Context Flow
   * @description Passos que aparecem no visual do fluxo de contexto
   */
  contextSteps?: ContextStep[];
}

export default function CommunicationOSHero({
  badge = "The Future of Enterprise Context",
  titleLine1 = 'Your Digital "Chief of Staff".',
  titleLine2 = "Now Automated.",
  titleHighlight = "DecoCMS",
  description = "is the Communication OS that transforms fragmented conversations into strategic alignment. Stop waiting for static reports and get answers in real-time.",
  primaryButtonText = "Analyze Company Context",
  primaryButtonLink = "#",
  secondaryButtonText = "See How It Works",
  secondaryButtonLink = "#how-it-works",
  contextSteps = [
    {
      name: "Public Context",
      description: "Website, News, LinkedIn",
      icon: "database",
      highlighted: false,
    },
    {
      name: "Private Context",
      description: "Slack, Drive, Notion",
      icon: "fingerprint",
      highlighted: false,
    },
    {
      name: "Chief of Staff Agent",
      description: "Answers & Actions",
      icon: "smart_toy",
      highlighted: true,
    },
  ],
}: Props) {
  const sectionId = `comm-os-hero-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 pt-6 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Hero Content Area */}
        <div class="flex flex-col items-center pt-24 md:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Main Content - Centered */}
          <div class="w-full max-w-[930px] flex flex-col items-center gap-6">
            {/* Badge */}
            {badge && (
              <div class="inline-flex items-center px-4 py-2 bg-dc-200/50 border border-dc-300 rounded-full">
                <span class="text-dc-800 text-sm font-semibold">{badge}</span>
              </div>
            )}

            {/* Title */}
            <h1 class="text-center text-dc-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-medium leading-none tracking-tight">
              {titleLine1}
              <br />
              <span class="text-[#8caa25]">{titleLine2}</span>
            </h1>

            {/* Description */}
            <p class="w-full max-w-[600px] text-dc-500 text-lg md:text-xl font-normal leading-relaxed text-center">
              <span class="text-dc-900 font-semibold">{titleHighlight}</span>{" "}
              {description}
            </p>

            {/* Buttons */}
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <a
                href={primaryButtonLink}
                class="px-8 py-4 bg-dc-900 text-white rounded-xl text-base font-medium hover:bg-dc-800 transition-colors"
              >
                {primaryButtonText}
              </a>
              <a
                href={secondaryButtonLink}
                class="px-8 py-4 bg-primary-light text-primary-dark rounded-xl text-base font-medium hover:bg-primary-light/90 transition-colors"
              >
                {secondaryButtonText}
              </a>
            </div>
          </div>
        </div>

        {/* ASCII Dithering Animation - Behind context flow */}
        <div class="absolute bottom-0 left-0 right-0 h-[45%] overflow-hidden pointer-events-none z-[1]">
          <canvas
            id={`dither-canvas-${sectionId}`}
            class="absolute inset-0 w-full h-full"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Context Flow Visual - Positioned at bottom */}
        <div class="relative z-10 mt-auto pb-8 md:pb-12 px-4 md:px-8 pt-32">
          <div
            id={sectionId}
            class="w-full max-w-[900px] mx-auto bg-white/95 backdrop-blur-sm rounded-2xl border border-dc-200 p-6 md:p-10 shadow-xl"
          >
            <div class="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4">
              {contextSteps?.map((step, index) => (
                <>
                  {/* Step Card */}
                  <div
                    class={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 context-step ${
                      step.highlighted
                        ? "bg-primary-light shadow-lg"
                        : "bg-transparent"
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div
                      class={`w-16 h-16 flex items-center justify-center mb-4 ${
                        step.highlighted ? "text-primary-dark" : "text-dc-500"
                      }`}
                    >
                      <span
                        class="material-symbols-outlined text-5xl"
                        style={{ fontSize: "48px" }}
                      >
                        {step.icon}
                      </span>
                    </div>
                    <div
                      class={`font-bold text-base md:text-lg ${
                        step.highlighted ? "text-primary-dark" : "text-dc-900"
                      }`}
                    >
                      {step.name}
                    </div>
                    <div
                      class={`text-sm mt-1 ${
                        step.highlighted ? "text-primary-dark" : "text-dc-500"
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < (contextSteps?.length ?? 0) - 1 && (
                    <div class="hidden md:flex items-center text-primary-light">
                      <span
                        class="material-symbols-outlined text-3xl"
                        style={{ fontSize: "32px" }}
                      >
                        arrow_forward
                      </span>
                    </div>
                  )}

                  {/* Arrow for mobile (vertical) */}
                  {index < (contextSteps?.length ?? 0) - 1 && (
                    <div class="flex md:hidden items-center text-primary-light">
                      <span
                        class="material-symbols-outlined text-3xl"
                        style={{ fontSize: "32px" }}
                      >
                        arrow_downward
                      </span>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Material Icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        rel="stylesheet"
      />

      {/* GSAP Animation Script */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer />

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

              const imageData = ctx.createImageData(canvas.width, canvas.height);
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns
                  const waveBase = Math.sin(nx * 4 + time * 0.0004) * 0.15;
                  const waveSecond = Math.cos(nx * 7 + time * 0.0003) * 0.1;
                  const waveThird = Math.sin((nx + ny) * 3 + time * 0.0002) * 0.08;

                  // Gradient from top (transparent/light) to bottom (more visible)
                  const verticalGradient = Math.pow(ny, 0.8);

                  let intensity = 0.95 - (verticalGradient * 0.5) + waveBase + waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.03 * verticalGradient;
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

      {/* GSAP Animation for context steps */}
      <script
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            function initAnimations() {
              const gsap = (globalThis as unknown as { gsap?: unknown }).gsap;
              if (typeof gsap === "undefined") return;

              const section = document.getElementById(sectionId);
              if (!section) return;

              const steps = section.querySelectorAll(".context-step");

              // Animate steps sequentially
              (gsap as { fromTo: Function }).fromTo(
                steps,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.2,
                  ease: "power2.out",
                }
              );
            }

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", initAnimations);
            } else {
              setTimeout(initAnimations, 100);
            }
          }, sectionId),
        }}
      />
    </section>
  );
}

export function Preview() {
  return <CommunicationOSHero />;
}
