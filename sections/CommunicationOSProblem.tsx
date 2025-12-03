import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface StatCard {
  /**
   * @title Título
   * @description Título do card de estatística
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição detalhada do problema
   */
  description: string;
}

interface Props {
  /**
   * @title Título Principal
   * @description Título da seção de problema
   */
  title?: string;
  /**
   * @title Descrição
   * @description Descrição do problema principal
   */
  description?: string;
  /**
   * @title Cards de Estatísticas
   * @description Lista de cards mostrando os problemas
   */
  statCards?: StatCard[];
}

export default function CommunicationOSProblem({
  title = "Communication Overload is killing your strategy",
  description =
    "The biggest bottleneck for scale-ups isn't a lack of ideas—it's disconnection. Executives become \"human bottlenecks\" because they have to constantly organize context so the team can execute.",
  statCards = [
    {
      title: "The Middleman",
      description:
        "You waste hours relaying information between teams that don't talk to each other.",
    },
    {
      title: "Broken Telephone",
      description:
        "The strategy defined on Monday has already changed (and been misunderstood) by Friday.",
    },
    {
      title: "Slow Decisions",
      description:
        "Waiting days for a static report while the market shifts in real-time.",
    },
  ],
}: Props) {
  const sectionId = `comm-os-problem-${
    Math.random().toString(36).substr(2, 9)
  }`;

  return (
    <section id="problem" class="w-full bg-dc-50 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="text-center max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20">
          <h2 class="text-dc-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
            {title}
          </h2>
          <p class="text-dc-500 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stat Cards Grid */}
        <div
          id={sectionId}
          class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {statCards?.map((card, index) => (
            <div
              key={index}
              class="stat-card bg-dc-100 p-6 md:p-8 border-l-4 border-primary-light transition-all duration-300 hover:shadow-lg"
            >
              <h3 class="text-primary-dark text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {card.title}
              </h3>
              <p class="text-dc-500 text-base md:text-lg font-normal leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

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

              const cards = section.querySelectorAll(".stat-card");

              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      (gsap as { fromTo: Function }).fromTo(
                        cards,
                        { opacity: 0, y: 40 },
                        {
                          opacity: 1,
                          y: 0,
                          duration: 0.7,
                          stagger: 0.15,
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
  return <CommunicationOSProblem />;
}
