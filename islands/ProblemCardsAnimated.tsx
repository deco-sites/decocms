import { useEffect, useRef } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";

export interface ProblemCard {
  icon?: string;
  cardTitle?: string;
  contextBefore?: string;
  contextBold?: string;
  contextAfter?: string;
  description?: string;
}

export interface Props {
  cards: ProblemCard[];
}

export default function ProblemCardsAnimated({ cards }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Entry animations
    const cardElements = container.querySelectorAll(".problem-card");
    cardElements.forEach((card, index) => {
      const element = card as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";

      setTimeout(() => {
        element.style.transition =
          "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 100 + index * 100);
    });

    // Setup ASCII animation for each card
    const canvases = container.querySelectorAll(".card-ascii-canvas");
    const animations: Map<HTMLCanvasElement, number> = new Map();

    // Bayer matrix 8x8 for dithering
    const bayerMatrix8x8 = [
      [0, 32, 8, 40, 2, 34, 10, 42],
      [48, 16, 56, 24, 50, 18, 58, 26],
      [12, 44, 4, 36, 14, 46, 6, 38],
      [60, 28, 52, 20, 62, 30, 54, 22],
      [3, 35, 11, 43, 1, 33, 9, 41],
      [51, 19, 59, 27, 49, 17, 57, 25],
      [15, 47, 7, 39, 13, 45, 5, 37],
      [63, 31, 55, 23, 61, 29, 53, 21],
    ];

    canvases.forEach((canvas, cardIndex) => {
      const cvs = canvas as HTMLCanvasElement;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;

      let time = cardIndex * 500; // Offset for visual variety
      const cellSize = 3;

      const resizeCanvas = () => {
        const rect = cvs.getBoundingClientRect();
        cvs.width = rect.width;
        cvs.height = rect.height;
      };

      resizeCanvas();
      globalThis.addEventListener("resize", resizeCanvas);

      const animate = () => {
        if (cvs.width === 0 || cvs.height === 0) {
          resizeCanvas();
          const animId = requestAnimationFrame(animate);
          animations.set(cvs, animId);
          return;
        }

        ctx.clearRect(0, 0, cvs.width, cvs.height);

        const imageData = ctx.createImageData(cvs.width, cvs.height);
        const data = imageData.data;

        for (let y = 0; y < cvs.height; y += cellSize) {
          for (let x = 0; x < cvs.width; x += cellSize) {
            const nx = x / cvs.width;
            const ny = y / cvs.height;

            // Wave patterns - slower and more subtle
            const waveBase = Math.sin(nx * 8 + time * 0.003) * 0.2;
            const waveSecond = Math.cos(ny * 10 + time * 0.002) * 0.15;
            const waveThird = Math.sin((nx + ny) * 6 + time * 0.002) * 0.12;
            const waveFourth = Math.cos((nx - ny) * 5 + time * 0.0015) * 0.08;

            // Pulsing effect - subtle
            const pulse = Math.sin(time * 0.003) * 0.08;

            // Moving diagonal stripes - subtle
            const stripes = Math.sin((nx * 12 + ny * 12) + time * 0.003) * 0.1;

            let intensity = 0.5 + waveBase + waveSecond + waveThird + waveFourth + pulse + stripes;

            const noise = (Math.random() - 0.5) * 0.06;
            intensity += noise;

            intensity = Math.max(0, Math.min(1, intensity));

            const matrixX = Math.floor(x / cellSize) % 8;
            const matrixY = Math.floor(y / cellSize) % 8;
            const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

            const ditherResult = intensity > threshold;
            // Red-500 color: #ef4444 = rgb(239, 68, 68)
            if (ditherResult) {
              for (let dy = 0; dy < cellSize && y + dy < cvs.height; dy++) {
                for (let dx = 0; dx < cellSize && x + dx < cvs.width; dx++) {
                  const pixelIndex = ((y + dy) * cvs.width + (x + dx)) * 4;
                  data[pixelIndex] = 239;     // R
                  data[pixelIndex + 1] = 68;  // G
                  data[pixelIndex + 2] = 68;  // B
                  data[pixelIndex + 3] = 13;  // Alpha - 5% opacity (255 * 0.05)
                }
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        time += 16;
        const animId = requestAnimationFrame(animate);
        animations.set(cvs, animId);
      };

      animate();
    });

    return () => {
      animations.forEach((animId) => cancelAnimationFrame(animId));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[1056px] mx-auto"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          class="problem-card relative bg-stone-50 border border-red-100 rounded-xl overflow-hidden"
        >
          {/* ASCII Animation Canvas */}
          <canvas
            class="card-ascii-canvas absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ imageRendering: "pixelated" }}
          />

          {/* Card Content */}
          <div class="relative z-10 flex flex-col gap-5 md:gap-6 px-6 md:px-8 py-12 md:py-16">
            {/* Icon */}
            <div class="w-10 h-10 flex items-center justify-center">
              <Icon
                name={card.icon || "sentiment_stressed"}
                size="40"
                class="text-red-500"
              />
            </div>

            {/* Card Title */}
            <h3 class="text-red-500 text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-medium leading-none tracking-[0.07px]">
              {card.cardTitle}
            </h3>

            {/* Context Text */}
            <p class="text-stone-500 text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.2]">
              <span>{card.contextBefore}</span>
              <span class="font-bold text-stone-900">{card.contextBold}</span>
              <span>{card.contextAfter}</span>
            </p>

            {/* Description */}
            <p class="text-stone-500 text-sm sm:text-base md:text-lg leading-[1.5] tracking-[-0.44px]">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
