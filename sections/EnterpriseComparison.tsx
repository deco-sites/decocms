import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy capability
 */
interface ComparisonRow {
  /**
   * @title Capability Name
   */
  capability: string;
  /**
   * @title DecoCMS Value
   */
  deco: string;
  /**
   * @title Competitor 1 Value
   */
  competitor1: string;
  /**
   * @title Competitor 2 Value
   */
  competitor2: string;
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
   * @title Nome do Produto (Destaque)
   */
  productName?: string;
  /**
   * @title Nome do Competitor 1
   */
  competitor1Name?: string;
  /**
   * @title Nome do Competitor 2
   */
  competitor2Name?: string;
  /**
   * @title Linhas da Tabela
   * @description Comparações de features
   */
  rows?: ComparisonRow[];
}

export default function EnterpriseComparison({
  title = "Why DecoCMS vs. Alternatives",
  subtitle = "Don't settle for prototypes or internal-only tools.",
  productName = "DecoCMS",
  competitor1Name = "Lovable + n8n",
  competitor2Name = "LangGraph + DIY",
  rows = [
    {
      capability: "Full-Stack AI Apps",
      deco: "✅ Built-in",
      competitor1: "❌ Separate tools",
      competitor2: "❌ Agent-only",
    },
    {
      capability: "Enterprise Governance",
      deco: "✅ Central Control",
      competitor1: "❌ None",
      competitor2: "❌ DIY",
    },
    {
      capability: "MCP Apps (React 19)",
      deco: "✅ Native",
      competitor1: "❌ Not supported",
      competitor2: "❌ Build yourself",
    },
    {
      capability: "Code Execution Pattern",
      deco: "✅ -98.7% Token Cost",
      competitor1: "❌ Expensive",
      competitor2: "⚠️ Manual",
    },
    {
      capability: "Self-Host / BYOK",
      deco: "✅ Deploy Anywhere",
      competitor1: "❌ SaaS Only",
      competitor2: "✅ Yes",
    },
    {
      capability: "Vibecoding to Prod",
      deco: "✅ One Platform",
      competitor1: "⚠️ Prototypes only",
      competitor2: "❌ Code-heavy",
    },
  ],
}: Props) {
  const sectionId = `comparison-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section id={sectionId} class="w-full bg-dc-50 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div class="text-center mb-12 md:mb-16 animate-on-scroll opacity-0 translate-y-8">
          <h2 class="text-3xl sm:text-4xl lg:text-[48px] font-medium text-dc-900 mb-4 tracking-tight !leading-[48px]">
            {title}
          </h2>
          <p class="text-base lg:text-[18px] text-dc-500 leading-[24px]">{subtitle}</p>
        </div>

        {/* Table */}
        <div class="overflow-x-auto animate-on-scroll opacity-0 translate-y-8">
          <table class="w-full border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th class="p-4 text-left text-sm font-semibold text-dc-500 border-b-2 border-dc-200 w-1/4">
                  Capability
                </th>
                <th class="p-4 text-left text-lg font-bold text-primary-dark border-b-2 border-primary-dark w-1/4 bg-primary-light/10">
                  {productName}
                </th>
                <th class="p-4 text-left text-sm font-semibold text-dc-500 border-b-2 border-dc-200 w-1/4">
                  {competitor1Name}
                </th>
                <th class="p-4 text-left text-sm font-semibold text-dc-500 border-b-2 border-dc-200 w-1/4">
                  {competitor2Name}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-dc-100">
              {rows?.map((row, i) => (
                <tr
                  key={i}
                  class="hover:bg-dc-100 transition-colors animate-on-scroll opacity-0 translate-y-4"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <td class="p-4 text-sm font-medium text-dc-900">
                    {row.capability}
                  </td>
                  <td class="p-4 text-sm font-bold text-dc-900 bg-primary-light/5 border-x border-primary-light/20">
                    {row.deco}
                  </td>
                  <td class="p-4 text-sm text-dc-500">{row.competitor1}</td>
                  <td class="p-4 text-sm text-dc-500">{row.competitor2}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

