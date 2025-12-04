import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy text
 */
interface GovernanceFeature {
  /**
   * @title Texto
   */
  text: string;
}

/**
 * @titleBy label
 */
interface DeployOption {
  /**
   * @title Label
   */
  label: string;
}

export interface Props {
  /**
   * @title Título Principal
   */
  title?: string;
  /**
   * @title Título Secundário (Muted)
   */
  titleMuted?: string;
  /**
   * @title Features de Governança
   * @description Lista de features (max 6)
   */
  features?: GovernanceFeature[];
  /**
   * @title Deploy Section Title
   */
  deploySectionTitle?: string;
  /**
   * @title Deploy Section Description
   */
  deploySectionDescription?: string;
  /**
   * @title Opções de Deploy
   */
  deployOptions?: DeployOption[];
  /**
   * @title Código de Exemplo
   * @format textarea
   */
  codeExample?: string;
  /**
   * @title Nome do Arquivo de Código
   */
  codeFileName?: string;
  /**
   * @title Footer Message
   * @description Mensagem no footer do código
   */
  codeFooterMessage?: string;
}

const DEFAULT_CODE = `const enterpriseMCP = createVirtualMCP({
  sources: [salesforceMCP, slackMCP, internalDB],
  policies: {
    auth: 'require-sso',
    audit: 'log-all-interactions',
    rateLimit: '1000/day',
    piiMasking: true
  },
  permissions: {
    'sales-team': ['read:leads', 'write:notes'],
    'finance': ['read:revenue']
  }
});`;

export default function EnterpriseGovernance({
  title = "Enterprise-grade governance.",
  titleMuted = "Built in, not bolted on.",
  features = [
    { text: "Centralized MCP Mesh" },
    { text: "Audit Trails" },
    { text: "Spend Caps" },
    { text: "RBAC Everywhere" },
    { text: "Compliance Ready" },
    { text: "Approval Workflows" },
  ],
  deploySectionTitle = "Deploy Anywhere",
  deploySectionDescription = "Unlike SaaS-only platforms, DecoCMS deploys on your infrastructure. Zero vendor lock-in.",
  deployOptions = [
    { label: "Edge" },
    { label: "AWS/GCP" },
    { label: "On-Prem" },
    { label: "Air-Gapped" },
  ],
  codeExample = DEFAULT_CODE,
  codeFileName = "policy-config.ts",
  codeFooterMessage = "Policy enforced at the mesh level",
}: Props) {
  const sectionId = `governance-${Math.random().toString(36).substr(2, 9)}`;

  // Simple syntax highlighting for TypeScript
  const highlightCode = (code: string) => {
    return code
      .replace(
        /\b(const|let|var|function|return|true|false)\b/g,
        '<span class="text-purple-400">$1</span>'
      )
      .replace(
        /'([^']+)'/g,
        "'<span class=\"text-primary-light\">$1</span>'"
      )
      .replace(
        /\b(\w+):/g,
        '<span class="text-blue-300">$1</span>:'
      )
      .replace(
        /(\w+)\(/g,
        '<span class="text-yellow-300">$1</span>('
      );
  };

  return (
    <section
      id={sectionId}
      class="w-full bg-dc-200 py-16 md:py-24 lg:py-32 border-t border-dc-300"
    >
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Content */}
          <div class="space-y-8 animate-on-scroll opacity-0 translate-y-8">
            <h2 class="text-3xl sm:text-4xl lg:text-[48px] font-medium text-dc-900 tracking-tight !leading-[48px]">
              {title}
              <br />
              <span class="text-[#8CAA25]">{titleMuted}</span>
            </h2>

            {/* Features Grid */}
            <div class="grid sm:grid-cols-2 gap-4">
              {features?.map((feat, i) => (
                <div
                  key={i}
                  class="flex items-center gap-3 p-3 bg-dc-50 rounded-lg border border-dc-200 shadow-sm animate-on-scroll opacity-0 translate-y-4"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div class="p-1 bg-green-100 rounded-full flex-shrink-0">
                    <svg
                      class="w-4 h-4 text-green-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                  <span class="font-semibold text-dc-800 text-sm">
                    {feat.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Deploy Section */}
            <div class="p-6 bg-dc-50 rounded-xl border border-dc-200 shadow-sm animate-on-scroll opacity-0 translate-y-4">
              <h4 class="font-bold text-dc-900 mb-2 flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-primary-dark"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                {deploySectionTitle}
              </h4>
              <p class="text-dc-500 text-sm mb-4">{deploySectionDescription}</p>
              <div class="flex flex-wrap gap-3 text-xs font-mono text-dc-600">
                {deployOptions?.map((option, i) => (
                  <span
                    key={i}
                    class="px-3 py-1.5 bg-dc-100 border border-dc-200 rounded"
                  >
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Code Window */}
          <div class="bg-dc-900 rounded-xl overflow-hidden shadow-2xl border border-dc-800 font-mono text-sm animate-on-scroll opacity-0 translate-y-8">
            {/* Code Header */}
            <div class="bg-dc-800 px-4 py-3 flex items-center justify-between border-b border-dc-700">
              <span class="text-dc-400">{codeFileName}</span>
              <div class="flex gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
            </div>

            {/* Code Content */}
            <div class="p-6 text-dc-300 overflow-x-auto">
              <pre
                class="whitespace-pre-wrap leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightCode(codeExample) }}
              />
            </div>

            {/* Code Footer */}
            <div class="bg-primary-dark/20 border-t border-primary-dark/50 p-3 text-primary-light text-xs flex items-center justify-center gap-2">
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              {codeFooterMessage}
            </div>
          </div>
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

