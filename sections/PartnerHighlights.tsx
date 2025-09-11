export interface Highlight {
  /** @title Highlight Title */
  title: string;
  /** @title Highlight Description */
  description: string;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Highlights */
  highlights?: Highlight[];
  /** @title Target Time Note */
  targetTimeNote?: string;
}

export default function PartnerHighlights({
  title = "What you get (highlights)",
  highlights = [
    {
      title: "Sandbox credits:",
      description: "US$500 per practitioner, renewable with activity.",
    },
    {
      title: "Leads & co‑sell:",
      description: "for Certified+ based on fit, capacity, and vertical expertise.",
    },
    {
      title: "Directory listing:",
      description: "appear in Find a Partner with badges and case studies.",
    },
    {
      title: "MDF:",
      description: "50/50 co‑marketing funds for Certified+ with shared KPIs.",
    },
    {
      title: "Certifications:",
      description: "DAS‑I, DCS, DIA + renewal path.",
    },
    {
      title: "Support SLAs:",
      description: "Triage <4h; P1 bridge <1h (Premier+).",
    },
  ],
  targetTimeNote = "Target time‑to‑first‑launch: < 7 days from sandbox access.",
}: Props) {
  return (
    <section class="w-full bg-dc-50 py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div class="flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <h2 class="text-dc-900 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>

          {/* Highlights List */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} class="flex flex-col gap-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-[#D0EC1A] rounded-full mt-2 flex-shrink-0"></div>
                  <div class="flex-1">
                    <span class="text-dc-900 text-base md:text-lg font-medium">
                      {highlight.title}
                    </span>
                    <span class="text-dc-700 text-base md:text-lg font-normal ml-1">
                      {highlight.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Target Time Note */}
          <div class="bg-[#D0EC1A] rounded-xl p-6 md:p-8">
            <p class="text-[#07401A] text-base md:text-lg font-medium text-center">
              {targetTimeNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}