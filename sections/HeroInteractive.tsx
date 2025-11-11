import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../components/ui/Icon.tsx";
import HeroInteractiveClient from "../islands/HeroInteractiveClient.tsx";

/**
 * @titleBy name
 */
interface AppIcon {
  /** @title Nome do App */
  /** @description Nome interno do app (ex: "Gmail") */
  name: string;
  
  /** @title Ícone */
  /** @description Imagem do ícone do app */
  icon: ImageWidget;
  
  /** @title Identificador */
  /** @description Identificador do app (ex: "gmail", "slack") */
  mention: string;
}

/**
 * @titleBy label
 */
interface PromptTemplate {
  /** @title Label */
  /** @description Texto do botão */
  label: string;
  
  /** @title Ícone (Material Design) */
  /** @description Nome do ícone do Material Design */
  icon: string;
  
  /** @title Texto Completo */
  /** @description Texto que será preenchido no input quando clicar */
  fullText: string;
}

/**
 * @titleBy name
 */
interface Theme {
  /** @title Nome do Tema */
  name: string;
  
  /** @title Preview (opcional) */
  /** @description URL da imagem de preview do tema */
  preview?: ImageWidget;
  
  /** @title É ícone? */
  /** @description Se true, mostra um ícone ao invés de preview */
  isIcon?: boolean;
  
  /** @title Nome do Ícone */
  /** @description Nome do ícone (caso isIcon seja true) */
  iconName?: string;
  
  /** @title Cores */
  /** @description Array com 2 cores hex para identificação do tema */
  colors?: string[];
}

export interface Props {
  /** @title Título */
  title?: string;
  
  /** @title Subtítulo */
  subtitle?: string;
  
  /** @title Apps / Integrações */
  /** @description Lista de ícones de apps para o carrossel */
  apps?: AppIcon[];
  
  /** @title Templates de Prompt */
  /** @description Botões de exemplo que preenchem o input */
  promptTemplates?: PromptTemplate[];
  
  /** @title Temas Disponíveis */
  /** @description Lista de temas para o usuário escolher */
  themes?: Theme[];
}

const defaultProps: Props = {
  title: "Describe your AI app. We'll build it.",
  subtitle: "From idea to production in one prompt. Full-stack AI apps with custom interfaces, workflows, and your company's data—no code required.",
  apps: [
    { name: "Sheets", icon: "https://placehold.co/48x48", mention: "sheets" },
    { name: "Discord", icon: "https://placehold.co/48x48", mention: "discord" },
    { name: "Jira", icon: "https://placehold.co/48x48", mention: "jira" },
    { name: "GitHub", icon: "https://placehold.co/48x48", mention: "github" },
    { name: "Coda", icon: "https://placehold.co/48x48", mention: "coda" },
    { name: "Airtable", icon: "https://placehold.co/48x48", mention: "airtable" },
    { name: "Drive", icon: "https://placehold.co/48x48", mention: "drive" },
    { name: "Gmail", icon: "https://placehold.co/48x48", mention: "gmail" },
    { name: "Slack", icon: "https://placehold.co/48x48", mention: "slack" },
  ],
  promptTemplates: [
    { 
      label: "Dashboard for team's finance", 
      icon: "dashboard", 
      fullText: "Build a financial dashboard that aggregates data from GoogleSheets and Airtable, displays key metrics like revenue, expenses, and burn rate, and sends weekly reports to Slack" 
    },
    { 
      label: "CRM system", 
      icon: "person", 
      fullText: "Create a CRM system that integrates Gmail for email tracking, Slack for team notifications, Notion for documentation, and Calendar for meeting scheduling" 
    },
    { 
      label: "Competitor analysis", 
      icon: "search", 
      fullText: "Build a competitor analysis tool that monitors GitHub repositories, LinkedIn posts, Twitter mentions, and compiles insights in Notion with automated Slack alerts" 
    },
    { 
      label: "Customer support bot", 
      icon: "support_agent", 
      fullText: "Create an AI support bot that answers questions from Zendesk tickets, searches Notion knowledge base, and escalates to Slack when needed" 
    },
    { 
      label: "Social media scheduler", 
      icon: "schedule", 
      fullText: "Build a content scheduler that posts to Twitter, LinkedIn, and Instagram from Airtable content calendar with AI-generated captions" 
    },
    { 
      label: "Meeting notes assistant", 
      icon: "note_add", 
      fullText: "Generate meeting summaries from GoogleMeet transcripts, extract action items, create Jira tickets, and share notes in Slack" 
    },
    { 
      label: "Sales pipeline tracker", 
      icon: "trending_up", 
      fullText: "Track deals from HubSpot, sync with GoogleSheets, send daily updates to Slack, and alert team when deals move stages" 
    },
    { 
      label: "Email campaign analyzer", 
      icon: "email", 
      fullText: "Analyze Mailchimp campaigns, compare with GoogleAnalytics data, generate reports in Notion, and share insights via Slack" 
    },
    { 
      label: "Task automation workflow", 
      icon: "settings", 
      fullText: "Automate tasks between Asana, Trello, and Notion, sync deadlines with GoogleCalendar, and send reminders through Slack" 
    },
  ],
  themes: [
    { 
      name: "Light", 
      colors: ["#d0ec1a", "#ffffff", "#e5e5e5", "#262626"]
    },
    { 
      name: "Dark", 
      colors: ["#d0ec1a", "#171717", "#404040", "#fafafa"]
    },
    { 
      name: "Neo Brutalism", 
      colors: ["#ff3333", "#ffffff", "#000000", "#0066ff"]
    },
    { 
      name: "Graphite", 
      colors: ["#a0a0a0", "#1a1a1a", "#353535", "#d9d9d9"]
    },
    { 
      name: "Pastel Dreams", 
      colors: ["#a78bfa", "#f7f3f9", "#e9d8fd", "#374151"]
    },
    { 
      name: "Cyberpunk", 
      colors: ["#ff00c8", "#0c0c1d", "#2e2e5e", "#eceff4"]
    },
  ],
};

export default function HeroInteractive({
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  apps = defaultProps.apps,
  promptTemplates = defaultProps.promptTemplates,
  themes = defaultProps.themes,
}: Props) {
  const repetitions = 8;
  const trackApps = Array.from({ length: repetitions }, () => apps).flat();

  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-primary-light py-2 rounded-[24px] flex flex-col h-[calc(100vh-16px)] relative overflow-hidden">
        {/* Main Content */}
        <div class="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 pt-20 pb-2">
          <div class="w-full max-w-[1140px] flex flex-col gap-16 items-center">
            {/* Title and Subtitle */}
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

      {/* Load GSAP library */}
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        defer
      >
      </script>

      {/* Client-side interactive island */}
      <HeroInteractiveClient />
    </section>
  );
}

export function Preview() {
  return <HeroInteractive {...defaultProps} />;
}

export function LoadingFallback() {
  return <HeroInteractive {...defaultProps} />;
}

