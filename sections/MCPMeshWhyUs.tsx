import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface DifferentiatorItem {
  /**
   * @title Título
   * @description Título do diferencial
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição do diferencial
   */
  description: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal da seção
   */
  title?: string;
  /**
   * @title Subtítulo
   * @description Descrição abaixo do título
   */
  subtitle?: string;
  /**
   * @title Diferenciais
   * @description Lista de diferenciais (idealmente 4)
   * @maxItems 6
   */
  differentiators?: DifferentiatorItem[];
}

export default function MCPMeshWhyUs({
  title = "Why Deco MCP Mesh?",
  subtitle = "The open alternative for AI governance.",
  differentiators = [
    {
      title: "Open Source",
      description:
        "Full transparency. No proprietary code hidden in your security layer.",
    },
    {
      title: "Self-Host",
      description:
        "Keep your data and credentials on your infrastructure. Run on your Kubernetes or locally.",
    },
    {
      title: "No Vendor Lock-in",
      description:
        "Switch LLM providers or MCP tools without rewriting your applications.",
    },
    {
      title: "Unified Solution",
      description:
        "Don't pay separately for Gateway, Auth, and Observability. Everything in one package.",
    },
  ],
}: Props) {
  const sectionId = `whyus-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id={sectionId}
      class="w-full bg-dc-900 py-16 md:py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Abstract background element */}
      <div class="absolute top-0 right-0 w-1/2 h-full bg-primary-light opacity-5 skew-x-12 transform origin-top-right" />

      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div class="mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2 class="text-dc-50 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-2 md:mb-4">
            {title}
          </h2>
          <p class="text-dc-400 text-base md:text-lg">{subtitle}</p>
        </div>

        {/* Differentiators Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {differentiators?.map((item, index) => (
            <div
              key={index}
              class="border-l-4 border-primary-light pl-4 md:pl-6 animate-on-scroll opacity-0 translate-x-[-20px]"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 class="text-dc-50 text-lg md:text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p class="text-dc-400 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
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
                    el.style.transform = "translateY(0) translateX(0)";
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
