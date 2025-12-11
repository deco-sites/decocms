import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import UsernameForm from "../islands/UsernameForm.tsx";

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
   * @title Illustration Image
   * @description The mesh illustration image
   */
  illustration?: ImageWidget;
}

export default function HeroMCPMesh({
  title = "Control Your Context.",
  titleHighlighted = "Scale Your AI.",
  subtitle = "The open-source infrastructure to govern AI context. Connect any tool to any agent with smart tool selection and code execution that reduce token costs by up to 98% and 10x your results.",
  subtitleHighlight = "smart tool selection and code execution",
  domainSuffix = ".decomcp.com",
  ctaButtonText = "Get your mesh",
  ctaButtonUrl = "/signup",
  stat1Value = "90%",
  stat1Label = "Token Reduction",
  stat2Value = "10x",
  stat2Label = "Better Results",
  illustration = "/hero-mesh-illustration.png",
}: Props) {
  // Split subtitle around highlighted text
  const subtitleParts = subtitle.split(subtitleHighlight);

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Main Content Area */}
        <div class="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between py-16 sm:py-20 px-4 sm:px-10 lg:px-20 relative z-20 flex-1">
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
                {subtitleParts[0]}
                <span class="font-bold">{subtitleHighlight}</span>
                {subtitleParts[1]}
              </p>

              {/* CTA Form */}
              <UsernameForm
                domainSuffix={domainSuffix}
                ctaButtonText={ctaButtonText}
                ctaButtonUrl={ctaButtonUrl}
              />
            </div>

            {/* Stats */}
            <div class="flex items-start gap-10">
              {/* Stat 1 */}
              <div class="flex flex-col gap-2">
                <span class="text-dc-900 text-5xl lg:text-[64px] font-medium leading-none tracking-[-1.28px]">
                  {stat1Value}
                </span>
                <span class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4]">
                  {stat1Label}
                </span>
              </div>

              {/* Divider */}
              <div class="w-px h-[100px] bg-dc-300" />

              {/* Stat 2 */}
              <div class="flex flex-col gap-2">
                <span class="text-dc-900 text-5xl lg:text-[64px] font-medium leading-none tracking-[-1.28px]">
                  {stat2Value}
                </span>
                <span class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4]">
                  {stat2Label}
                </span>
              </div>
            </div>
          </div>

          {/* Right Illustration - PNG Image */}
          <div class="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-[906px] h-[777px]">
            <Image
              src={illustration}
              alt="MCP Mesh Illustration"
              width={906}
              height={777}
              class="w-full h-full object-cover object-center"
            />
          </div>

          {/* Mobile Illustration */}
          <div class="flex lg:hidden w-full justify-center mt-8">
            <div class="relative w-full max-w-[400px]">
              <Image
                src={illustration}
                alt="MCP Mesh Illustration"
                width={400}
                height={343}
                class="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
