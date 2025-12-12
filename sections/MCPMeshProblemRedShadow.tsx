import { useScript } from "@deco/deco/hooks";

export interface Props {
  /**
   * @title Highlighted Quote
   * @description Main quote that appears on scroll
   */
  highlightedQuote?: string;
  /**
   * @title Description
   * @description Supporting description text
   */
  description?: string;
}

export default function MCPMeshProblemRedShadow({
  highlightedQuote = "The vast majority of proof of concepts die before reaching production.",
  description = "It's easy to make something work 80% of the time, but critical software needs to work 99.9% of the time, safely.",
}: Props) {
  const sectionId = `mcp-mesh-problem-red-shadow-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <section
      id={sectionId}
      class="w-full bg-dc-50 py-24 md:py-32 lg:py-40 relative overflow-hidden"
    >
      {/* Background Image - Red Shadow SVG */}
      <div
        id={`${sectionId}-background`}
        class="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center"
      >
        <img
          src="https://assets.decocache.com/decocms/6d0b14d9-127a-4c36-91a2-25f043d49a70/red_shadow.svg"
          alt="Background pattern"
          class="max-w-full max-h-full w-auto h-auto object-contain opacity-75"
        />
      </div>

      {/* Radial Opacity Overlay - darkens center area where text is */}
      <div
        id={`${sectionId}-radial-overlay`}
        class="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-out"
        style="opacity: 0;"
      >
        <div
          class="w-full h-full"
          style="background: radial-gradient(circle at center, rgba(250, 250, 249, 0.85) 0%, rgba(250, 250, 249, 0.5) 25%, rgba(250, 250, 249, 0.2) 45%, rgba(250, 250, 249, 0) 70%, transparent 100%);"
        />
      </div>

      {/* Content Overlay */}
      <div class="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
        <div
          id={`${sectionId}-content`}
          class="text-center opacity-0 translate-y-8 transition-all duration-1000 ease-out"
        >
          {/* Highlighted Quote */}
          <h2 class="text-dc-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 md:mb-8 max-w-5xl mx-auto">
            <span class="block lg:inline">
              The vast majority of proof of concepts
            </span>
            {" "}
            <span class="block lg:inline">
              die before reaching production.
            </span>
          </h2>

          {/* Description */}
          <p class="text-dc-500 text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      {/* Scroll Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            const background = document.getElementById(
              `${sectionId}-background`,
            );
            const radialOverlay = document.getElementById(
              `${sectionId}-radial-overlay`,
            );
            const content = document.getElementById(`${sectionId}-content`);

            if (!background || !radialOverlay || !content) return;

            // Track the maximum progress reached - once text appears, it stays visible
            let maxProgressReached = 0;

            const updateOpacity = () => {
              const rect = section.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              
              // Calculate how centered the section is
              // When section center is at viewport center, progress = 1
              const sectionCenter = rect.top + rect.height / 2;
              const viewportCenter = windowHeight / 2;
              const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
              
              // Maximum distance for full effect (when section is fully visible)
              const maxDistance = windowHeight / 2 + rect.height / 2;
              
              // Progress from 0 (far from center) to 1 (centered)
              let progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / maxDistance)));
              
              // Update max progress reached - once text appears, it stays visible
              maxProgressReached = Math.max(maxProgressReached, progress);
              
              // Delay the text appearance - only start showing when very close to center
              // Text starts appearing when progress > 0.5 (more centered)
              const textStartThreshold = 0.5;
              let textProgress = maxProgressReached > textStartThreshold 
                ? (maxProgressReached - textStartThreshold) / (1 - textStartThreshold)
                : 0;
              
              // Ensure textProgress doesn't go below 0 and is capped at 1
              textProgress = Math.max(0, Math.min(1, textProgress));
              
              // Smooth the progress with easing
              const easedTextProgress = textProgress * textProgress * (3 - 2 * textProgress);
              
              // Radial overlay opacity: 0 (hidden) to 1 (visible) when text appears
              // This creates the radial darkening effect
              const radialOpacity = easedTextProgress;
              radialOverlay.style.opacity = String(radialOpacity);
              
              // Content opacity: 0 (hidden) to 1 (visible) - once it appears, it stays
              const contentOpacity = easedTextProgress;
              content.style.opacity = String(contentOpacity);
              
              // Content transform: translateY(32px) to translateY(0)
              const translateY = 32 * (1 - easedTextProgress);
              content.style.transform = `translateY(${translateY}px)`;
            };

            // Update on scroll
            let ticking = false;
            const handleScroll = () => {
              if (!ticking) {
                window.requestAnimationFrame(() => {
                  updateOpacity();
                  ticking = false;
                });
                ticking = true;
              }
            };

            window.addEventListener("scroll", handleScroll, { passive: true });
            window.addEventListener("resize", updateOpacity);
            
            // Initial update
            updateOpacity();

            // Cleanup
            return () => {
              window.removeEventListener("scroll", handleScroll);
              window.removeEventListener("resize", updateOpacity);
            };
          }, sectionId),
        }}
      />
    </section>
  );
}

