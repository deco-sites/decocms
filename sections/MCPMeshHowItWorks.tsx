import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface Step {
  /**
   * @title Número do Passo
   * @description O número exibido no badge do passo
   */
  number: string;

  /**
   * @title Título do Passo
   * @description O título principal do passo
   */
  title: string;

  /**
   * @title Descrição do Passo
   * @description A descrição detalhada do passo
   */
  description: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description O título principal da seção "How it works"
   */
  title?: string;

  /**
   * @title Passos
   * @description Lista de passos que explicam como o produto funciona
   * @minItems 1
   * @maxItems 6
   */
  steps?: Step[];
}

const animateCards = () => {
  const loadGSAP = () => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => {
      const scrollTriggerScript = document.createElement("script");
      scrollTriggerScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      scrollTriggerScript.onload = initAnimation;
      document.head.appendChild(scrollTriggerScript);
    };
    document.head.appendChild(script);
  };

  const initAnimation = () => {
    // deno-lint-ignore no-explicit-any
    const gsap = (globalThis as any).gsap;
    // deno-lint-ignore no-explicit-any
    const ScrollTrigger = (globalThis as any).ScrollTrigger;

    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll("[data-how-it-works-card]");
    const title = document.querySelector("[data-how-it-works-title]");

    // Animate title
    if (title) {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // Animate cards with stagger
    cards.forEach((card: Element, idx: number) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: idx * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        },
      );
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadGSAP);
  } else {
    loadGSAP();
  }
};

export default function MCPMeshHowItWorks({
  title,
  steps,
}: Props) {
  return (
    <section class="w-full bg-dc-50">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-16 sm:py-20 lg:py-24 flex flex-col gap-12 lg:gap-16 items-center">
        {/* Title */}
        {title && (
          <h2
            data-how-it-works-title
            class="text-dc-800 text-3xl sm:text-4xl lg:text-5xl font-medium text-center tracking-tight opacity-0"
          >
            {title}
          </h2>
        )}

        {/* Steps Container */}
        {steps && steps.length > 0 && (
          <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {steps.map((step) => (
              <div
                data-how-it-works-card
                class="bg-dc-100 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 opacity-0"
              >
                {/* Number Badge */}
                <div class="bg-primary-light w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center">
                  <span class="text-primary-dark text-4xl sm:text-5xl font-medium leading-none tracking-tight">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 class="text-dc-800 text-2xl sm:text-3xl font-medium leading-tight tracking-tight">
                  {step.title}
                </h3>

                {/* Description */}
                <p class="text-dc-500 text-lg sm:text-xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GSAP Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(animateCards) }}
      />
    </section>
  );
}
