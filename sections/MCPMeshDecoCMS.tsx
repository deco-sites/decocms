import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface FeatureCard {
  /**
   * @title Eyebrow
   * @description Uppercase eyebrow text
   */
  eyebrow?: string;
  /**
   * @title Title
   * @description Card title
   */
  title?: string;
  /**
   * @title Description
   * @description Card description
   */
  description?: string;
  /**
   * @title Image
   * @description Card image
   */
  image?: ImageWidget;
}

export interface Props {
  /**
   * @title Eyebrow
   * @description Uppercase eyebrow text
   */
  eyebrow?: string;
  /**
   * @title Title
   * @description Main title (aligned left)
   */
  title?: string;
  /**
   * @title Description
   * @description Description text (aligned right)
   */
  description?: string;
  /**
   * @title Feature Cards
   * @description List of feature cards (max 3)
   * @maxItems 3
   */
  cards?: FeatureCard[];
  /**
   * @title Background Image
   * @description Background image in the right corner
   */
  backgroundImage?: ImageWidget;
}

export default function MCPMeshDecoCMS({
  eyebrow = "THE CONTEXT MANAGEMENT SYSTEM FOR ENTERPRISES THAT TAKE AI SERIOUSLY.",
  title = "The foundations and building blocks to scale AI across your business.",
  description = "We provide the complete infrastructure, development tools, and ecosystem you need to move from AI experiments to production-grade deployment, 10x faster than building internally or stitching together point solutions.",
  cards = [
    {
      eyebrow: "CONTEXT",
      title: "One unified layer for all enterprise data",
      description:
        "Connect once, use anywhere. Your enterprise context becomes portable and reusable across any AI tool: Claude, Cursor and custom agents, without vendor lock-in.",
      image: {
        src: "https://assets.decocache.com/decocms/5ead7b31-3719-40e8-b281-0f1d86ba7ce8/card_context.svg",
        alt: "Context",
        width: 400,
        height: 300,
      },
    },
    {
      eyebrow: "AUTONOMY",
      title: "Empower teams to build without bottlenecks",
      description:
        "Governed self-service means business teams can solve their own problems while IT maintains control. Developers focus on high-value work, not repetitive integrations.",
      image: {
        src: "https://assets.decocache.com/decocms/341a40ba-2570-4502-acb3-810da2cc1745/card_autonomy.svg",
        alt: "Autonomy",
        width: 400,
        height: 300,
      },
    },
    {
      eyebrow: "GOVERNANCE",
      title: "Board-level visibility and control",
      description:
        "Know exactly what AI is running, what it's costing, and who approved it. Complete observability and policy enforcement give you confidence to scale.",
      image: {
        src: "https://assets.decocache.com/decocms/71d7ff03-c6d2-4683-aab4-05b821a2efda/card_governance.png",
        alt: "Governance",
        width: 400,
        height: 300,
      },
    },
  ],
  backgroundImage = {
    src: "https://assets.decocache.com/decocms/3675ee13-4538-4adf-be71-8c1daf9ff471/mao.svg",
    alt: "Background",
    width: 597,
    height: 776,
  },
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2 py-16 md:py-24 lg:py-32">
      <div class="bg-primary-dark rounded-[24px] flex flex-col relative overflow-hidden">
        {/* Background Image - Right Corner */}
        {backgroundImage && (
          <div class="absolute right-0 bottom-0 opacity-20 pointer-events-none">
            <Image
              src={backgroundImage.src}
              alt={backgroundImage.alt || "Background"}
              width={backgroundImage.width || 597}
              height={backgroundImage.height || 776}
              class="w-auto h-auto max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
            />
          </div>
        )}

        {/* Main Content */}
        <div class="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-20 py-16 md:py-24 lg:py-32 max-w-[1600px] mx-auto w-full">
          {/* Header Section */}
          <div class="mb-16 md:mb-20 lg:mb-24">
            {/* Eyebrow */}
            {eyebrow && (
              <p class="font-mono text-primary-light text-xs sm:text-sm uppercase tracking-wider mb-6 md:mb-8">
                {eyebrow}
              </p>
            )}

            {/* Title and Description */}
            <div class="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
              {/* Title - Left */}
              <div class="flex-1 lg:max-w-[50%]">
                <h2 class="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                  {title}
                </h2>
              </div>

              {/* Description - Right */}
              <div class="flex-1 lg:max-w-[35%] lg:ml-auto">
                <p class="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed text-left lg:text-right">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
            {cards?.map((card, index) => (
              <div
                key={index}
                class="flex flex-col bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                <div class="p-6 md:p-8 flex flex-col flex-grow">
                  {/* Eyebrow */}
                  {card.eyebrow && (
                    <p class="font-mono text-primary-light text-xs uppercase tracking-wider mb-4">
                      {card.eyebrow}
                    </p>
                  )}

                  {/* Title */}
                  {card.title && (
                    <h3 class="text-white text-xl md:text-2xl font-medium mb-4 leading-tight">
                      {card.title}
                    </h3>
                  )}

                  {/* Description */}
                  {card.description && (
                    <p class="text-white/70 text-sm md:text-base leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>

                {/* Image */}
                {card.image && (
                  <div class="w-full mt-auto overflow-hidden rounded-b-2xl" style="margin: 0 !important; padding: 0 !important; line-height: 0 !important; font-size: 0 !important; display: block !important;">
                    <img
                      src={card.image.src}
                      alt={card.image.alt || card.eyebrow || "Feature"}
                      width={card.image.width || 400}
                      height={card.image.height || 300}
                      class="w-full h-auto block"
                      style="margin: 0 !important; padding: 0 !important; display: block !important; vertical-align: bottom !important; line-height: 0 !important; border: none !important; outline: none !important;"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

