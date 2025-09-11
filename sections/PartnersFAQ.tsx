import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy question
 */
interface FAQItem {
  /** @title Question */
  question: string;
  /** @title Answer */
  answer: string;
}

interface Props {
  /** @title Section Title */
  title?: string;
  /** @title FAQ Items */
  faqItems?: FAQItem[];
}

export default function PartnersFAQ({
  title = "FAQs",
  faqItems = [
    {
      question: "Do you provide customer leads?",
      answer: "Yes for Certified+ based on region, vertical fit, and bandwidth.",
    },
    {
      question: "Can we resell Deco?",
      answer: "Yes; discount by tier. L1 support by partner; Deco covers L2+.",
    },
    {
      question: "How do deal conflicts work?",
      answer: "Register deals for a 120‑day protection window (+60 with activity). Multi‑partner only with client consent or segmented scope.",
    },
    {
      question: "How do certifications work?",
      answer: "Tracks: DAS‑I, DCS, DIA. Badges expire in 18 months; maintain via launches + CPE or re‑test.",
    },
    {
      question: "Where can we see pricing?",
      answer: "Program benefits & tiers: /partners. Product pricing is handled per customer or via your reseller terms.",
    },
    {
      question: "Data privacy & deployment?",
      answer: "Projects run with RBAC and cost caps. Deploy to VPC or on‑prem as needed.",
    },
  ],
}: Props) {
  return (
    <section class="w-full bg-[#FAF9F7] py-16 md:py-24">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col justify-start items-center gap-8 md:gap-14">
        {/* Header */}
        <h2 class="text-center text-[#1C1917] text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
          {title}
        </h2>

        <div class="w-full max-w-[750px] flex flex-col justify-start items-start gap-4">
          {faqItems.map((item, index) => (
            <div key={index} class="self-stretch faq-item">
              {/* Question */}
              <div
                class="self-stretch flex justify-end items-center gap-2.5 cursor-pointer faq-question"
                data-index={index}
              >
                <div class="w-6 h-6 relative overflow-hidden faq-icon">
                  <div class="w-3.5 h-0.5 left-[5px] top-[11px] absolute bg-[#78716C] transition-transform duration-300">
                  </div>
                  <div class="w-0.5 h-3.5 left-[11px] top-[5px] absolute bg-[#78716C] transition-transform duration-300 faq-plus-vertical">
                  </div>
                </div>
                <div class="w-[500px] p-6 bg-[#F5F4F0] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl flex flex-col justify-center items-start">
                  <div class="self-stretch text-[#1C1917] text-base md:text-lg lg:text-xl font-medium leading-normal">
                    {item.question}
                  </div>
                </div>
              </div>

              {/* Answer */}
              <div class="self-stretch faq-answer hidden" data-index={index}>
                <div class="self-stretch flex justify-start items-end gap-2.5 mt-4">
                  <div class="w-12 h-12 relative bg-[#D0EC1A] rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                    <span class="text-[#07401A] text-xl font-bold">D</span>
                  </div>
                  <div class="w-[500px] p-6 bg-[#07401A] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl flex flex-col justify-center items-start">
                    <div class="self-stretch text-[#D0EC1A] text-base md:text-lg lg:text-xl font-medium leading-normal">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: useScript(() => {
            const init = () => {
              const questions = document.querySelectorAll(".faq-question");
              let activeIndex = -1;

              questions.forEach((question, index) => {
                question.addEventListener("click", () => {
                  const answer = document.querySelector(
                    `.faq-answer[data-index="${index}"]`,
                  );
                  const icon = question.querySelector(
                    ".faq-plus-vertical",
                  ) as HTMLElement | null;

                  // Close previously opened answer
                  if (activeIndex !== -1 && activeIndex !== index) {
                    const prevAnswer = document.querySelector(
                      `.faq-answer[data-index="${activeIndex}"]`,
                    );
                    const prevIcon = document.querySelector(
                      `.faq-question[data-index="${activeIndex}"] .faq-plus-vertical`,
                    ) as HTMLElement | null;

                    if (prevAnswer) {
                      prevAnswer.classList.add("hidden");
                    }
                    if (prevIcon) {
                      prevIcon.style.transform = "rotate(0deg)";
                    }
                  }

                  // Toggle current answer
                  if (answer) {
                    const isHidden = answer.classList.contains("hidden");

                    if (isHidden) {
                      answer.classList.remove("hidden");
                      if (icon) icon.style.transform = "rotate(90deg)";
                      activeIndex = index;
                    } else {
                      answer.classList.add("hidden");
                      if (icon) icon.style.transform = "rotate(0deg)";
                      activeIndex = -1;
                    }
                  }
                });
              });
            };

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", init);
            } else {
              init();
            }
          }),
        }}
      />
    </section>
  );
}