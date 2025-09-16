export interface Term {
  /** @title Term Title */
  title: string;
  /** @title Term Description */
  description: string;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Terms */
  terms?: Term[];
  /** @title Footer Note */
  footerNote?: string;
}

export default function LightTerms({
  title = "Light T&Cs (summary)",
  terms = [
    {
      title: "Referral payouts",
      description:
        "within 30 days of Deco receiving first payment; cap at 12 months unless reseller.",
    },
    {
      title: "Reseller",
      description:
        "bills end‑customer; Deco bills partner; service/support split: L1 (partner) / L2+ (Deco).",
    },
    {
      title: "IP:",
      description:
        "pre‑existing stays with owner; new code defaults Apache‑2.0 (or agreed license).",
    },
    {
      title: "Brand usage:",
      description: "follow Deco brand guide; badges by tier/cert.",
    },
  ],
  footerNote = "Full legal available during onboarding.",
}: Props) {
  return (
    <section class="w-full bg-dc-50 py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div class="flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <h2 class="text-dc-900 text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>

          {/* Terms List */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {terms.map((term, index) => (
              <div key={index} class="flex flex-col gap-2">
                <div class="flex items-start gap-3">
                  <div class="w-2 h-2 bg-[#D0EC1A] rounded-full mt-2 flex-shrink-0">
                  </div>
                  <div class="flex-1">
                    <span class="text-dc-900 text-base md:text-lg font-medium">
                      {term.title}
                    </span>
                    <span class="text-dc-700 text-base md:text-lg font-normal ml-1">
                      {term.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div class="text-center">
            <p class="text-dc-600 text-sm md:text-base italic">
              {footerNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
