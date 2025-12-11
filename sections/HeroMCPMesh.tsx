import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import UsernameForm from "../islands/UsernameForm.tsx";
import StatsCarousel from "../islands/StatsCarousel.tsx";

export interface Props {
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
   * @title Highlighted Text in Subtitle
   * @description Text that appears bold in the subtitle
   */
  subtitleHighlight?: string;

  /**
   * @title Domain Suffix
   * @description The domain suffix shown after username input
   */
  domainSuffix?: string;

  /**
   * @title CTA Button Text
   */
  ctaButtonText?: string;

  /**
   * @title CTA Button URL
   */
  ctaButtonUrl?: string;

  /**
   * @title Stat 1 Value
   */
  stat1Value?: string;

  /**
   * @title Stat 1 Label
   */
  stat1Label?: string;

  /**
   * @title Stat 2 Value
   */
  stat2Value?: string;

  /**
   * @title Stat 2 Label
   */
  stat2Label?: string;

  /**
   * @title Stat 1 Eyebrow
   */
  stat1Eyebrow?: string;

  /**
   * @title Stat 2 Eyebrow
   */
  stat2Eyebrow?: string;

  /**
   * @title Stat 3 Value
   */
  stat3Value?: string;

  /**
   * @title Stat 3 Label
   */
  stat3Label?: string;

  /**
   * @title Stat 3 Eyebrow
   */
  stat3Eyebrow?: string;

  /**
   * @title Illustration Image
   * @description The mesh illustration image
   */
  illustration?: ImageWidget;
}

export default function HeroMCPMesh({
  title = "Manage your context.",
  titleHighlighted = "Scale AI results.",
  subtitle = "The open-source infrastructure to govern AI context. Centralize MCP connections, enforce policies, and monitor every interaction.",
  subtitleHighlight = "smart tool selection and code execution",
  domainSuffix = ".decomcp.com",
  ctaButtonText = "Get your mesh",
  ctaButtonUrl = "/signup",
  stat1Value = "90%",
  stat1Label = "Token Reduction",
  stat1Eyebrow = "CODE EXECUTION",
  stat2Value = "10X",
  stat2Label = "Better Results",
  stat2Eyebrow = "SMART ROUTING",
  stat3Value = "Real time",
  stat3Label = "Observability",
  stat3Eyebrow = "OPENTELEMETRY TRACING",
  illustration = "https://assets.decocache.com/decocms/6216bd1e-7bc1-40df-8ae1-6e431919f1e7/mesh_image.png",
}: Props) {
  // Handle multiple bold parts in subtitle
  const boldParts = ["open-source", "govern AI context", "monitor every interaction"];
  
  // Function to render subtitle with bold parts
  const renderSubtitle = (text: string) => {
    const matches: Array<{ start: number; end: number; text: string }> = [];
    
    // Find all matches
    boldParts.forEach((boldPart) => {
      const regex = new RegExp(boldPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
        });
      }
    });
    
    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);
    
    // Remove overlapping matches (keep first one)
    const nonOverlapping: typeof matches = [];
    matches.forEach((match) => {
      if (nonOverlapping.length === 0 || match.start >= nonOverlapping[nonOverlapping.length - 1].end) {
        nonOverlapping.push(match);
      }
    });
    
    // Build parts array
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    
    nonOverlapping.forEach((match) => {
      // Add text before match
      if (match.start > lastIndex) {
        parts.push(text.substring(lastIndex, match.start));
      }
      // Add bold match
      parts.push(<strong>{match.text}</strong>);
      lastIndex = match.end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : [text];
  };

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Main Content Area */}
        <div class="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-16 px-4 sm:px-10 lg:px-20 relative z-20 flex-1">
          {/* Left Content */}
          <div class="w-full lg:w-[512px] flex flex-col gap-12 shrink-0 justify-center">
            {/* Text Content */}
            <div class="flex flex-col gap-6">
              {/* Title */}
              <h1 class="text-dc-900 text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-medium leading-none tracking-[-1.6px]">
                {title}
                {" "}
                <span class="text-[#8caa25]">{titleHighlighted}</span>
              </h1>

              {/* Subtitle */}
              <p class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4] max-w-[474px]">
                {renderSubtitle(subtitle)}
              </p>

              {/* CTA Form */}
              <UsernameForm
                domainSuffix={domainSuffix}
                ctaButtonText={ctaButtonText}
                ctaButtonUrl={ctaButtonUrl}
              />

              {/* Subtext below CTA */}
              <p class="text-dc-500 text-xs font-normal leading-[1.4] -mt-2">
                Takes 30 seconds. Free. Open source.
              </p>
            </div>

            {/* Stats - Carousel on mobile, static on desktop */}
            <div class="lg:hidden">
              <StatsCarousel
                stat1Value={stat1Value}
                stat1Label={stat1Label}
                stat1Eyebrow={stat1Eyebrow}
                stat2Value={stat2Value}
                stat2Label={stat2Label}
                stat2Eyebrow={stat2Eyebrow}
                stat3Value={stat3Value}
                stat3Label={stat3Label}
                stat3Eyebrow={stat3Eyebrow}
              />
            </div>

            {/* Stats - Desktop */}
            <div class="hidden lg:flex items-start gap-10">
              {/* Stat 1 */}
              <div class="flex flex-col gap-2">
                {stat1Eyebrow && (
                  <span class="font-mono text-dc-500 text-xs uppercase leading-5">
                    {stat1Eyebrow}
                  </span>
                )}
                <span class="text-dc-900 text-[32px] font-medium leading-none tracking-[-0.64px]">
                  {stat1Value}
                </span>
                <span class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4] whitespace-nowrap">
                  {stat1Label}
                </span>
              </div>

              {/* Divider between Stat 1 and Stat 2 */}
              <div class="w-px h-[100px] flex-shrink-0" style="background-color: #D6D3D1;" />

              {/* Stat 2 */}
              <div class="flex flex-col gap-2">
                {stat2Eyebrow && (
                  <span class="font-mono text-dc-500 text-xs uppercase leading-5">
                    {stat2Eyebrow}
                  </span>
                )}
                <span class="text-dc-900 text-[32px] font-medium leading-none tracking-[-0.64px]">
                  {stat2Value}
                </span>
                <span class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4] whitespace-nowrap">
                  {stat2Label}
                </span>
              </div>

              {/* Divider between Stat 2 and Stat 3 */}
              {stat3Value && (
                <div class="w-px h-[100px] flex-shrink-0" style="background-color: #D6D3D1;" />
              )}
              
              {/* Stat 3 */}
              {stat3Value && (
                <div class="flex flex-col gap-2">
                  {stat3Eyebrow && (
                    <span class="font-mono text-dc-500 text-xs uppercase leading-5 whitespace-nowrap">
                      {stat3Eyebrow}
                    </span>
                  )}
                  <span class="text-dc-900 text-[32px] font-medium leading-none tracking-[-0.64px]">
                    {stat3Value}
                  </span>
                  <span class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4] whitespace-nowrap">
                    {stat3Label}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Illustration - PNG Image */}
          <div class="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[906px] h-[777px]">
            <Image
              src={illustration}
              alt="MCP Mesh Illustration"
              width={906}
              height={777}
              class="w-full h-full object-cover object-center"
            />
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
