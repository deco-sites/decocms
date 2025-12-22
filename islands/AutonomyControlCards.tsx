import { useEffect, useRef } from "preact/hooks";

interface CardData {
  title: string;
  descriptionBefore: string;
  descriptionHighlighted: string;
  descriptionAfter: string;
  image: string;
}

interface Props {
  cards: CardData[];
}

export default function AutonomyControlCards({ cards }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const loadGSAP = async () => {
      // @ts-ignore - Dynamic import for GSAP
      const gsap = (await import("gsap")).default;
      // @ts-ignore - Dynamic import for ScrollTrigger
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) return;

      const cardElements = cardsRef.current.filter(Boolean);

      // Set initial opacity to 0 for entrance animation
      gsap.set(cardElements, { opacity: 0, y: 60 });

      // Entrance animation - cards slide up and fade in with stagger
      gsap.to(cardElements, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    };

    loadGSAP();
  }, [cards]);

  return (
    <div ref={containerRef} class="w-full flex flex-col lg:flex-row gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          class="flex-1 bg-[#f0f4d8] rounded-2xl overflow-hidden flex flex-col"
        >
          {/* Card Content */}
          <div class="flex flex-col gap-4 md:gap-6 p-6 md:p-8 lg:p-10">
            <h3 class="text-dc-800 text-xl md:text-3xl lg:text-[40px] font-medium leading-tight tracking-tight">
              {card.title}
            </h3>
            <p class="text-dc-500 text-sm md:text-lg lg:text-2xl leading-snug max-w-[540px]">
              {card.descriptionBefore}
              <span class="font-bold text-[#8caa25]">
                {card.descriptionHighlighted}
              </span>
              {card.descriptionAfter}
            </p>
          </div>

          {/* Card Image - fills remaining space */}
          <div class="flex-1 min-h-[200px] md:min-h-[280px] lg:min-h-[320px] overflow-hidden rounded-b-2xl">
            <img
              src={card.image}
              alt={card.title}
              class="w-full h-full object-cover object-top drop-shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
