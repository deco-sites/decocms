import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Título Card 1 */
  card1Title?: string;
  /** @title Título Card 2 */
  card2Title?: string;
  /** @title Imagen Card 1 */
  card1Image?: ImageWidget;
  /** @title Imagen Card 2 */
  card2Image?: ImageWidget;
  /** @title Features */
  features?: string[];
}

export default function OnePlatformTwoSurfaces({
  title = "One platform, two surfaces",
  subtitle = "Prototype in natural language. Scale in code.",
  card1Title = "Natural‑language builder for business users",
  card2Title = "Open‑source TypeScript SDK for devs",
  card1Image,
  card2Image,
  features = [
    "Versioning & Git-native",
    "Governance built-in",
    "Fast Global Edge Deploy",
    "Open & extensible",
  ],
}: Props) {
  return (
    <section class="w-full px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-40 bg-dc-50 flex flex-col justify-start items-center gap-4 sm:gap-6 lg:gap-14">
      <div class="w-full max-w-7xl flex flex-col justify-start items-center gap-4 sm:gap-6 lg:gap-14">
        {/* Header */}
        <div class="self-stretch flex flex-col justify-start items-center gap-3 sm:gap-4 lg:gap-6">
          <h2 class="w-full max-w-3xl text-center text-dc-800 text-2xl sm:text-3xl lg:text-5xl font-medium leading-tight">
            {title}
          </h2>
          <p class="self-stretch text-center text-dc-500 text-base sm:text-lg font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div class="self-stretch flex flex-col justify-start items-start gap-2 sm:gap-3 lg:gap-4">
          {/* Two Main Cards */}
          <div class="self-stretch flex flex-col lg:flex-row justify-start items-center gap-2 sm:gap-3 lg:gap-4">
            <div class="w-full flex-1 flex flex-col lg:flex-row justify-start items-start gap-2 sm:gap-3 lg:gap-4">
              {/* Card 1 */}
              <div class="w-full flex-1 p-1 sm:p-1.5 lg:p-2 bg-dc-200 rounded-xl flex flex-col justify-center items-start gap-3 sm:gap-4 lg:gap-6 overflow-hidden">
                <div class="self-stretch h-20 sm:h-28 lg:h-36 px-4 sm:px-6 lg:pl-8 lg:pr-20 py-4 sm:py-6 lg:py-8 flex flex-col justify-between items-start">
                  <div class="self-stretch flex flex-col justify-start items-start gap-3 sm:gap-4 lg:gap-6">
                    <h3 class="self-stretch text-dc-800 text-lg sm:text-xl lg:text-3xl font-normal leading-tight">
                      {card1Title}
                    </h3>
                  </div>
                </div>
                <div class="self-stretch aspect-[4/3] p-2 sm:p-2.5 lg:p-3 relative bg-dc-100 rounded-2xl border border-dc-200 flex flex-col justify-end items-end gap-2 sm:gap-3 lg:gap-4 overflow-hidden">
                  {card1Image
                    ? (
                      <Image
                        src={card1Image}
                        alt={card1Title}
                        width={600}
                        height={450}
                        loading="lazy"
                        class="absolute inset-0 w-full h-full object-cover rounded-xl"
                      />
                    )
                    : (
                      <div class="w-[794px] h-[780px] absolute left-[-4px] top-[-22.57px] opacity-20 bg-[#07401A]">
                      </div>
                    )}
                </div>
              </div>

              {/* Card 2 */}
              <div class="w-full flex-1 p-1 sm:p-1.5 lg:p-2 bg-dc-200 rounded-xl flex flex-col justify-center items-start gap-3 sm:gap-4 lg:gap-6 overflow-hidden">
                <div class="self-stretch h-20 sm:h-28 lg:h-36 px-4 sm:px-6 lg:pl-8 lg:pr-20 py-4 sm:py-6 lg:py-8 flex flex-col justify-between items-start">
                  <div class="self-stretch flex flex-col justify-start items-start gap-3 sm:gap-4 lg:gap-6">
                    <h3 class="self-stretch text-dc-800 text-lg sm:text-xl lg:text-3xl font-normal leading-tight">
                      {card2Title}
                    </h3>
                  </div>
                </div>
                <div class="self-stretch aspect-[4/3] p-2 sm:p-2.5 lg:p-3 relative bg-dc-100 rounded-2xl border border-dc-200 flex flex-col justify-end items-end gap-2 sm:gap-3 lg:gap-4 overflow-hidden">
                  {card2Image
                    ? (
                      <Image
                        src={card2Image}
                        alt={card2Title}
                        width={600}
                        height={450}
                        loading="lazy"
                        class="absolute inset-0 w-full h-full object-cover rounded-xl"
                      />
                    )
                    : (
                      <div class="w-[794px] h-[780px] absolute left-[-4px] top-[-22.57px] opacity-20 bg-[#07401A]">
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Features Strip */}
          <div class="self-stretch flex justify-start items-center gap-2 sm:gap-3 lg:gap-4">
            <div class="flex-1 flex justify-start items-start gap-2 sm:gap-3 lg:gap-4">
              <div class="flex-1 p-1 sm:p-1.5 lg:p-2 bg-dc-200 rounded-xl flex flex-col justify-center items-start gap-3 sm:gap-4 lg:gap-6 overflow-hidden">
                <div class="self-stretch px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8">
                  {features.map((feature, index) => (
                    <>
                      <div
                        key={index}
                        class="text-dc-800 text-sm sm:text-lg lg:text-2xl font-normal leading-7 text-center sm:whitespace-nowrap"
                      >
                        {feature}
                      </div>
                      {index < features.length - 1 && (
                        <div class="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex items-center justify-center flex-shrink-0">
                          <svg
                            class="w-full h-full"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="14.8008"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="14.8047"
                              y="2.39258"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="21.9883"
                              y="2.35889"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="27.2461"
                              y="7.61914"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="29.6055"
                              y="14.8018"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="27.2148"
                              y="14.8018"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="27.25"
                              y="21.9863"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="21.9883"
                              y="27.2446"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="14.8047"
                              y="27.2119"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="14.8047"
                              y="29.6055"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="7.61719"
                              y="27.2471"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="2.35938"
                              y="21.9868"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              y="14.8022"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="2.39453"
                              y="14.8037"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="2.36328"
                              y="7.61865"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="7.62109"
                              y="9.79541"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(1 0 0 -1 7.62109 21.9863)"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(-1 0 0 1 24.3828 9.79639)"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(-1 0 0 1 17.1953 12.4087)"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(-1 0 0 1 17.1953 17.1982)"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(-1 0 0 1 17.1953 14.8032)"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(-1 0 0 1 14.8047 14.8032)"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(-1 0 0 1 19.5938 14.8032)"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="24.3828"
                              y="21.9868"
                              width="2.39469"
                              height="2.39461"
                              transform="rotate(180 24.3828 21.9868)"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="7.62109"
                              y="2.35986"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="10.0156"
                              y="7.40039"
                              width="2.39469"
                              height="2.39461"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(1 0 0 -1 10.0156 24.3804)"
                              fill="#D0EC1A"
                            />
                            <rect
                              width="2.39469"
                              height="2.39461"
                              transform="matrix(-1 0 0 1 21.9883 7.40137)"
                              fill="#D0EC1A"
                            />
                            <rect
                              x="21.9922"
                              y="24.3799"
                              width="2.39469"
                              height="2.39461"
                              transform="rotate(180 21.9922 24.3799)"
                              fill="#D0EC1A"
                            />
                          </svg>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
