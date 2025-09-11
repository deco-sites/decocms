export interface PartnerType {
  /** @title Partner Type */
  title: string;
  /** @title Description */
  description: string;
}

export interface Requirement {
  /** @title Requirement */
  text: string;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Partner Types */
  partnerTypes?: PartnerType[];
  /** @title Minimum Readiness Title */
  readinessTitle?: string;
  /** @title Minimum Requirements */
  requirements?: Requirement[];
}

export default function WhoShouldApply({
  title = "Who should apply",
  partnerTypes = [
    {
      title: "Agentic SIs/Agencies",
      description: "building AI workflows, agents, or AI‑friendly storefronts.",
    },
    {
      title: "ISVs/Co‑builders",
      description: "publishing connectors, MCPs, blueprints, or templates.",
    },
    {
      title: "Technology partners",
      description: "(cloud, data, observability, LLMs) integrating with Deco.",
    },
    {
      title: "Training partners",
      description: "creating courses, bootcamps, or certifications.",
    },
  ],
  readinessTitle = "Minimum readiness:",
  requirements = [
    {
      text: "1+ public or private AI build or a capable team ready to deliver with guidance.",
    },
    {
      text: "Commitment to at least one reference build in the first 60 days.",
    },
    {
      text: "Named partner lead for delivery and GTM.",
    },
  ],
}: Props) {
  return (
    <section class="w-full bg-[#FAF9F7] py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div class="flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <h2 class="text-[#1C1917] text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>

          {/* Partner Types */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {partnerTypes.map((type, index) => (
              <div key={index} class="flex flex-col gap-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-[#D0EC1A] rounded-full mt-2 flex-shrink-0"></div>
                  <div class="flex-1">
                    <span class="text-[#1C1917] text-base md:text-lg font-medium">
                      {type.title}
                    </span>
                    <span class="text-[#78716C] text-base md:text-lg font-normal ml-1">
                      {type.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Minimum Readiness */}
          <div class="flex flex-col gap-4 md:gap-6">
            <h3 class="text-[#1C1917] text-xl md:text-2xl font-medium">
              {readinessTitle}
            </h3>
            <div class="flex flex-col gap-3">
              {requirements.map((requirement, index) => (
                <div key={index} class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-[#78716C] rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-[#78716C] text-base md:text-lg leading-relaxed">
                    {requirement.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}