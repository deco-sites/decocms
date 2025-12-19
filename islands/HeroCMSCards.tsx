import { useEffect, useRef } from "preact/hooks";

export interface Card {
  badge: string;
  title: string;
  buttonText: string;
  buttonLink?: string;
}

export interface Props {
  cards: Card[];
}

export default function HeroCMSCards({ cards }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Only apply entrance animation on desktop (lg+)
    const isDesktop = globalThis.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) {
      const cardElements = container.querySelectorAll(".hero-card");
      cardElements.forEach((card, index) => {
        const element = card as HTMLElement;
        element.style.opacity = "0";
        element.style.transform = "translateY(50px)";

        setTimeout(() => {
          element.style.transition =
            "opacity 0.6s ease-out, transform 0.6s ease-out";
          element.style.opacity = "1";
          element.style.transform = "translateY(10px)";
        }, 200 + index * 200);
      });
    }

    // Setup ASCII animation for each card on hover
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

    canvases.forEach((canvas) => {
      const cvs = canvas as HTMLCanvasElement;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;

      const cardElement = cvs.closest(".hero-card-inner");
      if (!cardElement) return;

      let time = 0;
      const cellSize = 2;
      let isHovering = false;

      const resizeCanvas = () => {
        const rect = cvs.getBoundingClientRect();
        cvs.width = rect.width;
        cvs.height = rect.height;
      };

      const animate = () => {
        if (!isHovering) {
          animations.delete(cvs);
          return;
        }

        if (cvs.width === 0 || cvs.height === 0) {
          resizeCanvas();
        }

        ctx.clearRect(0, 0, cvs.width, cvs.height);

        const imageData = ctx.createImageData(cvs.width, cvs.height);
        const data = imageData.data;

        for (let y = 0; y < cvs.height; y += cellSize) {
          for (let x = 0; x < cvs.width; x += cellSize) {
            const nx = x / cvs.width;
            const ny = y / cvs.height;

            // Wave patterns - fast and lively
            const waveBase = Math.sin(nx * 10 + time * 0.006) * 0.25;
            const waveSecond = Math.cos(ny * 12 + time * 0.005) * 0.2;
            const waveThird = Math.sin((nx + ny) * 8 + time * 0.004) * 0.15;
            const waveFourth = Math.cos((nx - ny) * 6 + time * 0.003) * 0.1;

            // Pulsing effect
            const pulse = Math.sin(time * 0.008) * 0.1;

            // Moving diagonal stripes
            const stripes = Math.sin((nx * 15 + ny * 15) + time * 0.007) * 0.15;

            let intensity = 0.5 + waveBase + waveSecond + waveThird + waveFourth + pulse + stripes;

            const noise = (Math.random() - 0.5) * 0.1;
            intensity += noise;

            intensity = Math.max(0, Math.min(1, intensity));

            const matrixX = Math.floor(x / cellSize) % 8;
            const matrixY = Math.floor(y / cellSize) % 8;
            const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

            const ditherResult = intensity > threshold;
            // #8CAA25 = rgb(140, 170, 37) - the accent green
            // Transparent where no particle, visible green where particle
            if (ditherResult) {
              for (let dy = 0; dy < cellSize && y + dy < cvs.height; dy++) {
                for (let dx = 0; dx < cellSize && x + dx < cvs.width; dx++) {
                  const pixelIndex = ((y + dy) * cvs.width + (x + dx)) * 4;
                  data[pixelIndex] = 140;     // R
                  data[pixelIndex + 1] = 170; // G
                  data[pixelIndex + 2] = 37;  // B
                  data[pixelIndex + 3] = 120; // Alpha - visible but not solid
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

      const startAnimation = () => {
        isHovering = true;
        resizeCanvas();
        if (!animations.has(cvs)) {
          animate();
        }
      };

      const stopAnimation = () => {
        isHovering = false;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        const animId = animations.get(cvs);
        if (animId) {
          cancelAnimationFrame(animId);
          animations.delete(cvs);
        }
      };

      cardElement.addEventListener("mouseenter", startAnimation);
      cardElement.addEventListener("mouseleave", stopAnimation);
    });

    return () => {
      animations.forEach((animId) => cancelAnimationFrame(animId));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      class="flex gap-3 items-start flex-col md:flex-row"
    >
      {cards.map((card, index) => (
        <a
          key={index}
          href={card.buttonLink || "#"}
          class="hero-card cursor-pointer group lg:translate-y-[10px]"
        >
          {/* Card - responsive sizing */}
          <div
            class="
              hero-card-inner
              relative
              bg-dc-50 
              group-hover:bg-primary-light 
              flex flex-col 
              gap-4 lg:gap-6 xl:gap-8 
              h-auto lg:h-[240px] xl:h-[280px] 2xl:h-[340px]
              items-center overflow-hidden
              p-6 lg:pt-8 lg:px-8
              lg:pb-14 xl:pb-18 2xl:pb-24
              rounded-[14px] 
              w-[320px] lg:w-[360px] xl:w-[400px] 2xl:w-[480px]
              max-w-[85vw] 
              transition-all duration-300 ease-out
              lg:group-hover:-translate-y-4
              lg:group-hover:shadow-[0_-10px_40px_-12px_rgba(140,170,37,0.3)]
              transform-gpu
            "
          >
            {/* ASCII Animation Canvas - shows on hover at 50% opacity */}
            <canvas
              class="card-ascii-canvas absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Card Content - above the canvas */}
            <div class="flex flex-col gap-1 items-center w-full relative z-10">
              {/* Badge */}
              <span
                class="
                  font-sans font-medium text-[11px] lg:text-[12px] text-dc-500 
                  group-hover:text-[#8caa25]
                  whitespace-nowrap tracking-[-0.24px] leading-[17px] 
                  transition-colors duration-300
                "
              >
                {card.badge}
              </span>
              {/* Title */}
              <h3
                class="
                  font-sans font-medium 
                  text-[28px] lg:text-[36px] xl:text-[40px] 2xl:text-[48px]
                  text-dc-800
                  text-center tracking-[-0.8px] leading-[1.2] 
                  transition-colors duration-300
                "
              >
                {card.title}
              </h3>
            </div>

            {/* Button */}
            <div
              class="
                relative z-10
                bg-dc-200 
                group-hover:bg-[#f1fe9f]
                flex gap-2 items-center justify-center 
                px-3 lg:px-4 py-2.5 lg:py-3 
                rounded-xl 
                transition-all duration-300
              "
            >
              <span
                class="
                  font-sans font-medium text-xs lg:text-sm text-dc-900
                  group-hover:text-primary-dark
                  whitespace-nowrap leading-5 
                  transition-colors duration-300
                "
              >
                {card.buttonText}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
