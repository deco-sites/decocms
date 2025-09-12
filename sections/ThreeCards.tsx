import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface CardItem {
  /**
   * @title Category
   * @description Category label (e.g., DESIGN, BLOCKS, PERFORMANCE)
   */
  category: string;
  /**
   * @title Title
   * @description Card title
   */
  title: string;
  /**
   * @title Description
   * @description Card description text
   */
  description: string;
  /**
   * @title Image
   * @description Card image
   */
  image?: ImageWidget;
  /**
   * @title Image Alt Text
   * @description Alt text for the card image
   */
  imageAlt?: string;
}

export interface Props {
  /**
   * @title Main Title
   * @description Main section title
   */
  title?: string;
  /**
   * @title Cards
   * @description List of feature cards (max 3)
   * @maxItems 3
   */
  cards?: CardItem[];
}

export default function ThreeCards({ title, cards }: Props) {
  return (
    <section class="w-full bg-dc-50 px-4 sm:px-8 lg:px-16 py-16 sm:py-20 lg:py-20">
      <div class="w-full max-w-[1440px] mx-auto">
        {/* Main Title */}
        {title && (
          <div class="w-full flex flex-col items-center gap-6 mb-16 lg:mb-20">
            <h2 class="text-center text-dc-900 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight max-w-4xl">
              {title}
            </h2>
          </div>
        )}

        {/* Cards Grid */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6 h-auto lg:h-[478px]">
          {cards?.map((card, index) => (
            <div
              key={index}
              class="bg-dc-100 rounded-2xl overflow-hidden flex flex-col h-full"
            >
              {/* Card Content */}
              <div class="p-6 flex flex-col gap-2.5 flex-grow">
                {/* Category */}
                <div class="font-mono text-dc-500 text-sm sm:text-base uppercase leading-5">
                  {card.category}
                </div>

                {/* Title */}
                <h3 class="text-dc-800 text-xl sm:text-2xl lg:text-2xl font-medium leading-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p class="text-dc-600 text-base sm:text-lg font-normal leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Image */}
              {card.image && (
                <div class="flex-shrink-0 h-[322px] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.imageAlt || card.title}
                    width={425}
                    height={322}
                    class="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
