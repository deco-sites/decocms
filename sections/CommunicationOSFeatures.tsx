import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface FeatureCard {
  /**
   * @title Ícone (Material Design)
   * @description Nome do ícone do Material Design
   */
  icon: string;
  /**
   * @title Título
   * @description Título da funcionalidade
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição da funcionalidade
   */
  description: string;
}

interface Props {
  /**
   * @title Título Principal
   * @description Título da seção de funcionalidades
   */
  title?: string;
  /**
   * @title Descrição
   * @description Descrição da seção
   */
  description?: string;
  /**
   * @title Cards de Funcionalidades
   * @description Lista de funcionalidades
   * @maxItems 6
   */
  featureCards?: FeatureCard[];
}

export default function CommunicationOSFeatures({
  title = "Opinionated Apps for Real Problems",
  description = "We don't sell \"infrastructure\" on Day 1. We sell immediate communication intelligence.",
  featureCards = [
    {
      icon: "edit_note",
      title: "Blog Post Generator",
      description:
        "Creates strategic content using your actual brand voice and citing your products correctly.",
    },
    {
      icon: "forum",
      title: "Review Responder",
      description:
        "Monitors and responds to reviews on G2, Glassdoor, and Google with corporate alignment.",
    },
    {
      icon: "military_tech",
      title: "Sales Battlecards",
      description:
        "Generates updated sales materials based on the latest competitive intelligence.",
    },
    {
      icon: "notifications_active",
      title: "Proactive Alerts",
      description:
        '"Your competitor launched feature X. Here is the suggested strategic response."',
    },
    {
      icon: "visibility",
      title: "Brand Consistency",
      description:
        "Ensures Marketing, Sales, and Support are speaking the same language.",
    },
    {
      icon: "psychology",
      title: "Context Memory",
      description:
        "The system learns from every interaction, becoming smarter every day.",
    },
  ],
}: Props) {
  const sectionId = `comm-os-features-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id="features" class="w-full bg-dc-50 py-16 md:py-24 lg:py-32">
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

        {/* Features Grid */}
        <div
          id={sectionId}
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {featureCards?.map((card, index) => (
            <div
              key={index}
              class="feature-card bg-white p-8 md:p-10 border border-dc-200 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-light"
            >
              {/* Icon */}
              <div class="w-16 h-16 bg-primary-light/20 rounded-xl flex items-center justify-center mb-6">
                <span
                  class="material-symbols-outlined text-primary-dark"
                  style={{ fontSize: "32px" }}
                >
                  {card.icon}
                </span>
              </div>

              {/* Title */}
              <h4 class="text-dc-900 text-xl md:text-2xl font-semibold mb-4">
                {card.title}
              </h4>

              {/* Description */}
              <p class="text-dc-500 text-base md:text-lg font-normal leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Material Icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        rel="stylesheet"
      />

      {/* GSAP Animation Script */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer />

      <script
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            function initAnimations() {
              const gsap = (globalThis as unknown as { gsap?: unknown }).gsap;
              if (typeof gsap === "undefined") return;

              const section = document.getElementById(sectionId);
              if (!section) return;

              const cards = section.querySelectorAll(".feature-card");

              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      (gsap as { fromTo: Function }).fromTo(
                        cards,
                        { opacity: 0, y: 30 },
                        {
                          opacity: 1,
                          y: 0,
                          duration: 0.6,
                          stagger: 0.1,
                          ease: "power2.out",
                        }
                      );
                      observer.unobserve(entry.target);
                    }
                  });
                },
                { threshold: 0.15 }
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
  return <CommunicationOSFeatures />;
}

