export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Título Card 1 */
  card1Title?: string;
  /** @title Título Card 2 */
  card2Title?: string;
  /** @title Features */
  features?: string[];
}

export default function OnePlatformTwoSurfaces({
  title = "One platform, two surfaces",
  subtitle = "Prototype in natural language. Scale in code.",
  card1Title = "Natural‑language builder for business users",
  card2Title = "Open‑source TypeScript SDK for devs",
  features = [
    "Versioning & Git-native",
    "Governance built-in", 
    "Fast Global Edge Deploy",
    "Open & extensible"
  ]
}: Props) {

  return (
    <section class="w-full px-16 py-40 bg-[#FAFAF9] flex flex-col justify-start items-center gap-14">
      <div class="w-full max-w-[1312px] flex flex-col justify-start items-center gap-14">
        {/* Header */}
        <div class="self-stretch flex flex-col justify-start items-center gap-6">
          <h2 class="w-full max-w-[876px] text-center text-[#1C1917] text-6xl font-medium leading-[64px]">
            {title}
          </h2>
          <p class="self-stretch text-center text-[#78716C] text-lg font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div class="self-stretch flex flex-col justify-start items-start gap-4">
          {/* Two Main Cards */}
          <div class="self-stretch flex justify-start items-center gap-4">
            <div class="flex-1 flex justify-start items-start gap-4">
              {/* Card 1 */}
              <div class="flex-1 p-2 bg-[#F5F4F0] rounded-xl flex flex-col justify-center items-start gap-6 overflow-hidden">
                <div class="self-stretch h-36 pl-8 pr-20 py-8 flex flex-col justify-between items-start">
                  <div class="self-stretch flex flex-col justify-start items-start gap-6">
                    <h3 class="self-stretch text-[#1C1917] text-4xl font-normal leading-[48px]">
                      {card1Title}
                    </h3>
                  </div>
                </div>
                <div class="self-stretch h-[600px] p-3 relative bg-[#D0EC1A] rounded-2xl border border-[#E7E5E4] flex flex-col justify-end items-end gap-4 overflow-hidden">
                  <div class="w-[794px] h-[780px] absolute left-[-4px] top-[-22.57px] opacity-20 bg-[#07401A]"></div>
                </div>
              </div>

              {/* Card 2 */}
              <div class="flex-1 p-2 bg-[#F5F4F0] rounded-xl flex flex-col justify-center items-start gap-6 overflow-hidden">
                <div class="self-stretch h-36 pl-8 pr-20 py-8 flex flex-col justify-between items-start">
                  <div class="self-stretch flex flex-col justify-start items-start gap-6">
                    <h3 class="self-stretch text-[#1C1917] text-4xl font-normal leading-[48px]">
                      {card2Title}
                    </h3>
                  </div>
                </div>
                <div class="self-stretch h-[600px] p-3 relative bg-[#D0EC1A] rounded-2xl border border-[#E7E5E4] flex flex-col justify-end items-end gap-4 overflow-hidden">
                  <div class="w-[794px] h-[780px] absolute left-[-4px] top-[-22.57px] opacity-20 bg-[#07401A]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Strip */}
          <div class="self-stretch flex justify-start items-center gap-4">
            <div class="flex-1 flex justify-start items-start gap-4">
              <div class="flex-1 p-2 bg-[#F5F4F0] rounded-xl flex flex-col justify-center items-start gap-6 overflow-hidden">
                <div class="self-stretch px-8 py-8 flex justify-center items-center gap-8">
                  {features.map((feature, index) => (
                    <>
                      <div key={index} class="text-[#1C1917] text-2xl font-normal leading-7 whitespace-nowrap">
                        {feature}
                      </div>
                      {index < features.length - 1 && (
                        <div class="w-8 h-8 flex items-center justify-center flex-shrink-0">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="14.8008" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="14.8047" y="2.39258" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="21.9883" y="2.35889" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="27.2461" y="7.61914" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="29.6055" y="14.8018" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="27.2148" y="14.8018" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="27.25" y="21.9863" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="21.9883" y="27.2446" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="14.8047" y="27.2119" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="14.8047" y="29.6055" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="7.61719" y="27.2471" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="2.35938" y="21.9868" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect y="14.8022" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="2.39453" y="14.8037" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="2.36328" y="7.61865" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="7.62109" y="9.79541" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(1 0 0 -1 7.62109 21.9863)" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(-1 0 0 1 24.3828 9.79639)" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(-1 0 0 1 17.1953 12.4087)" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(-1 0 0 1 17.1953 17.1982)" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(-1 0 0 1 17.1953 14.8032)" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(-1 0 0 1 14.8047 14.8032)" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(-1 0 0 1 19.5938 14.8032)" fill="#D0EC1A"/>
                            <rect x="24.3828" y="21.9868" width="2.39469" height="2.39461" transform="rotate(180 24.3828 21.9868)" fill="#D0EC1A"/>
                            <rect x="7.62109" y="2.35986" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect x="10.0156" y="7.40039" width="2.39469" height="2.39461" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(1 0 0 -1 10.0156 24.3804)" fill="#D0EC1A"/>
                            <rect width="2.39469" height="2.39461" transform="matrix(-1 0 0 1 21.9883 7.40137)" fill="#D0EC1A"/>
                            <rect x="21.9922" y="24.3799" width="2.39469" height="2.39461" transform="rotate(180 21.9922 24.3799)" fill="#D0EC1A"/>
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
