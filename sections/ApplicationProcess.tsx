export interface ProcessStep {
  /** @title Step Description */
  description: string;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Process Steps */
  processSteps?: ProcessStep[];
}

export default function ApplicationProcess({
  title = "What happens after you apply",
  processSteps = [
    {
      description: "Auto‑acknowledgment within 1 hour.",
    },
    {
      description: "Decision within 2 business days.",
    },
    {
      description: "If approved: sandbox access + Starter Kit + certification invite.",
    },
    {
      description: "If waitlisted: suggested steps to qualify (e.g., blueprint completion, cohort date).",
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

          {/* Process Steps */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} class="flex items-start gap-3">
                <div class="w-2 h-2 bg-[#D0EC1A] rounded-full mt-2 flex-shrink-0"></div>
                <p class="text-dc-700 text-base md:text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}