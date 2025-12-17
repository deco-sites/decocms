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
   * @title Title
   * @description Main title text (appears in black)
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
                <h1 class="text-dc-900 text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-medium leading-[1.05] tracking-[-1.6px]">
                  {title}
                  {" "}
                  <span class="text-[#8caa25]">{titleHighlighted}</span>
                </h1>

                {/* Subtitle */}
                <p class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4] max-w-[540px]">
                  {subtitle}
                </p>

                {/* Feature Bullets */}
                {featureBullets && featureBullets.length > 0 && (
                  <ul class="flex flex-wrap gap-x-5 gap-y-2 mt-2">
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
                  <CopyMCPCommand command={command} />

                  {/* Secondary CTA */}
                  {secondaryCtaText && (
                    <a
                      href={secondaryCtaUrl}
                      class="bg-[#d0ec1a] text-[#07401a] text-sm font-medium px-4 py-3 rounded-xl hover:bg-[#c4e016] transition-colors whitespace-nowrap"
                    >
                      {secondaryCtaText}
                    </a>
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
