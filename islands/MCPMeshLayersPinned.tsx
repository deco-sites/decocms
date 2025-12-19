import { useEffect, useRef } from "preact/hooks";

interface LayerContent {
  label: string;
  title: string;
  highlightedSubtitle: {
    before: string;
    highlighted: string;
    after: string;
  };
  description: string;
  linkText: string;
  linkHref: string;
}

interface Props {
  layer1Image: string;
  layer2Image: string;
  layer3Image: string;
  contents: LayerContent[];
  title: string;
  subtitle: string;
}

export default function MCPMeshLayersPinned({
  layer1Image,
  layer2Image,
  layer3Image,
  contents,
  title,
  subtitle,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLImageElement>(null);
  const layer2Ref = useRef<HTMLImageElement>(null);
  const layer3Ref = useRef<HTMLImageElement>(null);
  const progressDotsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const gsapRef = useRef<typeof import("gsap").default | null>(null);
  const navigateToIndexRef = useRef<((index: number) => void) | null>(null);

  // ASCII Dithering Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationRef: number;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    globalThis.addEventListener("resize", resizeCanvas);

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

    let time = 0;
    const cellSize = 3; // 1.5x larger scale (was 2)

    const animate = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        resizeCanvas();
        animationRef = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y += cellSize) {
        for (let x = 0; x < canvas.width; x += cellSize) {
          const nx = x / canvas.width;
          const ny = y / canvas.height;

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
          // Dark green color for the particles - #07401a
          if (ditherResult) {
            for (let dy = 0; dy < cellSize && y + dy < canvas.height; dy++) {
              for (let dx = 0; dx < cellSize && x + dx < canvas.width; dx++) {
                const pixelIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                data[pixelIndex] = 7;      // R
                data[pixelIndex + 1] = 64; // G
                data[pixelIndex + 2] = 26; // B
                data[pixelIndex + 3] = 25; // Alpha - ~10% opacity (very subtle texture)
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      time += 16;
      animationRef = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      globalThis.removeEventListener("resize", resizeCanvas);
      if (animationRef) {
        cancelAnimationFrame(animationRef);
      }
    };
  }, []);

  // GSAP ScrollTrigger Animation
  useEffect(() => {
    let scrollTriggerInstance: ReturnType<typeof import("gsap/ScrollTrigger").ScrollTrigger.create> | null = null;
    let gsapInstance: typeof import("gsap").default | null = null;

    const loadGSAP = async () => {
      // @ts-ignore - Dynamic import for GSAP
      gsapInstance = (await import("gsap")).default;
      // @ts-ignore - Dynamic import for ScrollTrigger
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      
      gsapInstance.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !containerRef.current || !gsapInstance) return;

      const gsap = gsapInstance;

      // Set initial states for layers - stacked with spacing
      if (layer1Ref.current) {
        gsap.set(layer1Ref.current, { opacity: 1 });
      }
      if (layer2Ref.current) {
        gsap.set(layer2Ref.current, { opacity: 0, yPercent: -20 });
      }
      if (layer3Ref.current) {
        gsap.set(layer3Ref.current, { opacity: 0, yPercent: -20 });
      }

      // Create ScrollTrigger for pinning THE ENTIRE SECTION
      // Extended to 350% to allow for hold zones
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Calculate which section we're in with HOLD ZONES
          // 0-15%: Section 1 active
          // 15-25%: HOLD (nothing changes)
          // 25-40%: Transition to Section 2 (layer 2 animates, text changes)
          // 40-50%: HOLD
          // 50-65%: Transition to Section 3 (layer 3 animates, text changes)
          // 65-100%: HOLD (final state)
          
          let newIndex: number;
          if (progress < 0.25) {
            newIndex = 0;
          } else if (progress < 0.50) {
            newIndex = 1;
          } else {
            newIndex = 2;
          }
          
          // Animate layers based on progress - FROM TOP TO BOTTOM with hold zones
          animateLayers(gsap, progress);
          
          // Update text content when index changes
          if (newIndex !== currentIndexRef.current && !isAnimatingRef.current) {
            currentIndexRef.current = newIndex;
            updateTextContent(gsap, newIndex);
            updateProgressDots(newIndex);
          }
        },
      });

      const updateProgressDots = (index: number) => {
        if (!progressDotsRef.current) return;
        const dots = progressDotsRef.current.querySelectorAll('[data-dot]');
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('bg-dc-800');
            dot.classList.remove('bg-dc-300');
          } else {
            dot.classList.remove('bg-dc-800');
            dot.classList.add('bg-dc-300');
          }
        });
      };

      // Store gsap instance for dot navigation
      gsapRef.current = gsap;

      const animateLayers = (gsap: typeof import("gsap").default, progress: number) => {
        // Layer 2 animation with hold zones:
        // Starts at 20%, completes at 35%, then holds
        // Before 20%: hidden (yPercent: -20, opacity: 0)
        // 20-35%: animating in (floating down into place)
        // After 35%: fully visible (yPercent: 0, opacity: 1)
        let layer2Progress = 0;
        if (progress < 0.20) {
          layer2Progress = 0;
        } else if (progress < 0.35) {
          layer2Progress = (progress - 0.20) / 0.15; // Animate over 15% of scroll
        } else {
          layer2Progress = 1;
        }

        // Layer 3 animation with hold zones:
        // Starts at 45%, completes at 60%, then holds
        let layer3Progress = 0;
        if (progress < 0.45) {
          layer3Progress = 0;
        } else if (progress < 0.60) {
          layer3Progress = (progress - 0.45) / 0.15; // Animate over 15% of scroll
        } else {
          layer3Progress = 1;
        }

        if (layer2Ref.current) {
          gsap.to(layer2Ref.current, {
            opacity: layer2Progress,
            yPercent: -20 * (1 - layer2Progress), // Animate from -20% to 0 (float down)
            duration: 0.1,
            ease: "none",
          });
        }

        if (layer3Ref.current) {
          gsap.to(layer3Ref.current, {
            opacity: layer3Progress,
            yPercent: -20 * (1 - layer3Progress), // Animate from -20% to 0 (float down)
            duration: 0.1,
            ease: "none",
          });
        }
      };

      const updateTextContent = (gsap: typeof import("gsap").default, index: number) => {
        if (!textContainerRef.current || !contents[index]) return;

        isAnimatingRef.current = true;
        const content = contents[index];
        const labelEl = textContainerRef.current.querySelector('[data-text="label"]');
        const titleEl = textContainerRef.current.querySelector('[data-text="title"]');
        const subtitleEl = textContainerRef.current.querySelector('[data-text="subtitle"]');
        const descEl = textContainerRef.current.querySelector('[data-text="description"]');
        const linkEl = textContainerRef.current.querySelector('[data-text="link"]') as HTMLAnchorElement;

        const elements = [labelEl, titleEl, subtitleEl, descEl, linkEl].filter(Boolean);

        // Animate out
        gsap.to(elements, {
          opacity: 0,
          y: -15,
          duration: 0.15,
          stagger: 0.02,
          ease: "power2.in",
          onComplete: () => {
            // Update content
            if (labelEl) labelEl.textContent = content.label;
            if (titleEl) titleEl.textContent = content.title;
            if (subtitleEl) {
              subtitleEl.innerHTML = `${content.highlightedSubtitle.before}<span class="text-[#8caa25]">${content.highlightedSubtitle.highlighted}</span>${content.highlightedSubtitle.after}`;
            }
            if (descEl) descEl.textContent = content.description;
            if (linkEl) {
              // Hide link on the last card (index 2)
              if (index === 2) {
                linkEl.style.display = 'none';
              } else {
                linkEl.style.display = 'inline-flex';
                linkEl.textContent = content.linkText;
                linkEl.href = content.linkHref;
              }
            }

            // Filter out hidden link from animation
            const visibleElements = elements.filter(el => {
              if (el === linkEl && index === 2) return false;
              return true;
            });

            // Animate in
            gsap.fromTo(visibleElements, 
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.2,
                stagger: 0.03,
                ease: "power2.out",
                onComplete: () => {
                  isAnimatingRef.current = false;
                },
              }
            );
          },
        });
      };

      // Navigation function for dot clicks
      const navigateToIndex = (targetIndex: number) => {
        if (isAnimatingRef.current || targetIndex === currentIndexRef.current) return;
        
        // Animate layers to target state
        const layer2TargetOpacity = targetIndex >= 1 ? 1 : 0;
        const layer2TargetY = targetIndex >= 1 ? 0 : -20;
        const layer3TargetOpacity = targetIndex >= 2 ? 1 : 0;
        const layer3TargetY = targetIndex >= 2 ? 0 : -20;

        if (layer2Ref.current) {
          gsap.to(layer2Ref.current, {
            opacity: layer2TargetOpacity,
            yPercent: layer2TargetY,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        if (layer3Ref.current) {
          gsap.to(layer3Ref.current, {
            opacity: layer3TargetOpacity,
            yPercent: layer3TargetY,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        // Update text and dots
        currentIndexRef.current = targetIndex;
        updateTextContent(gsap, targetIndex);
        updateProgressDots(targetIndex);
      };

      // Store navigation function for dot clicks
      navigateToIndexRef.current = navigateToIndex;
    };

    loadGSAP();

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [contents]);

  const initialContent = contents[0];

  return (
    <section
      ref={sectionRef}
      class="w-full min-h-screen bg-dc-50 py-16 md:py-20 lg:py-24"
    >
      <div class="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-full flex flex-col">
        {/* Header - stays with pinned section */}
        <div class="mb-10 lg:mb-14 text-center">
          <div class="font-mono text-dc-500 text-sm sm:text-base uppercase leading-5 mb-4">
            {title}
          </div>
          <h2 class="text-dc-800 text-4xl md:text-5xl lg:text-[56px] font-medium leading-none tracking-tight">
            {subtitle}
          </h2>
        </div>

        {/* Main Card Container */}
        <div
          ref={containerRef}
          class="bg-dc-100 rounded-xl overflow-hidden flex flex-col lg:flex-row p-2 flex-1"
          style={{ minHeight: "500px" }}
        >
          {/* Left Side - Text Content */}
          <div
            ref={textContainerRef}
            class="flex-1 flex flex-col gap-6 justify-center px-6 py-8 lg:px-16 xl:px-20 lg:py-8"
          >
            {/* Text Content */}
            <div class="flex flex-col gap-6">
              <p
                data-text="label"
                class="font-mono text-dc-500 text-xs uppercase tracking-wider"
              >
                {initialContent?.label || "1) FOUNDATION"}
              </p>
              
              <h3
                data-text="title"
                class="text-dc-800 text-3xl lg:text-[40px] font-medium leading-tight tracking-tight"
              >
                {initialContent?.title || "MCP Mesh"}
              </h3>
              
              <p
                data-text="subtitle"
                class="text-dc-500 text-xl lg:text-2xl leading-snug"
                dangerouslySetInnerHTML={{
                  __html: initialContent
                    ? `${initialContent.highlightedSubtitle.before}<span class="text-[#8caa25]">${initialContent.highlightedSubtitle.highlighted}</span>${initialContent.highlightedSubtitle.after}`
                    : 'A secure and <span class="text-[#8caa25]">complete control plane</span> to connect tools and data via MCP.',
                }}
              />
              
              <p
                data-text="description"
                class="text-dc-500 text-base lg:text-lg leading-relaxed"
              >
                {initialContent?.description || "Unify tool and model calls behind one endpoint, with policy enforcement, audit trails, and runtime strategies that optimize for cost, speed, and accuracy."}
              </p>

              <a
                data-text="link"
                href={initialContent?.linkHref || "#"}
                class="inline-flex items-center text-dc-900 font-medium transition-all duration-200 group mt-2 hover:text-[#8CAA25] hover:translate-x-1"
              >
                {initialContent?.linkText || "Learn about MCP Mesh"}
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Progress Dots - Clickable */}
              <div ref={progressDotsRef} class="flex items-center gap-2 mt-6">
                <button
                  type="button"
                  data-dot
                  onClick={() => navigateToIndexRef.current?.(0)}
                  class="w-2 h-2 rounded-full bg-dc-800 transition-all duration-300 hover:scale-125 cursor-pointer"
                  aria-label="Go to MCP Mesh"
                />
                <button
                  type="button"
                  data-dot
                  onClick={() => navigateToIndexRef.current?.(1)}
                  class="w-2 h-2 rounded-full bg-dc-300 transition-all duration-300 hover:scale-125 cursor-pointer"
                  aria-label="Go to MCP Studio"
                />
                <button
                  type="button"
                  data-dot
                  onClick={() => navigateToIndexRef.current?.(2)}
                  class="w-2 h-2 rounded-full bg-dc-300 transition-all duration-300 hover:scale-125 cursor-pointer"
                  aria-label="Go to MCP Apps + Store"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Illustration Area */}
          <div
            class="flex-1 bg-[#d0ec1a] rounded-2xl relative overflow-hidden flex items-center justify-center border border-dc-300"
            style={{ minHeight: "500px" }}
          >
            {/* ASCII Dithering Animation Background */}
            <canvas
              ref={canvasRef}
              class="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Layered Illustrations Container */}
            <div class="relative w-full h-full flex items-center justify-center p-4 z-10">
              {/* Layer 1 - Bottom (always visible first) */}
              <img
                ref={layer1Ref}
                src={layer1Image}
                alt="Layer 1 - MCP Mesh"
                class="absolute w-[85%] max-w-[500px] h-auto"
                style={{
                  zIndex: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translateY(30px)",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
                }}
              />
              
              {/* Layer 2 - Middle (stacks on top with spacing) */}
              <img
                ref={layer2Ref}
                src={layer2Image}
                alt="Layer 2 - MCP Studio"
                class="absolute w-[85%] max-w-[500px] h-auto"
                style={{
                  zIndex: 2,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.12))",
                }}
              />
              
              {/* Layer 3 - Top (stacks on top of all with spacing) */}
              <img
                ref={layer3Ref}
                src={layer3Image}
                alt="Layer 3 - MCP Store"
                class="absolute w-[85%] max-w-[500px] h-auto"
                style={{
                  zIndex: 3,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) translateY(-30px)",
                  filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.1))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
