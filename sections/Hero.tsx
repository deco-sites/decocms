// Removed ImageWidget import as header was removed from Hero component

export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Texto do Botão Principal */
  primaryButtonText?: string;
  /** @title Texto do Botão Secundário */
  secondaryButtonText?: string;
  /** @title Texto de Créditos */
  creditsText?: string;
}

export default function Hero({
  title = "The open-source admin for your all your internal AI apps.",
  subtitle = "Prototype in chat, ship in code, and run & monetize agentic apps in production.",
  primaryButtonText = "Create your first app",
  secondaryButtonText = "Explore apps",
  creditsText = "Start with $2 in credits. No card required."
}: Props) {
  return (
    <section class="bg-[#F1F0EF] rounded-t-[24px] h-[calc(100vh-88px)] flex flex-col w-full">
      {/* Main Content */}
      <main class="flex-1 flex flex-col justify-center px-20 py-8">
        <div class="space-y-6 max-w-[800px]">
          {/* Title */}
                      <h1 class="text-[64px] font-medium text-[#1C1917] leading-[64px] tracking-[-0.96px] text-left">
            {title}
          </h1>

          {/* Subtitle */}
          <p class="text-xl text-[#1C1917] leading-7 max-w-[619px] text-left">
            {subtitle}
          </p>

          {/* Buttons */}
          <div class="flex items-center gap-6">
            <button type="button" class="bg-[#D0EC1A] text-[#074019] px-16 py-6 rounded-xl text-xl font-medium">
              {primaryButtonText}
            </button>
            <button type="button" class="bg-[#E7E5E4] text-[#78716E] px-16 py-6 rounded-xl text-xl font-medium">
              {secondaryButtonText}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer class="w-full">
        {/* Credits Info */}
        <div class="flex items-center gap-6 bg-[#FAF9F7] rounded-tr-2xl px-8 py-6 w-fit">
          {/* Decorative icon */}
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
          
          <p class="text-[18px] leading-[21px] text-[#28251F]">
            {creditsText}
          </p>
        </div>
      </footer>
    </section>
  );
}