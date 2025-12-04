import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface NotThing {
  /**
   * @title Texto
   */
  text: string;
}

/**
 * @titleBy text
 */
interface Capability {
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
   * @title Title Line 2
   */
  titleLine2?: string;
  /**
   * @title Tagline Line 1
   */
  taglineLine1?: string;
  /**
   * @title Tagline Line 2
   */
  taglineLine2?: string;
  /**
   * @title Tagline Line 3 (Highlighted)
   */
  taglineLine3?: string;
  /**
   * @title Not This Label
   */
  notThisLabel?: string;
  /**
   * @title Not Things
   * @description What this program is NOT
   */
  notThings?: NotThing[];
  /**
   * @title This Is Label
   */
  thisIsLabel?: string;
  /**
   * @title This Is Description
   * @format textarea
   */
  thisIsDescription?: string;
  /**
   * @title This Is Highlighted Text
   */
  thisIsHighlight?: string;
  /**
   * @title Capabilities
   * @description What we do
   */
  capabilities?: Capability[];
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
}

export default function AIPartnerProgramOverview({
  badge,
  titleLine1,
  titleLine2,
  taglineLine1,
  taglineLine2,
  taglineLine3,
  notThisLabel,
  notThings,
  thisIsLabel,
  thisIsDescription,
  thisIsHighlight,
  capabilities,
  bottomLine1,
  bottomLine1Highlight,
  bottomLine2,
}: Props) {
  const sectionId = `aipartner-program-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="relative py-32 overflow-hidden bg-dc-950">
      <div class="absolute left-0 top-1/3 w-[400px] h-[400px] bg-primary-light/5 rounded-full blur-[100px] pointer-events-none" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          {/* Program name */}
          <div class="mb-16 animate-on-scroll opacity-0 translate-y-10">
            {badge && (
              <p class="text-primary-light uppercase tracking-[0.3em] text-xs font-sans font-medium mb-8">
                {badge}
              </p>
            )}
            <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 text-dc-50">
              {titleLine1}
              <br />
              {titleLine2}
            </h2>
            <div class="h-px w-24 bg-primary-light mx-auto mb-8" />
            <p class="font-serif text-xl md:text-2xl text-dc-300 leading-relaxed">
              {taglineLine1}
              <br />
              {taglineLine2}
              <br />
              <span class="text-dc-200">{taglineLine3}</span>
            </p>
          </div>

          {/* Not this */}
          <div
            class="mb-16 animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "150ms" }}
          >
            {notThisLabel && (
              <p class="font-sans text-dc-400 mb-4">{notThisLabel}</p>
            )}
            {notThings && notThings.length > 0 && (
              <div class="flex flex-wrap justify-center gap-4 font-sans">
                {notThings.map((thing) => (
                  <span class="px-4 py-2 border border-dc-700 text-dc-400 text-sm">
                    {thing.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* This is */}
          <div
            class="bg-dc-800 border border-dc-700 p-8 md:p-12 rounded animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "300ms" }}
          >
            {thisIsLabel && (
              <p class="text-primary-light uppercase tracking-[0.2em] text-xs mb-6">
                {thisIsLabel}
              </p>
            )}
            <p class="font-serif text-xl md:text-2xl leading-relaxed text-dc-50 mb-8">
              {thisIsDescription}
              <br />
              <span class="text-dc-200">{thisIsHighlight}</span>
            </p>
            {capabilities && capabilities.length > 0 && (
              <div class="space-y-3 text-dc-400 font-sans">
                {capabilities.map((cap) => (
                  <p>{cap.text}</p>
                ))}
              </div>
            )}
            <div class="mt-10 pt-8 border-t border-dc-700">
              <p class="font-serif text-lg text-dc-50">
                {bottomLine1}{" "}
                <span class="text-primary-light">{bottomLine1Highlight}</span>.
              </p>
              <p class="font-serif text-lg text-dc-400">{bottomLine2}</p>
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

