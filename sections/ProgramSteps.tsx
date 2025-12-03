import { Check, Lightbulb } from "lucide-preact";
import Button from "../islands/Button.tsx";

export interface Step {
  /** @title Step Title */
  title: string;
  /** @title Step Description */
  description: string;
}

export interface Props {
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Section Title */
  title?: string;
  /** @title Steps */
  steps?: Step[];
  /** @title Tip Text */
  tipText?: string;
  /** @title Tip CTA Text */
  tipCtaText?: string;
  /** @title Tip CTA URL */
  tipCtaUrl?: string;
}

export default function ProgramSteps({
  subtitle,
  title,
  steps = [],
  tipText,
  tipCtaText,
  tipCtaUrl,
}: Props) {
  return (
    <section className="w-full bg-dc-50 py-16 sm:py-20 lg:py-32">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-20">
          {/* Header */}
          <div className="flex flex-col gap-3 items-start justify-center max-w-lg">
            {subtitle && (
              <div className="text-dc-500 text-sm sm:text-base font-mono leading-5 uppercase tracking-wide">
                {subtitle}
              </div>
            )}
            {title && (
              <h2 className="text-dc-800 text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
                {title}
              </h2>
            )}
          </div>

          {/* Steps Flow */}
          <div className="py-6 sm:py-8 lg:py-12">
            {/* Mobile/Tablet: Vertical Layout */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:hidden relative">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 relative">
                  {/* Check Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-light rounded-full flex items-center justify-center">
                      <Check
                        size={20}
                        strokeWidth={2}
                        class="text-primary-dark"
                      />
                    </div>

                    {/* Vertical Connecting Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-12 sm:top-14 left-1/2 transform -translate-x-1/2 w-0.5 h-6 sm:h-8 bg-primary-light">
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2 pt-1">
                    <h3 className="text-dc-800 text-lg sm:text-xl font-normal leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-dc-800 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Horizontal Layout */}
            <div className="hidden lg:grid grid-cols-3 gap-8 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 items-start relative"
                >
                  {/* Check Icon */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center">
                      <Check
                        size={28}
                        strokeWidth={2}
                        class="text-primary-dark"
                      />
                    </div>

                    {/* Horizontal Connecting Line */}
                    {index < steps.length - 1 && (
                      <div
                        className="absolute top-7 left-14 w-full h-0.5 bg-primary-light"
                        style={{ width: "calc(100vw / 3 - 3.5rem)" }}
                      >
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-dc-800 text-xl sm:text-2xl font-normal leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-dc-800 text-base sm:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip Section */}
          {tipText && tipCtaText && tipCtaUrl && (
            <div className="bg-primary-dark rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 flex-shrink-0">
                <Lightbulb
                  size={28}
                  strokeWidth={2}
                  class="text-primary-light"
                />
              </div>

              <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <p className="text-primary-light text-lg sm:text-xl lg:text-2xl font-normal leading-tight flex-1">
                  {tipText}
                </p>

                <Button
                  variant="primary"
                  size="medium"
                  href={tipCtaUrl}
                  className="!bg-primary-light !text-primary-dark hover:!bg-primary-light/90 flex-shrink-0"
                >
                  {tipCtaText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
