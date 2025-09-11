import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Main Title */
  title?: string;
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
  /** @description Partner logos for the carousel */
  partnerLogos?: ImageWidget[];
  /** @title Show Partner Logos */
  showPartnerLogos?: boolean;
  /** @title Hero Impact Image */
  /** @description Main visual element that brings the "wow" factor */
  heroImage?: ImageWidget;
  /** @title Hero Image Alt Text */
  heroImageAlt?: string;
}

export default function PartnersHero({
  title = "Become a Deco Partner",
  primaryButtonText = "Start application",
  primaryButtonUrl = "/partners/apply",
  secondaryButtonText = "Book a 20‑min intro",
  secondaryButtonUrl = "/partners/intro-call",
  tertiaryButtonText = "Explore tiers & benefits",
  tertiaryButtonUrl = "/partners",
  partnerLogos = [],
  showPartnerLogos = true,
  heroImage = "https://assets.decocache.com/decocms/452b8f22-f11e-4b6f-8934-2e58419ea705/integration-1.png",
  heroImageAlt = "Deco Partner Program Visual",
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2 pt-0">
      <div class="bg-dc-100 px-2 pt-2 rounded-[24px] rounded-t-none flex flex-col min-h-[calc(100svh-64px)] sm:min-h-[calc(100svh-72px)] lg:min-h-[calc(100svh-80px)] relative overflow-hidden">
        {/* Main Content */}
        <main class="flex-1 flex flex-col lg:flex-row items-center justify-between max-w-8xl mx-auto pt-20 sm:pt-32 lg:pt-40 pb-0 relative z-10 px-4 sm:px-6 lg:px-8 gap-8 lg:gap-16">
          
          {/* Left Column - Content */}
          <div class="w-full lg:w-1/2 flex flex-col items-start gap-4 sm:gap-6">
            {/* Title */}
            <h1 class="text-dc-900 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight tracking-[-0.02em] text-left">
              {title}
            </h1>

            {/* Buttons */}
            <div class="flex flex-col sm:flex-row items-start gap-3 mt-4">
              <a
                href={primaryButtonUrl}
                class="h-12 px-6 py-2 bg-[#D0EC1A] rounded-xl flex justify-center items-center gap-2 hover:bg-[#C5E015] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span class="text-[#07401A] text-base font-semibold leading-tight">
                  {primaryButtonText} →
                </span>
              </a>
              <a
                href={secondaryButtonUrl}
                class="h-12 px-6 py-2 bg-transparent border-2 border-dc-300 rounded-xl flex justify-center items-center gap-2 hover:bg-dc-200 hover:border-dc-400 transition-all duration-300"
              >
                <span class="text-dc-700 text-base font-medium leading-tight">
                  {secondaryButtonText} →
                </span>
              </a>
              <a
                href={tertiaryButtonUrl}
                class="h-12 px-6 py-2 bg-transparent border border-dc-300 rounded-xl flex justify-center items-center gap-2 hover:bg-dc-200 transition-all duration-300"
              >
                <span class="text-dc-700 text-sm font-medium leading-tight">
                  {tertiaryButtonText} →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div class="w-full lg:w-1/2 flex flex-col items-center gap-8">
            
            {/* Hero Impact Image */}
            {heroImage && (
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-[#D0EC1A] to-[#A8D015] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  class="relative w-full max-w-md h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}

            {/* Partner Logos Carousel */}
            {showPartnerLogos && partnerLogos.length > 0 && (
              <div class="w-full max-w-md">
                <p class="text-dc-600 text-sm font-medium mb-4 text-center">Trusted by Leading Partners</p>
                
                {/* Animated Logo Carousel */}
                <div class="relative overflow-hidden rounded-xl bg-white/50 backdrop-blur-sm p-4">
                  <div class="flex animate-scroll gap-8 items-center">
                    {/* First set of logos */}
                    {partnerLogos.map((logo, index) => (
                      <div key={`first-${index}`} class="flex-shrink-0">
                        <img
                          src={logo}
                          alt={`Partner ${index + 1}`}
                          class="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                          loading="lazy"
                        />
                      </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {partnerLogos.map((logo, index) => (
                      <div key={`second-${index}`} class="flex-shrink-0">
                        <img
                          src={logo}
                          alt={`Partner ${index + 1}`}
                          class="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Background Decorative Elements */}
        <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#D0EC1A]/10 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-dc-200/20 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* CSS for animation */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
}