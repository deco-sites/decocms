export interface Tier {
  /** @title Tier Name */
  name: string;
  /** @title Benefits */
  benefits: string;
  /** @title Requirements */
  requirements: string;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Tiers */
  tiers?: Tier[];
  /** @title Full Details Note */
  fullDetailsNote?: string;
  /** @title Full Details URL */
  fullDetailsUrl?: string;
}

export default function PartnerTiers({
  title = "Tiers (snapshot)",
  tiers = [
    {
      name: "Registered",
      benefits: "Deal reg, newsletter, $500 credits",
      requirements: "Application + 1 case plan",
    },
    {
      name: "Certified",
      benefits: "Directory listing, co‑marketing, lead share",
      requirements: "2 certified + 1 public demo",
    },
    {
      name: "Premier",
      benefits: "Priority leads, roadmap, MDF, early betas",
      requirements: "$50k+ ARR or 3 launches/qtr + 4 cert",
    },
    {
      name: "Elite",
      benefits: "Co‑sell squad, advisory council, preferred margin",
      requirements: "$200k+ ARR or 12/yr + 8 cert",
    },
  ],
  fullDetailsNote = "See full details on",
  fullDetailsUrl = "/partners",
}: Props) {
  return (
    <section class="w-full bg-dc-50 py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div class="flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <h2 class="text-dc-900 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>

          {/* Tiers Table */}
          <div class="overflow-x-auto">
            <table class="w-full bg-white rounded-xl shadow-sm border border-dc-200">
              <thead>
                <tr class="border-b border-dc-200">
                  <th class="text-left p-4 md:p-6 text-dc-900 text-base md:text-lg font-medium">
                    Tier
                  </th>
                  <th class="text-left p-4 md:p-6 text-dc-900 text-base md:text-lg font-medium">
                    Benefits (short)
                  </th>
                  <th class="text-left p-4 md:p-6 text-dc-900 text-base md:text-lg font-medium">
                    Requirements
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier, index) => (
                  <tr key={index} class="border-b border-dc-100 last:border-b-0">
                    <td class="p-4 md:p-6">
                      <span class="text-dc-900 text-base md:text-lg font-medium">
                        {tier.name}
                      </span>
                    </td>
                    <td class="p-4 md:p-6">
                      <span class="text-dc-700 text-sm md:text-base">
                        {tier.benefits}
                      </span>
                    </td>
                    <td class="p-4 md:p-6">
                      <span class="text-dc-700 text-sm md:text-base">
                        {tier.requirements}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Full Details Note */}
          <div class="text-center">
            <p class="text-dc-600 text-sm md:text-base">
              <em>
                {fullDetailsNote}{" "}
                <a
                  href={fullDetailsUrl}
                  class="text-[#D0EC1A] hover:underline font-medium"
                >
                  {fullDetailsUrl}
                </a>
                .
              </em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}