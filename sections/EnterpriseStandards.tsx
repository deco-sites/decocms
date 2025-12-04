import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface StandardCard {
  /**
   * @title Ícone
   * @description Nome do ícone (layout, terminal)
   */
  icon: "layout" | "terminal";
  /**
   * @title Badge Text
   */
  badge: string;
  /**
   * @title Badge Color
   */
  badgeColor: "green" | "orange";
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Descrição
   */
  description: string;
  /**
   * @title Quote
   * @description Citação no card
   */
  quote: string;
}

export interface Props {
  /**
   * @title Badge
   * @description Small badge above title
   */
  badge?: string;
  /**
   * @title Título Principal
   */
  title?: string;
  /**
   * @title Subtítulo
   */
  subtitle?: string;
  /**
   * @title Standard Cards
   * @description Cards de padrões (2 cards)
   */
  cards?: StandardCard[];
}

const ICON_PATHS: Record<string, string> = {
  layout:
    "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h5v5H7z",
  terminal:
    "M20 19V7H4v12h16m0-14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16M7 9l4 4-4 4m5 0h5",
};

const BADGE_COLORS = {
  green: "bg-green-900/30 text-green-400 border border-green-800",
  orange: "bg-primary-dark/30 text-primary-light border border-primary-dark",
};

const ICON_COLORS = {
  layout: "text-blue-400",
  terminal: "text-primary-light",
};

export default function EnterpriseStandards({
  badge = "Strategic Advantage",
  title = "Built on tomorrow's standards, available today.",
  subtitle = "In November 2024, Anthropic and OpenAI formalized two critical MCP patterns. DecoCMS had them from day one.",
  cards = [
    {
      icon: "layout",
      badge: "SEP-1865 Compliant",
      badgeColor: "green",
      title: "MCP Apps Native",
      description:
        "Interactive UIs (Views) built with production-ready React 19 components—going far beyond the basic HTML spec.",
      quote:
        "We're ahead of the curve. While others implement experimental specs, we've been running this in production.",
    },
    {
      icon: "terminal",
      badge: "98.7% Cost Reduction",
      badgeColor: "orange",
      title: "Code Execution Built-In",
      description:
        "Our Workflows use Anthropic's recommended code-based pattern, drastically reducing token costs vs. direct tool calling.",
      quote:
        "Drastic reduction in agent operational costs by optimizing context window usage.",
    },
  ],
}: Props) {
  const sectionId = `standards-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id={sectionId}
      class="w-full bg-dc-900 py-16 md:py-24 lg:py-32 overflow-hidden relative"
    >
      {/* Background Glow */}
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-dark/20 rounded-full blur-3xl" />

      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div class="text-center mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <span class="inline-block py-1 px-3 rounded-full bg-primary-dark/50 border border-primary-light/30 text-primary-light text-xs font-semibold uppercase tracking-wider mb-4">
            {badge}
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-[48px] font-medium text-dc-100 mb-6 tracking-tight !leading-[48px]">
            {title}
          </h2>
          <p class="text-base lg:text-[18px] text-dc-400 leading-[24px] max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div class="grid md:grid-cols-2 gap-6 md:gap-8">
          {cards?.map((card, i) => (
            <div
              key={i}
              class="bg-dc-800 rounded-2xl p-6 md:p-8 border border-dc-700 hover:border-dc-500 transition-all duration-300 animate-on-scroll opacity-0 translate-y-8"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Card Header */}
              <div class="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                <div class="p-3 bg-dc-900 rounded-lg border border-dc-700">
                  <svg
                    class={`w-6 h-6 ${ICON_COLORS[card.icon]}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={ICON_PATHS[card.icon]} />
                  </svg>
                </div>
                <span
                  class={`px-3 py-1 text-xs font-bold rounded-full ${
                    BADGE_COLORS[card.badgeColor]
                  }`}
                >
                  {card.badge}
                </span>
              </div>

              {/* Card Content */}
              <h3 class="text-xl md:text-2xl font-bold text-dc-100 mb-3">
                {card.title}
              </h3>
              <p class="text-dc-400 mb-6 leading-relaxed">{card.description}</p>

              {/* Quote */}
              <div class="bg-black/30 rounded-lg p-4 text-sm text-dc-500 italic">
                "{card.quote}"
              </div>
            </div>
          ))}
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
              { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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

