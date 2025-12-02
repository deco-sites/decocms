import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface BenefitItem {
  /**
   * @title Título
   * @description Título do benefício
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição detalhada do benefício
   */
  description: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal da seção de benefícios
   */
  title?: string;
  /**
   * @title Subtítulo
   * @description Descrição abaixo do título
   */
  subtitle?: string;
  /**
   * @title Benefícios
   * @description Lista de benefícios (idealmente 4)
   * @maxItems 6
   */
  benefits?: BenefitItem[];
}

export default function MCPMeshBenefits({
  title = "From Chaos to Control",
  subtitle = "What your organization gains by adopting MCP Mesh.",
  benefits = [
    {
      title: "Predictability & FinOps",
      description:
        'Turn the "black box" of AI costs into a clear dashboard. Allocate budgets per team and avoid bill shocks from OpenAI/Anthropic.',
    },
    {
      title: "Accelerated Procurement",
      description:
        "Once the Mesh is homologated, any tool inside is pre-approved. Developers gain speed without asking for permission for every new API.",
    },
    {
      title: "Output Quality",
      description:
        "Managing context with precision increases generation quality. Deliver the right data, with the right limits, to the right agents.",
    },
    {
      title: "Visibility & Alignment",
      description:
        "Centralize all AI contracts. Get macro visibility into how your organization is using autonomous agents.",
    },
  ],
}: Props) {
  const sectionId = `benefits-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="w-full bg-dc-50 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="text-center mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2 class="text-dc-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4">
            {title}
          </h2>
          <p class="text-dc-500 text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              class="flex gap-4 md:gap-6 animate-on-scroll opacity-0 translate-y-8"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Number Circle */}
              <div class="flex-shrink-0 w-12 h-12 bg-dc-900 text-dc-50 rounded-full flex items-center justify-center text-lg md:text-xl font-bold animate-scale">
                {index + 1}
              </div>

              {/* Content */}
              <div class="flex-1">
                <h3 class="text-dc-900 text-lg md:text-xl font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p class="text-dc-500 text-sm md:text-base leading-relaxed">
                  {benefit.description}
                </p>
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
                    
                    // Also animate the number circle with scale
                    const circle = el.querySelector(".animate-scale") as HTMLElement;
                    if (circle) {
                      circle.style.transform = "scale(1)";
                    }
                    
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
              
              // Set initial scale for circles
              const circle = element.querySelector(".animate-scale") as HTMLElement;
              if (circle) {
                circle.style.transform = "scale(0.5)";
                circle.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
              }
              
              observer.observe(el);
            });
          }, sectionId),
        }}
      />
    </section>
  );
}
