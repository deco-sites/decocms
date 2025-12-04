import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface Automation {
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
   * @title Title
   * @format textarea
   */
  title?: string;
  /**
   * @title Automations Intro
   */
  automationsIntro?: string;
  /**
   * @title Automations
   * @description Things we automate or enhance
   */
  automations?: Automation[];
  /**
   * @title Bottom Line 1
   */
  bottomLine1?: string;
  /**
   * @title Bottom Line 1 Highlight
   */
  bottomLine1Highlight?: string;
  /**
   * @title Bottom Line 2
   */
  bottomLine2?: string;
  /**
   * @title Bottom Line 2 Highlight
   */
  bottomLine2Highlight?: string;
}

export default function AIPartnerValueProposition({
  badge,
  title,
  automationsIntro,
  automations,
  bottomLine1,
  bottomLine1Highlight,
  bottomLine2,
  bottomLine2Highlight,
}: Props) {
  const sectionId = `aipartner-value-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id={sectionId}
      class="relative py-32 overflow-hidden bg-dc-800"
    >
      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          {/* Header */}
          <div class="text-center mb-16 animate-on-scroll opacity-0 translate-y-10">
            {badge && (
              <p class="text-primary-light uppercase tracking-[0.25em] text-xs font-sans font-medium mb-6">
                {badge}
              </p>
            )}
            {title && (
              <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] max-w-3xl mx-auto text-dc-50">
                {title.split(",").map((part, i) =>
                  i === 1 ? (
                    <span class="text-dc-400">,{part}</span>
                  ) : (
                    part
                  )
                )}
              </h2>
            )}
          </div>

          {/* Automation grid */}
          <div
            class="mb-16 animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "150ms" }}
          >
            {automationsIntro && (
              <p class="font-sans text-center text-dc-400 mb-10">{automationsIntro}</p>
            )}
            {automations && automations.length > 0 && (
              <div class="grid md:grid-cols-3 gap-4 font-sans">
                {automations.map((item, index) => (
                  <div
                    class="bg-dc-800/50 border border-dc-700 px-5 py-4 text-center text-sm text-dc-300 hover:border-primary-light/30 hover:text-dc-50 transition-all duration-300"
                    style={{ transitionDelay: `${200 + index * 30}ms` }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom statement */}
          <div
            class="text-center animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "400ms" }}
          >
            <div class="inline-block font-sans">
              <p class="text-lg text-dc-400 mb-2">
                {bottomLine1}{" "}
                <span class="text-primary-light">{bottomLine1Highlight}</span>
              </p>
              <p class="text-lg text-dc-400">
                {bottomLine2}{" "}
                <span class="text-dc-200">{bottomLine2Highlight}</span>
              </p>
            </div>
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

