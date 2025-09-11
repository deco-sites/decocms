import type { ImageWidget } from "apps/admin/widgets.ts";

export interface CustomerLogo {
  /** @title Logo Image */
  logo: ImageWidget;
  /** @title Company Name */
  name: string;
  /** @title Case Study URL */
  /** @description Optional link to case study */
  caseStudyUrl?: string;
}

export interface Props {
  /** @title Section Title */
  title?: string;
  /** @title Section Subtitle */
  subtitle?: string;
  /** @title Customer Logos */
  customerLogos?: CustomerLogo[];
}

export default function CustomerLogos({
  title = "Who's Already Building with deco CMS",
  subtitle = "Trusted by teams shipping AI‑native experiences. Replace placeholders with approved customer logos.",
  customerLogos = [
    {
      logo: "https://placehold.co/120x60/E5E5E5/999999?text=Customer+1",
      name: "Customer 1",
    },
    {
      logo: "https://placehold.co/120x60/E5E5E5/999999?text=Customer+2",
      name: "Customer 2",
    },
    {
      logo: "https://placehold.co/120x60/E5E5E5/999999?text=Customer+3",
      name: "Customer 3",
    },
    {
      logo: "https://placehold.co/120x60/E5E5E5/999999?text=Customer+4",
      name: "Customer 4",
    },
    {
      logo: "https://placehold.co/120x60/E5E5E5/999999?text=Customer+5",
      name: "Customer 5",
    },
    {
      logo: "https://placehold.co/120x60/E5E5E5/999999?text=Customer+6",
      name: "Customer 6",
    },
  ],
}: Props) {
  return (
    <section class="w-full bg-[#FAF9F7] py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col justify-start items-center gap-8 md:gap-12">
        {/* Header */}
        <div class="w-full flex flex-col items-center gap-4 text-center">
          <h2 class="text-[#1C1917] text-2xl md:text-3xl lg:text-4xl font-medium leading-tight max-w-3xl">
            {title}
          </h2>
          <p class="text-[#78716C] text-sm md:text-base leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Customer Logos Grid */}
        <div class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center">
          {customerLogos.map((customer, index) => (
            <div key={index} class="flex items-center justify-center">
              {customer.caseStudyUrl ? (
                <a
                  href={customer.caseStudyUrl}
                  class="block opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  title={`${customer.name} case study`}
                >
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    class="h-8 md:h-10 w-auto object-contain"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={customer.logo}
                  alt={customer.name}
                  class="h-8 md:h-10 w-auto object-contain opacity-60 grayscale"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}