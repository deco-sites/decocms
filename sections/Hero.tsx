import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Texto do Botão */
  buttonText?: string;
  /** @title URL do Botão */
  buttonUrl?: string;
  /** @title Texto do Botão Secundário */
  secondaryButtonText?: string;
  /** @title URL do Botão Secundário */
  secondaryButtonUrl?: string;
  /** @title Título do bloco de integrações */
  integrationsTitle?: string;
  /** @title Ícones do carrossel */
  /** @description Lista de ícones exibidos no carrossel (direita → esquerda) */
  icons?: ImageWidget[];
  /** @title Imagem de Fundo */
  /** @description Imagem que aparece no lado direito e inferior da seção */
  backgroundImage?: ImageWidget;
}

export default function Hero({
  title = "The open-source admin for your internal AI apps",
  subtitle =
    "Prototype in chat, ship in code, and run & monetize agentic apps in production.",
  buttonText = "Get started",
  buttonUrl = "/",
  secondaryButtonText = "Learn more",
  secondaryButtonUrl = "/docs",
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
  backgroundImage,
}: Props) {
  // Build a long track to guarantee seamless marquee on ultra-wide screens
  const repetitions = 12; // increase for extra-large displays
  const trackIcons = Array.from({ length: repetitions }, () => icons).flat();
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2 pt-0">
      <div class="bg-dc-100 px-2 pt-2 rounded-[24px] rounded-t-none flex flex-col min-h-[calc(100svh-64px)] sm:min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-80px)] relative overflow-hidden">
        {/* Main Content */}
        <main class="flex-1 flex flex-col items-center md:max-w-5xl justify-center md:ml-8 pt-20 sm:pt-32 lg:pt-40 pb-0 relative z-10 max-w-8xl px-4 sm:px-6 lg:px-8">
          <div class="w-full max-w-3xl flex flex-col items-start gap-4 sm:gap-6">
            {/* Title */}
            <h1 class="text-dc-900 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-[-0.02em] text-left">
              {title}
            </h1>

            {/* Subtitle */}
            <p class="w-full max-w-2xl text-dc-900 text-sm sm:text-base lg:text-lg xl:text-xl font-light leading-5 sm:leading-6 lg:leading-7 text-left">
              {subtitle}
            </p>

            {/* Buttons */}
            <div class="inline-flex items-center gap-3">
              <a
                href={buttonUrl}
                class="h-10 px-4 py-1.5 bg-[#D0EC1A] rounded-xl flex justify-center items-center gap-2 hover:bg-[#C5E015] transition-colors"
              >
                <span class="text-[#07401A] text-sm font-medium leading-tight">
                  {buttonText}
                </span>
              </a>
              {secondaryButtonText && secondaryButtonUrl && (
                <a
                  href={secondaryButtonUrl}
                  class="h-10 px-4 py-1.5 bg-transparent border border-dc-300 rounded-xl flex justify-center items-center gap-2 hover:bg-dc-200 transition-colors"
                >
                  <span class="text-dc-700 text-sm font-medium leading-tight">
                    {secondaryButtonText}
                  </span>
                </a>
              )}
            </div>
          </div>
        </main>

        {/* Background Image - responsive positioning */}
        {backgroundImage && (
          <div class="absolute bottom-0 left-0 right-0 sm:inset-0 pointer-events-none z-0">
            <Image
              src={backgroundImage}
              alt="Background"
              width={1200}
              height={800}
              loading="lazy"
              class="w-full h-auto max-h-[50vh] sm:absolute sm:right-0 sm:bottom-0 sm:top-0 sm:w-auto sm:h-full sm:max-h-none object-cover object-center sm:object-right"
            />
          </div>
        )}

        {/* Footer - Integrations and icons marquee */}
        <footer class="w-full relative mt-12 sm:mt-20 lg:mt-32 xl:mt-40 z-20">
          <div class="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2 lg:gap-4">
            {/* Left label */}
            <div class="inline-flex flex-col items-start w-full sm:w-auto">
              <div class="w-full sm:w-48 md:w-56 lg:w-64 xl:w-72 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 xl:py-12 bg-dc-50 rounded-tr-2xl inline-flex items-center gap-3 sm:gap-4 lg:gap-6">
                {/* Use the green decorative SVG next to the label */}
                <svg
                  width="32"
                  height="32"
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
                <div class="flex-1 text-dc-800 text-base sm:text-lg lg:text-xl xl:text-2xl leading-5 sm:leading-6 lg:leading-7">
                  {integrationsTitle}
                </div>
              </div>
            </div>

            {/* Marquee */}
            <div class="relative flex-1 overflow-hidden py-2 sm:py-4 -mr-2">
              {/* Fade masks for smoother enter/exit (show ~50% of the card) */}
              <div class="pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-dc-100/0 to-dc-100">
              </div>
              <div class="pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-dc-100/0 to-dc-100">
              </div>

              <div
                class="w-max flex gap-2 sm:gap-4 animate-sliding"
                style={{ animationDuration: "90s" }}
              >
                {/* First half of the loop */}
                {trackIcons.map((icon, idx) => (
                  <div
                    key={`a-${idx}`}
                    data-size="40px"
                    class="w-16 h-16 sm:w-20 sm:h-20 relative bg-white/90 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-500/10 overflow-hidden flex items-center justify-center flex-shrink-0"
                  >
                    <Image
                      src={icon}
                      alt={`icon-${idx + 1}`}
                      width={48}
                      height={48}
                      loading="lazy"
                      class="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                ))}
                {/* Second half to create a seamless scroll */}
                {trackIcons.map((icon, idx) => (
                  <div
                    key={`b-${idx}`}
                    data-size="40px"
                    class="w-16 h-16 sm:w-20 sm:h-20 relative bg-white/90 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-500/10 overflow-hidden flex items-center justify-center flex-shrink-0"
                  >
                    <Image
                      src={icon}
                      alt={`icon-dup-${idx + 1}`}
                      width={48}
                      height={48}
                      loading="lazy"
                      class="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
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
