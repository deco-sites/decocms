import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Decoration from "../components/ui/decoration.tsx";

export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Título Card 1 */
  card1Title?: string;
  /** @title Título Card 2 */
  card2Title?: string;
  /** @title Imagen de Contenido Card 1 */
  card1ContentImage?: ImageWidget;
  /** @title Imagen de Contenido Card 2 */
  card2ContentImage?: ImageWidget;
  /** @title Imagen de Fondo Card 1 */
  card1BackgroundImage?: ImageWidget;
  /** @title Imagen de Fondo Card 2 */
  card2BackgroundImage?: ImageWidget;
  /** @title Features */
  features?: string[];
}

export default function OnePlatformTwoSurfaces({
  title = "Realtime collaboration",
  subtitle =
    "Business users prototype in natural language. Engineers scale in code.",
  card1Title = "Natural‑language builder for business users",
  card2Title = "Open‑source TypeScript SDK for devs",
  card1ContentImage,
  card2ContentImage,
  card1BackgroundImage,
  card2BackgroundImage,
  features = [
    "Versioning & Git-native",
    "Governance built-in",
    "Fast Global Edge Deploy",
    "Open & extensible",
  ],
}: Props) {
  return (
    <section class="w-full px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-20 bg-dc-50 flex flex-col justify-start items-center gap-4 sm:gap-6 lg:gap-14">
      <div class="w-full max-w-7xl flex flex-col justify-start items-center gap-4 sm:gap-6 lg:gap-14">
        {/* Header */}
        <div class="self-stretch flex flex-col justify-start items-center gap-3 sm:gap-4 lg:gap-6">
          <h2 class="w-full max-w-3xl text-center text-dc-800 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight whitespace-pre-line">
            {title}
          </h2>
          <p class="self-stretch text-center text-dc-700 text-base sm:text-lg font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div class="self-stretch flex flex-col justify-start items-start gap-2 sm:gap-3 lg:gap-4">
          {/* Two Main Cards */}
          <div class="self-stretch flex flex-col lg:flex-row justify-start items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Card 1 */}
            <div
              class="w-full flex-1 rounded-3xl overflow-hidden relative"
              style={{
                backgroundImage: card1BackgroundImage
                  ? `radial-gradient(circle at 50% -40%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 90%), url(${card1BackgroundImage})`
                  : "radial-gradient(circle at 50% -40%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 90%), linear-gradient(135deg, #d0ec1a 0%, #a3c916 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content Image */}
              <div class="w-full aspect-[3/2]">
                {card1ContentImage
                  ? (
                    <Image
                      src={card1ContentImage}
                      alt={card1Title}
                      width={550}
                      height={367}
                      loading="lazy"
                      class="w-full h-full object-contain"
                    />
                  )
                  : (
                    <div class="w-full h-full flex items-center justify-center">
                      <div class="text-dc-500 text-sm">Content Image</div>
                    </div>
                  )}
              </div>

              {/* Text Content */}
              <div class="p-12">
                <h3 class="text-dc-800 text-3xl whitespace-pre-line">
                  {card1Title}
                </h3>
              </div>
            </div>

            {/* Card 2 */}
            <div
              class="w-full flex-1 rounded-3xl overflow-hidden relative"
              style={{
                backgroundImage: card2BackgroundImage
                  ? `radial-gradient(circle at 50% -40%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 90%), url(${card2BackgroundImage})`
                  : "radial-gradient(circle at 50% -40%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 90%), linear-gradient(135deg, #d0ec1a 0%, #a3c916 100%)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content Image */}
              <div class="w-full aspect-[3/2]">
                {card2ContentImage
                  ? (
                    <Image
                      src={card2ContentImage}
                      alt={card2Title}
                      width={550}
                      height={367}
                      loading="lazy"
                      class="w-full h-full object-contain"
                    />
                  )
                  : (
                    <div class="w-full h-full flex items-center justify-center">
                      <div class="text-white text-sm">Content Image</div>
                    </div>
                  )}
              </div>

              {/* Text Content */}
              <div class="p-12">
                <h3 class="text-dc-800 text-3xl whitespace-pre-line">
                  {card2Title}
                </h3>
              </div>
            </div>
          </div>

          {/* Features Strip */}
          <div class="self-stretch flex justify-start items-center gap-2 sm:gap-3 lg:gap-4">
            <div class="flex-1 p-2 bg-white rounded-xl overflow-hidden">
              <div class="px-6 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8">
                {features.map((feature, index) => (
                  <>
                    <div
                      key={index}
                      class="hero-h4 text-center sm:whitespace-nowrap"
                    >
                      {feature}
                    </div>
                    {index < features.length - 1 && (
                      <div class="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center flex-shrink-0">
                        <Decoration className="w-full h-full" />
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
