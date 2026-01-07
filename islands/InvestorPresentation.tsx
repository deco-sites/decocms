import { useEffect, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";

/**
 * @titleBy title
 */
interface BulletPoint {
  text: string;
  highlight?: boolean;
}

/**
 * @titleBy title
 */
interface SlideItem {
  title?: string;
  subtitle?: string;
  bullets?: BulletPoint[];
  value?: string;
  label?: string;
}

/**
 * @titleBy title
 */
export interface Slide {
  /** @title Título do Slide */
  title: string;

  /** @title Subtítulo */
  subtitle?: string;

  /** @title Layout do Slide */
  layout: "title" | "content" | "two-column" | "stats" | "timeline" | "list";

  /** @title Cor de Fundo */
  backgroundColor?:
    | "primary-light"
    | "primary-dark"
    | "purple-light"
    | "purple-dark"
    | "yellow-light"
    | "dc-950"
    | "dc-900"
    | "dc-50"
    | "white";

  /** @title Cor do Texto */
  textColor?: "dark" | "light";

  /** @title Items do Slide */
  items?: SlideItem[];

  /** @title Imagem de Fundo */
  backgroundImage?: ImageWidget;

  /** @title Número do Slide (ex: "01") */
  slideNumber?: string;

  /** @title Tag/Badge */
  tag?: string;
}

export interface Props {
  /** @title Título da Apresentação */
  presentationTitle?: string;

  /** @title Subtítulo */
  presentationSubtitle?: string;

  /** @title Logo */
  logo?: ImageWidget;

  /** @title Slides */
  slides?: Slide[];
}

const bgColorMap: Record<string, string> = {
  "primary-light": "bg-primary-light",
  "primary-dark": "bg-primary-dark",
  "purple-light": "bg-purple-light",
  "purple-dark": "bg-purple-dark",
  "yellow-light": "bg-yellow-light",
  "dc-950": "bg-dc-950",
  "dc-900": "bg-dc-900",
  "dc-50": "bg-dc-50",
  "white": "bg-white",
};

export default function InvestorPresentation({
  presentationTitle,
  presentationSubtitle,
  logo,
  slides = [],
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapRef = useRef<any>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Calculate total slides (including title slide)
  const totalSlides = slides.length + 1;

  // Detect mobile and orientation
  useEffect(() => {
    const checkOrientation = () => {
      const isMobileDevice = globalThis.innerWidth <= 1024 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      setIsMobile(isMobileDevice);

      if (isMobileDevice) {
        setIsPortrait(globalThis.innerHeight > globalThis.innerWidth);
      } else {
        setIsPortrait(false);
      }
    };

    checkOrientation();
    globalThis.addEventListener("resize", checkOrientation);
    globalThis.addEventListener("orientationchange", checkOrientation);

    return () => {
      globalThis.removeEventListener("resize", checkOrientation);
      globalThis.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  useEffect(() => {
    const loadGSAP = async () => {
      // @ts-ignore - Dynamic import for GSAP
      const gsap = (await import("gsap")).default;
      gsapRef.current = gsap;

      // Initial animation for the first slide
      animateSlideIn(0, gsap);
    };

    loadGSAP();
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToPrevSlide();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isAnimating]);

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStartRef.current.x;
    const deltaY = touchEnd.y - touchStartRef.current.y;

    // Only trigger if horizontal swipe is dominant and significant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }

    touchStartRef.current = null;
  };

  const animateSlideIn = (slideIndex: number, gsap: any) => {
    const slideElement = slideRefs.current[slideIndex];
    if (!slideElement || !gsap) return;

    // Animate all child elements with stagger
    const elements = slideElement.querySelectorAll(".animate-item");
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
    );
  };

  const animateSlideOut = (slideIndex: number, gsap: any): Promise<void> => {
    return new Promise((resolve) => {
      const slideElement = slideRefs.current[slideIndex];
      if (!slideElement || !gsap) {
        resolve();
        return;
      }

      const elements = slideElement.querySelectorAll(".animate-item");
      gsap.to(elements, {
        y: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: resolve,
      });
    });
  };

  const goToNextSlide = async () => {
    if (isAnimating || currentSlide >= totalSlides - 1) return;

    setIsAnimating(true);
    const gsap = gsapRef.current;

    await animateSlideOut(currentSlide, gsap);
    setCurrentSlide((prev) => prev + 1);

    setTimeout(() => {
      animateSlideIn(currentSlide + 1, gsap);
      setIsAnimating(false);
    }, 100);
  };

  const goToPrevSlide = async () => {
    if (isAnimating || currentSlide <= 0) return;

    setIsAnimating(true);
    const gsap = gsapRef.current;

    await animateSlideOut(currentSlide, gsap);
    setCurrentSlide((prev) => prev - 1);

    setTimeout(() => {
      animateSlideIn(currentSlide - 1, gsap);
      setIsAnimating(false);
    }, 100);
  };

  const goToSlide = async (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    const gsap = gsapRef.current;

    await animateSlideOut(currentSlide, gsap);
    setCurrentSlide(index);

    setTimeout(() => {
      animateSlideIn(index, gsap);
      setIsAnimating(false);
    }, 100);
  };

  // Render individual slide content based on layout
  const renderSlideContent = (slide: Slide, index: number) => {
    const bgClass = bgColorMap[slide.backgroundColor || "dc-950"];
    const textColorClass = slide.textColor === "light"
      ? "text-white"
      : "text-dc-900";

    switch (slide.layout) {
      case "title":
        return (
          <div
            class={`w-full h-full flex flex-col items-center justify-center ${bgClass} ${textColorClass} p-8 lg:p-16`}
          >
            {slide.tag && (
              <span class="animate-item text-sm lg:text-base font-mono uppercase tracking-widest mb-4 lg:mb-8 opacity-60">
                {slide.tag}
              </span>
            )}
            <h1 class="animate-item text-4xl sm:text-5xl lg:text-7xl font-medium text-center leading-tight tracking-tight max-w-4xl">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p class="animate-item text-lg lg:text-2xl mt-6 lg:mt-8 opacity-70 text-center max-w-2xl">
                {slide.subtitle}
              </p>
            )}
          </div>
        );

      case "content":
        return (
          <div
            class={`w-full h-full flex flex-col ${bgClass} ${textColorClass} p-8 lg:p-16`}
          >
            <div class="flex items-center gap-4 mb-8 lg:mb-12">
              {slide.slideNumber && (
                <span class="animate-item text-6xl lg:text-8xl font-mono opacity-20">
                  {slide.slideNumber}
                </span>
              )}
              <div>
                {slide.tag && (
                  <span class="animate-item text-xs lg:text-sm font-mono uppercase tracking-widest opacity-60 block mb-2">
                    {slide.tag}
                  </span>
                )}
                <h2 class="animate-item text-3xl lg:text-5xl font-medium leading-tight tracking-tight">
                  {slide.title}
                </h2>
              </div>
            </div>
            {slide.items && (
              <div class="flex-1 flex flex-col gap-4 lg:gap-6">
                {slide.items.map((item, i) => (
                  <div key={i} class="animate-item">
                    {item.title && (
                      <h3 class="text-xl lg:text-2xl font-medium mb-2">
                        {item.title}
                      </h3>
                    )}
                    {item.bullets && (
                      <ul class="space-y-2 lg:space-y-3">
                        {item.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            class={`flex items-start gap-3 text-base lg:text-xl ${
                              bullet.highlight
                                ? "text-primary-light font-medium"
                                : "opacity-80"
                            }`}
                          >
                            <span class="text-primary-light mt-1.5">•</span>
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "two-column":
        return (
          <div
            class={`w-full h-full flex flex-col ${bgClass} ${textColorClass} p-8 lg:p-16`}
          >
            <div class="mb-8 lg:mb-12">
              {slide.tag && (
                <span class="animate-item text-xs lg:text-sm font-mono uppercase tracking-widest opacity-60 block mb-2">
                  {slide.tag}
                </span>
              )}
              <h2 class="animate-item text-3xl lg:text-5xl font-medium leading-tight tracking-tight">
                {slide.title}
              </h2>
            </div>
            {slide.items && (
              <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                {slide.items.map((item, i) => (
                  <div key={i} class="animate-item">
                    {item.title && (
                      <h3 class="text-xl lg:text-2xl font-medium mb-3 text-primary-light">
                        {item.title}
                      </h3>
                    )}
                    {item.bullets && (
                      <ul class="space-y-2">
                        {item.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            class={`text-sm lg:text-lg ${
                              bullet.highlight
                                ? "text-primary-light font-medium"
                                : "opacity-70"
                            }`}
                          >
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "stats":
        return (
          <div
            class={`w-full h-full flex flex-col ${bgClass} ${textColorClass} p-8 lg:p-16`}
          >
            <div class="mb-8 lg:mb-12">
              {slide.tag && (
                <span class="animate-item text-xs lg:text-sm font-mono uppercase tracking-widest opacity-60 block mb-2">
                  {slide.tag}
                </span>
              )}
              <h2 class="animate-item text-3xl lg:text-5xl font-medium leading-tight tracking-tight">
                {slide.title}
              </h2>
            </div>
            {slide.items && (
              <div class="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
                {slide.items.map((item, i) => (
                  <div key={i} class="animate-item text-center lg:text-left">
                    {item.value && (
                      <span class="block text-4xl lg:text-6xl font-bold text-primary-light mb-2">
                        {item.value}
                      </span>
                    )}
                    {item.label && (
                      <span class="text-sm lg:text-lg opacity-70">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "timeline":
        return (
          <div
            class={`w-full h-full flex flex-col ${bgClass} ${textColorClass} p-8 lg:p-16`}
          >
            <div class="mb-8 lg:mb-12">
              {slide.tag && (
                <span class="animate-item text-xs lg:text-sm font-mono uppercase tracking-widest opacity-60 block mb-2">
                  {slide.tag}
                </span>
              )}
              <h2 class="animate-item text-3xl lg:text-5xl font-medium leading-tight tracking-tight">
                {slide.title}
              </h2>
            </div>
            {slide.items && (
              <div class="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch">
                {slide.items.map((item, i) => (
                  <div
                    key={i}
                    class="animate-item flex-1 relative flex flex-col"
                  >
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-3 h-3 rounded-full bg-primary-light flex-shrink-0">
                      </div>
                      {i < slide.items!.length - 1 && (
                        <div class="hidden lg:block flex-1 h-px bg-primary-light/30">
                        </div>
                      )}
                    </div>
                    <div class="pl-6 lg:pr-6">
                      {item.title && (
                        <h3 class="text-lg lg:text-xl font-medium text-primary-light mb-2">
                          {item.title}
                        </h3>
                      )}
                      {item.bullets && (
                        <ul class="space-y-1">
                          {item.bullets.map((bullet, j) => (
                            <li
                              key={j}
                              class="text-xs lg:text-sm opacity-70"
                            >
                              {bullet.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "list":
        return (
          <div
            class={`w-full h-full flex flex-col ${bgClass} ${textColorClass} p-8 lg:p-16`}
          >
            <div class="mb-8 lg:mb-12">
              {slide.slideNumber && (
                <span class="animate-item text-6xl lg:text-8xl font-mono opacity-20 block mb-4">
                  {slide.slideNumber}
                </span>
              )}
              {slide.tag && (
                <span class="animate-item text-xs lg:text-sm font-mono uppercase tracking-widest opacity-60 block mb-2">
                  {slide.tag}
                </span>
              )}
              <h2 class="animate-item text-3xl lg:text-5xl font-medium leading-tight tracking-tight">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p class="animate-item text-lg lg:text-xl mt-4 opacity-70 max-w-3xl">
                  {slide.subtitle}
                </p>
              )}
            </div>
            {slide.items && (
              <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 lg:gap-y-6">
                {slide.items.map((item, i) => (
                  <div
                    key={i}
                    class="animate-item flex items-start gap-3 lg:gap-4"
                  >
                    <div class="w-2 h-2 rounded-full bg-primary-light mt-2 flex-shrink-0">
                    </div>
                    <div>
                      {item.title && (
                        <span class="text-base lg:text-xl font-medium">
                          {item.title}
                        </span>
                      )}
                      {item.subtitle && (
                        <span class="text-sm lg:text-base opacity-60 block">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div
            class={`w-full h-full flex items-center justify-center ${bgClass} ${textColorClass}`}
          >
            <h2 class="animate-item text-4xl lg:text-6xl font-medium">
              {slide.title}
            </h2>
          </div>
        );
    }
  };

  // Portrait mode overlay for mobile
  if (isMobile && isPortrait) {
    return (
      <div class="fixed inset-0 w-screen h-screen bg-dc-950 flex flex-col items-center justify-center p-8 z-50">
        <div class="animate-bounce mb-8">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            class="text-primary-light"
          >
            <path
              d="M16.5 2.25H7.5C6.25736 2.25 5.25 3.25736 5.25 4.5V19.5C5.25 20.7426 6.25736 21.75 7.5 21.75H16.5C17.7426 21.75 18.75 20.7426 18.75 19.5V4.5C18.75 3.25736 17.7426 2.25 16.5 2.25Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 18.75H12.0075"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="relative mb-6">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            class="text-primary-light animate-spin"
            style={{ animationDuration: "2s" }}
          >
            <path
              d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M20 12L17 9M20 12L23 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="text-white text-2xl font-medium text-center mb-4">
          Rotate your device
        </h2>
        <p class="text-dc-400 text-center text-base max-w-xs">
          This presentation is optimized for landscape mode. Please rotate your
          device to continue.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      class="fixed inset-0 w-screen h-screen bg-dc-950 overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect ratio container for 16:9 */}
      <div class="absolute inset-0 flex items-center justify-center">
        <div
          class="relative w-full h-full"
          style={{
            maxWidth: "min(100vw, calc(100vh * 16 / 9))",
            maxHeight: "min(100vh, calc(100vw * 9 / 16))",
            aspectRatio: "16/9",
          }}
        >
          {/* Title Slide */}
          <div
            ref={(el) => {
              slideRefs.current[0] = el;
            }}
            class={`absolute inset-0 transition-opacity duration-300 ${
              currentSlide === 0
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div class="w-full h-full flex flex-col items-center justify-center bg-dc-950 text-white p-8 lg:p-16">
              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  class="animate-item w-16 h-16 lg:w-24 lg:h-24 mb-8 lg:mb-12"
                />
              )}
              <h1 class="animate-item text-4xl sm:text-5xl lg:text-7xl font-medium text-center leading-tight tracking-tight max-w-4xl">
                {presentationTitle}
              </h1>
              {presentationSubtitle && (
                <p class="animate-item text-lg lg:text-2xl mt-6 lg:mt-8 text-dc-400 text-center max-w-2xl">
                  {presentationSubtitle}
                </p>
              )}
              <div class="animate-item mt-12 lg:mt-16 flex items-center gap-2 text-dc-500">
                <span class="text-sm lg:text-base">
                  {isMobile ? "Swipe or tap arrows to navigate" : "Press arrow keys to navigate"}
                </span>
                <Icon name="arrow_forward" size="small" class="text-dc-500" />
              </div>
            </div>
          </div>

          {/* Content Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={(el) => {
                slideRefs.current[index + 1] = el;
              }}
              class={`absolute inset-0 transition-opacity duration-300 ${
                currentSlide === index + 1
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {renderSlideContent(slide, index)}
            </div>
          ))}

          {/* Navigation Controls */}
          <div class="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 flex items-center gap-3 z-50">
            {/* Slide indicator */}
            <span class="text-dc-400 text-sm font-mono mr-4">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(totalSlides).padStart(2, "0")}
            </span>

            {/* Previous button */}
            <button
              type="button"
              onClick={goToPrevSlide}
              disabled={currentSlide === 0 || isAnimating}
              class={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all ${
                currentSlide === 0
                  ? "bg-dc-800 text-dc-600 cursor-not-allowed"
                  : "bg-dc-800 hover:bg-dc-700 text-white cursor-pointer"
              }`}
            >
              <Icon name="arrow_back" size="small" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={goToNextSlide}
              disabled={currentSlide === totalSlides - 1 || isAnimating}
              class={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all ${
                currentSlide === totalSlides - 1
                  ? "bg-dc-800 text-dc-600 cursor-not-allowed"
                  : "bg-primary-light hover:bg-primary-light/90 text-primary-dark cursor-pointer"
              }`}
            >
              <Icon name="arrow_forward" size="small" />
            </button>
          </div>

          {/* Slide dots navigation */}
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                class={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-primary-light w-6"
                    : "bg-dc-600 hover:bg-dc-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

