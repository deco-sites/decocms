import type { ImageWidget } from "apps/admin/widgets.ts";

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
  /** @title Logo */
  logo?: ImageWidget;
}

export default function Hero({
  title = "The open-source admin for your all your internal AI apps.",
  subtitle = "Prototype in chat, ship in code, and run & monetize agentic apps in production.",
  primaryButtonText = "Create your first app",
  secondaryButtonText = "Explore apps",
  creditsText = "Start with $2 in credits. No card required.",
  logo = "https://s3-alpha-sig.figma.com/img/d291/4b40/dffbbda162eba5dab3486f69f8bb74d9?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rAS6WZsdwbc5gu7joqX6Gi6v7K7-0-G~Xn3oMP0cREu4raOABqrzwWk~VwYdDXa509KIHqSTACelkzxvIC8OVjK7rjNzORddvmoDCKhzmUYInMO9h~6ncgZNrhh6uz71-l33Syow8S4iSZBIZTCiWLHNVsaT-SQkpBJAelFHjXIcSPNI2MhvIk~SzKrtra85BDCvow~6HfLZdhQPdKDldtaUNgLF-bp9f~P1W3VvKvxRk0hOkwpKBvOxGFg4eDArMmiywuoJWmZ8JeMR4fQeUFLGtkNk7BfP3f6xLa1~A4nA7Qdf-e4pF7mDcMFiKmoeQb6PKgLvqCNvIxeV~tb7kA__"
}: Props) {
  return (
    <section class="bg-[#F1F0EF] rounded-t-[24px] min-h-screen flex flex-col">
      {/* Header */}
      <header class="flex items-center justify-between px-10 py-4">
        {/* Logo */}
        <div class="flex items-center justify-center w-10 h-10 p-2">
          <img 
            src={logo} 
            alt="deco logo" 
            class="w-7 h-7"
          />
        </div>

        {/* Navigation */}
        <nav class="flex items-center bg-[#E7E5E4] rounded-2xl p-1 gap-12">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[#28251F]">
              Apps
            </button>
            <button class="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[#28251F]">
              Use Cases
            </button>
            <button class="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[#28251F]">
              Pricing
            </button>
            <button class="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[#28251F]">
              Docs
            </button>
            <button class="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[#28251F]">
              Community
            </button>
            <button class="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[#28251F]">
              Resources
            </button>
          </div>
          
          {/* CTA Button */}
          <button class="bg-[#D0EC1A] text-[#074019] px-4 py-1.5 rounded-xl flex items-center justify-center w-10 h-10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4L10 16M4 10L16 10" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main class="flex-1 flex flex-col items-center justify-center px-8 py-16 max-w-[800px] mx-auto text-center">
        <div class="space-y-6">
          {/* Title */}
          <h1 class="text-5xl font-medium text-[#1C1917] leading-[48px] tracking-[-0.96px]">
            {title}
          </h1>

          {/* Subtitle */}
          <p class="text-xl text-[#1C1917] leading-7 max-w-[619px]">
            {subtitle}
          </p>

          {/* Buttons */}
          <div class="flex items-center gap-6 justify-center">
            <button class="bg-[#D0EC1A] text-[#074019] px-16 py-6 rounded-xl text-xl font-medium">
              {primaryButtonText}
            </button>
            <button class="bg-[#E7E5E4] text-[#78716E] px-16 py-6 rounded-xl text-xl font-medium">
              {secondaryButtonText}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer class="flex items-center justify-between px-20 py-12">
        {/* Credits Info */}
        <div class="flex items-center gap-6 bg-[#FAF9F7] rounded-tr-2xl px-8 py-12">
          {/* Decorative dots */}
          <div class="w-8 h-8 relative">
            <div class="absolute inset-0 grid grid-cols-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} class="w-0.5 h-0.5 bg-[#D0EC1A] rounded-full"></div>
              ))}
            </div>
          </div>
          
          <p class="text-sm text-[#28251F] flex-1">
            {creditsText}
          </p>
        </div>

        {/* Decorative corner */}
        <div class="w-4 h-4 bg-[#FAF9F7]"></div>
      </footer>
    </section>
  );
}