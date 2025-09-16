import { Check } from "lucide-preact";

export interface Highlight {
  /** @title Highlight Title */
  title: string;
  /** @title Highlight Description */
  description: string;
  /** @title Featured Highlight */
  /** @description Mark as featured to show larger text */
  featured?: boolean;
}

export interface Props {
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Section Title */
  title?: string;
  /** @title Highlights */
  highlights?: Highlight[];
  /** @title Target Time Note */
  targetTimeNote?: string;
}

export default function PartnerHighlights({
  subtitle,
  title,
  highlights = [],
  targetTimeNote,
}: Props) {
  return (
    <section className="w-full bg-dc-50 flex flex-col p-2">
      <div className="bg-primary-dark pt-20 rounded-3xl flex flex-col relative overflow-hidden">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pb-20">
          {/* Left Column - Header & Target Time */}
          <div className="flex-1 flex flex-col justify-between gap-8 lg:gap-12">
            {/* Header */}
            <div className="flex flex-col gap-3">
              {subtitle && (
                <div className="text-dc-50 text-sm sm:text-base font-mono leading-5 uppercase tracking-wide">
                  {subtitle}
                </div>
              )}
              {title && (
                <h2 className="text-primary-light text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
                  {title}
                </h2>
              )}
            </div>

            {/* Target Time Note */}
            {targetTimeNote && (
              <div className="bg-primary-dark/80 rounded-xl p-6 sm:p-8 border border-primary-light/20">
                <p className="text-primary-light text-lg sm:text-xl lg:text-2xl font-normal leading-tight">
                  {targetTimeNote}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Highlights */}
          <div className="flex-1 flex flex-col gap-8 sm:gap-10">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Check Icon */}
                <div className="flex-shrink-0 mt-1">
                  <Check
                    size={20}
                    strokeWidth={2}
                    class="text-primary-light"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <div className="text-primary-light text-sm sm:text-base font-mono leading-5 uppercase tracking-wide">
                    {highlight.title}
                  </div>
                  {highlight.featured
                    ? (
                      <div className="text-primary-light text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                        {highlight.description}
                      </div>
                    )
                    : (
                      <div className="text-dc-50 text-base sm:text-lg leading-relaxed">
                        {highlight.description}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
