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
  const prevScrollYRef = useRef(0);

  useEffect(() => {
    // Initialize scroll position on client side
    if (typeof window !== "undefined") {
      prevScrollYRef.current = window.scrollY;
    }

    const handleScroll = () => {
      if (!containerRef.current || typeof window === "undefined") return;

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
        const viewportCenter = windowHeight / 2;
        
        // When section is completely below viewport (not yet visible)
        if (sectionTop > windowHeight) return 0;
        
        // When section is completely above viewport (already passed) - return 0 immediately
        if (sectionBottom < 0) return 0;
        
        // When section top is above viewport but bottom is still visible
        // This means we've scrolled past it - return 0 to prevent reappearing
        if (sectionTop < 0 && sectionBottom < viewportCenter) return 0;
        
        // Calculate progress based on section center position relative to viewport center
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
        
        // Animation is most active when section center is near viewport center
        // Use a smooth curve that responds to scroll position
        const maxDistance = windowHeight * 0.8;
        let progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / maxDistance)));
        
        // Boost progress when section is in the active zone (middle 60% of viewport)
        const activeZoneTop = windowHeight * 0.2;
        const activeZoneBottom = windowHeight * 0.8;
        
        if (sectionCenter >= activeZoneTop && sectionCenter <= activeZoneBottom) {
          progress = Math.min(1, progress * 1.2);
        }
        
        // If section is above viewport center but still partially visible, reduce progress significantly
        // This helps layers disappear more quickly when scrolling up
        if (sectionBottom < viewportCenter && sectionBottom > 0) {
          const distanceFromBottom = viewportCenter - sectionBottom;
          const fadeOutDistance = windowHeight * 0.4;
          const fadeOutProgress = Math.min(1, distanceFromBottom / fadeOutDistance);
          progress = progress * (1 - fadeOutProgress * 0.9); // Fade out 90% when above center
        }
        
        return progress;
      };

      let layer1Progress = calculateProgress(layer1Section);
      let layer2Progress = calculateProgress(layer2Section);
      let layer3Progress = calculateProgress(layer3Section);

      // Detect scroll direction using scroll position
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > prevScrollYRef.current;
      prevScrollYRef.current = scrollY;
      
      // Update previous progress for comparison
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
        // When scrolling up: use current calculated progress directly
        // Reset maxProgressReached when a layer completely disappears to prevent reappearing
        if (layer3Progress <= 0) {
          maxProgressReachedRef.current.layer3 = 0;
        }
        if (layer2Progress <= 0) {
          maxProgressReachedRef.current.layer2 = 0;
        }
        if (layer1Progress <= 0) {
          maxProgressReachedRef.current.layer1 = 0;
        }
        
        // When scrolling up, ensure proper disappearing order:
        // Layer 3 disappears first, then layer 2, then layer 1
        // Layer 2 should disappear when layer 3 is gone (or very low)
        if (layer3Progress <= 0.1) {
          // Layer 3 is gone or almost gone, allow layer 2 to disappear
          // Don't force it to stay visible
        } else {
          // Layer 3 is still visible, keep layer 2 visible too (but not forced)
          layer2Progress = Math.max(layer2Progress, layer3Progress * 0.9);
        }
        
        // Layer 1 should disappear when layer 2 is gone (or very low)
        if (layer2Progress <= 0.1) {
          // Layer 2 is gone or almost gone, allow layer 1 to disappear
          // Don't force it to stay visible
        } else {
          // Layer 2 is still visible, keep layer 1 visible too (but not forced)
          layer1Progress = Math.max(layer1Progress, layer2Progress * 0.9);
        }
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
