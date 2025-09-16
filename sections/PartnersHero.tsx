import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../components/ui/Button.tsx";
import Image from "apps/website/components/Image.tsx";

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
  /** @title Trust Signal Title */
  trustSignalTitle?: string;
  /** @title Partner Logos */
  /** @description Partner logos for the trust signal */
  partnerLogos?: ImageWidget[];
  /** @title Show Partner Logos */
  showPartnerLogos?: boolean;
  /** @title Desktop Background Image */
  /** @description Background image for desktop that appears above the primary-dark background */
  backgroundImageDesktop?: ImageWidget;
  /** @title Mobile Background Image */
  /** @description Background image for mobile that appears above the primary-dark background */
  backgroundImageMobile?: ImageWidget;
}

export default function PartnersHero({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  trustSignalTitle,
  partnerLogos = [],
  showPartnerLogos = true,
  backgroundImageDesktop,
  backgroundImageMobile,
}: Props) {
  return (
    <section className="w-full bg-dc-50 flex flex-col p-2">
      <div className="bg-primary-dark pt-6 rounded-3xl flex flex-col h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Background Images */}
        {/* Desktop Background */}
        {backgroundImageDesktop && (
          <div className="hidden sm:block absolute inset-0 z-0">
            <Image
              src={backgroundImageDesktop}
              alt="Background"
              width={1424}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}

        {/* Mobile Background */}
        {backgroundImageMobile && (
          <div className="block sm:hidden absolute inset-0 z-0">
            <Image
              src={backgroundImageMobile}
              alt="Background"
              width={768}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 items-center justify-start max-w-2xl">
            {/* Header */}
            <div className="flex flex-col gap-6 items-center justify-start w-full">
              <h1 className="text-primary-light text-4xl sm:text-5xl lg:text-8xl font-medium leading-tight tracking-tight text-center">
                {title}
              </h1>
              {subtitle && (
                <p className="text-dc-50 text-base sm:text-lg leading-relaxed text-center max-w-lg">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 items-start justify-start">
              {primaryButtonText && primaryButtonUrl && (
                <Button
                  variant="primary"
                  size="medium"
                  href={primaryButtonUrl}
                  className="!bg-primary-light !text-primary-dark hover:!bg-primary-light/90"
                >
                  {primaryButtonText}
                </Button>
              )}
              {secondaryButtonText && secondaryButtonUrl && (
                <Button
                  variant="secondary"
                  size="medium"
                  href={secondaryButtonUrl}
                  className="!bg-dc-50 !text-dc-900 hover:!bg-dc-100"
                >
                  {secondaryButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Trust Signal Section */}
        {showPartnerLogos && partnerLogos.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full overflow-hidden pb-10 pt-5 px-0">
            {trustSignalTitle && (
              <div className="text-primary-light text-sm sm:text-base font-mono leading-5 text-center uppercase mb-6 tracking-wide">
                {trustSignalTitle}
              </div>
            )}
            <div className="flex gap-6 sm:gap-9 items-center justify-center">
              {partnerLogos.map((logo, index) => (
                <div key={index} className="h-8 sm:h-10 lg:h-12 flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={120}
                    height={48}
                    loading="lazy"
                    className="h-full w-auto object-contain opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
