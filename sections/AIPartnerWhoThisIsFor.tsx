import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface Criteria {
  /**
   * @title Texto
   */
  text: string;
}

export interface Props {
  /**
   * @title Badge
   * @description Small text above the title
   */
  badge?: string;
  /**
   * @title Title Line 1
   */
  titleLine1?: string;
  /**
   * @title Title Line 2 (Muted)
   */
  titleLine2?: string;
  /**
   * @title Criteria Intro
   * @description Text before the criteria list
   */
  criteriaIntro?: string;
  /**
   * @title Criteria List
   * @description Who this program is for
   */
  criteria?: Criteria[];
  /**
   * @title Conclusion Title
   * @description Bold statement at the bottom
   */
  conclusionTitle?: string;
  /**
   * @title Conclusion Description
   * @format textarea
   */
  conclusionDescription?: string;
}

export default function AIPartnerWhoThisIsFor({
  badge,
  titleLine1,
  titleLine2,
  criteriaIntro,
  criteria,
  conclusionTitle,
  conclusionDescription,
}: Props) {
  const sectionId = `aipartner-whothisisfor-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="relative py-32 overflow-hidden bg-dc-950">
      {/* Background accent */}
      <div class="absolute inset-0 bg-gradient-to-b from-dc-950 via-dc-900/20 to-dc-950" />

      <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          {/* Section header */}
          <div class="mb-16 animate-on-scroll opacity-0 translate-y-10">
            {badge && (
              <p class="text-primary-light uppercase tracking-[0.25em] text-xs font-sans font-medium mb-6">
                {badge}
              </p>
            )}
            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-dc-50">
              {titleLine1}
              <br />
              <span class="text-dc-400 italic">{titleLine2}</span>
            </h2>
          </div>

          {/* Criteria list */}
          <div
            class="mb-16 animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "150ms" }}
          >
            {criteriaIntro && (
              <p class="font-sans text-lg text-dc-400 mb-8">{criteriaIntro}</p>
            )}
            {criteria && criteria.length > 0 && (
              <ul class="space-y-4 font-sans">
                {criteria.map((item, index) => (
                  <li
                    class="flex items-start gap-4 text-lg"
                    style={{ transitionDelay: `${200 + index * 80}ms` }}
                  >
                    <span class="text-primary-light mt-1">•</span>
                    <span class="text-dc-200">{item.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Conclusion */}
          <div
            class="border-l-2 border-primary-light pl-8 animate-on-scroll opacity-0 translate-y-10"
            style={{ transitionDelay: "500ms" }}
          >
            {conclusionTitle && (
              <p class="text-xl md:text-2xl font-serif leading-relaxed text-dc-200 mb-6">
                {conclusionTitle}
              </p>
            )}
            {conclusionDescription && (
              <p
                class="font-sans text-lg text-dc-400 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: conclusionDescription.replace(
                    /<em>/g,
                    '<em class="text-dc-50 not-italic">'
                  ),
                }}
              />
            )}
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

