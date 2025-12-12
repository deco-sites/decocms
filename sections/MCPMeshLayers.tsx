import MCPMeshLayersAnimation from "../islands/MCPMeshLayersAnimation.tsx";

export interface Props {
  /**
   * @title Section Title
   */
  title?: string;
  /**
   * @title Subheadline
   */
  subheadline?: string;
  /**
   * @title Layer 1 Image
   */
  layer1Image?: string;
  /**
   * @title Layer 2 Image
   */
  layer2Image?: string;
  /**
   * @title Layer 3 Image
   */
  layer3Image?: string;
}

export default function MCPMeshLayers({
  title = "Built in layers. Designed to scale.",
  subheadline = "From infrastructure to ecosystem, deco CMS grows with you.",
  layer1Image = "https://assets.decocache.com/decocms/0c1061c8-6ff8-4683-a7a4-c65b8ba07492/layer1.svg",
  layer2Image = "https://assets.decocache.com/decocms/fb45983b-4345-44e0-a692-6972fd2add82/layer2.svg",
  layer3Image = "https://assets.decocache.com/decocms/74d273a8-eca8-4925-9f20-62534cc0067c/layer3.svg",
}: Props) {
  return (
    <section class="w-full bg-dc-50 py-16 md:py-24 lg:py-32">
      <div class="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20">
        {/* Header */}
        <div class="mb-16 md:mb-20 lg:mb-24 text-center">
          <h2 class="text-dc-900 text-4xl md:text-5xl lg:text-6xl font-medium mb-4 leading-tight">
            {title}
          </h2>
          <p class="text-dc-500 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            {subheadline}
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Content */}
          <div class="space-y-40 lg:space-y-48">
            {/* Layer 1: MCP Mesh */}
            <div class="scroll-section" id="layer-1">
              <div class="mb-6">
                <p class="font-mono text-dc-500 text-xs uppercase tracking-wider mb-4">
                  The Foundation
                </p>
                <h3 class="text-dc-900 text-3xl md:text-4xl font-medium mb-4">
                  MCP Mesh
                </h3>
                <p class="text-dc-500 text-lg md:text-xl font-medium mb-6">
                  Open-source infrastructure to connect, secure, and monitor your enterprise context.
                </p>
                <p class="text-dc-500 text-base md:text-lg leading-relaxed">
                  Production-ready MCP gateway that centralizes all your organization's context—CRMs, ERPs, databases, SaaS platforms, internal APIs—into one governed endpoint accessible by any AI tool.
                </p>
              </div>

              {/* Core Capabilities - Bento Grid */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* Connect Everything */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-3">Connect Everything</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• One endpoint for all MCP servers (HTTP, SSE, WebSocket)</li>
                    <li>• One-click install from integrated Store</li>
                    <li>• Smart routing with policy enforcement</li>
                  </ul>
                </div>

                {/* Secure & Govern */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-3">Secure & Govern</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• Centralized credentials vault</li>
                    <li>• Enterprise SSO (Okta, Azure AD)</li>
                    <li>• Granular RBAC per tool, per user</li>
                    <li>• Policy enforcement at protocol level</li>
                  </ul>
                </div>

                {/* Monitor & Observe */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-3">Monitor & Observe</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• OpenTelemetry tracing for every tool call</li>
                    <li>• Real-time cost attribution (per user/project/day)</li>
                    <li>• Complete audit trails for compliance</li>
                  </ul>
                </div>

                {/* Built for Performance */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-3">Built for Performance</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• Code execution native (90% token reduction)</li>
                    <li>• Zero added latency architecture</li>
                    <li>• AI Gateway with Open Router or BYOK/BYOM</li>
                  </ul>
                </div>

                {/* Deploy Anywhere - Full Width */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6 md:col-span-2">
                  <h4 class="text-dc-900 text-xl font-medium mb-3">Deploy Anywhere</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• Open source (audit, fork, contribute)</li>
                    <li>• Self-host on any infrastructure</li>
                    <li>• Zero vendor lock-in</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layer 2: AI Studio */}
            <div class="scroll-section" id="layer-2">
              <div class="mb-6">
                <p class="font-mono text-dc-500 text-xs uppercase tracking-wider mb-4">
                  The Builder
                </p>
                <h3 class="text-dc-900 text-3xl md:text-4xl font-medium mb-4">
                  AI Studio
                </h3>
                <p class="text-dc-500 text-lg md:text-xl font-medium mb-6">
                  Full-stack framework for building MCP apps—no-code + full-code.
                </p>
                <p class="text-dc-500 text-base md:text-lg leading-relaxed">
                  Development platform that transforms your mesh into a complete app-building environment. Two modes working together: vibecoding for business users, TypeScript SDK for developers.
                </p>
              </div>

              {/* Two Building Modes */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* No-Code */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-4">No-Code (Vibecoding for AI Builders)</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• Chat-based creation: describe what you need, AI generates the app</li>
                    <li>• Visual workflow builder for agent orchestration</li>
                    <li>• Pre-built templates (approval workflows, dashboards, alerts)</li>
                    <li>• Instant preview and testing</li>
                    <li>• Governed by default (IT-approved boundaries)</li>
                  </ul>
                </div>

                {/* Full-Code */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-4">Full-Code (TypeScript SDK for Developers)</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• TypeScript-first with full-stack type safety</li>
                    <li>• Agent framework with mesh tool access</li>
                    <li>• Durable workflows with state persistence</li>
                    <li>• Custom UIs (React 19 + Tailwind v4, MCP Apps Extension SEP-1865)</li>
                    <li>• Extend vibecoded apps for optimization/scale</li>
                    <li>• Full observability through mesh</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Layer 3: MCP Store */}
            <div class="scroll-section" id="layer-3">
              <div class="mb-6">
                <p class="font-mono text-dc-500 text-xs uppercase tracking-wider mb-4">
                  The Marketplace
                </p>
                <h3 class="text-dc-900 text-3xl md:text-4xl font-medium mb-4">
                  MCP Store
                </h3>
                <p class="text-dc-500 text-lg md:text-xl font-medium mb-6">
                  Discover, install, and monetize MCP apps, one-click deployment.
                </p>
                <p class="text-dc-500 text-base md:text-lg leading-relaxed">
                  Curated marketplace for pre-built MCP solutions. Like an app store for enterprise AI—browse, install, and use immediately within your governed mesh.
                </p>
              </div>

              {/* Store Features */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* MCP Servers */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-4">MCP Servers (External Connections)</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• Connect to SaaS platforms: Salesforce, Slack, Google Drive, GitHub</li>
                    <li>• One-click install with credentials in mesh vault</li>
                    <li>• Run elsewhere, authenticate once</li>
                  </ul>
                </div>

                {/* MCP Apps */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6">
                  <h4 class="text-dc-900 text-xl font-medium mb-4">MCP Apps (Packaged Solutions)</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• Complete applications: agents + workflows + UIs + databases</li>
                    <li>• Built by deco, community, or your enterprise teams</li>
                    <li>• Composable like Lego blocks</li>
                    <li>• Governed through mesh (RBAC, audit trails, cost controls)</li>
                  </ul>
                </div>

                {/* Vertical Bundles - Full Width */}
                <div class="bg-white/50 backdrop-blur-sm rounded-2xl border border-dc-200 p-6 md:col-span-2">
                  <h4 class="text-dc-900 text-xl font-medium mb-4">Vertical Bundles (Industry Solutions)</h4>
                  <ul class="space-y-2 text-dc-500 text-sm">
                    <li>• Starting with Digital Experience Bundle</li>
                    <li>• Future: Finance, HR, Support, Sales bundles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Animation */}
          <div 
            class="hidden lg:block lg:self-start" 
            style={{
              minHeight: "3000px",
            }}
          >
            <MCPMeshLayersAnimation
              layer1Src={layer1Image}
              layer2Src={layer2Image}
              layer3Src={layer3Image}
            />
          </div>
        </div>

        {/* Mobile: Show images stacked */}
        <div class="lg:hidden mt-16 space-y-8">
          <div class="flex justify-center">
            <img
              src={layer1Image}
              alt="Layer 1"
              class="w-full max-w-[400px] h-auto"
            />
          </div>
          <div class="flex justify-center">
            <img
              src={layer2Image}
              alt="Layer 2"
              class="w-full max-w-[400px] h-auto"
            />
          </div>
          <div class="flex justify-center">
            <img
              src={layer3Image}
              alt="Layer 3"
              class="w-full max-w-[400px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

