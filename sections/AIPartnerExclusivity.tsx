import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface Trait {
  /**
   * @title Texto
   */
  text: string;
}

export interface Props {
  /**
   * @title Badge
   */
  badge?: string;
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
   * @title Traits Intro
   */
  traitsIntro?: string;
  /**
   * @title Traits
   * @description Características do programa
   */
  traits?: Trait[];
  /**
   * @title Traits Outro
   */
  traitsOutro?: string;
  /**
   * @title Acceptance Text
   * @format textarea
   */
  acceptanceText?: string;
  /**
   * @title Acceptance Highlight
   */
  acceptanceHighlight?: string;
}

export default function AIPartnerExclusivity({
  badge,
  titleLine1,
  titleLine2,
  subtitle,
  traitsIntro,
  traits,
  traitsOutro,
  acceptanceText,
  acceptanceHighlight,
}: Props) {
  const sectionId = `aipartner-exclusivity-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id={sectionId}
      class="relative py-32 overflow-hidden bg-dc-800"
    >
      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          {/* Main statement */}
          <div class="mb-12 animate-on-scroll opacity-0 translate-y-10">
            {badge && (
              <p class="text-primary-light uppercase tracking-[0.25em] text-xs font-sans font-medium mb-6">
                {badge}
              </p>
            )}
            <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-dc-50">
              {titleLine1}
              <br />
              <span class="text-primary-light">{titleLine2}</span>
            </h2>
            {subtitle && (
              <p class="font-serif text-2xl text-dc-400 italic">{subtitle}</p>
            )}
          </div>

          {/* Traits */}
          <div
            class="mb-12 animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "150ms" }}
          >
            {traitsIntro && (
              <p class="font-sans text-dc-400 mb-6">{traitsIntro}</p>
            )}
            {traits && traits.length > 0 && (
              <div class="flex flex-wrap justify-center gap-3 font-sans">
                {traits.map((trait) => (
                  <span class="px-5 py-2 border border-primary-light/30 text-dc-200 text-sm">
                    {trait.text}
                  </span>
                ))}
              </div>
            )}
            {traitsOutro && (
              <p class="font-sans text-dc-400 mt-6">{traitsOutro}</p>
            )}
          </div>

          {/* What you get */}
          <div
            class="bg-dc-800/30 border border-dc-700 p-8 md:p-10 animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "300ms" }}
          >
            <p class="font-sans text-lg text-dc-200 leading-relaxed">
              {acceptanceText}
              <br />
              <span class="text-primary-light">{acceptanceHighlight}</span>
            </p>
          </div>
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

