import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface StepDetail {
  /**
   * @title Texto
   */
  text: string;
}

/**
 * @titleBy title
 */
interface ProcessStep {
  /**
   * @title Número
   * @description Ex: 01, 02, etc.
   */
  number: string;
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Timeline
   * @description Ex: Weeks 1-2
   */
  timeline: string;
  /**
   * @title Descrição
   */
  description: string;
  /**
   * @title Detalhes
   */
  details: StepDetail[];
  /**
   * @title Destaque
   * @description Texto em destaque no final
   */
  highlight?: string;
}

export interface Props {
  /**
   * @title Badge
   */
  badge?: string;
  /**
   * @title Title
   */
  title?: string;
  /**
   * @title Steps
   * @description Lista de passos do processo
   */
  steps?: ProcessStep[];
}

export default function AIPartnerProcessSteps({
  badge,
  title,
  steps,
}: Props) {
  const sectionId = `aipartner-process-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="relative py-32 overflow-hidden bg-dc-950">
      <div class="absolute right-0 top-1/4 w-[300px] h-[600px] bg-primary-light/5 rounded-full blur-[120px] pointer-events-none" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          {/* Header */}
          <div class="text-center mb-20 animate-on-scroll opacity-0 translate-y-10">
            {badge && (
              <p class="text-primary-light uppercase tracking-[0.25em] text-xs font-sans font-medium mb-6">
                {badge}
              </p>
            )}
            {title && (
              <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-dc-50">
                {title}
              </h2>
            )}
          </div>

          {/* Steps */}
          {steps && steps.length > 0 && (
            <div class="space-y-16">
              {steps.map((step, index) => (
                <div
                  class="relative animate-on-scroll opacity-0 translate-y-10"
                  style={{ transitionDelay: `${100 + index * 120}ms` }}
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div class="absolute left-6 top-20 bottom-[-64px] w-px bg-gradient-to-b from-primary-light/30 to-transparent hidden lg:block" />
                  )}

                  <div class="grid lg:grid-cols-[120px_1fr] gap-8">
                    {/* Step number */}
                    <div class="flex lg:flex-col items-center lg:items-start gap-4">
                      <span class="font-serif text-4xl md:text-5xl text-primary-light">
                        {step.number}
                      </span>
                      <span class="text-xs uppercase tracking-wider text-dc-400 whitespace-nowrap">
                        {step.timeline}
                      </span>
                    </div>

                    {/* Content */}
                    <div class="bg-dc-800/30 border border-dc-700 p-8 rounded">
                      <h3 class="font-serif text-2xl md:text-3xl text-dc-50 mb-4">
                        {step.title}
                      </h3>
                      <p class="font-sans text-dc-400 mb-6">{step.description}</p>

                      {step.details && step.details.length > 0 && (
                        <div class="flex flex-wrap gap-2 mb-6 font-sans">
                          {step.details.map((detail) => (
                            <span class="px-3 py-1.5 bg-dc-900 border border-dc-700 text-sm text-dc-300">
                              {detail.text}
                            </span>
                          ))}
                        </div>
                      )}

                      {step.highlight && (
                        <p class="font-sans text-dc-200 font-medium border-l-2 border-primary-light pl-4">
                          {step.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Animation Script */}
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
              { threshold: 0.1, rootMargin: "-50px" }
            );

            elements.forEach((el) => {
              const element = el as HTMLElement;
              element.style.transition =
                "opacity 0.8s ease-out, transform 0.8s ease-out";
              observer.observe(el);
            });
          }, sectionId),
        }}
      />
    </section>
  );
}

