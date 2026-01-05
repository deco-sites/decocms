import { useScript } from "@deco/deco/hooks";

/**
 * @titleBy title
 */
interface FeatureCard {
  /**
   * @title Ícone
   * @description Nome do ícone Material Symbols (ex: menu_book, account_tree, auto_awesome)
   */
  icon: string;
  /**
   * @title Título
   * @description Título do card
   */
  title: string;
  /**
   * @title Descrição
   * @description Descrição do card
   */
  description: string;
}

export interface Props {
  /**
   * @title Título da Seção
   * @description Título principal que aparece à esquerda
   */
  title: string;
  /**
   * @title Palavra Destacada
   * @description Palavra do título que será destacada em vermelho
   */
  highlightedWord: string;
  /**
   * @title Subtítulo
   * @description Texto descritivo abaixo do título
   */
  subtitle: string;
  /**
   * @title Cards de Funcionalidades
   * @description Lista de cards (máximo 3)
   * @maxItems 3
   * @minItems 1
   */
  cards: FeatureCard[];
}

function FeatureCardComponent({
  card,
  index,
}: {
  card: FeatureCard;
  index: number;
}) {
  const cardId = `feature-card-${index}-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div 
      id={cardId}
      class="feature-card group relative rounded-2xl p-6 md:p-8 flex flex-col gap-4 min-h-[200px] md:min-h-[240px] bg-dc-100 overflow-hidden transition-colors duration-300 hover:bg-red-500"
    >
      {/* Fire Animation Canvas - Bottom positioned */}
      <canvas
        id={`fire-canvas-${cardId}`}
        class="absolute bottom-0 left-0 w-full h-24 md:h-32 pointer-events-none z-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"
        style={{ imageRendering: "pixelated" }}
      />
      
      {/* Icon Container */}
      <div class="relative z-10 w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-sm transition-colors duration-300 group-hover:bg-dc-50">
        {/* Default icon - visible normally, hidden on hover */}
        <span
          class="material-symbols-rounded text-red-500 transition-opacity duration-300 group-hover:opacity-0 absolute"
          style={{
            fontSize: "24px",
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 40",
          }}
        >
          {card.icon}
        </span>
        {/* Skull icon - hidden normally, visible on hover */}
        <span
          class="material-symbols-rounded text-red-500 transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute"
          style={{
            fontSize: "24px",
            fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 40",
          }}
        >
          skull
        </span>
      </div>

      {/* Content - pushed to bottom */}
      <div class="relative z-10 mt-auto flex flex-col gap-2">
        <h3 class="text-lg md:text-xl font-semibold text-dc-900 transition-colors duration-300 group-hover:text-dc-50">
          {card.title}
        </h3>
        <p class="text-sm md:text-base leading-relaxed text-dc-500 transition-colors duration-300 group-hover:text-dc-50/90">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function FoundationFeatures({
  title,
  highlightedWord,
  subtitle,
  cards,
}: Props) {
  const sectionId = `foundation-features-${Math.random().toString(36).substr(2, 9)}`;

  // Split title to highlight the specified word
  const renderTitle = () => {
    if (!highlightedWord || !title?.includes(highlightedWord)) {
      return title;
    }
    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span class="text-red-500">{highlightedWord}</span>
        {parts[1] || ""}
      </>
    );
  };

  return (
    <section id={sectionId} class="w-full bg-dc-50 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div class="flex flex-col gap-4">
          {/* Top Row: Text (left) + First Card (right) */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Text Block - Top Left */}
            <div class="flex flex-col justify-start py-6 lg:py-8 lg:pr-8 text-block">
              <h2 class="text-dc-800 text-3xl sm:text-4xl lg:text-heading-lg font-medium mb-4 lg:mb-6">
                {renderTitle()}
              </h2>
              <p class="text-dc-500 text-base lg:text-xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* First Card - Top Right */}
            <FeatureCardComponent card={cards[0]} index={0} />
          </div>

          {/* Bottom Row: Two Cards */}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.slice(1, 3).map((card, index) => (
              <FeatureCardComponent
                card={card}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Material Icons - Rounded, Filled */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@40,400,1,0"
        rel="stylesheet"
      />

      {/* GSAP CDN */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        defer
      />
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        defer
      />

      {/* GSAP Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const initGSAP = () => {
              const gsap = (globalThis as unknown as { gsap?: typeof import("gsap").gsap }).gsap;
              const ScrollTrigger = (globalThis as unknown as { ScrollTrigger?: typeof import("gsap/ScrollTrigger").ScrollTrigger }).ScrollTrigger;

              if (!gsap || !ScrollTrigger) {
                // Fallback to CSS animations if GSAP not loaded
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
                  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
                );

                elements.forEach((el) => {
                  const element = el as HTMLElement;
                  element.style.transition =
                    "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
                  observer.observe(el);
                });
                return;
              }

              gsap.registerPlugin(ScrollTrigger);

              const section = document.getElementById(sectionId);
              if (!section) return;

              // Animate text content
              const textContent = section.querySelector(".text-block");
              if (textContent) {
                gsap.fromTo(
                  textContent,
                  { opacity: 0, y: 40 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: section,
                      start: "top 80%",
                      toggleActions: "play none none none",
                    },
                  },
                );
              }

              // Animate cards with stagger - same as title/subtitle
              const cards = section.querySelectorAll(".feature-card");
              gsap.fromTo(
                cards,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.12,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none",
                  },
                },
              );
            };

            // Wait for GSAP to load
            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", () => {
                setTimeout(initGSAP, 100);
              });
            } else {
              setTimeout(initGSAP, 100);
            }
          }, sectionId),
        }}
      />

      {/* Fire Animation Script for Cards */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            // Simplified Perlin-like noise
            function fade(t: number): number {
              return t * t * t * (t * (t * 6 - 15) + 10);
            }

            function lerp(a: number, b: number, t: number): number {
              return a + t * (b - a);
            }

            // Permutation table for noise
            const perm: number[] = [];
            for (let i = 0; i < 256; i++) perm[i] = i;
            for (let i = 255; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [perm[i], perm[j]] = [perm[j], perm[i]];
            }
            for (let i = 0; i < 256; i++) perm[256 + i] = perm[i];

            function grad(hash: number, x: number, y: number): number {
              const h = hash & 3;
              const u = h < 2 ? x : y;
              const v = h < 2 ? y : x;
              return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
            }

            function noise(x: number, y: number): number {
              const X = Math.floor(x) & 255;
              const Y = Math.floor(y) & 255;
              x -= Math.floor(x);
              y -= Math.floor(y);
              const u = fade(x);
              const v = fade(y);
              const A = perm[X] + Y;
              const B = perm[X + 1] + Y;
              return lerp(
                lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
                lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
                v
              );
            }

            // Fractal Brownian Motion
            function fbm(x: number, y: number, octaves: number = 4, persistence: number = 0.5): number {
              let value = 0;
              let amplitude = 1;
              let frequency = 1;
              let maxValue = 0;
              
              for (let i = 0; i < octaves; i++) {
                value += amplitude * Math.abs(noise(x * frequency, y * frequency));
                maxValue += amplitude;
                amplitude *= persistence;
                frequency *= 2;
              }
              
              return value / maxValue;
            }

            function initFireCanvas(canvasId: string) {
              const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
              if (!canvas) return null;

              const ctx = canvas.getContext("2d");
              if (!ctx) return null;

              let animationRef: number;

              const resizeCanvas = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
              };

              resizeCanvas();
              globalThis.addEventListener("resize", resizeCanvas);

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

              let time = 0;
              const cellSize = 2; // Smaller cells for more detail
              
              const animate = () => {
                if (canvas.width === 0 || canvas.height === 0) {
                  animationRef = requestAnimationFrame(animate);
                  return;
                }

                const imageData = ctx.createImageData(canvas.width, canvas.height);
                const data = imageData.data;

                for (let y = 0; y < canvas.height; y += cellSize) {
                  for (let x = 0; x < canvas.width; x += cellSize) {
                    const nx = x / canvas.width;
                    const ny = y / canvas.height;

                    // Multiple layers of turbulent noise for WIDE irregular flame edges
                    // Primary flame waves - wide, slow horizontal movement
                    const wave1 = fbm(nx * 2 + time * 0.5, time * 0.8, 4, 0.7) * 0.5;
                    const wave2 = fbm(nx * 3 - time * 0.4, time * 0.6 + 10, 3, 0.6) * 0.4;
                    const wave3 = fbm(nx * 4 + time * 0.3, time * 1.0 + 20, 2, 0.5) * 0.3;
                    
                    // Secondary turbulence - wider flickering
                    const flicker1 = fbm(nx * 6 - time * 1.2, ny * 2 + time * 1.0, 3, 0.65) * 0.25;
                    const flicker2 = fbm(nx * 8 + time * 0.8, ny * 3 - time * 1.4, 2, 0.55) * 0.2;
                    
                    // Combine all noise layers for wide irregular edge
                    const edgeOffset = (wave1 + wave2 + wave3 + flicker1 + flicker2) - 0.4;

                    // Vertical gradient - flames rise from bottom with turbulence
                    const verticalGradient = ny;
                    const adjustedGradient = verticalGradient + edgeOffset;
                    
                    // Sharper falloff for more defined flame tips
                    const edgeFade = Math.pow(Math.max(0, adjustedGradient), 1.1);

                    // Internal fire texture - wide, flowing patterns
                    const swirl1 = fbm(nx * 3 + Math.sin(time * 0.4) * 0.4, ny * 4 - time * 0.8, 4, 0.55);
                    const swirl2 = fbm(nx * 5 - Math.cos(time * 0.5) * 0.3, ny * 5 - time * 1.0 + 50, 3, 0.5) * 0.4;
                    const swirl3 = fbm(nx * 6 + time * 0.2, ny * 3 - time * 0.6 + 100, 2, 0.45) * 0.3;
                    
                    // Hot spots - wider random bright areas
                    const hotSpot = fbm(nx * 4 - time * 0.6, ny * 6 + time * 0.8, 2, 0.7) * 0.35;

                    const baseIntensity = edgeFade * 0.85;
                    let intensity = baseIntensity * (0.4 + swirl1 * 0.4 + swirl2 + swirl3 + hotSpot);
                    intensity = Math.max(0, Math.min(1, intensity));

                    const matrixX = Math.floor(x / cellSize) % 8;
                    const matrixY = Math.floor(y / cellSize) % 8;
                    const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                    const ditherResult = intensity > threshold;

                    // Fire colors - darker reds for bottom fire on red-500 background
                    let r: number, g: number, b: number;
                    
                    if (!ditherResult || intensity < 0.15) {
                      // red-500 (background)
                      r = 0xef; g = 0x44; b = 0x44;
                    } else if (intensity < 0.30) {
                      // red-600
                      r = 0xdc; g = 0x26; b = 0x26;
                    } else if (intensity < 0.45) {
                      // red-700
                      r = 0xb9; g = 0x1c; b = 0x1c;
                    } else if (intensity < 0.60) {
                      // red-800
                      r = 0x99; g = 0x1b; b = 0x1b;
                    } else if (intensity < 0.80) {
                      // red-900
                      r = 0x7f; g = 0x1d; b = 0x1d;
                    } else {
                      // red-950 (darkest core)
                      r = 0x45; g = 0x0a; b = 0x0a;
                    }

                    for (let dy = 0; dy < cellSize && y + dy < canvas.height; dy++) {
                      for (let dx = 0; dx < cellSize && x + dx < canvas.width; dx++) {
                        const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                        data[pixelIndex] = r;
                        data[pixelIndex + 1] = g;
                        data[pixelIndex + 2] = b;
                        data[pixelIndex + 3] = 255;
                      }
                    }
                  }
                }

                ctx.putImageData(imageData, 0, 0);
                time += 0.025; // Faster animation
                animationRef = requestAnimationFrame(animate);
              };

              animate();

              return () => {
                globalThis.removeEventListener("resize", resizeCanvas);
                if (animationRef) {
                  cancelAnimationFrame(animationRef);
                }
              };
            }

            // Initialize fire canvases for all feature cards
            const section = document.getElementById(sectionId);
            if (!section) return;

            const fireCanvases = section.querySelectorAll("canvas[id^='fire-canvas-feature-card']");
            const cleanups: (() => void)[] = [];

            fireCanvases.forEach((canvas) => {
              const cleanup = initFireCanvas(canvas.id);
              if (cleanup) cleanups.push(cleanup);
            });

            const cleanup = () => {
              cleanups.forEach((fn) => fn());
            };

            globalThis.addEventListener("beforeunload", cleanup);
          }, sectionId),
        }}
      />
    </section>
  );
}

export function Preview() {
  return (
    <FoundationFeatures
      title="MCP works—until context becomes the bottleneck."
      highlightedWord="bottleneck."
      subtitle="MCP is becoming the standard for agentic systems. Scaling to 10, 30, or 100 servers is where it breaks."
      cards={[
        {
          icon: "bomb",
          title: "Context bloat",
          description:
            "Tool definitions pile up, the model carries more than it can use, and you end up paying to restate schemas every run.",
        },
        {
          icon: "chat_error",
          title: "Accuracy drops",
          description:
            "With too many similar tools in context, selection gets noisy—more mistakes, more retries, more latency, and more cost.",
        },
        {
          icon: "policy_alert",
          title: "Governance fractures",
          description:
            "Access control and auditability drift across apps, observability gets patchy, and you lose a reliable answer to what ran, why, and what it cost.",
        },
      ]}
    />
  );
}

