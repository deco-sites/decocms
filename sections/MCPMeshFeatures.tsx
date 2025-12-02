import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface FeatureCard {
  /**
   * @title Ícone
   * @description Nome do ícone (hub, chart_line, shield, bolt)
   */
  icon: string;
  /**
   * @title Título
   * @description Título da feature
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição da feature
   */
  description: string;
  /**
   * @title Badge
   * @description Texto do badge (opcional)
   */
  badge?: string;
  /**
   * @title Cor do Badge
   * @description Cor do badge (green, blue, yellow)
   */
  badgeColor?: "green" | "blue" | "yellow";
  /**
   * @title Código de Exemplo
   * @description Código para mostrar no card (opcional)
   * @format textarea
   */
  codeSnippet?: string;
  /**
   * @title Tags
   * @description Lista de tags para mostrar (ex: SQLite, OpenTelemetry)
   */
  tags?: string[];
  /**
   * @title Tamanho
   * @description Tamanho do card (normal ou wide)
   */
  size?: "normal" | "wide";
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal da seção de features
   */
  title?: string;
  /**
   * @title Subtítulo
   * @description Descrição abaixo do título
   */
  subtitle?: string;
  /**
   * @title Features
   * @description Lista de cards de features
   */
  features?: FeatureCard[];
}

const ICON_PATHS: Record<string, string> = {
  hub: "M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v-2h2.76l4-4H9V6c0-1.66 1.34-3 3-3s3 1.34 3 3v4h-.76l4 4H21v2h-4z",
  chart_line:
    "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z",
  shield:
    "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  bolt: "M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z",
};

const BADGE_COLORS = {
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

export default function MCPMeshFeatures({
  title = "MCP-Native Architecture",
  subtitle = "A unified platform to centralize connections, manage authentication, and orchestrate tools.",
  features = [
    {
      icon: "hub",
      title: "Unified Connection Hub",
      description: "Connect Slack, GitHub, Postgres, and more in one place.",
      badge: "Centralized",
      badgeColor: "green" as const,
      size: "wide" as const,
      codeSnippet: `POST /mcp/conn_slack_123
Authorization: Bearer mesh_token
# Mesh proxy injects real credentials securely`,
    },
    {
      icon: "chart_line",
      title: "Full Observability",
      description:
        "Real-time audit logs. Know exactly which tool was called, by whom, and when.",
      size: "normal" as const,
    },
    {
      icon: "shield",
      title: "Granular Control",
      description:
        'Share access to tools (e.g., "Send Email") without sharing the actual Gmail password.',
      size: "normal" as const,
    },
    {
      icon: "bolt",
      title: "Zero Config & Local First",
      description:
        "Runs locally with built-in SQLite. No complex database setup. Scale to Postgres when needed.",
      size: "wide" as const,
      tags: ["SQLite", "Better Auth", "OpenTelemetry"],
    },
  ],
}: Props) {
  const sectionId = `features-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="w-full bg-dc-100 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2 class="text-dc-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4">
            {title}
          </h2>
          <p class="text-dc-500 text-base md:text-lg max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features?.map((feature, index) => {
            const isWide = feature.size === "wide";
            return (
              <div
                key={index}
                class={`bg-dc-50 p-6 md:p-8 rounded-2xl border border-dc-200 hover:border-primary-light/50 transition-all duration-300 animate-on-scroll opacity-0 translate-y-8 ${
                  isWide ? "md:col-span-2" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Header with badge */}
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6">
                  <div class="flex items-start gap-4">
                    {/* Icon */}
                    <div class="w-10 h-10 bg-primary-light/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        class="w-5 h-5 text-primary-dark"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d={ICON_PATHS[feature.icon] || ICON_PATHS.hub} />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-dc-900 text-lg md:text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <p class="text-dc-500 text-sm md:text-base mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {feature.badge && (
                    <span
                      class={`px-3 py-1 text-xs font-bold rounded uppercase flex-shrink-0 ${
                        BADGE_COLORS[feature.badgeColor || "green"]
                      }`}
                    >
                      {feature.badge}
                    </span>
                  )}
                </div>

                {/* Code Snippet */}
                {feature.codeSnippet && (
                  <div class="bg-dc-900 rounded-lg p-4 font-mono text-xs md:text-sm text-dc-300 overflow-x-auto">
                    <pre class="whitespace-pre-wrap">
                      {feature.codeSnippet.split("\n").map((line, lineIdx) => {
                        // Simple syntax highlighting
                        if (line.startsWith("#")) {
                          return (
                            <div key={lineIdx} class="text-dc-500">
                              {line}
                            </div>
                          );
                        }
                        if (line.startsWith("POST") || line.startsWith("GET")) {
                          const parts = line.split(" ");
                          return (
                            <div key={lineIdx}>
                              <span class="text-purple-400">{parts[0]}</span>{" "}
                              <span class="text-dc-300">
                                {parts.slice(1).join(" ")}
                              </span>
                            </div>
                          );
                        }
                        if (line.includes(":")) {
                          const [key, ...valueParts] = line.split(":");
                          const value = valueParts.join(":");
                          return (
                            <div key={lineIdx}>
                              <span class="text-dc-300">{key}:</span>
                              <span class="text-yellow-400">{value}</span>
                            </div>
                          );
                        }
                        return <div key={lineIdx}>{line}</div>;
                      })}
                    </pre>
                  </div>
                )}

                {/* Tags */}
                {feature.tags && feature.tags.length > 0 && (
                  <div class="flex flex-wrap gap-2 mt-4">
                    {feature.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        class="px-3 py-1.5 bg-dc-100 border border-dc-200 rounded-md text-xs font-mono text-dc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
