import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface ProblemCard {
  /**
   * @title Ícone
   * @description Nome do ícone Material Symbols (ex: "hub", "search", "lock")
   */
  icon: string;
  /**
   * @title Título
   * @description Título do problema
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição detalhada do problema
   */
  description: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal do bloco de problemas
   */
  title?: string;
  /**
   * @title Subtítulo
   * @description Texto descritivo abaixo do título
   */
  subtitle?: string;
  /**
   * @title Palavra em Destaque
   * @description Palavra que será destacada no subtítulo (ex: "AI Sprawl")
   */
  highlightWord?: string;
  /**
   * @title Problemas
   * @description Lista de cards de problemas (máx 3)
   * @maxItems 3
   */
  problems?: ProblemCard[];
}

const ICON_MAP: Record<string, string> = {
  hub: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  network:
    "M15 9h-5v6h5V9zm-1 4h-3v-2h3v2zm6-2c0-.55-.45-1-1-1h-2V8c0-1.1-.9-2-2-2h-2V4c0-.55-.45-1-1-1s-1 .45-1 1v2H9c-1.1 0-2 .9-2 2v2H5c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 1.1.9 2 2 2h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c1.1 0 2-.9 2-2v-2h2c.55 0 1-.45 1-1z",
  search_dollar:
    "M19.5 14.5c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5 5-2.24 5-5zm-5 3c-.28 0-.5-.22-.5-.5v-.5h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-1c-.83 0-1.5-.67-1.5-1.5 0-.71.49-1.3 1.15-1.45v-.55c0-.28.22-.5.5-.5s.5.22.5.5v.5h1c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5.22-.5.5s.22.5.5.5h1c.83 0 1.5.67 1.5 1.5 0 .71-.49 1.3-1.15 1.45v.55c0 .28-.22.5-.5.5zM3.5 9.5c0-3.31 2.69-6 6-6 1.77 0 3.36.77 4.46 1.99l1.41-1.41C14 2.79 12.11 2 10 2 5.58 2 2 5.58 2 10c0 2.11.79 4 2.08 5.46l1.41-1.41C4.27 12.86 3.5 11.27 3.5 9.5z",
  lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
};

export default function MCPMeshProblemStatement({
  title = 'The Chaos of "Shadow AI"',
  subtitle = "Your teams are integrating AI in isolation. Personal credentials scattered, invisible costs, and zero governance.",
  highlightWord = "AI Sprawl",
  problems = [
    {
      icon: "network",
      title: "Fragmented Integrations",
      description:
        '"How do I integrate AI into my data sources?" Today, every dev does it their own way, creating integration silos that are impossible to maintain.',
    },
    {
      icon: "search_dollar",
      title: "Cost Black Box",
      description:
        "Without centralized visibility, you don't know who is using which model or how much it costs. FinOps for AI is non-existent.",
    },
    {
      icon: "lock",
      title: "Security Risks",
      description:
        "Developers pasting personal API keys into local .env files. Sharing credentials via Slack. Zero access control.",
    },
  ],
}: Props) {
  const sectionId = `problem-${Math.random().toString(36).substr(2, 9)}`;

  // Function to highlight the special word
  const renderSubtitle = () => {
    if (!highlightWord || !subtitle.includes(highlightWord)) {
      return subtitle;
    }
    const parts = subtitle.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span class="font-semibold text-primary-light">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section id={sectionId} class="w-full bg-dc-50 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2 class="text-dc-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 md:mb-6">
            {title}
          </h2>
          <p class="text-dc-500 text-base md:text-lg lg:text-xl leading-relaxed">
            {renderSubtitle()}{" "}
            <span class="font-semibold text-primary-light">{highlightWord}</span>{" "}
            is the new technical debt.
          </p>
        </div>

        {/* Problem Cards */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {problems?.map((problem, index) => (
            <div
              key={index}
              class="bg-dc-100 rounded-2xl p-6 md:p-8 border border-dc-200 hover:border-primary-light/50 transition-all duration-300 animate-on-scroll opacity-0 translate-y-8"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  class="w-6 h-6 text-red-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={ICON_MAP[problem.icon] || ICON_MAP.network} />
                </svg>
              </div>

              {/* Content */}
              <h3 class="text-dc-900 text-lg md:text-xl font-semibold mb-3">
                {problem.title}
              </h3>
              <p class="text-dc-500 text-sm md:text-base leading-relaxed">
                {problem.description}
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
