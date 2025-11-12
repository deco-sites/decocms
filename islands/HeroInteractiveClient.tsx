import { useEffect } from "preact/hooks";

export default function HeroInteractiveClient() {
  useEffect(() => {
    console.log("🚀 Island mounted!");
    
    let typingInput: HTMLTextAreaElement | null = null;
    let selectedTheme: string | null = null;

    // Initialize function
    function init() {
      console.log("Initializing island...");
      
      typingInput = document.getElementById("typing-input") as HTMLTextAreaElement;

      if (!typingInput) {
        console.error("Typing input not found!");
        return;
      }

      // Function to handle form submission
      const handleSubmit = () => {
        if (!typingInput) return;
        
        const prompt = typingInput.value.trim();
        if (!prompt) {
          alert("Please describe your app first!");
          return;
        }

        // Build URL with parameters
        const baseUrl = "https://admin.decocms.com";
        const params = new URLSearchParams({
          initialInput: prompt,
          autoSend: "true"
        });

        // Add theme parameter if a theme was selected
        if (selectedTheme) {
          params.append("theme", selectedTheme);
        }

        const finalUrl = `${baseUrl}/?${params.toString()}`;
        console.log("Redirecting to:", finalUrl);
        
        // Redirect to the URL
        window.location.href = finalUrl;
      };

      // Generate button click handler
      const generateButton = document.getElementById("generate-button");
      if (generateButton) {
        generateButton.addEventListener("click", handleSubmit);
      }

      // Enter key handler on textarea
      typingInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          handleSubmit();
        }
      });

      // Template click handler
      document.querySelectorAll(".prompt-template").forEach((template) => {
        template.addEventListener("click", (event) => {
          const button = (event.target as HTMLElement).closest(".prompt-template") as HTMLButtonElement;
          if (!button || !typingInput) return;

          const text = button.dataset.text || "";
          typingInput.value = text;
          typingInput.focus();
        });
      });

      // Styles button toggle handler
      const stylesButton = document.getElementById("styles-button");
      const themeSelector = document.getElementById("theme-selector");
      let stylesActive = false;

      if (stylesButton && themeSelector) {
        stylesButton.addEventListener("click", () => {
          stylesActive = !stylesActive;
          
          if (stylesActive) {
            // Activate styles (same as toggle active state)
            stylesButton.classList.remove("bg-white", "hover:bg-gray-50");
            stylesButton.classList.add("bg-[#f1fe9f]");
            
            // Show theme selector
            themeSelector.classList.remove("hidden");
            themeSelector.classList.add("flex", "flex-col");
          } else {
            // Deactivate styles
            stylesButton.classList.remove("bg-[#f1fe9f]");
            stylesButton.classList.add("bg-white", "hover:bg-gray-50");
            
            // Hide theme selector
            themeSelector.classList.add("hidden");
            themeSelector.classList.remove("flex", "flex-col");
          }
        });
      }

      // Theme card click handler
      document.querySelectorAll(".theme-card").forEach((card) => {
        card.addEventListener("click", (event) => {
          const button = (event.target as HTMLElement).closest(".theme-card") as HTMLButtonElement;
          if (!button || !typingInput) return;

          const themeName = button.dataset.themeName || "";

          // Remove selection from all cards
          document.querySelectorAll(".theme-card").forEach((c) => {
            c.classList.remove("ring-2", "ring-primary-light", "border-primary-light", "bg-[rgba(208,236,26,0.25)]");
          });

          // Add selection to clicked card
          button.classList.add("ring-2", "ring-primary-light", "border-primary-light", "bg-[rgba(208,236,26,0.25)]");

          // Save the selected theme
          selectedTheme = themeName;
          console.log("Selected theme:", themeName);
        });
      });

      // Carousel hover pause
      const carousel = document.getElementById("apps-carousel");
      if (carousel) {
        carousel.addEventListener("mouseenter", () => {
          carousel.style.animationPlayState = "paused";
        });
        carousel.addEventListener("mouseleave", () => {
          carousel.style.animationPlayState = "running";
        });
      }

      // GSAP animations - wait for GSAP to load
      function applyGSAPAnimations() {
        const gsap = (globalThis as any).gsap;
        if (gsap) {
          console.log("Applying GSAP animations");
          gsap.fromTo("h1", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );
          gsap.fromTo("#apps-carousel", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: "power3.out" }
          );
          gsap.fromTo(".bg-white.border.border-\\[\\#e5e5e5\\]", 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
          );
          gsap.fromTo(".prompt-template", 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.8, stagger: 0.1, ease: "power3.out" }
          );
        } else {
          console.log("GSAP not loaded yet, retrying...");
          setTimeout(applyGSAPAnimations, 100);
        }
      }
      
      applyGSAPAnimations();
    }

    // Wait for DOM and execute
    setTimeout(init, 100);
  }, []);

  return null;
}
