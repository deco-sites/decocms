import { useScript } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Program Name
   */
  programName?: string;
  /**
   * @title Tagline
   */
  tagline?: string;
  /**
   * @title Copyright Text
   * @description Use {year} to insert the current year
   */
  copyrightText?: string;
}

export default function AIPartnerFooter({
  programName,
  tagline,
  copyrightText,
}: Props) {
  const sectionId = `aipartner-footer-${Math.random().toString(36).substr(2, 9)}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer id={sectionId} class="relative py-12 bg-dc-900/50">
      <div class="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="animate-on-scroll opacity-0">
            {programName && (
              <p class="font-serif text-lg text-dc-50 mb-2">{programName}</p>
            )}
            {tagline && (
              <p class="font-sans text-sm text-dc-400">{tagline}</p>
            )}
            <div class="h-px w-16 bg-primary-light/30 mx-auto my-6" />
            {copyrightText && (
              <p class="text-xs text-dc-400">
                {copyrightText.replace("{year}", String(currentYear))}
              </p>
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
                    observer.unobserve(el);
                  }
                });
              },
              { threshold: 0.1 }
            );

            elements.forEach((el) => {
              const element = el as HTMLElement;
              element.style.transition = "opacity 0.8s ease-out";
              observer.observe(el);
            });
          }, sectionId),
        }}
      />
    </footer>
  );
}

