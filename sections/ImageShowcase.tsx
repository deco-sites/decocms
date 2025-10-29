import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../components/ui/Button.tsx";

export interface Props {
  /** @title Title */
  title?: string;
  /** @title Subtitle */
  subtitle?: string;
  /** @title Description */
  description?: string;
  /** @title Showcase Image */
  image?: ImageWidget;
  /** @title Image Position */
  /** @description Position of the image - left or right */
  imagePosition?: "left" | "right";
  /** @title CTA Text */
  ctaText?: string;
  /** @title CTA URL */
  ctaUrl?: string;
  /** @title Background Color */
  /** @description Background color of the section */
  backgroundColor?: string;
}

export default function ImageShowcase({
  title = "Innovation",
  subtitle = "Build solutions that push boundaries",
  description = "With deco, create AI experiences as iconic as landmarks. Our platform gives you the tools to transform your ideas into reality.",
  image = "https://via.placeholder.com/800x600",
  imagePosition = "right",
  ctaText = "Learn more",
  ctaUrl = "#",
  backgroundColor = "#F5F5F4",
}: Props) {
  const isImageRight = imagePosition === "right";

  return (
    <section 
      class="w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16"
      style={{ backgroundColor }}
    >
      <div class="max-w-7xl mx-auto">
        <div class={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isImageRight ? "" : "lg:flex-row-reverse"}`}>
          {/* Content */}
          <div class={`flex flex-col gap-6 ${isImageRight ? "lg:order-1" : "lg:order-2"}`}>
            <div class="flex flex-col gap-4">
              <p class="text-sm sm:text-base font-mono uppercase tracking-widest text-primary-dark/60">
                {subtitle}
              </p>
              <h2 class="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-primary-dark">
                {title}
              </h2>
              {description && (
                <p class="text-base sm:text-lg leading-relaxed text-primary-dark/80 max-w-xl">
                  {description}
                </p>
              )}
            </div>
            
            {ctaText && ctaUrl && (
              <div class="mt-4">
                <Button
                  variant="primary"
                  size="medium"
                  href={ctaUrl}
                  class="!bg-primary-dark !text-primary-light hover:!bg-primary-dark/90"
                >
                  {ctaText}
                </Button>
              </div>
            )}
          </div>

          {/* Image */}
          <div class={`relative ${isImageRight ? "lg:order-2" : "lg:order-1"}`}>
            <div class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={image}
                alt={title}
                width={800}
                height={600}
                loading="lazy"
                class="w-full h-full object-cover"
              />
              {/* Overlay gradient for better text readability if needed */}
              <div class="absolute inset-0 bg-gradient-to-t from-primary-dark/10 to-transparent"></div>
            </div>
            
            {/* Decorative element */}
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-light rounded-full opacity-20 blur-3xl -z-10"></div>
            <div class="absolute -top-6 -left-6 w-40 h-40 bg-primary-dark rounded-full opacity-10 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
