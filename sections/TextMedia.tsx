import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Eyebrow */
  eyebrow?: string;
  /** @title Title */
  title?: string;
  /** @title Description */
  description?: string;
  /** @title Image */
  /** @description Image displayed on desktop */
  image?: ImageWidget;
  /** @title Mobile Image */
  /** @description Image displayed on mobile devices */
  mobileImage?: ImageWidget;
  /** @title Image Alt Text */
  imageAlt?: string;
  /** @title Keywords */
  /** @description Keywords displayed as badges at the bottom */
  keywords?: string[];
}

export default function TextMedia({
  eyebrow,
  title,
  description,
  image,
  mobileImage,
  imageAlt,
  keywords,
}: Props) {
  return (
    <section class="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-32 bg-dc-50 flex flex-col justify-start items-center gap-6 sm:gap-8 lg:gap-14">
      <div class="w-full max-w-[1200px] flex flex-col justify-start items-center gap-6 sm:gap-8 lg:gap-14">
        {/* Main Content */}
        <div class="self-stretch flex flex-col lg:flex-row justify-start items-end gap-4 sm:gap-5 lg:gap-6">
          {/* Left Column - Text Content */}
          <div class="flex-1 lg:max-w-[524px] flex flex-col justify-start items-start gap-3 sm:gap-4 lg:gap-3">
            {eyebrow && (
              <div class="font-mono text-dc-500 text-sm sm:text-base uppercase leading-5">
                {eyebrow}
              </div>
            )}
            {title && (
              <h1 class="text-dc-800 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-[-0.02em]">
                {title}
              </h1>
            )}
          </div>

          {/* Right Column - Description */}
          <div class="flex-1 flex flex-col justify-center items-start gap-6">
            {description && (
              <p class="text-dc-700 text-base sm:text-lg lg:text-lg font-normal leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Image Section */}
        {(image || mobileImage) && (
          <div class="w-full bg-primary-light rounded-xl overflow-hidden">
            {/* Mobile Image */}
            {mobileImage && (
              <div class="block sm:hidden w-full aspect-[390/481] bg-white rounded-lg overflow-hidden">
                <img
                  src={mobileImage}
                  alt={imageAlt || ""}
                  class="w-full h-full object-cover object-left-top"
                  loading="lazy"
                />
              </div>
            )}
            {/* Desktop Image */}
            {image && (
              <div class={`${mobileImage ? "hidden sm:block" : "block"} w-full h-[300px] sm:h-[400px] lg:h-[450px] bg-white rounded-lg overflow-hidden`}>
                <img
                  src={image}
                  alt={imageAlt || ""}
                  class="w-full h-full object-cover object-left-top"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}

        {/* Keywords Section */}
        {keywords && keywords.length > 0 && (
          <div class="w-full flex items-center justify-between overflow-hidden -mt-8 sm:-mt-10 lg:-mt-12">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                class="bg-dc-100 px-2 py-1 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <span class="font-mono text-dc-500 text-sm sm:text-base uppercase leading-5 whitespace-nowrap">
                  {keyword}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
