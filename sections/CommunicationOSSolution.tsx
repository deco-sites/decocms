import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface BenefitItem {
  /**
   * @title Texto do Benefício
   * @description Texto que descreve o benefício
   */
  text: string;
}

interface Props {
  /**
   * @title Badge
   * @description Texto do badge acima do título
   */
  badge?: string;
  /**
   * @title Título Principal
   * @description Título da seção de solução
   */
  title?: string;
  /**
   * @title Descrição
   * @description Descrição da solução
   */
  description?: string;
  /**
   * @title Lista de Benefícios
   * @description Lista de benefícios da solução
   */
  benefits?: BenefitItem[];
  /**
   * @title Citação
   * @description Texto da citação/quote
   */
  quoteText?: string;
  /**
   * @title Texto Destacado da Citação
   * @description Parte destacada da citação
   */
  quoteHighlight?: string;
}

export default function CommunicationOSSolution({
  badge = "Communication OS",
  title = 'Become a "Doer" Executive',
  description =
    "DecoCMS eliminates the middleman. We centralize external conversations (market, clients) and internal conversations (teams, projects) into a single intelligence interface.",
  benefits = [
    { text: "Total observability without micromanagement." },
    { text: "Real-time inconsistency detection." },
    { text: "Direct data access (no need to ask for queries)." },
  ],
  quoteText =
    "A Chief of Staff's role is to organize context so the CEO can decide.",
  quoteHighlight = "We automate this function.",
}: Props) {
  const sectionId = `comm-os-solution-${
    Math.random().toString(36).substr(2, 9)
  }`;

  return (
    <section class="w-full bg-dc-900 relative overflow-hidden py-16 md:py-24 lg:py-32">
      {/* Background gradient */}
      <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-light/10 to-transparent pointer-events-none" />

      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div
          id={sectionId}
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Content */}
          <div class="flex flex-col gap-6 md:gap-8 solution-content">
            {/* Badge */}
            {badge && (
              <div class="inline-flex items-center px-4 py-2 bg-white/10 rounded-full w-fit">
                <span class="text-white text-sm font-semibold">{badge}</span>
              </div>
            )}

            {/* Title */}
            <h2 class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              {title}
            </h2>

            {/* Description */}
            <p class="text-white/70 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed">
              {description}
            </p>

            {/* Benefits List */}
            <ul class="flex flex-col gap-4 md:gap-5 mt-4">
              {benefits?.map((benefit, index) => (
                <li key={index} class="flex items-center gap-4 text-white">
                  <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <span
                      class="material-symbols-outlined text-primary-light"
                      style={{ fontSize: "24px" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <span class="text-base md:text-lg lg:text-xl">
                    {benefit.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Quote Card */}
          <div class="bg-white/5 p-8 md:p-10 lg:p-12 rounded-2xl border border-white/10 solution-quote">
            <div class="flex flex-col gap-6">
              {/* Quote Icon */}
              <span
                class="material-symbols-outlined text-primary-light"
                style={{ fontSize: "48px" }}
              >
                format_quote
              </span>

              {/* Quote Text */}
              <h3 class="text-white text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
                {quoteText}{" "}
                <strong class="text-primary-light font-semibold">
                  {quoteHighlight}
                </strong>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Material Icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        rel="stylesheet"
      />

      {/* GSAP Animation Script */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        defer
      />

      <script
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            function initAnimations() {
              const gsap = (globalThis as unknown as { gsap?: unknown }).gsap;
              if (typeof gsap === "undefined") return;

              const section = document.getElementById(sectionId);
              if (!section) return;

              const content = section.querySelector(".solution-content");
              const quote = section.querySelector(".solution-quote");

              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      (gsap as { fromTo: Function }).fromTo(
                        content,
                        { opacity: 0, x: -40 },
                        {
                          opacity: 1,
                          x: 0,
                          duration: 0.8,
                          ease: "power2.out",
                        },
                      );
                      (gsap as { fromTo: Function }).fromTo(
                        quote,
                        { opacity: 0, x: 40 },
                        {
                          opacity: 1,
                          x: 0,
                          duration: 0.8,
                          delay: 0.2,
                          ease: "power2.out",
                        },
                      );
                      observer.unobserve(entry.target);
                    }
                  });
                },
                { threshold: 0.2 },
              );

              observer.observe(section);
            }

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", initAnimations);
            } else {
              setTimeout(initAnimations, 100);
            }
          }, sectionId),
        }}
      />
    </section>
  );
}

export function Preview() {
  return <CommunicationOSSolution />;
}
