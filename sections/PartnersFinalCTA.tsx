export interface ButtonProps {
  /** @title Button Text */
  text: string;
  /** @title Button URL */
  url: string;
}

export interface Props {
  /** @title Main Title */
  title?: string;
  /** @title Subtitle */
  subtitle?: string;
  /** @title Primary Button */
  primaryButton?: ButtonProps;
  /** @title Secondary Button */
  secondaryButton?: ButtonProps;
}

export default function PartnersFinalCTA({
  title = "Ready to build together?",
  subtitle = "Start your application now or grab time for a quick intro.",
  primaryButton = {
    text: "Apply now",
    url: "/partners/apply",
  },
  secondaryButton = {
    text: "Book an intro",
    url: "/partners/intro-call",
  },
}: Props) {
  return (
    <section class="w-full bg-[#FAF9F7]">
      <div class="relative z-10 pt-20 md:pt-40 px-4 md:px-8 lg:px-16 mb-[-100px]">
        <div class="w-full max-w-[1440px] mx-auto">
          <div class="bg-[#D0EC1A] rounded-[20px] md:rounded-[40px] flex flex-col justify-center items-center overflow-hidden relative">
            {/* Main Content */}
            <div class="w-full p-8 md:p-12 lg:p-20 flex flex-col justify-center items-center gap-6 lg:gap-8 relative z-10 text-center">
              {/* Title */}
              <h2 class="text-[#07401A] text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                {title}
              </h2>
              
              {/* Subtitle */}
              <p class="text-[#07401A] text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                {subtitle}
              </p>

              {/* Buttons */}
              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={primaryButton.url}
                  class="px-8 py-4 bg-[#07401A] rounded-xl text-[#D0EC1A] text-base md:text-lg font-medium hover:bg-[#07401A]/90 transition-colors"
                >
                  {primaryButton.text}
                </a>
                <a
                  href={secondaryButton.url}
                  class="px-8 py-4 bg-transparent border-2 border-[#07401A] rounded-xl text-[#07401A] text-base md:text-lg font-medium hover:bg-[#07401A] hover:text-[#D0EC1A] transition-colors"
                >
                  {secondaryButton.text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}