import { useScript } from "@deco/deco/hooks";
import Icon from "../components/ui/Icon.tsx";

/**
 * @titleBy title
 */
interface FeatureCard {
  /**
   * @title Ícone
   * @description Nome do ícone do Material Design (hub, policy, query_stats, route, swap_horiz)
   */
  icon?: string;
  /**
   * @title Título
   * @description Título da feature
   */
  title?: string;
  /**
   * @title Descrição Problema
   * @description Primeira linha descritiva (problema/contexto)
   */
  problemDescription?: string;
  /**
   * @title Texto Destacado
   * @description Parte destacada em verde da solução
   */
  highlightedText?: string;
  /**
   * @title Texto Complementar
   * @description Texto que segue após o destaque
   */
  complementText?: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal da seção
   */
  title?: string;
  /**
   * @title Features
   * @description Lista de cards de features
   */
  features?: FeatureCard[];
}

export default function MCPMeshContextManagement({
  title,
  features,
}: Props) {
  const sectionId = `mcp-context-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="w-full bg-dc-50 py-16 md:py-20 lg:py-28">
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="flex flex-col items-center mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2 class="text-dc-800 text-3xl sm:text-4xl lg:text-heading-lg font-medium text-center max-w-2xl lg:max-w-3xl">
            {title}
          </h2>
        </div>

        {/* Feature Cards */}
        <div class="flex flex-col gap-4">
          {features?.map((feature, index) => (
            <div
              class="bg-dc-100 rounded-xl p-2 animate-on-scroll opacity-0 translate-y-8"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-14 px-6 py-6 lg:px-16 lg:py-8">
                {/* Left Side - Icon and Title */}
                <div class="flex flex-col justify-between gap-4 lg:gap-6 w-full lg:w-2/5 lg:shrink-0">
                  <div class="w-10 h-10">
                    <Icon
                      name={feature.icon || "hub"}
                      size="40"
                      class="text-lime-600"
                    />
                  </div>
                  <h3 class="text-dc-800 text-xl sm:text-2xl lg:text-3xl font-medium leading-snug tracking-tight">
                    {feature.title}
                  </h3>
                </div>

                {/* Right Side - Descriptions */}
                <div class="flex flex-col gap-4 lg:gap-6 w-full lg:w-3/5">
                  <p class="text-dc-500 text-base lg:text-xl leading-relaxed">
                    {feature.problemDescription}
                  </p>
                  <p class="text-dc-500 text-base lg:text-xl leading-relaxed">
                    <span class="text-lime-600">
                      {feature.highlightedText}
                    </span>
                    {feature.complementText && (
                      <span>{feature.complementText}</span>
                    )}
                  </p>
                </div>
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
