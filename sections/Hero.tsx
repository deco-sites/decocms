import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Button from "../islands/Button.tsx";
import Decoration from "../components/ui/decoration.tsx";

const DecoIcon = () => (
  <div class="w-[18px] h-[18px] relative mr-2 flex-shrink-0">
    <div class="w-[18px] h-[18px] absolute bg-current rounded-sm"></div>
    <div class="w-[14px] h-[14px] absolute left-[2px] top-[2px] bg-primary-light rounded-sm">
    </div>
  </div>
);

const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="inline-block mr-2"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

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
  secondaryButtonText = "",
  secondaryButtonUrl = "",
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
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-primary-light pt-2 rounded-[24px] flex flex-col h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Background Image - positioned absolutely to go behind everything */}
        {backgroundImage && (
          <div class="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 z-0">
            <div class="w-full h-full flex">
              <Image
                src={backgroundImage}
                alt="Background"
                width={600}
                height={800}
                loading="lazy"
                class="h-full w-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* Hero Content Area */}
        <div class="flex-1 flex relative z-10">
          {/* Main Content */}
          <main class="flex flex-col items-start justify-center pt-20 sm:pt-32 lg:pt-16 pb-0 relative px-4 sm:px-6 lg:px-32 lg:w-1/2">
            <div class="w-full max-w-3xl flex flex-col items-start gap-4 sm:gap-6">
              {/* Title */}
              <h1 class="hero-h1 text-left max-w-2xl whitespace-pre-line">
                {title}
              </h1>

              {/* Subtitle */}
              <p class="w-full max-w-xl text-primary-dark text-lg font-normal leading-6 text-left">
                {subtitle}
              </p>

              {/* Buttons */}
              <div class="inline-flex items-center gap-3">
                <Button
                  variant="primary"
                  size="medium"
                  href={buttonUrl}
                  className="!bg-primary-dark !text-primary-light hover:bg-primary-dark/90"
                >
                  <div class="inline-flex items-center">
                    {buttonText}
                  </div>
                </Button>
                {secondaryButtonText && (
                  <Button
                    variant="secondary"
                    size="medium"
                    href={secondaryButtonUrl}
                    className="!bg-white !text-primary-dark hover:bg-gray-50 !border !border-gray-200"
                  >
                    <div class="inline-flex items-center">
                      <GithubIcon />
                      {secondaryButtonText}
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Footer - Integrations and icons marquee */}
        <footer class="w-full relative z-30 mt-auto">
          <div class="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2 lg:gap-4">
            {/* Left label */}
            <div class="inline-flex flex-col items-start w-full sm:w-auto">
              <div class="w-full sm:w-48 md:w-56 lg:w-64 xl:w-72 px-6 sm:px-8 py-8 sm:py-12 bg-dc-50 rounded-tr-2xl inline-flex items-center gap-4 sm:gap-6 relative integrations-label">
                {/* Use the green decorative SVG next to the label */}
                <Decoration size={32} />
                <div class="flex-1 text-dc-800 text-lg sm:text-xl lg:text-2xl font-normal leading-tight">
                  {integrationsTitle}
                </div>
              </div>
            </div>

            {/* Marquee */}
            <div class="relative flex-1 overflow-hidden py-2 sm:py-4 -mr-2">
              {/* Fade masks for smoother enter/exit (show ~50% of the card) */}
              <div class="pointer-events-none absolute z-30 left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-primary-light/0 to-primary-light">
              </div>
              <div class="pointer-events-none absolute z-30 right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-primary-light/0 to-primary-light">
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
