import { useEffect, useRef, useState } from "preact/hooks";

interface CardContent {
  backgroundColor: string;
  image: string;
  tag?: string;
  tagBackgroundColor?: string;
  tagTextColor?: string;
  title: string;
  subtitleBefore: string;
  subtitleHighlight: string;
  subtitleAfter: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
}

interface BulletPoint {
  label: string;
  targetIndex: number;
}

interface Props {
  title: string;
  subtitle: string;
  bulletPoints: BulletPoint[];
  cards: CardContent[];
}

// The sticky content offset from the top of the viewport
const STICKY_TOP_OFFSET = 160;

export default function BackboneScrollSection({
  title,
  subtitle,
  bulletPoints,
  cards,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyContentRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll to update active bullet point
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !rightSideRef.current) return;

      const cardElements = cardRefs.current.filter(Boolean);
      if (cardElements.length === 0) return;

      // Get the container's position relative to the viewport
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Only track when container is in view
      if (containerRect.bottom < 0 || containerRect.top > globalThis.innerHeight) return;

      // Calculate which card's top is closest to the sticky alignment point
      // This ensures top-to-top alignment between title and cards
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardElements.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        // Distance from card's top to the sticky alignment point
        const distance = Math.abs(rect.top - STICKY_TOP_OFFSET);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    globalThis.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle bullet point click to scroll to card
  // Positions the card's top to align with the sticky title's top
  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const scrollTop = globalThis.scrollY;
    // Scroll so the card's top aligns with the sticky content's top position
    const targetY = scrollTop + rect.top - STICKY_TOP_OFFSET;

    globalThis.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section class="w-full bg-dc-50">
      {/* Mobile Layout */}
      <div class="lg:hidden px-6 py-16 sm:py-20">
        {/* Centered Title & Subtitle */}
        <div class="text-center mb-12">
          <h2 class="text-dc-800 text-[32px] sm:text-[40px] font-medium leading-[1.1] tracking-[-0.02em] mb-6">
            {title}
          </h2>
          <p class="text-dc-500 text-lg sm:text-xl leading-[1.3] max-w-[540px] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Stacked Cards */}
        <div class="flex flex-col gap-12">
          {cards.map((card, index) => (
            <div key={index} class="flex flex-col gap-8">
              {/* Card Image */}
              <div
                class="rounded-2xl border border-dc-300 overflow-hidden aspect-[560/300] relative flex items-center justify-center"
                style={{ backgroundColor: card.backgroundColor }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div class="flex flex-col gap-4">
                <div class="flex items-center gap-3 flex-wrap">
                  <h3 class="text-dc-800 text-[28px] sm:text-[32px] font-medium leading-[1.2] tracking-[-0.02em]">
                    {card.title}
                  </h3>
                  {card.tag && (
                    <span
                      class={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${card.tagBackgroundColor || "primary-light"} text-${card.tagTextColor || "primary-dark"}`}
                    >
                      {card.tag}
                    </span>
                  )}
                </div>
                <p class="text-dc-500 text-lg sm:text-xl leading-[1.3]">
                  {card.subtitleBefore}
                  <span class="text-[#8caa25]">{card.subtitleHighlight}</span>
                  {card.subtitleAfter}
                </p>
                <p class="text-dc-500 text-base leading-[1.5]">
                  {card.description}
                </p>
                {card.linkText && card.linkUrl && (
                  <a
                    href={card.linkUrl}
                    class="inline-flex items-center gap-2 text-dc-900 text-sm font-medium hover:text-[#8caa25] transition-colors group mt-2"
                  >
                    {card.linkText}
                    <svg
                      class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout with Sticky Left */}
      <div
        ref={containerRef}
        class="hidden lg:flex max-w-[1440px] mx-auto px-16 py-40 gap-[88px]"
      >
        {/* Left Side - Container stretches to match right side height for proper sticky behavior */}
        <div class="flex-1 min-w-0 self-stretch">
          <div
            ref={stickyContentRef}
            class="sticky top-[160px] flex flex-col gap-14"
          >
            {/* Title */}
            <div class="flex flex-col gap-14">
              <h2 class="text-dc-800 text-[56px] font-medium leading-[1] tracking-[-0.03em]">
                {title}
              </h2>
              <p class="text-dc-500 text-[18px] leading-[27px]">
                {subtitle}
              </p>
            </div>

            {/* Bullet Points */}
            <div class="flex flex-col gap-4">
              {bulletPoints.map((bullet, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToCard(bullet.targetIndex)}
                  class={`text-left text-[18px] leading-[1.4] transition-colors duration-300 cursor-pointer hover:text-[#8caa25] ${
                    activeIndex === bullet.targetIndex
                      ? "text-[#8caa25]"
                      : "text-dc-500"
                  }`}
                >
                  {bullet.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Scrolling Cards */}
        <div ref={rightSideRef} class="w-[560px] flex-shrink-0 flex flex-col gap-16">
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              class="flex flex-col gap-4"
            >
              {/* Card Container */}
              <div class="flex flex-col gap-8">
                {/* Card Image */}
                <div
                  class="rounded-2xl border border-dc-300 overflow-hidden h-[300px] relative flex items-center justify-center"
                  style={{ backgroundColor: card.backgroundColor }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Card Content */}
                <div class="flex flex-col gap-6">
                  <div class="flex items-center gap-4">
                    <h3 class="text-dc-800 text-[40px] font-medium leading-[1.2] tracking-[-0.02em]">
                      {card.title}
                    </h3>
                    {card.tag && (
                      <span
                        class={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap bg-${card.tagBackgroundColor || "primary-light"} text-${card.tagTextColor || "primary-dark"}`}
                      >
                        {card.tag}
                      </span>
                    )}
                  </div>
                  <p class="text-dc-500 text-2xl leading-[1.2]">
                    {card.subtitleBefore}
                    <span class="text-[#8caa25]">{card.subtitleHighlight}</span>
                    {card.subtitleAfter}
                  </p>
                  <p class="text-dc-500 text-lg leading-[1.5]">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Link Button */}
              {card.linkText && card.linkUrl && (
                <a
                  href={card.linkUrl}
                  class="inline-flex items-center gap-2 text-dc-900 text-sm font-medium py-3 hover:text-[#8caa25] transition-colors group"
                >
                  {card.linkText}
                  <svg
                    class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

