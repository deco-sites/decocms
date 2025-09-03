import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Texto do Botão Principal */
  primaryButtonText?: string;
  /** @title Texto do Botão Secundário */
  secondaryButtonText?: string;
  /** @title Texto de Créditos */
  creditsText?: string;
  /** @title Imagem de Fundo */
  backgroundImage?: ImageWidget;
  /** @title Logo da Empresa */
  companyLogo?: ImageWidget;
}

export default function HeroSection({
  title = "The open-source admin for your all your internal AI apps.",
  subtitle = "Prototype in chat, ship in code, and run & monetize agentic apps in production.",
  primaryButtonText = "Create your first app",
  secondaryButtonText = "Explore apps",
  creditsText = "Start with $2 in credits. No card required.",
  backgroundImage = "https://s3-alpha-sig.figma.com/img/d291/4b40/dffbbda162eba5dab3486f69f8bb74d9?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rAS6WZsdwbc5gu7joqX6Gi6v7K7-0-G~Xn3oMP0cREu4raOABqrzwWk~VwYdDXa509KIHqSTACelkzxvIC8OVjK7rjNzORddvmoDCKhzmUYInMO9h~6ncgZNrhh6uz71-l33Syow8S4iSZBIZTCiWLHNVsaT-SQkpBJAelFHjXIcSPNI2MhvIk~SzKrtra85BDCvow~6HfLZdhQPdKDldtaUNgLF-bp9f~P1W3VvKvxRk0hOkwpKBvOxGFg4eDArMmiywuoJWmZ8JeMR4fQeUFLGtkNk7BfP3f6xLa1~A4nA7Qdf-e4pF7mDcMFiKmoeQb6PKgLvqCNvIxeV~tb7kA__",
  companyLogo = "https://s3-alpha-sig.figma.com/img/d17d/417f/25313ed15c4203d1e439f3b64fe9c423?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YD-tEwoa-l1DgDPmTLseOrvoGs6EBOVDST68-wwWS95ZaD4qiMlZ0cvUsS94TeuWEJFVUxk88DUxe6P4rmBEx3PwPcJ6IekMwLbQafiChxQyAwz~G~GCtLjsfY0YN-SKUhrlSx5dCE8sNoNMMyTlvLEnsXiv~boQ1mvJs4Rnk78spZS3in-tnPFP5Dcr9JFLIsGDpoORa9aqi9Mo2SR-S0xt0MJ3ih9hTEOibomGvzir7Kdi7Dy2s1rb~lwTEsEYM~QjXE9joplXt57~hKRhGOxL-~NVjLpaI-4cTWfgeC2FVUjG6Y5XHxfLyKY9lCgPuRThIy2iYN4mA-pMzpyU5Q__"
}: Props) {
  return (
    <div class="min-h-screen bg-[#F1F0F6] relative overflow-hidden">
      {/* Header */}
      <header class="relative z-10 px-4 py-6">
        <div class="max-w-7xl mx-auto">
          <nav class="flex items-center justify-between">
            {/* Logo */}
            <div class="flex items-center">
              <div class="w-10 h-10 bg-[#D1EC1A] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 13.5C7 15.433 8.567 17 10.5 17C12.433 17 14 15.433 14 13.5C14 11.567 12.433 10 10.5 10C8.567 10 7 11.567 7 13.5Z" fill="#07401A"/>
                  <path d="M3.5 6.5C3.5 8.433 5.067 10 7 10C8.933 10 10.5 8.433 10.5 6.5C10.5 4.567 8.933 3 7 3C5.067 3 3.5 4.567 3.5 6.5Z" fill="#D1EC1A"/>
                </svg>
              </div>
            </div>

            {/* Navigation */}
            <div class="hidden md:flex items-center space-x-2 bg-[#E7E5E4] rounded-2xl p-1">
              <button class="px-4 py-1.5 text-sm text-[#28251F] rounded-full">Apps</button>
              <button class="px-4 py-1.5 text-sm text-[#28251F] rounded-full">Use Cases</button>
              <button class="px-4 py-1.5 text-sm text-[#28251F] rounded-full">Pricing</button>
              <button class="px-4 py-1.5 text-sm text-[#28251F] rounded-full">Docs</button>
              <button class="px-4 py-1.5 text-sm text-[#28251F] rounded-full">Community</button>
              <button class="px-4 py-1.5 text-sm text-[#28251F] rounded-full">Resources</button>
            </div>

            {/* CTA Button */}
            <button class="w-10 h-10 bg-[#D1EC1A] rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L6 11M1 6L11 6" stroke="#07401A" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main class="relative z-10 px-4 pt-16 pb-24">
        <div class="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 class="text-5xl md:text-6xl font-medium text-[#1C1917] mb-6 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p class="text-xl text-[#78716C] mb-12 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button class="bg-[#D1EC1A] text-[#07401A] px-16 py-6 rounded-xl text-xl font-medium hover:bg-[#C5E016] transition-colors">
              {primaryButtonText}
            </button>
            <button class="bg-[#E7E5E4] text-[#78716C] px-16 py-6 rounded-xl text-xl font-medium hover:bg-[#DDD9D6] transition-colors">
              {secondaryButtonText}
            </button>
          </div>

          {/* Credits Text with Icon */}
          <div class="flex items-center justify-center gap-6 text-[#28251F]">
            <div class="w-8 h-8 relative">
              <div class="absolute inset-0 grid grid-cols-4 gap-0.5">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} class="w-0.5 h-0.5 bg-[#D1EC1A] rounded-full"></div>
                ))}
              </div>
            </div>
            <span class="text-sm">{creditsText}</span>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div class="absolute bottom-0 left-0 right-0 h-40 bg-[#FAFAF9] rounded-t-2xl">
        <div class="absolute top-12 left-8 w-8 h-8">
          <div class="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} class="w-0.5 h-0.5 bg-[#D1EC1A] rounded-full"></div>
            ))}
          </div>
        </div>
        <div class="absolute top-4 right-4 w-4 h-4">
          <div class="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} class="w-0.5 h-0.5 bg-[#D1EC1A] rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Logos Section */}
      <section class="relative z-10 bg-[#FAFAF9] px-4 py-20">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-lg font-bold text-black mb-6">From videocoding builds to enterprise scale.</h2>
            <div class="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Company logos would go here - using placeholder for now */}
              <div class="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Logo 1</div>
              <div class="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Logo 2</div>
              <div class="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Logo 3</div>
              <div class="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Logo 4</div>
              <div class="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Logo 5</div>
              <div class="w-32 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Logo 6</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="bg-[#FAFAF9] px-4 py-20">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-medium text-[#1C1917] mb-6">
              The control plane that turns AI prototypes into production—governed, observable, and cost-clear.
            </h2>
          </div>

          {/* Feature Cards */}
          <div class="grid lg:grid-cols-2 gap-6">
            {/* Connect your context */}
            <div class="bg-[#F1F0F6] rounded-xl p-8 lg:p-12">
              <div class="mb-8">
                <h3 class="text-4xl font-medium text-[#28251F] mb-6">Connect your context</h3>
                <p class="text-2xl text-[#78716C] leading-relaxed">
                  Unify data, tools and models with policy, RBAC and observability — your agents always get the right context, safely.
                </p>
              </div>
              <div class="space-y-2">
                <div class="bg-[#FAFAF9] rounded-xl p-4">
                  <span class="text-lg text-[#1C1917]">MCP-native connectors</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Policy routing & RBAC</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Spend caps & budgets</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Audit trail</span>
                </div>
              </div>
            </div>

            {/* Visual Card */}
            <div class="bg-[#D1EC1A] rounded-xl p-3 border border-[#D6D3D1] relative overflow-hidden">
              <div class="absolute inset-0 opacity-20">
                <img src={backgroundImage} alt="Background pattern" class="w-full h-full object-cover" />
              </div>
            </div>

            {/* Visual Card 2 */}
            <div class="bg-[#D1EC1A] rounded-xl p-3 border border-[#D6D3D1] relative overflow-hidden">
              <div class="absolute inset-0 opacity-20">
                <img src={backgroundImage} alt="Background pattern" class="w-full h-full object-cover" />
              </div>
            </div>

            {/* Prototype in chat */}
            <div class="bg-[#F1F0F6] rounded-xl p-8 lg:p-12">
              <div class="mb-8">
                <h3 class="text-4xl font-medium text-[#28251F] mb-6">Prototype in chat, ship in code. Same repo.</h3>
                <p class="text-2xl text-[#78716C] leading-relaxed">
                  Ship agents, workflows and views in the same runtime: TypeScript SDK, typed RPC and edge deploy.
                </p>
              </div>
              <div class="space-y-2">
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Chat → Code prototyping</span>
                </div>
                <div class="bg-[#FAFAF9] rounded-xl p-4">
                  <span class="text-lg text-[#1C1917]">TS SDK & CLI</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Typed RPC</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Edge deploy & environments</span>
                </div>
              </div>
            </div>

            {/* Govern & observe */}
            <div class="bg-[#F1F0F6] rounded-xl p-8 lg:p-12">
              <div class="mb-8">
                <h3 class="text-4xl font-medium text-[#28251F] mb-6">Govern & observe your runs</h3>
                <p class="text-2xl text-[#78716C] leading-relaxed">
                  No vibe debugging: logs, traces, error analytics and cost-per-step to optimize quality and spend, with roles, approvals and tenancy.
                </p>
              </div>
              <div class="space-y-2">
                <div class="bg-[#FAFAF9] rounded-xl p-4">
                  <span class="text-lg text-[#1C1917]">Logs & traces</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Error analytics</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Cost per step & budgets</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Roles, approvals & tenancy</span>
                </div>
              </div>
            </div>

            {/* Visual Card 3 */}
            <div class="bg-[#D1EC1A] rounded-xl p-3 border border-[#D6D3D1] relative overflow-hidden">
              <div class="absolute inset-0 opacity-20">
                <img src={backgroundImage} alt="Background pattern" class="w-full h-full object-cover" />
              </div>
            </div>

            {/* Reuse & monetize */}
            <div class="bg-[#F1F0F6] rounded-xl p-8 lg:p-12">
              <div class="mb-8">
                <h3 class="text-4xl font-medium text-[#28251F] mb-6">Reuse & monetize with our marketplace</h3>
                <p class="text-2xl text-[#78716C] leading-relaxed">
                  Install ready-made modules — or publish your own. Wallet-based per-run billing turns apps into revenue.
                </p>
              </div>
              <div class="space-y-2">
                <div class="bg-[#FAFAF9] rounded-xl p-4">
                  <span class="text-lg text-[#1C1917]">One-click installs</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Publish modules</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Per-run billing (wallet)</span>
                </div>
                <div class="bg-[#E7E5E4] rounded-xl p-4">
                  <span class="text-lg text-[#78716C]">Templates & packages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Surfaces Section */}
      <section class="bg-[#FAFAF9] px-4 py-20">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-medium text-[#28251F] mb-6">One platform, two surfaces</h2>
            <p class="text-lg text-[#78716C]">Prototype in natural language. Scale in code.</p>
          </div>

          <div class="grid lg:grid-cols-2 gap-4">
            {/* Natural-language builder */}
            <div class="bg-[#F1F0F6] rounded-xl p-8">
              <div class="bg-[#D1EC1A] rounded-2xl p-3 mb-8 h-96 relative overflow-hidden">
                <div class="absolute inset-0 opacity-20">
                  <img src={backgroundImage} alt="Chat interface" class="w-full h-full object-cover" />
                </div>
              </div>
              <h3 class="text-3xl text-[#28251F] mb-4">Natural‑language builder for business users</h3>
            </div>

            {/* TypeScript SDK */}
            <div class="bg-[#F1F0F6] rounded-xl p-8">
              <div class="bg-[#D1EC1A] rounded-2xl p-3 mb-8 h-96 relative overflow-hidden">
                <div class="absolute inset-0 opacity-20">
                  <img src={backgroundImage} alt="Code interface" class="w-full h-full object-cover" />
                </div>
              </div>
              <h3 class="text-3xl text-[#28251F] mb-4">Open‑source TypeScript SDK for devs</h3>
            </div>
          </div>

          {/* Bottom Features */}
          <div class="mt-4 bg-[#F1F0F6] rounded-xl p-8">
            <div class="grid md:grid-cols-3 gap-8 text-center">
              <div class="flex flex-col items-center">
                <div class="w-6 h-6 mb-4">
                  <div class="grid grid-cols-4 gap-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} class="w-0.5 h-0.5 bg-[#8CAA25] rounded-full"></div>
                    ))}
                  </div>
                </div>
                <h4 class="text-2xl text-[#28251F] mb-2">Versioning & Git-native</h4>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-6 h-6 mb-4">
                  <div class="grid grid-cols-4 gap-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} class="w-0.5 h-0.5 bg-[#8CAA25] rounded-full"></div>
                    ))}
                  </div>
                </div>
                <h4 class="text-2xl text-[#28251F] mb-2">Governance built-in</h4>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-6 h-6 mb-4">
                  <div class="grid grid-cols-4 gap-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} class="w-0.5 h-0.5 bg-[#8CAA25] rounded-full"></div>
                    ))}
                  </div>
                </div>
                <h4 class="text-2xl text-[#28251F] mb-2">Fast Global Edge Deploy</h4>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-6 h-6 mb-4">
                  <div class="grid grid-cols-4 gap-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} class="w-0.5 h-0.5 bg-[#8CAA25] rounded-full"></div>
                    ))}
                  </div>
                </div>
                <h4 class="text-2xl text-[#28251F] mb-2">Open & extensible</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section class="bg-[#FAFAF9] px-4 py-20">
        <div class="max-w-7xl mx-auto">
          <div class="mb-16">
            <h2 class="text-5xl font-medium text-[#28251F] mb-12 max-w-2xl">Take a look inside the Agentic Era</h2>
            <button class="bg-[#D1EC1A] text-[#07401A] px-16 py-6 rounded-xl text-xl font-medium">
              Read all blogposts
            </button>
          </div>

          {/* Blog Cards */}
          <div class="grid lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} class="bg-[#F1F0F6] rounded-xl overflow-hidden">
                <div class="h-80 bg-gray-200 relative">
                  <img src={backgroundImage} alt="Blog post" class="w-full h-full object-cover" />
                </div>
                <div class="p-8">
                  <h3 class="text-3xl text-[#28251F] mb-6">Build & compose all in one single repository</h3>
                  <p class="text-xl text-[#78716C] mb-8 leading-relaxed">
                    Ship agents, workflows and views in the same runtime: TypeScript SDK, typed RPC and edge deploy. Prototype in chat, ship in code.
                  </p>
                  <div class="flex items-center gap-2 text-[#78716C]">
                    <div class="w-5 h-5 bg-gray-300 rounded-full"></div>
                    <span class="text-sm font-medium">Rafael Valls</span>
                    <span class="w-1 h-1 bg-[#78716C] rounded-full"></span>
                    <span class="text-sm font-medium">May 21, 2025</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div class="flex justify-center gap-4 mt-8">
            <button class="w-20 h-20 bg-[#E7E5E4] rounded-3xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#78716C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="w-20 h-20 bg-[#E7E5E4] rounded-3xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#78716C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section class="bg-[#FAFAF9] px-4 py-20">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-5xl font-medium text-[#28251F] mb-6">Frequently Asked Questions</h2>
            <p class="text-lg text-[#78716C]">
              Everything you need to build, run, and scale AI across your organization with control and confidence.
            </p>
          </div>

          <div class="space-y-4">
            {[
              "What exactly is deco.chat?",
              "Is deco.chat suitable for my company size?",
              "Which platforms can I integrate with deco.chat?",
              "Do I need technical expertise to use deco.chat?",
              "Can I host deco.chat on my own servers?",
              "How long does it take to implement deco.chat?",
              "How can I try deco.chat?"
            ].map((question, i) => (
              <div key={i} class="border-b border-gray-200">
                <button class="w-full flex items-center justify-between py-6 text-left">
                  <span class="text-xl font-medium text-[#544F4A]">{question}</span>
                  <div class="w-6 h-6 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1V13M1 7H13" stroke="#D6D3D1" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                </button>
                {i === 0 && (
                  <div class="pb-6">
                    <div class="bg-[#07401A] text-[#D1EC1A] p-6 rounded-2xl">
                      <p class="text-xl font-medium">
                        deco.chat is an open-source AI workspace that helps organizations build and manage AI agents. It's designed to make AI implementation simple, whether for internal tools or customer-facing applications.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="bg-[#D1EC1A] px-4 py-20 relative overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <img src={backgroundImage} alt="Background pattern" class="w-full h-full object-cover" />
        </div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
          <div class="mb-12">
            <h2 class="text-5xl font-medium text-[#07401A] mb-6">Be one of the first to use the new</h2>
            <p class="text-lg text-[#07401A] mb-10">
              Join the waiting list to gain early access to the platform that will transform how you create online stores.
            </p>
            <div class="flex items-center justify-center mb-8">
              <img src={companyLogo} alt="deco.chat" class="h-12" />
            </div>
          </div>

          {/* Email Signup */}
          <div class="max-w-2xl mx-auto">
            <div class="bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-lg">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="flex-1 px-4 py-4 bg-transparent text-[#A6A29F] placeholder-[#A6A29F] outline-none"
              />
              <button class="bg-[#07401A] text-[#D1EC1A] px-8 py-4 rounded-xl font-medium">
                I want early access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-[#07401A] px-4 py-20">
        <div class="max-w-7xl mx-auto">
          <div class="grid md:grid-cols-4 gap-12 mb-16">
            {/* Solutions */}
            <div>
              <h3 class="text-lg font-semibold text-[#D1EC1A] mb-6">Solutions</h3>
              <ul class="space-y-4">
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">AI Agents</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Enterprise</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Agencies</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">AI Chatbots</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Internal Tools</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Whitelabel</a></li>
              </ul>
              <div class="mt-10">
                <h3 class="text-lg font-semibold text-[#D1EC1A] mb-6">Social</h3>
                <ul class="space-y-4">
                  <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">LinkedIn</a></li>
                  <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Youtube</a></li>
                </ul>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 class="text-lg font-semibold text-[#D1EC1A] mb-6">Support</h3>
              <ul class="space-y-4">
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Pricing</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Documentation</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Tutorials</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Status Page</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 class="text-lg font-semibold text-[#D1EC1A] mb-6">Company</h3>
              <ul class="space-y-4">
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Blog</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Careers</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Security</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Afilliate Program</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Deco Camp</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 class="text-lg font-semibold text-[#D1EC1A] mb-6">Legal</h3>
              <ul class="space-y-4">
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Privacy</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Terms</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">SOC 2 Report</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">OpenAI DPA</a></li>
                <li><a href="#" class="text-[#D6D3D1] hover:text-[#D1EC1A] transition-colors">Anthropic DPA</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div class="border-t border-[#D6D3D1] pt-8">
            <img src={companyLogo} alt="Company logos" class="w-full h-48 object-contain opacity-60" />
          </div>
        </div>
      </footer>
    </div>
  );
}