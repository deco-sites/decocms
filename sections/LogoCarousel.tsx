import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface LogoItem {
  /**
   * @title Logo Image
   * @description Logo image file
   */
  image: ImageWidget;
  /**
   * @title Logo Alt Text
   * @description Alt text for the logo
   */
  alt?: string;
}

export interface Props {
  /**
   * @title Logo Items
   * @description List of logos to display in the carousel
   */
  logos?: LogoItem[];
}

export default function LogoCarousel({ logos }: Props) {
  if (!logos || logos.length === 0) return null;

  return (
    <section class="w-full bg-dc-50 py-10 overflow-hidden">
      <div class="w-full">
        {/* Scrolling Container */}
        <div class="flex gap-24 items-center animate-scroll">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              class="flex-shrink-0 w-[120px] h-[60px] flex items-center justify-center"
            >
              <Image
                src={logo.image}
                alt={logo.alt || `Logo ${index + 1}`}
                width={120}
                height={60}
                class="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          ))}

          {/* Second set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              class="flex-shrink-0 w-[120px] h-[60px] flex items-center justify-center"
            >
              <Image
                src={logo.image}
                alt={logo.alt || `Logo ${index + 1}`}
                width={120}
                height={60}
                class="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          ))}

          {/* Third set for extra seamless effect */}
          {logos.map((logo, index) => (
            <div
              key={`third-${index}`}
              class="flex-shrink-0 w-[120px] h-[60px] flex items-center justify-center"
            >
              <Image
                src={logo.image}
                alt={logo.alt || `Logo ${index + 1}`}
                width={120}
                height={60}
                class="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>
        {`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 45s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}
      </style>
    </section>
  );
}
