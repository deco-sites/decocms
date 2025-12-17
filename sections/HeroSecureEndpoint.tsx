import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import CopyMCPCommand from "../islands/CopyMCPCommand.tsx";
import Icon from "../components/ui/Icon.tsx";

/**
 * @titleBy text
 */
interface FeatureBullet {
  /** @title Feature Text */
  text: string;
}

export interface Props {
  /**
   * @title Badge Label
   * @description Label shown in the badge (e.g., "New")
   */
  badgeLabel?: string;

  /**
   * @title Badge Text
   * @description Main text in the badge
   */
  badgeText?: string;

  /**
   * @title Badge URL
   * @description Link for the badge
   */
  badgeUrl?: string;

  /**
   * @title Title
   * @description Main headline text
   */
  title?: string;

  /**
   * @title Title Highlighted
   * @description Part of the title that appears in green
   */
  titleHighlighted?: string;

  /**
   * @title Subtitle
   * @description Description text below the title
   * @format textarea
   */
  subtitle?: string;

  /**
   * @title Feature Bullets
   * @description List of features with checkmarks
   */
  featureBullets?: FeatureBullet[];

  /**
   * @title Command
   * @description The CLI command to display and copy
   */
  command?: string;

  /**
   * @title Secondary CTA Text
   * @description Text for the secondary button
   */
  secondaryCtaText?: string;

  /**
   * @title Secondary CTA URL
   * @description URL for the secondary button
   */
  secondaryCtaUrl?: string;

  /**
   * @title Dashboard Image
   * @description Image showing the dashboard/mesh visualization
   */
  dashboardImage?: ImageWidget;
}

export default function HeroSecureEndpoint({
  badgeLabel = "New",
  badgeText = "Introducing deco's Enterprise-ready MCP Mesh",
  badgeUrl = "#",
  title = "One secure endpoint for",
  titleHighlighted = "every MCP server.",
  subtitle = "Self-hosted, open-source control plane to connect, proxy, and optimize all MCP traffic. Own your context. Deploy anywhere.",
  featureBullets = [
    { text: "One endpoint" },
    { text: "Smart tool selection" },
    { text: "Access management" },
    { text: "Full observability" },
    { text: "Cost control" },
  ],
  command = "npx @deco/context-mesh init",
  secondaryCtaText = "Read our Docs",
  secondaryCtaUrl = "/docs",
  dashboardImage,
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Background Glow */}
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(140, 170, 37, 0.15) 0%, rgba(248, 245, 242, 0) 70%)",
          }}
        />

        {/* Main Content */}
        <div class="flex flex-col items-center text-center pt-24 sm:pt-32 lg:pt-40 pb-16 px-6 sm:px-10 relative z-10">
          {/* Badge/Tag */}
          {badgeText && (
            <a
              href={badgeUrl}
              class="backdrop-blur-sm bg-white/80 border border-dc-200 rounded-full py-2 px-4 flex items-center gap-2 mb-6 hover:bg-white/95 hover:border-dc-300 transition-all group"
            >
              {badgeLabel && (
                <span class="text-primary-dark text-sm font-semibold">
                  {badgeLabel}
                </span>
              )}
              <span class="text-dc-600 text-sm font-medium">
                {badgeText}
              </span>
              <Icon
                name="arrow_forward"
                size="small"
                class="text-dc-400 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          )}

          {/* Title */}
          <h1 class="text-dc-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-[-1.5px] max-w-[900px] mb-6">
            {title}
            {titleHighlighted && (
              <>
                <br class="hidden sm:block" />{" "}
                <span class="text-[#8caa25]">{titleHighlighted}</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p class="text-dc-500 text-lg sm:text-xl font-normal leading-[1.5] max-w-[700px] mb-8">
            {subtitle}
          </p>

          {/* Feature Bullets */}
          {featureBullets && featureBullets.length > 0 && (
            <ul class="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 max-w-[800px]">
              {featureBullets.map((feature, index) => (
                <li key={index} class="flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-[#8caa25]/10 flex items-center justify-center">
                    <Icon name="check" size="xs" class="text-[#8caa25]" />
                  </span>
                  <span class="text-dc-700 text-sm sm:text-base font-medium">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTAs */}
          <div class="flex flex-col sm:flex-row items-center gap-4 mb-16">
            {/* Primary CTA - Command Copy Button */}
            <div class="bg-dc-900 text-white rounded-xl px-5 py-4 flex items-center gap-3 hover:bg-dc-800 transition-colors cursor-pointer group">
              <span class="text-[#8caa25] font-mono text-sm">$</span>
              <CopyMCPCommand
                command={command}
                class="!bg-transparent !p-0 !text-white hover:!bg-transparent"
              />
            </div>

            {/* Secondary CTA */}
            {secondaryCtaText && (
              <a
                href={secondaryCtaUrl}
                class="text-dc-700 text-base font-semibold hover:text-dc-500 transition-colors underline-offset-4 hover:underline"
              >
                {secondaryCtaText}
              </a>
            )}
          </div>

          {/* Dashboard Visual */}
          {dashboardImage ? (
            <div class="w-full max-w-[1200px] relative">
              {/* Gradient Background Container */}
              <div
                class="w-full rounded-[32px] sm:rounded-[40px] overflow-hidden relative"
                style={{
                  background:
                    "linear-gradient(135deg, #8caa25 0%, #a4c429 50%, #8caa25 100%)",
                  padding: "40px 40px 0 40px",
                }}
              >
                {/* Subtle pattern overlay */}
                <div
                  class="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                  }}
                />

                {/* Dashboard Image */}
                <div class="relative">
                  <Image
                    src={dashboardImage}
                    alt="MCP Mesh Dashboard"
                    width={1120}
                    height={600}
                    class="w-full h-auto rounded-t-[16px] sm:rounded-t-[20px] shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Fallback: Mock Dashboard UI */
            <div class="w-full max-w-[1200px] relative">
              {/* Gradient Background Container */}
              <div
                class="w-full h-[400px] sm:h-[500px] lg:h-[550px] rounded-[32px] sm:rounded-[40px] overflow-hidden relative flex justify-center items-end pt-12 sm:pt-16"
                style={{
                  background:
                    "linear-gradient(135deg, #8caa25 0%, #a4c429 50%, #8caa25 100%)",
                }}
              >
                {/* Subtle pattern overlay */}
                <div
                  class="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                  }}
                />

                {/* Mock Dashboard Card */}
                <div class="w-[85%] sm:w-[80%] h-full bg-white/95 backdrop-blur-sm rounded-t-[16px] sm:rounded-t-[20px] shadow-2xl flex flex-col overflow-hidden relative -mb-1">
                  {/* Toolbar */}
                  <div class="h-12 sm:h-14 border-b border-dc-200 flex items-center px-4 sm:px-5 gap-2 sm:gap-3 flex-shrink-0">
                    <div class="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                    <div class="w-3 h-3 rounded-full bg-[#FFD93D]" />
                    <div class="w-3 h-3 rounded-full bg-[#6BCB77]" />
                    <div class="flex-1 h-6 bg-dc-100 rounded-md ml-3" />
                  </div>

                  {/* Content Grid */}
                  <div class="flex-1 p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 sm:gap-6 lg:gap-8 min-h-0">
                    {/* Sidebar - Hidden on mobile */}
                    <div class="hidden lg:flex flex-col gap-2">
                      <div class="bg-[#8caa25]/10 text-[#8caa25] rounded-lg px-3 py-2 text-sm font-mono font-medium">
                        {">"} Mesh Control
                      </div>
                      <div class="text-dc-400 px-3 py-2 text-sm font-mono">
                        {">"} Access Policies
                      </div>
                      <div class="text-dc-400 px-3 py-2 text-sm font-mono">
                        {">"} Observability
                      </div>
                      <div class="text-dc-400 px-3 py-2 text-sm font-mono">
                        {">"} Settings
                      </div>
                    </div>

                    {/* Mesh Visualization Area */}
                    <div class="bg-dc-50 rounded-xl border border-dc-200 relative flex items-center justify-center overflow-hidden min-h-[200px]">
                      {/* Connection Lines */}
                      <svg
                        class="absolute inset-0 w-full h-full"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <line
                          x1="50%"
                          y1="50%"
                          x2="25%"
                          y2="25%"
                          stroke="#D6D3D1"
                          strokeWidth="1"
                        />
                        <line
                          x1="50%"
                          y1="50%"
                          x2="75%"
                          y2="25%"
                          stroke="#D6D3D1"
                          strokeWidth="1"
                        />
                        <line
                          x1="50%"
                          y1="50%"
                          x2="30%"
                          y2="75%"
                          stroke="#D6D3D1"
                          strokeWidth="1"
                        />
                        <line
                          x1="50%"
                          y1="50%"
                          x2="70%"
                          y2="70%"
                          stroke="#D6D3D1"
                          strokeWidth="1"
                        />
                      </svg>

                      {/* Center Node */}
                      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-dc-900 rounded-xl flex items-center justify-center shadow-lg z-10">
                        <Icon name="hub" size="xl" class="text-white" />
                      </div>

                      {/* Peripheral Nodes */}
                      <div class="absolute top-[20%] left-[20%] w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl border border-dc-200 flex items-center justify-center shadow-md">
                        <Icon name="computer" size="large" class="text-dc-500" />
                      </div>
                      <div class="absolute top-[20%] right-[20%] w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl border border-dc-200 flex items-center justify-center shadow-md">
                        <Icon name="cloud" size="large" class="text-dc-500" />
                      </div>
                      <div class="absolute bottom-[20%] left-[25%] w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl border border-dc-200 flex items-center justify-center shadow-md">
                        <Icon name="database" size="large" class="text-dc-500" />
                      </div>
                      <div class="absolute bottom-[22%] right-[22%] w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl border border-dc-200 flex items-center justify-center shadow-md">
                        <Icon name="layers" size="large" class="text-dc-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
