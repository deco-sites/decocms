import { useEffect } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";

interface AppIcon {
  name: string;
  icon: ImageWidget;
  mention: string;
}

interface PromptTemplate {
  label: string;
  icon: string;
  fullText: string;
}

interface Theme {
  name: string;
  colors?: string[];
}

export interface Props {
  title?: string;
  subtitle?: string;
  apps?: AppIcon[];
  promptTemplates?: PromptTemplate[];
  themes?: Theme[];
}

// Global singleton flag to ensure animations run only once
let animationsPlayed = false;

// Global function to trigger GSAP animations
function triggerAnimations() {
  if (animationsPlayed) {
    console.log("Animations already played, skipping...");
    return;
  }

  // deno-lint-ignore no-explicit-any
  const gsap = (globalThis as any).gsap;
  if (!gsap) {
    console.log("GSAP not loaded yet, retrying...");
    setTimeout(triggerAnimations, 100);
    return;
  }

  console.log("Applying GSAP animations");
  animationsPlayed = true;
  
  gsap.fromTo("#apps-carousel", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, delay: 0, ease: "power3.out" }
  );
  gsap.fromTo(".bg-white.border.border-\\[\\#e5e5e5\\]", 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
  );
  gsap.fromTo(".prompt-template", 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 0.4, stagger: 0.1, ease: "power3.out" }
  );
}

export default function HeroInteractiveClient({
  title,
  subtitle,
  apps = [],
  promptTemplates = [],
  themes = [],
}: Props) {
  const repetitions = 8;
  const trackApps = Array.from({ length: repetitions }, () => apps).flat();

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
        globalThis.location.href = finalUrl;
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

      // Trigger animations
      triggerAnimations();
    }

    // Wait for DOM and execute
    setTimeout(init, 100);
  }, []);

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-primary-light py-2 rounded-[24px] flex flex-col h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Main Content */}
        <div class="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 pt-20 pb-2">
          <div class="w-full max-w-[1140px] flex flex-col gap-16 items-center">
            {/* Title and Subtitle - Server-side rendered */}
            <div class="flex flex-col gap-5 items-center text-center w-full">
              <h1 class="text-[64px] font-[590] text-primary-dark leading-[0.9] tracking-[-1.28px] max-w-[936px]">
                {title}
              </h1>
              
              <p class="text-[18px] font-normal text-primary-dark opacity-80 leading-[1.5] max-w-[594px]">
                {subtitle}
              </p>
            </div>

            {/* Chat Input Container */}
            <div class="flex flex-col gap-8 items-center w-full max-w-[896px] relative z-20">
              {/* Apps Carousel - Behind the input */}
              <div class="absolute top-[85px] left-1/2 -translate-x-1/2 w-[1428px] overflow-hidden h-[79px] flex items-center justify-center -z-10 pointer-events-none">
                {/* Fade gradients */}
                <div class="pointer-events-none absolute z-10 left-0 top-0 h-full w-32 bg-gradient-to-l from-transparent to-primary-light"></div>
                <div class="pointer-events-none absolute z-10 right-0 top-0 h-full w-32 bg-gradient-to-r from-transparent to-primary-light"></div>

                <div
                  id="apps-carousel"
                  class="w-max flex gap-2 sm:gap-4 animate-sliding"
                  style={{ animationDuration: "90s" }}
                >
                  {/* First half of the loop */}
                  {trackApps.map((app, idx) => (
                    <div
                      key={`a-${idx}`}
                      class="w-14 h-14 relative bg-white/90 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-500/10 overflow-hidden flex items-center justify-center flex-shrink-0"
                    >
                      <Image
                        src={app.icon}
                        alt={app.name}
                        width={32}
                        height={32}
                        loading="lazy"
                        class="w-8 h-8 object-contain"
                      />
                    </div>
                  ))}
                  {/* Second half to create a seamless scroll */}
                  {trackApps.map((app, idx) => (
                    <div
                      key={`b-${idx}`}
                      class="w-14 h-14 relative bg-white/90 rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-stone-500/10 overflow-hidden flex items-center justify-center flex-shrink-0"
                    >
                      <Image
                        src={app.icon}
                        alt={app.name}
                        width={32}
                        height={32}
                        loading="lazy"
                        class="w-8 h-8 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Input Box */}
              <div class="bg-white border border-[#e5e5e5] rounded-xl p-2.5 w-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_1px_0px_rgba(0,0,0,0.04),0px_6px_24px_0px_rgba(0,0,0,0.01),0px_9px_48px_0px_rgba(0,0,0,0.09)]">
                <div class="flex flex-col gap-4">
                  {/* Text Area */}
                  <div class="h-[120px] px-2.5 py-2 relative">
                    <textarea
                      id="typing-input"
                      class="w-full h-full text-base text-dc-900 leading-6 resize-none border-none outline-none bg-transparent overflow-auto opacity-70"
                      placeholder="Describe your app here..."
                    ></textarea>
                  </div>

                  {/* Bottom Controls */}
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      {/* Styles Button */}
                      <button
                        type="button"
                        id="styles-button"
                        class="styles-button bg-white border border-[#e5e5e5] px-4 py-2 rounded-lg h-8 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                      >
                        <svg class="w-[10.667px] h-[10.667px] text-[#262626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                        </svg>
                        <span class="text-sm font-medium text-[#737373]">Styles</span>
                      </button>
                    </div>

                    {/* Generate Button */}
                    <button type="button" id="generate-button" class="bg-primary-light px-4 py-2 rounded-lg h-8 flex items-center gap-2 hover:bg-[#c5e016] transition-colors">
                      <span class="text-sm font-medium text-primary-dark">Generate</span>
                      <svg class="w-[10.667px] h-[10.667px] text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Theme Selector - Hidden by default */}
                  <div id="theme-selector" class="hidden flex-col gap-2.5">
                    {/* Separator */}
                    <div class="w-full h-px bg-[#e5e5e5]"></div>
                    
                    {/* Themes Grid */}
                    <div class="flex gap-1.5 w-full">
                      {themes?.map((theme, idx) => {
                        const primaryColor = theme.colors?.[0] || "#d0ec1a";
                        const appBg = theme.colors?.[1] || "#ffffff";
                        const borderColor = theme.colors?.[2] || "#e5e5e5";
                        const foregroundColor = theme.colors?.[3] || "#262626";
                        
                        return (
                          <button
                            key={idx}
                            type="button"
                            data-theme-name={theme.name}
                            class="theme-card flex-1 border border-neutral-200 rounded-[3px] overflow-hidden transition-all hover:border-primary-light hover:bg-[rgba(208,236,26,0.25)] cursor-pointer"
                          >
                            {/* Preview Area */}
                            <div class="h-[70px] pl-2.5 pr-0 pt-2.5 pb-0 flex items-end" style={{ backgroundColor: primaryColor }}>
                              <div 
                                class="w-full h-full rounded-tl-[4px] border border-b-0 border-r-0"
                                style={{ 
                                  backgroundColor: appBg,
                                  borderColor: borderColor
                                }}
                              >
                                {/* Simplified app preview - just the structure */}
                                <div class="flex flex-col h-full">
                                  {/* Header bar */}
                                  <div class="h-6 border-b flex items-center px-1 gap-1" style={{ borderColor }}>
                                    <div class="size-2 rounded-[2.4px]" style={{ backgroundColor: primaryColor }}></div>
                                    <div class="h-1.5 w-1 opacity-30" style={{ backgroundColor: foregroundColor }}></div>
                                  </div>
                                  {/* Content area */}
                                  <div class="flex-1"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Footer with colors and name */}
                            <div class="border-t border-neutral-200 flex items-center gap-1.5 px-1.5 py-1">
                              {/* Color dots */}
                              <div class="h-2.5 w-6 flex -space-x-1">
                                <div 
                                  class="size-2.5 rounded-full border border-white"
                                  style={{ backgroundColor: primaryColor }}
                                />
                                <div 
                                  class="size-2.5 rounded-full border border-white"
                                  style={{ backgroundColor: appBg }}
                                />
                                <div 
                                  class="size-2.5 rounded-full border border-white"
                                  style={{ backgroundColor: borderColor }}
                                />
                              </div>
                              {/* Name */}
                              <p class="text-[10px] leading-3 font-normal text-neutral-800">{theme.name}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Prompt Templates */}
              <div class="flex flex-col gap-2 items-center justify-center w-full">
                <div class="flex flex-wrap gap-2 items-center justify-center">
                  {promptTemplates?.slice(0, 3).map((template, idx) => (
                    <button
                      key={idx}
                      type="button"
                      class="prompt-template bg-white border border-[#e5e5e5] rounded-xl px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      data-text={template.fullText}
                    >
                      <Icon name={template.icon} size="small" class="text-[#a595ff] flex-shrink-0" />
                      <span class="text-sm text-[#262626] whitespace-nowrap">{template.label}</span>
                    </button>
                  ))}
                </div>
                <div class="flex flex-wrap gap-2 items-center justify-center">
                  {promptTemplates?.slice(3, 7).map((template, idx) => (
                    <button
                      key={idx}
                      type="button"
                      class="prompt-template bg-white border border-[#e5e5e5] rounded-xl px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      data-text={template.fullText}
                    >
                      <Icon name={template.icon} size="small" class="text-[#a595ff] flex-shrink-0" />
                      <span class="text-sm text-[#262626] whitespace-nowrap">{template.label}</span>
                    </button>
                  ))}
                </div>
                <div class="flex flex-wrap gap-2 items-center justify-center">
                  {promptTemplates?.slice(7).map((template, idx) => (
                    <button
                      key={idx}
                      type="button"
                      class="prompt-template bg-white border border-[#e5e5e5] rounded-xl px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      data-text={template.fullText}
                    >
                      <Icon name={template.icon} size="small" class="text-[#a595ff] flex-shrink-0" />
                      <span class="text-sm text-[#262626] whitespace-nowrap">{template.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
