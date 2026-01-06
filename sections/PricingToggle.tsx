import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import Button from "../islands/Button.tsx";
import CopyCommandSimple from "../islands/CopyCommandSimple.tsx";

/**
 * @titleBy title
 */
interface PricingOption {
  /**
   * @title Título da Opção
   * @description Nome da opção no toggle (ex: "Modular auth products")
   */
  title?: string;
  /**
   * @title Descrição da Opção
   * @description Texto descritivo abaixo do título da opção
   */
  description?: string;
}

/**
 * @titleBy name
 */
interface Feature {
  /**
   * @title Nome da Feature
   * @description Nome da funcionalidade
   */
  name?: string;
  /**
   * @title Subtext
   * @description Texto adicional abaixo do nome (ex: "$9 per Additional Project")
   */
  subtext?: string;
}

/**
 * @titleBy name
 */
interface PricingCard {
  /**
   * @title Nome do Plano
   * @description Nome do plano de preços
   */
  name?: string;
  /**
   * @title Preço
   * @description Valor do preço (ex: "$0", "$200", "Custom")
   */
  price?: string;
  /**
   * @title Sufixo do Preço
   * @description Texto após o preço (ex: "/month", "Tailored to your needs")
   */
  priceSuffix?: string;
  /**
   * @title Descrição
   * @description Descrição curta do plano
   */
  description?: string;
  /**
   * @title Texto do Botão
   * @description Texto do CTA
   */
  buttonText?: string;
  /**
   * @title URL do Botão
   * @description Link do CTA
   */
  buttonUrl?: string;
  /**
   * @title Variante do Botão
   * @description Estilo do botão
   */
  buttonVariant?: "primary" | "secondary";
  /**
   * @title Label das Features
   * @description Título acima da lista de features (ex: "Highlighted Features:")
   */
  featuresLabel?: string;
  /**
   * @title Features
   * @description Lista de funcionalidades do plano
   */
  features?: Feature[];
  /**
   * @title Imagem
   * @description Imagem decorativa do card (opcional)
   */
  image?: ImageWidget;
  /**
   * @title Copy Command
   * @description If set, shows a copy command button instead of regular CTA (e.g., "npx @decocms/mesh")
   */
  copyCommand?: string;
}

export interface Props {
  /**
   * @title Tema
   * @description Tema visual da seção (dark ou light)
   */
  theme?: "dark" | "light";
  /**
   * @title Título
   * @description Título principal da seção
   */
  title?: string;
  /**
   * @title Highlighted Word
   * @description Word(s) in the title to highlight in green
   */
  highlightedWord?: string;
  /**
   * @title Second Highlighted Word
   * @description Optional second word to highlight in green
   */
  highlightedWord2?: string;
  /**
   * @title Subtítulo
   * @description Texto descritivo abaixo do título
   */
  subtitle?: string;
  /**
   * @title Opção 1
   * @description Primeira opção do toggle
   */
  option1?: PricingOption;
  /**
   * @title Opção 2
   * @description Segunda opção do toggle
   */
  option2?: PricingOption;
  /**
   * @title Cards da Opção 1
   * @description Cards de preço exibidos quando a opção 1 está selecionada
   */
  option1Cards?: PricingCard[];
  /**
   * @title Cards da Opção 2
   * @description Cards de preço exibidos quando a opção 2 está selecionada
   */
  option2Cards?: PricingCard[];
  /**
   * @title Nota de Rodapé
   * @description Texto de nota no rodapé da seção
   */
  footerNote?: string;
  /**
   * @title Segunda Nota de Rodapé
   * @description Segunda linha de nota no rodapé
   */
  footerNote2?: string;
}

// Default values for pricing cards
const defaultOption1Cards: PricingCard[] = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals and small teams getting started",
    buttonText: "Start building",
    buttonUrl: "https://admin.deco.cx",
    buttonVariant: "secondary",
    featuresLabel: "Includes:",
    features: [
      { name: "TypeScript CMS with Visual Editor" },
      { name: "Content Segmentation & A/B Testing" },
      { name: "Pre-built Component Library" },
      { name: "One-Click Install Apps" },
      { name: "Hosting & CDN", subtext: "Up to 5k pageviews/month" },
    ],
  },
  {
    name: "Pro",
    price: "$200",
    priceSuffix: "/month",
    description: "For growing businesses with advanced needs",
    buttonText: "Get started",
    buttonUrl: "https://admin.deco.cx",
    buttonVariant: "primary",
    featuresLabel: "Everything in Free, plus:",
    features: [
      { name: "Custom Domains" },
      { name: "Real-Time Analytics" },
      { name: "Native Monitoring & Observability" },
      { name: "3 Hosted Projects", subtext: "$9 per additional project" },
      { name: "5 Team Members", subtext: "$9 per additional member" },
      { name: "Hosting & CDN", subtext: "Up to 200k pageviews/month" },
      { name: "", subtext: "Up to 4M requests/month" },
      { name: "", subtext: "Up to 50 GB bandwidth/month" },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations scaling high-performance sites and storefronts.",
    buttonText: "Talk to sales",
    buttonUrl: "https://calendar.app.google/hRxm4ctTJJb51J327",
    buttonVariant: "primary",
    featuresLabel: "Everything in Pro, plus:",
    features: [
      { name: "Premium Support & SLA" },
      { name: "Professional Services" },
      { name: "Self-Hosting Options" },
      { name: "White-label Licensing" },
    ],
  },
];

const defaultOption2Cards: PricingCard[] = [
  {
    name: "Free",
    price: "$0",
    priceSuffix: "/month",
    description: "For teams exploring AI capabilities",
    copyCommand: "npx @decocms/mesh",
    featuresLabel: "Includes:",
    features: [
      { name: "Unlimited Users" },
      { name: "Unlimited Tool Calls", subtext: "Self-managed infrastructure" },
      { name: "BYOK", subtext: "Bring Your Own Keys" },
      { name: "Core Features" },
      { name: "Community Support" },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations deploying AI at scale",
    buttonText: "Book a demo",
    buttonUrl: "https://calendar.app.google/hRxm4ctTJJb51J327",
    buttonVariant: "primary",
    featuresLabel: "Everything in Free, plus:",
    features: [
      { name: "SSO + RBAC" },
      { name: "FinOps & Cost Attribution" },
      { name: "5% AI Wallet Fee" },
      { name: "1M Tool Calls/month commitment", subtext: "Includes dedicated management" },
      { name: "Premium Support", subtext: "Available as add-on" },
    ],
  },
];

export default function PricingToggle({
  theme = "light",
  title = "Transparent pricing that scales with you",
  highlightedWord = "scales with you",
  highlightedWord2,
  subtitle = "Choose the product that fits your needs: build sites and storefronts, or deploy your internal AI operating system.",
  option1 = {
    title: "AI Platform",
    description: "Deploy your internal AI operating system on MCP.",
  },
  option2 = {
    title: "deco.cx",
    description: "Build and evolve high-performing sites and storefronts.",
  },
  option1Cards = defaultOption2Cards,
  option2Cards = defaultOption1Cards,
  footerNote = "2.5 GB of bandwidth per 10k pageviews | <strong>$1.00 per extra GB</strong> | 20 requests per pageview | <strong>$0.10 per additional 1,000 requests</strong>",
  footerNote2 = "Limits are subject to change without prior notice.",
}: Props) {
  const sectionId = `pricing-toggle-${Math.random().toString(36).substr(2, 9)}`;
  const isDark = theme === "dark";

  // Theme-based styles
  const styles = {
    section: isDark ? "bg-dc-900" : "bg-dc-50",
    title: isDark ? "text-dc-50" : "text-dc-800",
    subtitle: isDark ? "text-dc-400" : "text-dc-500",
    toggleContainer: isDark ? "bg-dc-800 border border-dc-700" : "bg-dc-100 border border-dc-300",
    toggleActive: isDark ? "bg-dc-700 text-dc-50 shadow-md" : "bg-white text-dc-800 shadow-md border border-dc-200",
    toggleInactive: isDark ? "bg-transparent text-dc-400 hover:text-dc-200 hover:bg-dc-700/50" : "bg-transparent text-dc-500 hover:text-dc-700 hover:bg-dc-200/50",
    toggleSubtext: isDark ? "text-dc-400" : "text-dc-400",
    toggleSubtextInactive: isDark ? "text-dc-500" : "text-dc-400",
    card: isDark ? "bg-dc-50" : "bg-white border border-dc-200",
    footerText: isDark ? "text-dc-400" : "text-dc-500",
  };

  // Render title with highlighted words (green highlight like other hero sections)
  const renderTitle = () => {
    if (!title) return null;
    
    const parts: (string | preact.JSX.Element)[] = [];
    let lastIndex = 0;

    // Find and replace highlighted words
    const wordsToHighlight = [highlightedWord, highlightedWord2].filter(Boolean) as string[];
    
    if (wordsToHighlight.length === 0) {
      return <span>{title}</span>;
    }

    // Sort by position in string to process in order
    const positions = wordsToHighlight.map(word => ({
      word,
      index: title.indexOf(word)
    })).filter(p => p.index !== -1).sort((a, b) => a.index - b.index);

    positions.forEach(({ word, index }) => {
      // Add text before this highlight
      if (index > lastIndex) {
        parts.push(title.slice(lastIndex, index));
      }
      // Add highlighted word with green color (matching HeroMCPMesh, HeroAIPlatform, etc.)
      parts.push(
        <span class="text-[#8caa25]">
          {word}
        </span>
      );
      lastIndex = index + word.length;
    });

    // Add remaining text
    if (lastIndex < title.length) {
      parts.push(title.slice(lastIndex));
    }

    return <>{parts}</>;
  };

  return (
    <section id={sectionId} class={`w-full ${styles.section} py-16 md:py-20 lg:py-28 relative overflow-hidden`}>
      {/* ASCII Dithering Animation - Behind everything, bottom half only */}
      <div class="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none z-0">
        <canvas
          id={`dither-canvas-${sectionId}`}
          class="absolute inset-0 w-full h-full"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      
      <div class="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div class="flex flex-col items-center gap-4 mb-10 md:mb-12 animate-on-scroll opacity-0 translate-y-8">
          <h2 class={`${styles.title} text-3xl sm:text-4xl lg:text-heading-lg font-medium text-center max-w-3xl leading-tight`}>
            {renderTitle()}
          </h2>
          {subtitle && (
            <p class={`${styles.subtitle} text-base sm:text-lg lg:text-xl text-center max-w-xl leading-relaxed`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Toggle */}
        <div class="flex flex-col items-center gap-3 mb-10 md:mb-14 animate-on-scroll opacity-0 translate-y-8" style={{ transitionDelay: "100ms" }}>
          <span class={`text-xs uppercase tracking-widest font-medium ${styles.subtitle}`}>
            Select your plan
          </span>
          <div class={`${styles.toggleContainer} rounded-xl p-1.5 flex gap-1 shadow-inner`}>
            {/* Option 1 Button */}
            <button
              type="button"
              data-toggle-btn="0"
              data-active-class={styles.toggleActive}
              data-inactive-class={styles.toggleInactive}
              class={`pricing-toggle-btn group flex flex-col items-start gap-1 px-4 py-3 sm:px-6 sm:py-4 rounded-lg transition-all duration-300 cursor-pointer ${styles.toggleActive} min-w-40 sm:min-w-56`}
            >
              <span class="text-sm sm:text-base font-medium leading-tight">
                {option1?.title}
              </span>
              <span class={`text-xs sm:text-sm ${styles.toggleSubtext} leading-snug hidden sm:block`}>
                {option1?.description}
              </span>
            </button>

            {/* Option 2 Button */}
            <button
              type="button"
              data-toggle-btn="1"
              data-active-class={styles.toggleActive}
              data-inactive-class={styles.toggleInactive}
              class={`pricing-toggle-btn group flex flex-col items-start gap-1 px-4 py-3 sm:px-6 sm:py-4 rounded-lg transition-all duration-300 cursor-pointer ${styles.toggleInactive} min-w-40 sm:min-w-56`}
            >
              <span class="text-sm sm:text-base font-medium leading-tight">
                {option2?.title}
              </span>
              <span class={`text-xs sm:text-sm ${styles.toggleSubtextInactive} leading-snug hidden sm:block`}>
                {option2?.description}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Container */}
        <div class="relative min-h-96">
          {/* Option 1 Cards - AI Platform (2 cards) */}
          <div
            data-pricing-panel="0"
            class="pricing-panel w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {option1Cards?.map((card) => (
              <div
                class={`${styles.card} rounded-2xl p-6 sm:p-8 flex flex-col gap-6`}
              >
                {/* Card Image */}
                {card.image && (
                  <div class="w-full h-32 flex items-center justify-center">
                    <Image
                      src={card.image}
                      alt={card.name || "Plan image"}
                      width={120}
                      height={120}
                      class="object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Plan Name */}
                <h3 class="text-dc-800 text-xl sm:text-2xl font-medium leading-tight">
                  {card.name}
                </h3>

                {/* Price */}
                <div class="flex flex-col gap-1">
                  <div class="flex items-baseline gap-1">
                    <span class="text-primary-dark text-4xl sm:text-5xl font-medium leading-none">
                      {card.price}
                    </span>
                    {card.priceSuffix && (
                      <span class="text-dc-400 text-base sm:text-lg leading-none">
                        {card.priceSuffix}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {card.description && (
                  <p class="text-dc-500 text-[18px] leading-[24px]">
                    {card.description}
                  </p>
                )}

                {/* CTA Button or Copy Command */}
                {card.copyCommand ? (
                  <CopyCommandSimple command={card.copyCommand} />
                ) : (
                  <Button
                    variant={card.buttonVariant || "primary"}
                    size="medium"
                    href={card.buttonUrl}
                    className="w-full"
                    target="_self"
                  >
                    {card.buttonText}
                  </Button>
                )}

                {/* Features */}
                {card.features && card.features.length > 0 && (
                  <div class="flex flex-col gap-4 mt-2">
                    {card.featuresLabel && (
                      <span class="text-dc-800 text-sm font-medium">
                        {card.featuresLabel}
                      </span>
                    )}
                    <div class="flex flex-col gap-3">
                      {card.features.map((feature) => (
                        <div class={`flex items-start gap-3 ${!feature.name ? "ml-[26px]" : ""}`}>
                          {feature.name && (
                            <Icon
                              name="check_circle"
                              size="small"
                              class="text-lime-600 mt-0.5"
                            />
                          )}
                          <div class="flex flex-col gap-0.5">
                            {feature.name && (
                              <span class="text-dc-600 text-sm sm:text-base leading-snug">
                                {feature.name}
                              </span>
                            )}
                            {feature.subtext && (
                              <span class={`text-dc-400 text-xs sm:text-sm ${!feature.name ? "-mt-1" : ""}`}>
                                {feature.subtext}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Option 2 Cards - deco.cx (3 cards) */}
          <div
            data-pricing-panel="1"
            class="pricing-panel hidden w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 absolute inset-0"
          >
            {option2Cards?.map((card) => (
              <div
                class={`${styles.card} rounded-2xl p-6 sm:p-8 flex flex-col gap-6`}
              >
                {/* Card Image */}
                {card.image && (
                  <div class="w-full h-32 flex items-center justify-center">
                    <Image
                      src={card.image}
                      alt={card.name || "Plan image"}
                      width={120}
                      height={120}
                      class="object-contain"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Plan Name */}
                <h3 class="text-dc-800 text-xl sm:text-2xl font-medium leading-tight">
                  {card.name}
                </h3>

                {/* Price */}
                <div class="flex flex-col gap-1">
                  <div class="flex items-baseline gap-1">
                    <span class="text-primary-dark text-4xl sm:text-5xl font-medium leading-none">
                      {card.price}
                    </span>
                    {card.priceSuffix && (
                      <span class="text-dc-400 text-base sm:text-lg leading-none">
                        {card.priceSuffix}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {card.description && (
                  <p class="text-dc-500 text-[18px] leading-[24px]">
                    {card.description}
                  </p>
                )}

                {/* CTA Button or Copy Command */}
                {card.copyCommand ? (
                  <CopyCommandSimple command={card.copyCommand} />
                ) : (
                  <Button
                    variant={card.buttonVariant || "primary"}
                    size="medium"
                    href={card.buttonUrl}
                    className="w-full"
                    target="_self"
                  >
                    {card.buttonText}
                  </Button>
                )}

                {/* Features */}
                {card.features && card.features.length > 0 && (
                  <div class="flex flex-col gap-4 mt-2">
                    {card.featuresLabel && (
                      <span class="text-dc-800 text-sm font-medium">
                        {card.featuresLabel}
                      </span>
                    )}
                    <div class="flex flex-col gap-3">
                      {card.features.map((feature) => (
                        <div class={`flex items-start gap-3 ${!feature.name ? "ml-[26px]" : ""}`}>
                          {feature.name && (
                            <Icon
                              name="check_circle"
                              size="small"
                              class="text-lime-600 mt-0.5"
                            />
                          )}
                          <div class="flex flex-col gap-0.5">
                            {feature.name && (
                              <span class="text-dc-600 text-sm sm:text-base leading-snug">
                                {feature.name}
                              </span>
                            )}
                            {feature.subtext && (
                              <span class={`text-dc-400 text-xs sm:text-sm ${!feature.name ? "-mt-1" : ""}`}>
                                {feature.subtext}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Notes - Only visible for option 2 (deco.cx) */}
        {(footerNote || footerNote2) && (
          <div 
            data-footer-notes
            class="flex flex-col items-center gap-2 mt-10 md:mt-14 animate-on-scroll translate-y-8 transition-all duration-300 overflow-hidden" 
            style={{ transitionDelay: "400ms", opacity: 0, maxHeight: 0, marginTop: 0 }}
          >
            {footerNote && (
              <p class={`${styles.footerText} text-sm text-center flex items-center gap-2`}>
                <span class="text-amber-500">✦</span>
                <span dangerouslySetInnerHTML={{ __html: footerNote }} />
              </p>
            )}
            {footerNote2 && (
              <p class={`${styles.footerText} text-sm text-center flex items-center gap-2`}>
                <span class="text-amber-500">✦</span>
                {footerNote2}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Toggle & Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            // Toggle functionality
            const toggleBtns = section.querySelectorAll("[data-toggle-btn]");
            const panels = section.querySelectorAll("[data-pricing-panel]");
            let activeIndex = 0;

            // Footer notes element (only visible for option 1 - deco.cx)
            const footerNotes = section.querySelector("[data-footer-notes]") as HTMLElement;

            // Initialize footer as hidden (AI Platform is default)
            if (footerNotes) {
              footerNotes.style.opacity = "0";
              footerNotes.style.maxHeight = "0px";
              footerNotes.style.marginTop = "0";
            }

            const switchPanel = (index: number) => {
              if (index === activeIndex) return;

              // Update buttons using data attributes for theme-aware classes
              toggleBtns.forEach((btn, i) => {
                const el = btn as HTMLElement;
                const activeClasses = (el.dataset.activeClass || "").split(" ").filter(Boolean);
                const inactiveClasses = (el.dataset.inactiveClass || "").split(" ").filter(Boolean);
                
                if (i === index) {
                  el.classList.add("active", ...activeClasses);
                  el.classList.remove(...inactiveClasses);
                } else {
                  el.classList.remove("active", ...activeClasses);
                  el.classList.add(...inactiveClasses);
                }
              });

              // Toggle footer notes visibility (only show for option 1 - deco.cx)
              if (footerNotes) {
                if (index === 1) {
                  footerNotes.style.opacity = "1";
                  footerNotes.style.maxHeight = "200px";
                  footerNotes.style.marginTop = "";
                } else {
                  footerNotes.style.opacity = "0";
                  footerNotes.style.maxHeight = "0px";
                  footerNotes.style.marginTop = "0";
                }
              }

              // Animate panels
              const currentPanel = panels[activeIndex] as HTMLElement;
              const nextPanel = panels[index] as HTMLElement;

              // Fade out current
              currentPanel.style.opacity = "0";
              currentPanel.style.transform = "translateY(20px)";

              setTimeout(() => {
                currentPanel.classList.add("hidden");
                currentPanel.classList.remove("grid");
                currentPanel.style.position = "absolute";

                nextPanel.classList.remove("hidden");
                nextPanel.classList.add("grid");
                nextPanel.style.position = "relative";
                nextPanel.style.opacity = "0";
                nextPanel.style.transform = "translateY(20px)";

                // Force reflow
                nextPanel.offsetHeight;

                // Fade in next
                requestAnimationFrame(() => {
                  nextPanel.style.opacity = "1";
                  nextPanel.style.transform = "translateY(0)";
                });
              }, 300);

              activeIndex = index;
            };

            toggleBtns.forEach((btn) => {
              btn.addEventListener("click", () => {
                const index = parseInt((btn as HTMLElement).dataset.toggleBtn || "0");
                switchPanel(index);
              });
            });

            // Initialize panels
            panels.forEach((panel, i) => {
              const el = panel as HTMLElement;
              el.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
              if (i === 0) {
                el.style.position = "relative";
                el.classList.add("grid");
                el.classList.remove("hidden");
              } else {
                el.style.position = "absolute";
              }
            });

            // Check for query parameter to pre-select a tab
            const urlParams = new URLSearchParams(globalThis.location.search);
            const planParam = urlParams.get("plan");

            if (planParam === "decocx" || planParam === "cx") {
              // Switch to deco.cx pricing (index 1)
              setTimeout(() => switchPanel(1), 100);
            }
            // ?plan=decocms or no param = AI Platform (index 0, already default)

            // Scroll animations
            const animatedElements = section.querySelectorAll(".animate-on-scroll");
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
              { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
            );

            animatedElements.forEach((el) => {
              const element = el as HTMLElement;
              element.style.transition =
                "opacity 0.6s ease-out, transform 0.6s ease-out";
              observer.observe(el);
            });
          }, sectionId),
        }}
      />

      {/* ASCII Dithering Animation Script */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript((sectionId: string, isDark: boolean) => {
            const canvas = document.getElementById(
              `dither-canvas-${sectionId}`,
            ) as HTMLCanvasElement;

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
            const cellSize = 3;

            // Colors based on theme
            // Light theme: dc-50 (#FAFAF9) and dc-100 (#F1F0EE)
            // Dark theme: dc-900 (#1C1917) and dc-800 (#292524)
            const colorLight = isDark ? [0x1c, 0x19, 0x17] : [0xfa, 0xfa, 0xf9];
            const colorDark = isDark ? [0x29, 0x25, 0x24] : [0xf1, 0xf0, 0xee];

            const animate = () => {
              if (canvas.width === 0 || canvas.height === 0) return;

              ctx.clearRect(0, 0, canvas.width, canvas.height);

              const imageData = ctx.createImageData(
                canvas.width,
                canvas.height,
              );
              const data = imageData.data;

              for (let y = 0; y < canvas.height; y += cellSize) {
                for (let x = 0; x < canvas.width; x += cellSize) {
                  const nx = x / canvas.width;
                  const ny = y / canvas.height;

                  // Wave patterns (1.5x faster)
                  const waveBase = Math.sin(nx * 4 + time * 0.0006) * 0.15;
                  const waveSecond = Math.cos(nx * 7 + time * 0.00045) * 0.1;
                  const waveThird = Math.sin((nx + ny) * 3 + time * 0.0003) * 0.08;

                  // Subtle gradient effect
                  const verticalGradient = Math.pow(ny, 1.5) * 0.3;

                  let intensity = 0.85 - verticalGradient + waveBase + waveSecond + waveThird;

                  const noise = (Math.random() - 0.5) * 0.02;
                  intensity += noise;

                  intensity = Math.max(0, Math.min(1, intensity));

                  const matrixX = Math.floor(x / cellSize) % 8;
                  const matrixY = Math.floor(y / cellSize) % 8;
                  const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;

                  const ditherResult = intensity > threshold;
                  const r = ditherResult ? colorLight[0] : colorDark[0];
                  const g = ditherResult ? colorLight[1] : colorDark[1];
                  const b = ditherResult ? colorLight[2] : colorDark[2];

                  for (
                    let dy = 0;
                    dy < cellSize && y + dy < canvas.height;
                    dy++
                  ) {
                    for (
                      let dx = 0;
                      dx < cellSize && x + dx < canvas.width;
                      dx++
                    ) {
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

              time += 16;
              animationRef = requestAnimationFrame(animate);
            };

            animate();

            const cleanup = () => {
              globalThis.removeEventListener("resize", resizeCanvas);
              if (animationRef) {
                cancelAnimationFrame(animationRef);
              }
            };

            globalThis.addEventListener("beforeunload", cleanup);

            return cleanup;
          }, sectionId, isDark),
        }}
      />
    </section>
  );
}

export function Preview() {
  return (
    <PricingToggle
      theme="light"
      title="Transparent pricing that scales with you"
      highlightedWord="scales with you"
      subtitle="Choose the product that fits your needs: build sites and storefronts, or deploy your internal AI operating system."
      option1={{
        title: "AI Platform",
        description: "Deploy your internal AI operating system on MCP.",
      }}
      option2={{
        title: "deco.cx",
        description: "Build and evolve high-performing sites and storefronts.",
      }}
      option1Cards={[
        {
          name: "Free",
          price: "$0",
          priceSuffix: "/month",
          description: "For teams exploring AI capabilities",
          copyCommand: "npx @decocms/mesh",
          featuresLabel: "Includes:",
          features: [
            { name: "Unlimited Users" },
            { name: "Unlimited Tool Calls", subtext: "Self-managed infrastructure" },
            { name: "BYOK", subtext: "Bring Your Own Keys" },
            { name: "Core Features" },
            { name: "Community Support" },
          ],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For organizations deploying AI at scale",
          buttonText: "Book a demo",
          buttonUrl: "https://calendar.app.google/hRxm4ctTJJb51J327",
          buttonVariant: "primary",
          featuresLabel: "Everything in Free, plus:",
          features: [
            { name: "SSO + RBAC" },
            { name: "FinOps & Cost Attribution" },
            { name: "5% AI Wallet Fee" },
            { name: "1M Tool Calls/month commitment", subtext: "Includes dedicated management" },
            { name: "Premium Support", subtext: "Available as add-on" },
          ],
        },
      ]}
      option2Cards={[
        {
          name: "Free",
          price: "$0",
          description: "For individuals and small teams getting started",
          buttonText: "Start building",
          buttonUrl: "https://admin.deco.cx",
          buttonVariant: "secondary",
          featuresLabel: "Includes:",
          features: [
            { name: "TypeScript CMS with Visual Editor" },
            { name: "Content Segmentation & A/B Testing" },
            { name: "Pre-built Component Library" },
            { name: "One-Click Install Apps" },
            { name: "Hosting & CDN", subtext: "Up to 5k pageviews/month" },
          ],
        },
        {
          name: "Pro",
          price: "$200",
          priceSuffix: "/month",
          description: "For growing businesses with advanced needs",
          buttonText: "Get started",
          buttonUrl: "https://admin.deco.cx",
          buttonVariant: "primary",
          featuresLabel: "Everything in Free, plus:",
          features: [
            { name: "Custom Domains" },
            { name: "Real-Time Analytics" },
            { name: "Native Monitoring & Observability" },
            { name: "3 Hosted Projects", subtext: "$9 per additional project" },
            { name: "5 Team Members", subtext: "$9 per additional member" },
            { name: "Hosting & CDN", subtext: "Up to 200k pageviews/month" },
            { name: "", subtext: "Up to 4M requests/month" },
            { name: "", subtext: "Up to 50 GB bandwidth/month" },
          ],
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For organizations scaling high-performance sites and storefronts.",
          buttonText: "Talk to sales",
          buttonUrl: "https://calendar.app.google/hRxm4ctTJJb51J327",
          buttonVariant: "primary",
          featuresLabel: "Everything in Pro, plus:",
          features: [
            { name: "Premium Support & SLA" },
            { name: "Professional Services" },
            { name: "Self-Hosting Options" },
            { name: "White-label Licensing" },
          ],
        },
      ]}
      footerNote="2.5 GB of bandwidth per 10k pageviews | <strong>$1.00 per extra GB</strong> | 20 requests per pageview | <strong>$0.10 per additional 1,000 requests</strong>"
      footerNote2="Limits are subject to change without prior notice."
    />
  );
}


