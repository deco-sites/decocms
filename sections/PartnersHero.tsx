import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Main Title */
  title?: string;
  /** @title Subtitle */
  subtitle?: string;
  /** @title Primary CTA Text */
  primaryButtonText?: string;
  /** @title Primary CTA URL */
  primaryButtonUrl?: string;
  /** @title Secondary CTA Text */
  secondaryButtonText?: string;
  /** @title Secondary CTA URL */
  secondaryButtonUrl?: string;
  /** @title Tertiary CTA Text */
  tertiaryButtonText?: string;
  /** @title Tertiary CTA URL */
  tertiaryButtonUrl?: string;
  /** @title Partner Logos */
  /** @description Charter partner logos */
  partnerLogos?: ImageWidget[];
  /** @title Show Partner Logos */
  showPartnerLogos?: boolean;
}

export default function PartnersHero({
  title = "Become a Deco Partner",
  subtitle = "Co‑sell and co‑build AI‑native experiences on Deco — the open‑source runtime and Context CMS for agents, workflows, and storefronts.",
  primaryButtonText = "Start application",
  primaryButtonUrl = "/partners/apply",
  secondaryButtonText = "Book a 20‑min intro",
  secondaryButtonUrl = "/partners/intro-call",
  tertiaryButtonText = "Explore tiers & benefits",
  tertiaryButtonUrl = "/partners",
  partnerLogos = [],
  showPartnerLogos = false,
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2 pt-0">
      <div class="bg-dc-100 px-2 pt-2 rounded-[24px] rounded-t-none flex flex-col min-h-[calc(100svh-64px)] sm:min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-80px)] relative overflow-hidden">
        {/* Main Content */}
        <main class="flex-1 flex flex-col items-center md:max-w-5xl justify-center md:ml-8 pt-20 sm:pt-32 lg:pt-40 pb-0 relative z-10 max-w-8xl px-4 sm:px-6 lg:px-8">
          <div class="w-full max-w-4xl flex flex-col items-start gap-4 sm:gap-6">
            {/* Title */}
            <h1 class="text-dc-900 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-[-0.02em] text-left">
              {title}
            </h1>

            {/* Subtitle */}
            <p class="w-full max-w-3xl text-dc-900 text-sm sm:text-base lg:text-lg xl:text-xl font-light leading-5 sm:leading-6 lg:leading-7 text-left">
              {subtitle}
            </p>

            {/* Buttons */}
            <div class="flex flex-col sm:flex-row items-start gap-3">
              <a
                href={primaryButtonUrl}
                class="h-10 px-4 py-1.5 bg-[#D0EC1A] rounded-xl flex justify-center items-center gap-2 hover:bg-[#C5E015] transition-colors"
              >
                <span class="text-[#07401A] text-sm font-medium leading-tight">
                  {primaryButtonText} →
                </span>
              </a>
              <a
                href={secondaryButtonUrl}
                class="h-10 px-4 py-1.5 bg-transparent border border-dc-300 rounded-xl flex justify-center items-center gap-2 hover:bg-dc-200 transition-colors"
              >
                <span class="text-dc-700 text-sm font-medium leading-tight">
                  {secondaryButtonText} →
                </span>
              </a>
              <a
                href={tertiaryButtonUrl}
                class="h-10 px-4 py-1.5 bg-transparent border border-dc-300 rounded-xl flex justify-center items-center gap-2 hover:bg-dc-200 transition-colors"
              >
                <span class="text-dc-700 text-sm font-medium leading-tight">
                  {tertiaryButtonText} →
                </span>
              </a>
            </div>

            {/* Partner Logos */}
            {showPartnerLogos && partnerLogos.length > 0 && (
              <div class="w-full mt-8">
                <p class="text-dc-600 text-sm font-medium mb-4">Charter Partners</p>
                <div class="flex flex-wrap gap-6">
                  {partnerLogos.map((logo, index) => (
                    <img
                      key={index}
                      src={logo}
                      alt={`Partner ${index + 1}`}
                      class="h-8 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}