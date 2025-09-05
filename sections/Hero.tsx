import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import CopyCommandButton from "../islands/CopyCommandButton.tsx";

export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Texto do Botão Principal */
  primaryButtonText?: string;
  /** @title Texto do Botão Secundário */
  secondaryButtonText?: string;
  /** @title Título do bloco de integrações */
  integrationsTitle?: string;
  /** @title Ícones do carrossel */
  /** @description Lista de ícones exibidos no carrossel (direita → esquerda) */
  icons?: ImageWidget[];
}

export default function Hero({
  title = "The open-source admin for your internal AI apps",
  subtitle = "Prototype in chat, ship in code, and run & monetize agentic apps in production.",
  primaryButtonText = "Testar grátis",
  secondaryButtonText = "npm create deco@latest",
  integrationsTitle = "Seamless Integrations",
  icons = [
    "https://placehold.co/80x80",
    "https://placehold.co/80x80",
    "https://placehold.co/80x80",
    "https://placehold.co/80x80",
    "https://placehold.co/80x80",
    "https://placehold.co/80x80",
    "https://placehold.co/80x80",
    "https://placehold.co/80x80",
  ],
}: Props) {
  // Build a long track to guarantee seamless marquee on ultra-wide screens
  const repetitions = 12; // increase for extra-large displays
  const trackIcons = Array.from({ length: repetitions }, () => icons).flat();
  return (
    <section class="w-full bg-dc-50 flex flex-col">
      <div class="bg-dc-100 px-2 pt-2 rounded-t-[24px] flex flex-col">
      {/* Main Content */}
      <main class="flex-1 flex flex-col items-center justify-center pt-40 pb-0">
        <div class="w-full max-w-[930px] flex flex-col items-center gap-6 px-4">
          {/* Title */}
          <h1 class="text-dc-900 text-7xl font-medium leading-[80px] tracking-[-0.02em] text-center">
            {title}
          </h1>

          {/* Subtitle */}
          <p class="w-full max-w-[619px] text-dc-900 text-xl font-light leading-7 text-center">
            {subtitle}
          </p>

          {/* Buttons */}
          <div class="inline-flex items-center gap-2">
            <button type="button" class="px-4 py-3 bg-primary-light rounded-xl inline-flex items-center gap-2">
              <span class="text-primary-dark text-sm font-medium leading-tight">{primaryButtonText}</span>
            </button>
            <CopyCommandButton label={secondaryButtonText} />
          </div>
        </div>
      </main>

      {/* Footer - Integrations and icons marquee */}
      <footer class="w-full relative mt-40">
        <div class="w-full flex items-center gap-4">
          {/* Left label */}
          <div class="inline-flex flex-col items-start">
            <div class="inline-flex items-center gap-2.5">
              <div class="w-4 h-4 bg-dc-50"></div>
            </div>
            <div class="w-72 px-8 py-12 bg-dc-50 rounded-tr-2xl inline-flex items-center gap-6">
              {/* Use the green decorative SVG next to the label */}
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
              <div class="flex-1 text-dc-800 text-2xl leading-7">{integrationsTitle}</div>
            </div>
          </div>

          {/* Marquee */}
          <div class="relative flex-1 overflow-hidden py-4">
            {/* Fade masks for smoother enter/exit (show ~50% of the card) */}
            <div class="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-l from-dc-100/0 to-dc-100"></div>
            <div class="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-r from-dc-100/0 to-dc-100"></div>

            <div class="w-max flex gap-4 animate-sliding" style={{ animationDuration: '90s' }}>
              {/* First half of the loop */}
              {trackIcons.map((icon, idx) => (
                <div key={`a-${idx}`} data-size="40px" class="w-20 h-20 relative bg-white/90 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-500/10 overflow-hidden flex items-center justify-center">
                  <Image src={icon} alt={`icon-${idx + 1}`} width={48} height={48} loading="lazy" class="w-12 h-12 object-contain" />
                </div>
              ))}
              {/* Second half to create a seamless scroll */}
              {trackIcons.map((icon, idx) => (
                <div key={`b-${idx}`} data-size="40px" class="w-20 h-20 relative bg-white/90 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-500/10 overflow-hidden flex items-center justify-center">
                  <Image src={icon} alt={`icon-dup-${idx + 1}`} width={48} height={48} loading="lazy" class="w-12 h-12 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* No credits block */}
      </footer>
      </div>
    </section>
  );
}