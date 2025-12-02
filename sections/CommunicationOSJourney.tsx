import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface JourneyStep {
  /**
   * @title Número/Ícone do Step
   * @description Número do passo (ex: "01") ou nome do ícone Material Design
   */
  stepIndicator: string;
  /**
   * @title É Ícone?
   * @description Se true, stepIndicator é interpretado como nome de ícone Material Design
   */
  isIcon?: boolean;
  /**
   * @title Título
   * @description Título do passo
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição detalhada do passo
   */
  description: string;
  /**
   * @title Nota Adicional
   * @description Texto adicional (ex: "Modern Stack Supported: Google Workspace, Slack, Notion")
   */
  additionalNote?: string;
  /**
   * @title Ícone do Resultado
   * @description Ícone Material Design para o resultado
   */
  resultIcon?: string;
  /**
   * @title Resultado
   * @description Texto do resultado (ex: "Result: A Context Map in 3 minutes")
   */
  resultText?: string;
  /**
   * @title Badge
   * @description Texto do badge (para steps especiais)
   */
  badge?: string;
  /**
   * @title Citação
   * @description Citação/quote adicional
   */
  quote?: string;
  /**
   * @title É Destaque?
   * @description Se este step deve ter destaque visual especial
   */
  isHighlighted?: boolean;
}

interface Props {
  /**
   * @title Título Principal
   * @description Título da seção
   */
  title?: string;
  /**
   * @title Descrição
   * @description Descrição da seção
   */
  description?: string;
  /**
   * @title Passos da Jornada
   * @description Lista de passos da jornada do usuário
   */
  steps?: JourneyStep[];
}

export default function CommunicationOSJourney({
  title = "The Context Engine Journey",
  description = "From the first click to deep infrastructure.",
  steps = [
    {
      stepIndicator: "01",
      isIcon: false,
      title: "Day 0: Public Context (Instant)",
      description:
        "You enter your domain and email. We crawl your website, LinkedIn, news, and competitors.",
      resultIcon: "bolt",
      resultText: 'Result: A "Context Map" of your company in 3 minutes.',
      isHighlighted: false,
    },
    {
      stepIndicator: "02",
      isIcon: false,
      title: "Day 1: Private Context (Apps)",
      description:
        "Connect your internal tools to give the agent depth.",
      additionalNote: "Modern Stack Supported: Google Workspace, Slack, Notion.",
      resultIcon: "lock",
      resultText:
        "Result: The agent now knows your internal strategy documents.",
      isHighlighted: false,
    },
    {
      stepIndicator: "lan",
      isIcon: true,
      title: "Day N: The Bridge to MCP Mesh",
      description:
        "The moment the vertical product becomes a horizontal platform.",
      additionalNote:
        "Need a specific analysis? Your engineering team builds a Custom MCP on our open-source infrastructure.",
      badge: "Platform Expansion",
      quote:
        '"The Executive defines WHAT. Engineering builds HOW (the MCP). The Agent executes."',
      isHighlighted: true,
    },
  ],
}: Props) {
  const sectionId = `comm-os-journey-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id="how-it-works"
      class="w-full bg-dc-100 py-16 md:py-24 lg:py-32"
    >
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="text-center max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20">
          <h2 class="text-dc-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
            {title}
          </h2>
          <p class="text-dc-500 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Timeline */}
        <div id={sectionId} class="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div class="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-dc-300" />

          {/* Steps */}
          <div class="flex flex-col gap-12 md:gap-16">
            {steps?.map((step, index) => (
              <div key={index} class="step-item flex gap-6 md:gap-8 relative">
                {/* Step Number/Icon Circle */}
                <div
                  class={`relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-dc-100 ${
                    step.isHighlighted
                      ? "bg-purple-dark text-primary-light"
                      : "bg-primary-light text-primary-dark"
                  }`}
                >
                  {step.isIcon ? (
                    <span
                      class="material-symbols-outlined"
                      style={{ fontSize: "24px" }}
                    >
                      {step.stepIndicator}
                    </span>
                  ) : (
                    <span class="font-bold text-sm md:text-base">
                      {step.stepIndicator}
                    </span>
                  )}
                </div>

                {/* Step Content */}
                <div
                  class={`flex-1 bg-white p-6 md:p-8 rounded-2xl border shadow-sm transition-all duration-300 ${
                    step.isHighlighted
                      ? "border-2 border-primary-light"
                      : "border-dc-200"
                  }`}
                >
                  {/* Badge */}
                  {step.badge && (
                    <div class="inline-flex items-center px-3 py-1 bg-primary-light text-primary-dark rounded-full mb-4">
                      <span class="text-xs md:text-sm font-semibold">
                        {step.badge}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h4 class="text-dc-900 text-lg md:text-xl lg:text-2xl font-semibold mb-3">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p class="text-dc-500 text-base md:text-lg font-normal leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Additional Note */}
                  {step.additionalNote && (
                    <p class="text-dc-700 text-sm md:text-base font-medium mb-4">
                      {step.additionalNote}
                    </p>
                  )}

                  {/* Result Box */}
                  {step.resultText && (
                    <div class="bg-dc-100 p-4 rounded-xl flex items-center gap-3">
                      {step.resultIcon && (
                        <span
                          class="material-symbols-outlined text-primary-dark"
                          style={{ fontSize: "20px" }}
                        >
                          {step.resultIcon}
                        </span>
                      )}
                      <span class="text-dc-700 text-sm md:text-base">
                        <strong>Result:</strong>{" "}
                        {step.resultText.replace("Result: ", "")}
                      </span>
                    </div>
                  )}

                  {/* Quote */}
                  {step.quote && (
                    <div class="mt-4 border-l-4 border-primary-light pl-4">
                      <p class="text-dc-600 text-sm md:text-base italic">
                        {step.quote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
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

      <script
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            function initAnimations() {
              const gsap = (globalThis as unknown as { gsap?: unknown }).gsap;
              if (typeof gsap === "undefined") return;

              const section = document.getElementById(sectionId);
              if (!section) return;

              const steps = section.querySelectorAll(".step-item");

              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      (gsap as { fromTo: Function }).fromTo(
                        steps,
                        { opacity: 0, x: -30 },
                        {
                          opacity: 1,
                          x: 0,
                          duration: 0.7,
                          stagger: 0.2,
                          ease: "power2.out",
                        }
                      );
                      observer.unobserve(entry.target);
                    }
                  });
                },
                { threshold: 0.15 }
              );

              observer.observe(section);
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
  return <CommunicationOSJourney />;
}

