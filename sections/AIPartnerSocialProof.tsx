import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface Outcome {
  /**
   * @title Texto
   */
  text: string;
}

export interface Props {
  /**
   * @title Section Badge
   * @description Small badge text above outcomes
   */
  badge?: string;
  /**
   * @title Outcomes
   * @description List of what the program achieves
   */
  outcomes?: Outcome[];
  /**
   * @title Founding Cohort Badge
   */
  foundingBadge?: string;
  /**
   * @title Founding Cohort Title
   */
  foundingTitle?: string;
  /**
   * @title Founding Cohort Description
   * @format textarea
   */
  foundingDescription?: string;
}

export default function AIPartnerSocialProof({
  badge,
  outcomes,
  foundingBadge,
  foundingTitle,
  foundingDescription,
}: Props) {
  const sectionId = `aipartner-socialproof-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id={sectionId}
      class="relative py-20 bg-dc-800 border-y border-dc-700/50"
    >
      <div class="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          {/* Badge */}
          {badge && (
            <div
              class="text-center mb-10 animate-on-scroll opacity-0 translate-y-5"
            >
              <p class="text-primary-light uppercase tracking-[0.2em] text-xs font-sans font-medium">
                {badge}
              </p>
            </div>
          )}

          {/* Outcomes list */}
          {outcomes && outcomes.length > 0 && (
            <ul
              class="space-y-4 mb-12 animate-on-scroll opacity-0 translate-y-5 font-sans"
              style={{ transitionDelay: "100ms" }}
            >
              {outcomes.map((outcome) => (
                <li class="flex items-start gap-4">
                  <span class="text-primary-light mt-1">→</span>
                  <span class="text-dc-200 text-lg">{outcome.text}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Founding Cohort */}
          <div
            class="bg-dc-800/30 border border-primary-light/20 rounded-lg p-8 text-center animate-on-scroll opacity-0 translate-y-5"
            style={{ transitionDelay: "200ms" }}
          >
            {foundingBadge && (
              <div class="flex items-center justify-center gap-2 mb-4">
                <svg
                  class="w-5 h-5 text-primary-light"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                </svg>
                <p class="text-primary-light uppercase tracking-[0.15em] text-xs font-medium">
                  {foundingBadge}
                </p>
              </div>
            )}
            {foundingTitle && (
              <p class="font-sans text-lg text-dc-200 leading-relaxed mb-4">
                {foundingTitle}
              </p>
            )}
            {foundingDescription && (
              <p class="font-sans text-dc-400 leading-relaxed">{foundingDescription}</p>
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
              { threshold: 0.1 }
            );

            elements.forEach((el) => {
              const element = el as HTMLElement;
              element.style.transition =
                "opacity 0.6s ease-out, transform 0.6s ease-out";
              observer.observe(el);
            });
          }, sectionId),
        }}
      />
    </section>
  );
}

