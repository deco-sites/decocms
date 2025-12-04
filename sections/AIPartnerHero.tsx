import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface ValueProp {
  /**
   * @title Texto
   */
  text: string;
}

export interface Props {
  /**
   * @title Eyebrow Text
   * @description Small text above the title
   */
  eyebrow?: string;
  /**
   * @title Title Line 1
   * @description First line of the main headline
   */
  titleLine1?: string;
  /**
   * @title Title Line 2 (Highlighted)
   * @description Second line with accent color
   */
  titleLine2?: string;
  /**
   * @title Subtitle
   * @description Description text below the title
   */
  subtitle?: string;
  /**
   * @title Value Props
   * @description Small feature bullets
   */
  valueProps?: ValueProp[];
  /**
   * @title Limited Text
   * @description Text showing limited availability
   */
  limitedText?: string;
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
   * @description Small text below the button
   */
  ctaSubtext?: string;
}

export default function AIPartnerHero({
  eyebrow,
  titleLine1,
  titleLine2,
  subtitle,
  valueProps,
  limitedText,
  ctaButtonText,
  ctaButtonUrl,
  ctaSubtext,
}: Props) {
  const sectionId = `aipartner-hero-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-dc-950">
      {/* Subtle gradient overlay */}
      <div class="absolute inset-0 bg-gradient-to-b from-dc-950 via-dc-950 to-dc-900/30" />

      {/* Ambient glow */}
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-light/5 rounded-full blur-[150px] pointer-events-none" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div class="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          {eyebrow && (
            <p
              class="text-primary-light uppercase tracking-[0.3em] text-sm font-sans font-medium mb-8 animate-on-scroll opacity-0 translate-y-5"
              data-section={sectionId}
            >
              {eyebrow}
            </p>
          )}

          {/* Main headline */}
          <h1
            class="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 text-dc-50 animate-on-scroll opacity-0 translate-y-8"
            data-section={sectionId}
            style={{ transitionDelay: "100ms" }}
          >
            {titleLine1}
            <br />
            <span class="text-primary-light">{titleLine2}</span>
          </h1>

          {subtitle && (
            <p
              class="font-sans text-xl md:text-2xl text-dc-300 max-w-3xl mx-auto mb-10 animate-on-scroll opacity-0 translate-y-8"
              data-section={sectionId}
              style={{ transitionDelay: "200ms" }}
            >
              {subtitle}
            </p>
          )}

          {/* Value props */}
          <div
            class="max-w-2xl mx-auto mb-12 animate-on-scroll opacity-0 translate-y-8"
            data-section={sectionId}
            style={{ transitionDelay: "300ms" }}
          >
            {valueProps && valueProps.length > 0 && (
              <div class="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-dc-400 font-sans mb-6">
                {valueProps.map((prop) => (
                  <span class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-primary-light rounded-full" />
                    {prop.text}
                  </span>
                ))}
              </div>
            )}
            {limitedText && (
              <p class="font-sans text-dc-200 font-medium text-lg">{limitedText}</p>
            )}
          </div>

          {/* CTA */}
          <div
            class="flex flex-col items-center gap-3 animate-on-scroll opacity-0 translate-y-8"
            data-section={sectionId}
            style={{ transitionDelay: "400ms" }}
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
              <p class="text-xs text-dc-500">{ctaSubtext}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dc-950 to-transparent" />

      {/* Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const elements = document.querySelectorAll(
              `[data-section="${sectionId}"]`
            );

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
              { threshold: 0.1 }
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

