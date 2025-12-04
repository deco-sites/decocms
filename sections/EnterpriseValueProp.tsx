import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface ValueCard {
  /**
   * @title Ícone
   * @description Nome do ícone (bolt, shield, eye)
   */
  icon: "bolt" | "shield" | "eye";
  /**
   * @title Cor do Ícone
   * @description Cor de fundo do ícone
   */
  iconColor: "orange" | "blue" | "purple" | "green";
  /**
   * @title Título
   */
  title: string;
  /**
   * @title Descrição
   * @format textarea
   */
  description: string;
  /**
   * @title Bullet Points
   * @description Lista de benefícios
   */
  bulletPoints?: string[];
}

export interface Props {
  /**
   * @title Título da Seção
   */
  title?: string;
  /**
   * @title Subtítulo
   */
  subtitle?: string;
  /**
   * @title Cards de Valor
   * @description Lista de cards de proposta de valor
   */
  cards?: ValueCard[];
}

const ICON_PATHS: Record<string, string> = {
  bolt: "M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z",
  shield:
    "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
};

const ICON_COLORS = {
  orange: {
    bg: "bg-primary-light/20",
    bgHover: "group-hover:bg-primary-dark",
    text: "text-primary-dark",
    textHover: "group-hover:text-primary-light",
    bullet: "text-primary-dark",
  },
  blue: {
    bg: "bg-primary-light/20",
    bgHover: "group-hover:bg-primary-dark",
    text: "text-primary-dark",
    textHover: "group-hover:text-primary-light",
    bullet: "text-primary-dark",
  },
  purple: {
    bg: "bg-primary-light/20",
    bgHover: "group-hover:bg-primary-dark",
    text: "text-primary-dark",
    textHover: "group-hover:text-primary-light",
    bullet: "text-primary-dark",
  },
  green: {
    bg: "bg-primary-light/20",
    bgHover: "group-hover:bg-primary-dark",
    text: "text-primary-dark",
    textHover: "group-hover:text-primary-light",
    bullet: "text-primary-dark",
  },
};

export default function EnterpriseValueProp({
  title = "One platform.\nBusiness builds. Tech governs.",
  subtitle = "DecoCMS unifies the entire AI application lifecycle. From vibecoding to enterprise governance in a single pane of glass.",
  cards = [
    {
      icon: "bolt",
      iconColor: "green",
      title: "Empower AI Builders",
      description:
        "Business users create full-stack AI apps with vibecoding. No code required—just describe the tool, workflow, or dashboard you need. Get to production in days.",
      bulletPoints: [
        "Natural language to App",
        "Custom React UIs",
        "Zero setup time",
      ],
    },
    {
      icon: "shield",
      iconColor: "green",
      title: "Govern the MCP Mesh",
      description:
        "Context Engineers manage centralized MCP infrastructure. Control access to data, tools, and models across all apps from a single control plane.",
      bulletPoints: [
        "Policy-based Access Control",
        "Virtualized MCPs",
        "Full Data Sovereignty",
      ],
    },
    {
      icon: "eye",
      iconColor: "green",
      title: "Observe Everything",
      description:
        "Every AI interaction traced. Follow the path: User Action → Agent Call → Model Response → Cost. Real-time auditing for compliance.",
      bulletPoints: [
        "User-level Traceability",
        "Cost Attribution",
        "SOC2-ready Logs",
      ],
    },
  ],
}: Props) {
  const sectionId = `value-prop-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="w-full bg-dc-100 border-y border-dc-200 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2
            class="text-3xl sm:text-4xl lg:text-[48px] font-medium text-dc-900 mb-4 tracking-tight whitespace-pre-line !leading-[48px]"
            dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, "<br />") }}
          />
          <p class="text-base lg:text-[18px] text-dc-500 leading-[24px]">{subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards?.map((card, i) => {
            const colors = ICON_COLORS[card.iconColor];
            return (
              <div
                key={i}
                class="group relative bg-dc-50 border border-dc-100 rounded-2xl p-6 hover:bg-[#F0F4D8] hover:border-[#8CAA25] transition-all duration-300 animate-on-scroll opacity-0 translate-y-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon */}
                <div
                  class={`w-12 h-12 ${colors.bg} ${colors.bgHover} rounded-lg flex items-center justify-center mb-6 transition-colors duration-300`}
                >
                  <svg
                    class={`w-6 h-6 ${colors.text} ${colors.textHover} transition-colors duration-300`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={ICON_PATHS[card.icon]} />
                  </svg>
                </div>

                {/* Title */}
                <h3 class="text-xl text-dc-900 mb-3">{card.title}</h3>

                {/* Description */}
                <p class="text-dc-500 leading-relaxed mb-6">{card.description}</p>

                {/* Bullet Points */}
                {card.bulletPoints && (
                  <ul class="space-y-2 text-sm text-dc-600">
                    {card.bulletPoints.map((point, j) => (
                      <li key={j} class="flex items-center gap-2">
                        <svg
                          class={`w-4 h-4 ${colors.bullet} flex-shrink-0`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
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

