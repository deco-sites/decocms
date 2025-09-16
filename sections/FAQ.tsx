import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy question
 */
interface FAQItem {
  /** @title Pergunta */
  /** @description Pergunta do FAQ */
  question: string;
  /** @title Resposta */
  /** @description Resposta do FAQ */
  answer: string;
}

interface Props {
  /** @title Eyebrow */
  /** @description Texto pequeno que aparece acima do título */
  eyebrow?: string;
  /** @title Título principal */
  /** @description Título principal da seção */
  title?: string;
  /** @title Descrição */
  /** @description Descrição da seção */
  description?: string;
  /** @title Logo das respostas */
  /** @description Logo que aparece ao lado das respostas do FAQ */
  answerLogo?: ImageWidget;
  /** @title Perguntas frequentes */
  /** @description Lista de perguntas e respostas */
  faqItems?: FAQItem[];
}

export default function FAQ({
  eyebrow = "FAQ",
  title = "FAQs",
  description =
    "Here are some frequently asked questions, to solve all your problems.",
  answerLogo =
    "https://assets.decocache.com/decochatweb/cebb6b63-37c8-48a8-870e-0bad65e6e1fb/logo-agnet-deco.png",
  faqItems = [
    {
      question:
        "What is deco CMS, and how is it different from other AI app builders?",
      answer:
        "deco CMS is an open-source Context CMS — a control plane and runtime for building, running, and monetizing AI-powered agentic apps. Unlike traditional app builders, it unifies context, governance, observability, and monetization in one platform.",
    },
    {
      question: "Do I need to be a developer to use deco CMS?",
      answer:
        "Not at all. Business teams can create prompts, workflows, and agents without writing code, while developers can extend, customize, and deploy advanced capabilities using our TypeScript SDK and CLI.",
    },
    {
      question: "How does deco CMS handle governance and observability?",
      answer:
        "Every run is fully traced, auditable, and secure. DecoCMS includes role-based access control (RBAC), spend caps, error analytics, and per-step cost visibility — ensuring safe operations and compliance by default.",
    },
    {
      question: "Can I self-host deco CMS or bring my own keys (BYOK)?",
      answer:
        "Yes. deco CMS is open-source and fully portable. You can self-host it on your infrastructure, bring your own API keys, and maintain full control over your data and costs.",
    },
    {
      question:
        "Can I ensure my data stays private and secure when self-hosting deco CMS?",
      answer:
        "Absolutely. When you self-host deco CMS, your data, models, and keys stay fully under your control. deco CMS never stores or transmits your data unless you explicitly configure it to.",
    },
    {
      question: "How much does deco CMS cost?",
      answer:
        "You start with $2 in free credits — no credit card required. After that, pricing is usage-based, so you only pay per run, with full transparency and real-time cost tracking in your dashboard.",
    },
    {
      question: "How does the deco CMS SDK work for developers?",
      answer:
        "The deco CMS SDK lets you build, extend, and manage agents, workflows, and UIs in TypeScript. It integrates seamlessly with the CLI, enabling local development, testing, and edge deployment from a single codebase.",
    },
    {
      question: "What is the Context Mesh, and why is it important?",
      answer:
        "The Context Mesh is DecoCMS’s governed layer for connecting data, tools, and models. It provides typed connectors with built-in policy routing, RBAC, observability, and spend controls — ensuring the right context is delivered safely every time.",
    },
    {
      question: "Does deco CMS support edge deployment?",
      answer:
        "Yes. deco CMS ships agents, workflows, and UIs to the edge automatically, ensuring low latency and global performance by default. You can manage environments, preview builds, and deploy updates directly from the CLI.",
    },
    {
      question: "How does deco CMS integrate with Git?",
      answer:
        "deco CMS uses a Git-backed workflow by default. Every change to agents, workflows, and UIs is versioned, allowing you to branch, review, and merge updates just like any modern development stack. This ensures full traceability and safe collaboration between teams.",
    },
  ],
}: Props) {
  return (
    <section class="w-full bg-[#FAF9F7] py-16 md:py-32">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col justify-start items-center gap-8 md:gap-14">
        {/* Header */}
        <div class="w-full flex flex-col items-center gap-6">
          {eyebrow && (
            <div class="text-[#78716C] text-sm font-medium uppercase tracking-wider">
              {eyebrow}
            </div>
          )}
          <h2 class="text-center text-[#1C1917] text-3xl md:text-5xl lg:text-6xl font-medium leading-tight max-w-4xl">
            {title}
          </h2>
        </div>

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
                  <div class="w-12 h-12 relative bg-[#D0EC1A] rounded-2xl flex-shrink-0 overflow-hidden">
                    <img
                      src={answerLogo}
                      alt="Logo"
                      width={48}
                      height={48}
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
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
                    `.faq-answer[data-index=\"${index}\"]`,
                  );
                  const icon = question.querySelector(
                    ".faq-plus-vertical",
                  ) as HTMLElement | null;

                  // Close previously opened answer
                  if (activeIndex !== -1 && activeIndex !== index) {
                    const prevAnswer = document.querySelector(
                      `.faq-answer[data-index=\"${activeIndex}\"]`,
                    );
                    const prevIcon = document.querySelector(
                      `.faq-question[data-index=\"${activeIndex}\"] .faq-plus-vertical`,
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
