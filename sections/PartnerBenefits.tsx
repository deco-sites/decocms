export interface Benefit {
  /** @title Benefit Title */
  title: string;
  /** @title Benefit Description */
  description: string;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Benefits List */
  benefits?: Benefit[];
}

export default function PartnerBenefits({
  title = "Why join",
  benefits = [
    {
      title: "Win deals faster",
      description: "with ready‑to‑ship blueprints (agents, workflows, storefronts).",
    },
    {
      title: "Operate with confidence",
      description: "via observability, cost caps, RBAC, and governance.",
    },
    {
      title: "Monetize your way:",
      description: "referral, reseller discount, services, and ISV template revenue share.",
    },
    {
      title: "Grow with us:",
      description: "directory placement, co‑marketing/MDF, roadmap briefings, advisory council.",
    },
    {
      title: "Level up your team:",
      description: "structured certifications + Partner Starter Kit (scripts, prompts, checklists).",
    },
  ],
}: Props) {
  return (
    <section class="w-full bg-dc-50 py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div class="flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <h2 class="text-dc-900 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>

          {/* Benefits List */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} class="flex flex-col gap-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-[#D0EC1A] rounded-full mt-2 flex-shrink-0"></div>
                  <div class="flex-1">
                    <span class="text-dc-900 text-base md:text-lg font-medium">
                      {benefit.title}
                    </span>
                    <span class="text-dc-700 text-base md:text-lg font-normal ml-1">
                      {benefit.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}