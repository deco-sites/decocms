export interface Step {
  /** @title Step Number */
  number: string;
  /** @title Step Title */
  title: string;
  /** @title Step Description */
  description: string;
}

export interface Props {
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
  title = "How the program works (3 steps)",
  steps = [
    {
      number: "1",
      title: "Apply",
      description: "tell us your focus, stacks, and preferred monetization.",
    },
    {
      number: "2",
      title: "Enable",
      description: "get sandbox credits, Starter Kit, and certification schedule.",
    },
    {
      number: "3",
      title: "Go‑to‑market",
      description: "register deals, request MDF, and publish case studies.",
    },
  ],
  tipText = "Not sure where to start? Join a 20‑min intro call",
  tipCtaText = "Book intro call",
  tipCtaUrl = "/partners/intro-call",
}: Props) {
  return (
    <section class="w-full bg-[#FAF9F7] py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8">
        <div class="flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <h2 class="text-[#1C1917] text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            {title}
          </h2>

          {/* Steps */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} class="flex flex-col gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-[#D0EC1A] rounded-full flex items-center justify-center">
                    <span class="text-[#07401A] text-lg font-bold">
                      {step.number}
                    </span>
                  </div>
                  <h3 class="text-[#1C1917] text-xl md:text-2xl font-medium">
                    {step.title}
                  </h3>
                </div>
                <p class="text-[#78716C] text-base md:text-lg leading-relaxed ml-14">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div class="bg-dc-100 rounded-xl p-6 md:p-8 border border-dc-200">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 bg-[#D0EC1A] rounded-full flex items-center justify-center">
                  <span class="text-[#07401A] text-sm font-bold">💡</span>
                </div>
                <span class="text-dc-900 text-base md:text-lg font-medium">Tip:</span>
              </div>
              <div class="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span class="text-dc-700 text-base md:text-lg">
                  {tipText}
                </span>
                <a
                  href={tipCtaUrl}
                  class="px-4 py-2 bg-[#D0EC1A] rounded-lg text-[#07401A] text-sm font-medium hover:bg-[#C5E015] transition-colors"
                >
                  {tipCtaText} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}