import { useEffect, useState, useRef } from "preact/hooks";
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

// Function to trigger GSAP animations
function triggerAnimations(gsap: any) {
  // If GSAP is not loaded, set the chat input container to visible without animations
  if (!gsap) {
    const element = document.getElementById("chat-input-container");
    if (element) {
      element.style.opacity = "1";
    }
    return;
  }

  // Set the chat input container to visible
  gsap.set("#chat-input-container", { opacity: 1 });
  
  gsap.fromTo("#apps-carousel", 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: "power3.out" }
  );
  gsap.fromTo("#main-input-box", 
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
  );
  gsap.fromTo("#prompt-templates button", 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 0.6, stagger: 0.1, ease: "power3.out" }
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

  // React state management
  const [promptText, setPromptText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [stylesActive, setStylesActive] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);

  // Refs
  const typingInputRef = useRef<HTMLTextAreaElement>(null);
  const animationsPlayedRef = useRef(false);

  // Trigger animations on mount
  useEffect(() => {
    const gsap = globalThis.window.gsap;
    
    if (animationsPlayedRef.current){
      return;
    }
    animationsPlayedRef.current = true;

    triggerAnimations(gsap);
  }, []);

  // Handle form submission
  const handleSubmit = () => {
    const prompt = promptText.trim();
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

  // Handle Enter key on textarea
  const handleTextareaKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Handle template click
  const handleTemplateClick = (templateText: string) => {
    setPromptText(templateText);
    typingInputRef.current?.focus();
  };

  // Handle styles button toggle
  const handleStylesButtonClick = () => {
    setStylesActive(!stylesActive);
  };

  // Handle theme card click
  const handleThemeCardClick = (themeName: string) => {
    setSelectedTheme(themeName);
    console.log("Selected theme:", themeName);
  };

  // Handle carousel hover
  const handleCarouselMouseEnter = () => {
    setCarouselPaused(true);
  };

  const handleCarouselMouseLeave = () => {
    setCarouselPaused(false);
  };

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-primary-light py-2 rounded-[24px] flex flex-col h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Main Content */}
        <div class="flex-1 flex flex-col items-center justify-start sm:justify-center px-3 sm:px-8 lg:px-16 pt-6 sm:pt-20 pb-4 sm:pb-2 overflow-y-auto">
          <div class="w-full max-w-[1140px] flex flex-col gap-4 sm:gap-12 lg:gap-16 items-center">
            {/* Title and Subtitle - Server-side rendered */}
            <div class="flex flex-col gap-2 sm:gap-5 items-center text-center w-full">
              <h1 class="text-[28px] sm:text-[48px] lg:text-[64px] font-[590] text-primary-dark leading-[0.95] sm:leading-[0.9] tracking-[-0.56px] sm:tracking-[-1.28px] max-w-[936px] px-1">
                {title}
              </h1>
              
              <p class="text-[13px] sm:text-[16px] lg:text-[18px] font-normal text-primary-dark opacity-80 leading-[1.35] sm:leading-[1.5] max-w-[594px] px-2">
                {subtitle}
              </p>
            </div>

            {/* Chat Input Container */}
            <div id="chat-input-container" class="opacity-0 flex flex-col gap-3 sm:gap-6 lg:gap-8 items-center w-full max-w-[896px] relative z-20">
              {/* Apps Carousel - Behind the input - Hidden on mobile */}
              <div class="hidden sm:flex absolute top-[85px] left-1/2 -translate-x-1/2 w-[1428px] overflow-hidden h-[79px] items-center justify-center -z-10 pointer-events-none">
                {/* Fade gradients */}
                <div class="pointer-events-none absolute z-10 left-0 top-0 h-full w-32 bg-gradient-to-l from-transparent to-primary-light"></div>
                <div class="pointer-events-none absolute z-10 right-0 top-0 h-full w-32 bg-gradient-to-r from-transparent to-primary-light"></div>

                <div
                  id="apps-carousel"
                  class="w-max flex gap-2 sm:gap-4 animate-sliding"
                  style={{ 
                    animationDuration: "90s",
                    animationPlayState: carouselPaused ? "paused" : "running"
                  }}
                  onMouseEnter={handleCarouselMouseEnter}
                  onMouseLeave={handleCarouselMouseLeave}
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
              <div id="main-input-box" class="bg-white border border-[#e5e5e5] rounded-xl p-1.5 sm:p-2.5 w-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_1px_0px_rgba(0,0,0,0.04),0px_6px_24px_0px_rgba(0,0,0,0.01),0px_9px_48px_0px_rgba(0,0,0,0.09)]">
                <div class="flex flex-col gap-2 sm:gap-4">
                  {/* Text Area */}
                  <div class="h-[70px] sm:h-[120px] px-2 sm:px-2.5 py-1.5 sm:py-2 relative">
                    <textarea
                      ref={typingInputRef}
                      value={promptText}
                      onInput={(e) => setPromptText((e.target as HTMLTextAreaElement).value)}
                      onKeyDown={handleTextareaKeyDown}
                      class="w-full h-full text-[13px] sm:text-base text-dc-900 leading-[1.3] sm:leading-6 resize-none border-none outline-none bg-transparent overflow-auto opacity-70"
                      placeholder="Describe your app here..."
                    />
                  </div>

                  {/* Bottom Controls */}
                  <div class="flex items-center justify-between gap-1.5 sm:gap-2">
                    <div class="flex items-center gap-1.5 sm:gap-2">
                      {/* Styles Button */}
                      <button
                        type="button"
                        onClick={handleStylesButtonClick}
                        class={`styles-button border border-[#e5e5e5] px-2 sm:px-4 py-1 sm:py-2 rounded-lg h-6 sm:h-8 flex items-center gap-1 sm:gap-2 transition-colors ${
                          stylesActive ? "bg-[#f1fe9f]" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <svg class="w-[9px] sm:w-[10.667px] h-[9px] sm:h-[10.667px] text-[#262626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                        </svg>
                        <span class="text-[11px] sm:text-sm font-medium text-[#737373]">Styles</span>
                      </button>
                    </div>

                    {/* Generate Button */}
                    <button 
                      type="button" 
                      onClick={handleSubmit}
                      class="bg-primary-light px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg h-6 sm:h-8 flex items-center gap-1 sm:gap-2 hover:bg-[#c5e016] transition-colors flex-shrink-0"
                    >
                      <span class="text-[11px] sm:text-sm font-medium text-primary-dark">Generate</span>
                      <svg class="w-[9px] sm:w-[10.667px] h-[9px] sm:h-[10.667px] text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Theme Selector - Conditionally rendered */}
                  {stylesActive && (
                  <div class="flex flex-col gap-2.5">
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
                            onClick={() => handleThemeCardClick(theme.name)}
                            class={`theme-card flex-1 border rounded-[3px] overflow-hidden transition-all hover:border-primary-light hover:bg-[rgba(208,236,26,0.25)] cursor-pointer ${
                              selectedTheme === theme.name 
                                ? "ring-2 ring-primary-light border-primary-light bg-[rgba(208,236,26,0.25)]" 
                                : "border-neutral-200"
                            }`}
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
                  )}
                </div>
              </div>

              {/* Prompt Templates */}
              <div id="prompt-templates" class="flex flex-wrap gap-1 sm:gap-2 items-center justify-center w-full">
                {promptTemplates?.map((template, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTemplateClick(template.fullText)}
                    class="prompt-template bg-white border border-[#e5e5e5] rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-2 flex items-center gap-1 sm:gap-3 hover:bg-gray-50 transition-colors cursor-pointer flex-shrink-0"
                  >
                    <Icon name={template.icon} size="small" class="text-[#a595ff] flex-shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 overflow-hidden" />
                    <span class="text-[11px] sm:text-sm text-[#262626] whitespace-nowrap">{template.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
