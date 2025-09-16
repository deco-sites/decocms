import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  backgroundImage?: ImageWidget;
}

export default function FindPartnerHero({
  title = "Find a Deco Partner",
  subtitle = "Certified agencies, SIs, and co‑builders ready to launch AI‑native experiences on Deco.",
  primaryButtonText = "Become a partner",
  primaryButtonUrl = "/partners",
  secondaryButtonText = "Register a project",
  secondaryButtonUrl = "/partners/deal-registration",
  backgroundImage
}: Props) {
  return (
    <section class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div class="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            class="w-full h-full object-cover opacity-20"
          />
        </div>
      )}
      
      {/* Background Pattern */}
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p class="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={primaryButtonUrl}
              class="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200 text-lg"
            >
              {primaryButtonText} →
            </a>
            
            <a
              href={secondaryButtonUrl}
              class="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 text-lg border border-white/20"
            >
              {secondaryButtonText} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}