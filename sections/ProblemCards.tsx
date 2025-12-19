import { useScript } from "@deco/deco/hooks";
import ProblemCardsAnimated from "../islands/ProblemCardsAnimated.tsx";

/**
 * @titleBy cardTitle
 */
interface ProblemCard {
  /**
   * @title Ícone
   * @description Nome do ícone Material Symbols (sentiment_stressed, sentiment_frustrated, etc)
   */
  icon?: string;
  /**
   * @title Título do Card
   * @description Título em vermelho do card
   */
  cardTitle?: string;
  /**
   * @title Texto de Contexto - Início
   * @description Texto antes da parte em negrito
   */
  contextBefore?: string;
  /**
   * @title Texto de Contexto - Negrito
   * @description Parte do texto que será destacada em negrito
   */
  contextBold?: string;
  /**
   * @title Texto de Contexto - Fim
   * @description Texto após a parte em negrito
   */
  contextAfter?: string;
  /**
   * @title Descrição
   * @description Parágrafo menor de descrição
   */
  description?: string;
}

export interface Props {
  /**
   * @title Primeira Linha do Título
   * @description Texto da primeira linha (ex: "The problem:")
   */
  titleLine1?: string;
  /**
   * @title Segunda Linha - Início
   * @description Início da segunda linha (ex: "How AI adoption")
   */
  titleLine2Start?: string;
  /**
   * @title Segunda Linha - Destaque
   * @description Parte destacada em vermelho (ex: "stalls in real companies")
   */
  titleLine2Highlight?: string;
  /**
   * @title Card 1
   * @description Configuração do primeiro card
   */
  card1?: ProblemCard;
  /**
   * @title Card 2
   * @description Configuração do segundo card
   */
  card2?: ProblemCard;
  /**
   * @title Conclusão - Início
   * @description Primeira parte da conclusão (em preto)
   */
  conclusionStart?: string;
  /**
   * @title Conclusão - Fim
   * @description Segunda parte da conclusão (em cinza)
   */
  conclusionEnd?: string;
}

export default function ProblemCards({
  titleLine1 = "The problem:",
  titleLine2Start = "How AI adoption ",
  titleLine2Highlight = "stalls in real companies",
  card1 = {
    icon: "sentiment_stressed",
    cardTitle: "Build AI Platform from scratch, results never come",
    contextBefore: "You start by ",
    contextBold: "centralizing everything",
    contextAfter: " into an internal AI platform.",
    description:
      "Governance is strong, but delivery slows to a crawl: months of platform work, little production impact, and the business keeps running on manual processes.",
  },
  card2 = {
    icon: "sentiment_frustrated",
    cardTitle: "A dozen tools later, nobody trusts the outputs",
    contextBefore: "Every team ",
    contextBold: "adopts their own agents",
    contextAfter: ", SaaS copilots, and MCP servers.",
    description:
      "Progress is fast, until it isn't: shadow AI spreads, credentials sprawl, no audit trail, no cost attribution, and the platform team can't standardize or support what's in production.",
  },
  conclusionStart = "Either way, the outcome is the same: you get activity, not impact. ",
  conclusionEnd = "AI initiatives don't compound into real business results.",
}: Props) {
  const sectionId = `problem-cards-${Math.random().toString(36).substr(2, 9)}`;

  const cards = [card1, card2];

  return (
    <section id={sectionId} class="w-full bg-[#f9f9f9] py-16 md:py-20 lg:py-24">
      <div class="w-full max-w-[1368px] mx-auto px-4 md:px-8 lg:px-[156px]">
        {/* Header */}
        <div class="flex flex-col items-center mb-6 md:mb-8 animate-on-scroll opacity-0 translate-y-4">
          <div class="font-mono text-dc-500 text-sm sm:text-base uppercase leading-5 mb-4">
            {titleLine1}
          </div>
          <h2 class="text-center max-w-[992px]">
            <span class="block text-stone-800 text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium leading-none tracking-[-0.03em]">
              {titleLine2Start}
              <span class="text-red-500">{titleLine2Highlight}</span>
            </span>
          </h2>
        </div>

        {/* Animated Cards (Island) */}
        <ProblemCardsAnimated cards={cards} />

        {/* Conclusion */}
        <div class="flex justify-center mt-6 md:mt-8 animate-on-scroll opacity-0 translate-y-4" style={{ transitionDelay: "240ms" }}>
          <p class="text-center text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-medium leading-[1.2] tracking-[-0.03em] max-w-[926px] px-4">
            <span class="text-stone-800">{conclusionStart}</span>
            <span class="text-stone-500">{conclusionEnd}</span>
          </p>
        </div>
      </div>

      {/* Entry Animation Script for header and conclusion */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const elements = section.querySelectorAll(".animate-on-scroll");

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                    observer.unobserve(el);
                  }
                });
              },
              { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
            );

            elements.forEach((el) => {
              const element = el as HTMLElement;
              element.style.transition =
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
              observer.observe(el);
            });
          }, sectionId),
        }}
      />
    </section>
  );
}
