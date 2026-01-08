import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import CopyMCPCommand from "../islands/CopyMCPCommand.tsx";
import TrackedLink from "../islands/TrackedLink.tsx";
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
   * @description Label shown in the badge (e.g., "Read more")
   */
  badgeLabel?: string;

  /**
   * @title Badge Text
   * @description Main text in the badge
   */
  badgeText?: string;

  /**
   * @title Badge URL
   * @description Link for the badge (e.g., blog post URL)
   */
  badgeUrl?: string;

  /**
   * @title Title Before Highlight
   * @description Text that appears before the highlighted part (optional)
   */
  titleBefore?: string;

  /**
   * @title Title Highlighted
   * @description Part of the title that appears in green
   */
  titleHighlighted?: string;

  /**
   * @title Title After Highlight
   * @description Text that appears after the highlighted part (optional)
   */
  titleAfter?: string;

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
   * @title CLI Command
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
   * @title Illustration Image
   * @description The mesh illustration image
   */
  illustration?: ImageWidget;
}

export default function HeroMCPMesh({
  badgeLabel = "Read more:",
  badgeText = "Introducing deco's Enterprise-ready MCP Mesh",
  badgeUrl = "/blog/post/mcp-mesh",
  titleBefore,
  titleHighlighted,
  titleAfter,
  subtitle = "Self-hosted, open-source control plane to connect, proxy, and optimize all MCP traffic. Own your context. Deploy anywhere.",
  featureBullets = [
    { text: "Smart tool selection" },
    { text: "Access management" },
    { text: "Full observability" },
    { text: "Cost control" },
  ],
  command = "bunx @decocms/mesh",
  secondaryCtaText = "View docs",
  secondaryCtaUrl = "https://docs.decocms.com/en/introduction/",
  illustration = "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/mesh_image.png",
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Main Content Area - centered container for wider screens */}
        <div class="flex flex-col lg:flex-row items-center justify-center pt-32 pb-16 sm:pt-40 sm:pb-20 lg:py-16 px-6 sm:px-10 lg:px-16 xl:px-24 relative z-20 flex-1">
          {/* Inner container with max-width for centering on wide screens */}
          <div class="w-full max-w-[1400px] flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
            {/* Left Content - 50% on desktop */}
            <div class="w-full lg:w-1/2 flex flex-col gap-6 justify-center">
              {/* Text Content */}
              <div class="flex flex-col gap-4">
                {/* Badge/Tag */}
                {badgeText && (
                  <a
                    href={badgeUrl}
                    class="backdrop-blur-sm bg-white/80 border border-dc-200 rounded-full py-1.5 px-3 flex items-center gap-2 mb-2 w-fit hover:bg-white/95 hover:border-dc-300 transition-all group"
                  >
                    {badgeLabel && (
                      <span class="text-primary-dark text-sm font-semibold hidden sm:inline">
                        {badgeLabel}
                      </span>
                    )}
                    {/* Mobile: shorter text without "Introducing" */}
                    <span class="text-dc-600 text-sm font-medium sm:hidden">
                      {badgeText.replace(/^Introducing\s+/i, "")}
                    </span>
                    {/* Desktop: full text */}
                    <span class="text-dc-600 text-sm font-medium hidden sm:inline">
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
                <h1 class="text-dc-900 text-[52px] sm:text-6xl lg:text-7xl xl:text-[80px] font-medium leading-[1.05] tracking-[-1.6px]">
                  {titleBefore && <>{titleBefore}{" "}</>}
                  {titleHighlighted && (
                    <span class="text-[#8caa25]">{titleHighlighted}</span>
                  )}
                  {titleAfter && <>{" "}{titleAfter}</>}
                </h1>

                {/* Subtitle */}
                <p class="text-dc-500 text-xl lg:text-xl font-normal leading-[1.4] max-w-[540px] lg:max-w-[460px] whitespace-pre-line">
                  {subtitle}
                </p>

              {/* Feature Bullets - 2x2 grid */}
              {featureBullets && featureBullets.length > 0 && (
                <ul class="grid grid-cols-2 gap-x-4 gap-y-3 mt-2 max-w-[580px]">
                  {featureBullets.map((feature, index) => (
                    <li key={index} class="flex items-center gap-2">
                      <span class="w-5 h-5 rounded-full bg-[#8caa25]/10 flex items-center justify-center flex-shrink-0">
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
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4">
                  {/* Primary CTA - Command Copy Button */}
                  <CopyMCPCommand
                    command={command}
                    variant="lime"
                    trackEventName="mcp_mesh_hero_copy_command_click"
                  />

                  {/* Secondary CTA */}
                  {secondaryCtaText && (
                    <TrackedLink
                      href={secondaryCtaUrl}
                      event="mcp_mesh_hero_docs_click"
                      properties={{ button_text: secondaryCtaText }}
                      class="bg-dc-200 text-dc-700 text-sm font-medium px-4 py-3 rounded-xl hover:bg-dc-300 transition-colors whitespace-nowrap"
                    >
                      {secondaryCtaText}
                    </TrackedLink>
                  )}
                </div>
              </div>
            </div>

            {/* Right Illustration - 50% on desktop */}
            <div class="hidden lg:flex w-1/2 items-center justify-center">
              <Image
                src={illustration}
                alt="MCP Mesh Illustration"
                width={700}
                height={600}
                class="w-full max-w-[700px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Mobile Illustration */}
          <div class="flex lg:hidden w-full justify-center mt-8 -mx-4 sm:-mx-10">
            <div class="relative w-full max-w-[95vw]">
              <Image
                src={illustration}
                alt="MCP Mesh Illustration"
                width={900}
                height={772}
                class="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
