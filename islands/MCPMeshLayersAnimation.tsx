import { useEffect, useRef } from "preact/hooks";

interface Props {
  layer1Src: string;
  layer2Src: string;
  layer3Src: string;
}

export default function MCPMeshLayersAnimation({
  layer1Src,
  layer2Src,
  layer3Src,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const prevProgressRef = useRef({ layer1: 0, layer2: 0, layer3: 0 });
  const maxProgressReachedRef = useRef({ layer1: 0, layer2: 0, layer3: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Find the parent section
      const section = containerRef.current.closest("section");
      if (!section) return;

      // Find scroll sections
      const layer1Section = document.getElementById("layer-1");
      const layer2Section = document.getElementById("layer-2");
      const layer3Section = document.getElementById("layer-3");

      const windowHeight = window.innerHeight;
      
      // Calculate progress for each layer based on its section visibility
      // More responsive calculation to ensure animation follows scroll smoothly
      const calculateProgress = (sectionEl: HTMLElement | null) => {
        if (!sectionEl) return 0;
        
        const rect = sectionEl.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const sectionCenter = sectionTop + (sectionHeight / 2);
        const sectionBottom = sectionTop + sectionHeight;
        
        // When section is below viewport
        if (sectionTop > windowHeight) return 0;
        
        // When section is above viewport
        if (sectionBottom < 0) return 1;
        
        // Calculate progress based on section center position relative to viewport center
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
        
        // Animation is most active when section center is near viewport center
        // Use a smooth curve that responds to scroll position
        const maxDistance = windowHeight * 0.8;
        const progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / maxDistance)));
        
        // Boost progress when section is in the active zone (middle 60% of viewport)
        const activeZoneTop = windowHeight * 0.2;
        const activeZoneBottom = windowHeight * 0.8;
        
        if (sectionCenter >= activeZoneTop && sectionCenter <= activeZoneBottom) {
          return Math.min(1, progress * 1.2);
        }
        
        return progress;
      };

      let layer1Progress = calculateProgress(layer1Section);
      let layer2Progress = calculateProgress(layer2Section);
      let layer3Progress = calculateProgress(layer3Section);

      // Detect scroll direction
      const isScrollingDown = layer3Progress > prevProgressRef.current.layer3 || 
                               layer2Progress > prevProgressRef.current.layer2 || 
                               layer1Progress > prevProgressRef.current.layer1;
      
      // Update previous progress
      prevProgressRef.current = { layer1: layer1Progress, layer2: layer2Progress, layer3: layer3Progress };

      // Track maximum progress reached for each layer
      // When scrolling down: once a layer appears, it stays visible
      if (isScrollingDown) {
        maxProgressReachedRef.current.layer1 = Math.max(maxProgressReachedRef.current.layer1, layer1Progress);
        maxProgressReachedRef.current.layer2 = Math.max(maxProgressReachedRef.current.layer2, layer2Progress);
        maxProgressReachedRef.current.layer3 = Math.max(maxProgressReachedRef.current.layer3, layer3Progress);
        
        // Use the maximum progress reached for each layer when scrolling down
        layer1Progress = maxProgressReachedRef.current.layer1;
        layer2Progress = maxProgressReachedRef.current.layer2;
        layer3Progress = maxProgressReachedRef.current.layer3;
      } else {
        // When scrolling up: allow layers to disappear, but ensure proper order
        // Layer 1 should only disappear after layer 2 disappears
        if (layer2Progress > 0) {
          layer1Progress = Math.max(layer1Progress, layer2Progress);
        }
        // Layer 2 should only disappear after layer 3 disappears
        if (layer3Progress > 0) {
          layer2Progress = Math.max(layer2Progress, layer3Progress);
        }
        
        // Update max progress if we're going back up (for smooth transitions)
        maxProgressReachedRef.current.layer1 = Math.max(maxProgressReachedRef.current.layer1, layer1Progress);
        maxProgressReachedRef.current.layer2 = Math.max(maxProgressReachedRef.current.layer2, layer2Progress);
        maxProgressReachedRef.current.layer3 = Math.max(maxProgressReachedRef.current.layer3, layer3Progress);
      }

      // Animate Layer 3 - smooth slide in/out from top (top layer, appears first)
      if (layer3Ref.current) {
        const translateY = (1 - layer3Progress) * -150;
        const opacity = Math.min(1, layer3Progress * 1.3);
        layer3Ref.current.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
        layer3Ref.current.style.opacity = `${opacity}`;
      }

      // Animate Layer 2 - smooth slide in/out from top (middle layer)
      if (layer2Ref.current) {
        const translateY = (1 - layer2Progress) * -150;
        const opacity = Math.min(1, layer2Progress * 1.3);
        layer2Ref.current.style.transform = `translate(-50%, calc(-50% + 40px + ${translateY}px))`;
        layer2Ref.current.style.opacity = `${opacity}`;
      }

      // Animate Layer 1 - smooth slide in/out from top (bottom layer, appears last, disappears last)
      if (layer1Ref.current) {
        const translateY = (1 - layer1Progress) * -150;
        const opacity = Math.min(1, layer1Progress * 1.3);
        layer1Ref.current.style.transform = `translate(-50%, calc(-50% + 80px + ${translateY}px))`;
        layer1Ref.current.style.opacity = `${opacity}`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      class="sticky top-24 w-full flex items-center justify-center"
      style={{
        minHeight: "calc(100vh - 6rem)",
      }}
    >
      <div class="relative w-full max-w-[500px] h-[700px] flex flex-col items-center justify-center">
        {/* Layer 1 - Bottom layer (most below) */}
        <div
          ref={layer1Ref}
          class="absolute"
          style={{
            transform: "translate(-50%, calc(-50% + 80px - 150px))",
            opacity: "0",
            zIndex: 1,
            top: "calc(50% + 80px)",
            left: "50%",
            width: "120%",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <img
            src={layer1Src}
            alt="Layer 1"
            class="w-full max-w-full h-auto drop-shadow-lg object-contain"
          />
        </div>

        {/* Layer 2 - Middle layer, above layer 1 */}
        <div
          ref={layer2Ref}
          class="absolute w-full"
          style={{
            transform: "translate(-50%, calc(-50% + 40px - 150px))",
            opacity: "0",
            zIndex: 2,
            top: "calc(50% + 40px)",
            left: "50%",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <img
            src={layer2Src}
            alt="Layer 2"
            class="w-full max-w-full h-auto drop-shadow-lg object-contain"
          />
        </div>

        {/* Layer 3 - Top layer, above everything */}
        <div
          ref={layer3Ref}
          class="absolute w-full"
          style={{
            transform: "translate(-50%, calc(-50% - 150px))",
            opacity: "0",
            zIndex: 3,
            top: "50%",
            left: "50%",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <img
            src={layer3Src}
            alt="Layer 3"
            class="w-full max-w-full h-auto drop-shadow-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}
