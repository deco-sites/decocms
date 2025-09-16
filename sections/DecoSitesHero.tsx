import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   * @title Eyebrow Text
   * @description Small text above the main title
   */
  eyebrow?: string;
  /**
   * @title Main Title
   * @description Main heading text
   */
  title?: string;
  /**
   * @title Title Image
   * @description Image to display on the left side of the title
   */
  titleImage?: ImageWidget;
  /**
   * @title Title Image Alt Text
   * @description Alt text for the title image
   */
  titleImageAlt?: string;
  /**
   * @title Primary Button Text
   * @description Text for the main CTA button
   */
  primaryButtonText?: string;
  /**
   * @title Primary Button URL
   * @description URL for the main CTA button
   */
  primaryButtonUrl?: string;
  /**
   * @title Background Image
   * @description Hero background image shown at the bottom
   */
  backgroundImage?: ImageWidget;
  /**
   * @title Background Image Alt Text
   * @description Alt text for the background image
   */
  backgroundImageAlt?: string;
}

export default function DecoSitesHero({
  eyebrow,
  title,
  titleImage,
  titleImageAlt,
  primaryButtonText,
  primaryButtonUrl,
  backgroundImage,
  backgroundImageAlt,
}: Props) {
  return (
    <section class="w-full bg-dc-50 p-2 h-screen overflow-hidden">
      <div class="w-full bg-dc-900 rounded-3xl h-[calc(100vh-16px)] relative overflow-hidden">
        <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-24 md:pt-56 h-full flex flex-col">
          {/* Content Container */}
          <div class="w-full flex flex-col items-center gap-12 lg:gap-14 flex-1 justify-center">
            {/* Text Content */}
            <div class="w-full flex flex-col items-center gap-6 text-center">
              {eyebrow && (
                <div class="flex items-center justify-center gap-2">
                  {titleImage && (
                    <Image
                      src={titleImage}
                      alt={titleImageAlt || ""}
                      width={32}
                      height={32}
                      class="size-8 sm:size-12 lg:size-16 object-contain"
                      loading="lazy"
                    />
                  )}
                  <div class="text-primary-light text-xl sm:text-2xl lg:text-3xl font-medium leading-none">
                    {eyebrow}
                  </div>
                </div>
              )}

              {title && (
                <h1 class="text-dc-200 text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight tracking-tight max-w-4xl text-center">
                  {title}
                </h1>
              )}

              {primaryButtonText && primaryButtonUrl && (
                <div class="bg-primary-light text-primary-dark px-4 py-2.5 rounded-xl font-medium inline-block">
                  <a href={primaryButtonUrl} class="text-inherit no-underline">
                    {primaryButtonText}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Background Image - Flows below text, will be cut by overflow-hidden */}
          {backgroundImage && (
            <div class="hidden sm:block w-full max-w-[1040px] mx-auto mt-24">
              <Image
                src={backgroundImage}
                alt={backgroundImageAlt || ""}
                width={1040}
                height={683}
                class="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
