import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface NeedItem {
  /**
   * @title Texto
   */
  text: string;
}

/**
 * @titleBy text
 */
interface RealityItem {
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
   */
  title?: string;
  /**
   * @title Subtitle (Highlighted)
   */
  subtitle?: string;
  /**
   * @title Reality Section Title
   */
  realityTitle?: string;
  /**
   * @title Reality Items
   * @description What you don't need
   */
  realityItems?: RealityItem[];
  /**
   * @title Needs Section Title
   */
  needsTitle?: string;
  /**
   * @title Needs Items
   * @description What you actually need
   */
  needsItems?: NeedItem[];
  /**
   * @title Bottom Statement Line 1
   */
  bottomLine1?: string;
  /**
   * @title Bottom Statement Line 1 Highlight
   */
  bottomLine1Highlight?: string;
  /**
   * @title Bottom Statement Line 2
   */
  bottomLine2?: string;
  /**
   * @title Bottom Statement Line 2 Highlight
   */
  bottomLine2Highlight?: string;
}

export default function AIPartnerTheShift({
  badge,
  title,
  subtitle,
  realityTitle,
  realityItems,
  needsTitle,
  needsItems,
  bottomLine1,
  bottomLine1Highlight,
  bottomLine2,
  bottomLine2Highlight,
}: Props) {
  const sectionId = `aipartner-theshift-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="relative py-32 overflow-hidden bg-dc-950">
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-light/5 rounded-full blur-[120px] pointer-events-none" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          {/* Header */}
          <div class="mb-20 text-center animate-on-scroll opacity-0 translate-y-10">
            {badge && (
              <p class="text-primary-light uppercase tracking-[0.25em] text-xs font-sans font-medium mb-6">
                {badge}
              </p>
            )}
            {title && (
              <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-6 text-dc-50">
                {title}
              </h2>
            )}
            {subtitle && (
              <p class="font-serif text-2xl md:text-3xl text-primary-light italic">
                {subtitle}
              </p>
            )}
          </div>

          <div class="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: The reality */}
            <div
              class="animate-on-scroll opacity-0 -translate-x-8"
              style={{ transitionDelay: "150ms" }}
            >
              {realityTitle && (
                <h3 class="text-sm uppercase tracking-[0.2em] text-dc-400 mb-8">
                  {realityTitle}
                </h3>
              )}
              {realityItems && realityItems.length > 0 && (
                <div class="space-y-6 font-sans">
                  {realityItems.map((item) => (
                    <p class="text-lg text-dc-200">{item.text}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Right: What you need */}
            <div
              class="animate-on-scroll opacity-0 translate-x-8"
              style={{ transitionDelay: "300ms" }}
            >
              {needsTitle && (
                <h3 class="text-sm uppercase tracking-[0.2em] text-primary-light mb-8">
                  {needsTitle}
                </h3>
              )}
              {needsItems && needsItems.length > 0 && (
                <ul class="space-y-4 font-sans">
                  {needsItems.map((item) => (
                    <li class="flex items-start gap-4">
                      <span class="text-primary-light text-lg">→</span>
                      <span class="text-dc-200">{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Bottom statement - punchline */}
          <div
            class="mt-20 text-center animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "450ms" }}
          >
            <div class="inline-block bg-dc-800/50 border border-dc-700 px-8 py-6 rounded">
              <p class="font-serif text-lg md:text-xl text-dc-50 mb-2">
                {bottomLine1}{" "}
                <span class="text-primary-light">{bottomLine1Highlight}</span>
              </p>
              <p class="font-serif text-lg md:text-xl text-dc-50">
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
                    el.style.transform = "translateY(0) translateX(0)";
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

