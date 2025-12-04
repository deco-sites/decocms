import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy step
 */
interface NextStep {
  /**
   * @title Passo
   * @description Ex: 1, 2, 3
   */
  step: string;
  /**
   * @title Texto
   */
  text: string;
}

/**
 * @titleBy text
 */
interface KeyPoint {
  /**
   * @title Texto
   */
  text: string;
  /**
   * @title Highlight
   */
  highlight: string;
}

export interface Props {
  /**
   * @title Title Line 1
   */
  titleLine1?: string;
  /**
   * @title Title Line 2 (Highlighted)
   */
  titleLine2?: string;
  /**
   * @title Subtitle
   */
  subtitle?: string;
  /**
   * @title Key Points
   * @description Edge, leverage, transformation
   */
  keyPoints?: KeyPoint[];
  /**
   * @title Key Points Outro
   */
  keyPointsOutro?: string;
  /**
   * @title CTA Button Text
   */
  ctaButtonText?: string;
  /**
   * @title CTA Button URL
   */
  ctaButtonUrl?: string;
  /**
   * @title CTA Subtext
   */
  ctaSubtext?: string;
  /**
   * @title Next Steps Label
   */
  nextStepsLabel?: string;
  /**
   * @title Next Steps
   * @description What happens after applying
   */
  nextSteps?: NextStep[];
}

export default function AIPartnerFinalCTA({
  titleLine1,
  titleLine2,
  subtitle,
  keyPoints,
  keyPointsOutro,
  ctaButtonText,
  ctaButtonUrl,
  ctaSubtext,
  nextStepsLabel,
  nextSteps,
}: Props) {
  const sectionId = `aipartner-finalcta-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="relative py-32 overflow-hidden bg-dc-950">
      {/* Ambient glow */}
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary-light/10 rounded-full blur-[180px] pointer-events-none" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          {/* Main message */}
          <div class="mb-12 animate-on-scroll opacity-0 translate-y-10">
            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] mb-8 text-dc-50">
              {titleLine1}
              <br />
              <span class="text-primary-light">{titleLine2}</span>
            </h2>

            {subtitle && (
              <p class="font-sans text-lg text-dc-400 leading-relaxed mb-4">{subtitle}</p>
            )}
          </div>

          {/* Key points */}
          {keyPoints && keyPoints.length > 0 && (
            <div
              class="mb-12 animate-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: "150ms" }}
            >
              <div class="flex flex-col items-center gap-2 text-lg font-sans">
                {keyPoints.map((point, index) => (
                  <span class="text-dc-300">
                    {point.text}{" "}
                    <span
                      class={
                        index === keyPoints.length - 1
                          ? "text-primary-light"
                          : "text-dc-200"
                      }
                    >
                      {point.highlight}
                    </span>
                    .
                  </span>
                ))}
              </div>
              {keyPointsOutro && (
                <p class="font-sans text-dc-400 mt-6">{keyPointsOutro}</p>
              )}
            </div>
          )}

          {/* CTA */}
          <div
            class="mb-10 animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "300ms" }}
          >
            {ctaButtonText && (
              <a
                href={ctaButtonUrl}
                class="group px-8 py-4 bg-primary-light text-primary-dark rounded-xl font-semibold text-lg hover:bg-primary-light/90 transition-all shadow-lg inline-flex items-center justify-center"
              >
                {ctaButtonText}
                <svg
                  class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            )}
            {ctaSubtext && (
              <p class="text-sm text-dc-400 mt-4">{ctaSubtext}</p>
            )}
          </div>

          {/* What happens after you apply */}
          {nextSteps && nextSteps.length > 0 && (
            <div
              class="bg-dc-800/30 border border-dc-700 rounded-lg p-6 animate-on-scroll opacity-0 translate-y-10"
              style={{ transitionDelay: "450ms" }}
            >
              {nextStepsLabel && (
                <p class="text-sm uppercase tracking-[0.15em] text-primary-light mb-4">
                  {nextStepsLabel}
                </p>
              )}
              <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 font-sans">
                {nextSteps.map((item) => (
                  <div class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded-full bg-primary-light/20 text-primary-light text-xs flex items-center justify-center font-medium">
                      {item.step}
                    </span>
                    <span class="text-sm text-dc-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom border */}
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/30 to-transparent" />

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

