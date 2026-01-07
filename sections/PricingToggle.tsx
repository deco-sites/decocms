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
        <div class="flex flex-col items-center gap-4 mb-10 md:mb-12">
          <h2 class={`${styles.title} text-3xl sm:text-4xl lg:text-heading-lg font-medium text-center max-w-[280px] sm:max-w-md lg:max-w-2xl tracking-tight`}>
            {renderTitle()}
          </h2>
          {subtitle && (
            <p class={`${styles.subtitle} text-base sm:text-lg lg:text-xl text-center max-w-xl leading-relaxed`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Toggle */}
        <div class="flex flex-col items-center gap-3 mb-10 md:mb-14">
          <span class={`text-xs uppercase tracking-widest font-medium ${styles.subtitle}`}>
            Select your plan
          </span>
          <div class={`${styles.toggleContainer} rounded-xl p-1.5 flex gap-1 shadow-inner`}>
            {/* Option 1 Button - AI Platform */}
            <button
              type="button"
              data-toggle-btn="0"
              data-active-class={styles.toggleActive}
              data-inactive-class={styles.toggleInactive}
              class={`pricing-toggle-btn group flex flex-col items-center sm:items-start gap-1.5 px-4 py-3 sm:px-6 sm:py-4 rounded-lg transition-all duration-300 cursor-pointer ${styles.toggleActive} min-w-40 sm:min-w-56`}
            >
              <span class="h-5 flex items-center">
                <svg width="85" height="21" viewBox="0 0 85 21" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-auto">
                  <path d="M14.9534 0.213898C16.0704 -0.203568 18.0513 -0.147426 19.0813 1.6514L19.1819 1.83792L19.1966 1.86722L20.5657 4.66605C20.9325 4.62175 21.3095 4.59673 21.6966 4.59671C23.6158 4.59686 25.4649 5.19743 26.7532 6.54788C28.466 5.31412 30.6051 4.59778 32.9407 4.59769C34.283 4.59778 35.5047 4.85015 36.429 5.26956C36.6287 5.3602 36.8139 5.47205 36.9846 5.59964C38.2636 4.9626 39.7261 4.59678 41.3206 4.59671C43.749 4.59694 45.8861 5.4759 47.2356 7.22757C49.0626 5.57989 51.5302 4.59779 54.2669 4.59769C55.6095 4.5977 56.8308 4.85017 57.7552 5.26956C57.7578 5.27077 57.7603 5.27226 57.763 5.27347C58.1461 4.98866 58.5982 4.79458 59.0872 4.7178C59.7401 4.61529 60.4196 4.55287 61.0735 4.60062C61.4592 4.6288 61.9402 4.7033 62.4397 4.89456C63.2777 4.57414 64.0999 4.46882 64.8108 4.46878C65.698 4.46878 66.6347 4.63083 67.4973 5.05081C68.3239 4.66655 69.227 4.46884 70.1751 4.46878C71.688 4.4688 73.1725 4.91037 74.2561 5.94339L74.26 5.94144C74.9775 5.43515 75.7689 5.07202 76.6018 4.82913L76.9212 4.74222C77.6704 4.55356 78.439 4.46589 79.218 4.46585C79.9512 4.46585 80.6789 4.52567 81.3684 4.67777C81.8443 4.78278 82.2834 4.95646 82.5198 5.05472C82.6564 5.11152 82.7734 5.16337 82.8577 5.20218C82.9003 5.2218 82.9361 5.23909 82.9632 5.25198C82.9765 5.25835 82.9882 5.26316 82.9973 5.26761C83.002 5.26986 83.0065 5.27175 83.01 5.27347L83.0149 5.2764L83.0169 5.27737L83.0178 5.27835C83.9798 5.75092 84.618 6.70117 84.6897 7.77054C84.7942 9.32895 84.283 10.8547 83.4094 11.9639C83.3146 12.0843 83.2102 12.1945 83.1009 12.2969C83.1128 12.3298 83.1257 12.3624 83.137 12.3955L83.138 12.3965C83.3979 13.1605 83.4417 13.929 83.3538 14.6446C83.2343 15.6171 82.9179 16.5613 82.3606 17.4131C81.9172 18.0909 81.366 18.6724 80.7249 19.1504L80.4446 19.3487C79.694 19.8538 78.8703 20.2055 78.012 20.4287H78.01C77.1758 20.6453 76.3143 20.747 75.4368 20.7471C74.5635 20.7471 73.7317 20.6496 72.9221 20.4326C72.5254 20.3263 72.1551 20.1709 71.8694 20.0371C71.567 20.2155 71.2319 20.3424 70.8772 20.4063C69.4656 20.6606 67.9823 20.6607 66.5706 20.4063C66.374 20.3709 66.1837 20.3142 66.0012 20.2422C65.8179 20.3149 65.6262 20.3715 65.428 20.4073C64.0163 20.6617 62.533 20.6616 61.1214 20.4073C60.8883 20.3653 60.6633 20.2953 60.4505 20.2022C60.2565 20.2829 60.0533 20.3459 59.8421 20.3848C58.4446 20.642 56.9099 20.6418 55.512 20.3848C55.3325 20.3518 55.1584 20.3011 54.9905 20.2373C53.8884 20.6241 52.5888 20.8447 51.3401 20.8448C48.9144 20.8447 46.8366 20.0253 45.512 18.3926C43.7304 19.9971 41.3924 20.8438 38.9651 20.8438C37.3818 20.8437 35.9308 20.4706 34.7415 19.7315C34.5778 19.8456 34.4023 19.9449 34.2161 20.0254C33.0131 20.5454 31.4778 20.8446 30.0139 20.8448C28.1478 20.8447 26.4877 20.3589 25.218 19.3916C25.0741 19.4999 24.9205 19.597 24.7571 19.6787C22.939 20.5878 20.911 20.8438 19.5325 20.8438C16.9838 20.8436 14.8299 19.9646 13.512 18.2041C13.2459 18.4913 12.9667 18.7597 12.6712 19.0059C11.0288 20.374 9.1924 20.8438 7.2532 20.8438C4.61618 20.8436 2.13407 19.8543 0.826442 17.4893C-0.383644 15.3007 -0.118528 12.7414 0.685817 10.5655L0.6907 10.5528C2.18434 6.56946 5.78509 4.70012 9.21609 4.60159C9.20605 2.82795 10.5466 1.8807 11.3675 1.56839L14.9524 0.209992L14.9534 0.213898Z" fill="#07401A"/>
                  <path d="M32.941 7.59765C33.9382 7.59768 34.7226 7.78931 35.189 8.00098C35.1256 8.76396 34.8077 9.50643 34.2564 10.249C33.9383 10.0578 33.4299 9.97366 32.9205 9.97365C30.9052 9.97365 29.6312 11.1201 29.1432 12.5411C28.6982 13.8782 28.8885 15.4473 31.0103 15.4473C31.795 15.4473 32.5596 15.2352 33.0894 15.0235C33.3021 15.766 33.2806 16.5075 33.026 17.2716C32.2403 17.6112 31.1159 17.8447 30.0133 17.8448C25.8772 17.8448 25.1974 14.7261 26.0885 12.2012C27.0226 9.52812 29.6316 7.59765 32.941 7.59765ZM54.2672 7.59765C55.2644 7.59766 56.0487 7.78931 56.5152 8.00098C56.4517 8.76396 56.1338 9.50643 55.5826 10.249C55.2644 10.0578 54.756 9.97267 54.2466 9.97267C52.2313 9.97269 50.9583 11.1191 50.4703 12.5401C50.0255 13.8771 50.2161 15.4462 52.3375 15.4463C53.1221 15.4463 53.8857 15.2342 54.4156 15.0225C54.6285 15.7653 54.6069 16.5073 54.3521 17.2716C53.5664 17.6112 52.4421 17.8448 51.3394 17.8448C47.2034 17.8448 46.5236 14.7261 47.4146 12.2012C48.3487 9.52803 50.9577 7.59765 54.2672 7.59765ZM16.0143 3.01558C16.1626 2.95233 16.3952 2.97404 16.5016 3.18551L17.9439 6.13377C18.0922 6.43031 17.923 6.62178 17.6051 6.51561L16.4186 6.1328C15.9087 7.2186 15.4314 8.30968 14.9508 9.40919C14.4923 10.4582 14.0297 11.5152 13.5328 12.5821C11.6658 16.5492 10.075 17.8438 7.25353 17.8438C3.41445 17.8436 2.20553 15.1063 3.49962 11.6055C4.5176 8.8907 6.99933 7.59668 9.50255 7.59668C9.94751 7.59668 10.4785 7.63979 10.9234 7.7666C10.7966 8.57273 10.4789 9.4642 10.0543 10.0586C8.50544 9.61365 7.14757 10.2495 6.34142 12.3916C5.64173 14.2371 5.91787 15.5312 7.57189 15.5313C9.05984 15.5313 9.60409 14.3468 10.4088 12.5957C10.4987 12.4001 10.592 12.1972 10.69 11.9883C11.1695 10.9595 11.7141 9.59507 12.2516 8.24707C12.6889 7.15034 13.1213 6.06445 13.5113 5.17966L12.4508 4.83982C12.153 4.75489 12.1327 4.47945 12.4293 4.37302L16.0143 3.01558ZM21.6969 7.59668C24.5601 7.59678 25.7716 9.48558 25.0719 11.3311C24.3721 13.155 22.2284 13.8975 18.1129 13.7911C18.0914 15.0218 18.9195 15.5098 20.4254 15.5098C21.4432 15.5098 22.5675 15.2761 23.3736 14.8731C23.6068 15.5942 23.6284 16.2944 23.4156 16.9952C22.143 17.6315 20.6152 17.8438 19.5328 17.8438C15.2474 17.8438 14.6965 14.6401 15.566 12.1368C16.3938 9.78182 18.6423 7.59668 21.6969 7.59668ZM41.3209 7.59668C45.1394 7.59691 46.3054 10.5449 45.2662 13.4942C44.2687 16.2942 41.7654 17.8438 38.9654 17.8438C35.126 17.8438 34.0431 14.8734 35.0406 12.0303C35.9317 9.50544 38.2661 7.59668 41.3209 7.59668ZM79.2183 7.46582C79.7958 7.46582 80.2975 7.51372 80.7222 7.60742C81.147 7.70116 81.6958 7.9707 81.6958 7.9707C81.7498 8.77458 81.4753 9.57039 81.0523 10.1074C81.0354 10.101 80.2889 9.81716 79.9683 9.72365C79.644 9.62992 79.2663 9.58302 78.8365 9.58302C78.4464 9.58306 78.1249 9.6608 77.8716 9.81447C77.6175 9.96901 77.4739 10.1807 77.441 10.4492C77.3946 10.8258 77.7515 11.2016 78.5113 11.5782C78.7629 11.7124 79.011 11.8632 79.2525 12.0313C79.494 12.1993 79.7046 12.395 79.8853 12.6162C80.066 12.8384 80.2037 13.087 80.2974 13.3623C80.3911 13.6376 80.4179 13.9434 80.3765 14.2793C80.3072 14.8434 80.1313 15.3408 79.8501 15.7706C79.5689 16.2004 79.2082 16.5639 78.7691 16.8594C78.33 17.155 77.8247 17.3767 77.2564 17.5245C76.6873 17.6722 76.0803 17.7471 75.4361 17.7471C74.7917 17.7471 74.2249 17.6753 73.6988 17.5343C73.1769 17.3946 72.52 16.9884 72.5074 16.9805C72.4103 16.4788 72.7049 15.126 73.1626 14.795C73.1749 14.801 73.7491 15.0856 73.939 15.1651C74.1306 15.2453 74.336 15.3193 74.5562 15.3868C74.7766 15.4543 75.0051 15.5114 75.2408 15.5587C75.4772 15.6059 75.7153 15.629 75.9576 15.629C76.3739 15.629 76.6976 15.5421 76.9273 15.3672C77.1569 15.1925 77.2874 14.9846 77.3169 14.7422C77.3464 14.5001 77.2814 14.2859 77.1236 14.0977C76.9656 13.9094 76.6717 13.7015 76.2427 13.4727C75.6998 13.1907 75.2493 12.8371 74.8921 12.4141C74.5341 11.991 74.3933 11.4698 74.4693 10.8516C74.5318 10.3416 74.6965 9.87805 74.9624 9.46095C75.2285 9.04468 75.571 8.68812 75.9898 8.39258C76.4086 8.09702 76.8935 7.86846 77.4449 7.70801C77.9955 7.54671 78.5858 7.46583 79.2183 7.46582ZM70.1753 7.46875C72.741 7.46877 73.1867 9.31131 72.6148 11.3037C72.1486 12.9153 71.1304 15.8209 70.3453 17.4532C69.2853 17.6442 68.1621 17.6442 67.1021 17.4532C67.8227 15.9486 68.9887 12.5976 69.2857 11.7285C69.731 10.4144 69.6032 9.80001 68.6919 9.79982C67.9921 9.79982 67.4419 10.1819 66.6568 12.5772C66.1261 14.2106 65.5533 15.822 64.8961 17.4542C63.836 17.6452 62.7129 17.6452 61.6529 17.4542C62.2469 15.9497 63.4549 12.622 63.7095 11.7305C63.9639 10.8614 64.2389 9.8008 63.0728 9.8008C62.0553 9.80085 61.7584 10.5861 61.1011 12.4727C60.9777 12.8233 60.865 13.1435 60.7593 13.4454C60.2838 14.8042 59.9407 15.7856 59.2984 17.4337C58.2601 17.6248 57.0938 17.6248 56.0543 17.4337C57.3262 14.0622 58.2585 11.455 59.5523 7.68066C61.7151 7.34109 62.0761 7.91282 61.8218 9.10059C62.7761 7.72297 63.9202 7.46875 64.8111 7.46875C66.2316 7.46875 67.1007 8.14704 67.2066 9.18653C67.9917 7.97784 69.03 7.46875 70.1753 7.46875ZM40.8541 9.91017C39.4332 9.91017 38.4789 11.2039 38.0758 12.4346C37.5663 13.9835 37.8424 15.5743 39.4547 15.5743C40.8335 15.5742 41.7879 14.3653 42.2125 13.0928C42.7005 11.6074 42.5296 9.91027 40.8541 9.91017ZM21.2525 9.74025C20.0853 9.74036 19.1955 10.4833 18.6227 11.7559C21.1679 11.7559 22.039 11.3738 22.2926 10.7578C22.4623 10.3129 22.2918 9.74025 21.2525 9.74025Z" fill="#D0EC1A"/>
                </svg>
              </span>
              <span class={`text-xs sm:text-sm ${styles.toggleSubtext} leading-snug hidden sm:block`}>
                {option1?.description}
              </span>
            </button>

            {/* Option 2 Button - deco.cx */}
            <button
              type="button"
              data-toggle-btn="1"
              data-active-class={styles.toggleActive}
              data-inactive-class={styles.toggleInactive}
              class={`pricing-toggle-btn group flex flex-col items-center sm:items-start gap-1.5 px-4 py-3 sm:px-6 sm:py-4 rounded-lg transition-all duration-300 cursor-pointer ${styles.toggleInactive} min-w-40 sm:min-w-56`}
            >
              <span class="h-5 flex items-center">
                <svg width="72" height="20" viewBox="0 0 72 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-5 w-auto">
                  <path d="M71.2185 9.03704L68.2556 12.6667C68.8482 13.7778 69.5148 14.8148 70.1815 15.7778C70.6259 16.3704 70.7741 17.1852 70.5519 17.9259V18C70.2556 19.037 69.3667 19.8519 68.2556 19.9259C67.5889 20 66.9222 20 66.2556 20C65.5889 20 64.9222 20 64.2556 19.9259C63.5889 19.8519 63.0704 19.5556 62.6259 19.1111C62.1815 19.5556 61.663 19.8519 60.9963 19.9259C60.4037 20 59.663 20 58.9963 20C58.2556 20 57.5889 20 56.9963 19.9259C56.6259 19.8519 56.3296 19.7778 56.0333 19.6296C55.2185 19.8519 54.3296 19.9259 53.4407 19.9259C51.5148 19.9259 50.1815 19.4074 49.1444 18.7407C48.2556 19.4815 47.1444 19.9259 45.8852 19.9259C44.3296 19.9259 43.3667 19.2593 42.7741 18.7407C41.4407 19.4815 39.8111 19.9259 38.1815 19.9259C36.5519 19.9259 35.0704 19.4815 33.9593 18.7407C33.737 18.8889 33.5148 19.037 33.2926 19.1111C32.1815 19.6296 30.7 19.9259 29.2926 19.9259C26.9963 19.9259 25.5148 19.1852 24.5519 18.3704C24.4037 18.5185 24.1815 18.6667 23.9593 18.8148C21.9593 19.8519 19.8111 19.9259 18.9222 19.9259C15.663 19.9259 14.0333 18.5185 13.1444 17.3333C13.0704 17.2593 12.9963 17.1852 12.9963 17.037C11.5148 18.8148 9.58889 19.9259 6.77407 19.9259C4.25556 19.9259 2.25556 18.963 1.07037 17.3333C-0.188889 15.4815 -0.337037 12.963 0.625926 10.2963C1.95926 6.81481 5.14444 4.59259 8.9963 4.59259C8.9963 4.59259 9.07037 4.59259 9.14445 4.59259C9.14445 4.51852 9.14445 4.37037 9.14445 4.2963C9.07037 3.11111 9.88519 2 11.0704 1.55556L14.5519 0.222222C14.9222 0.074074 15.2926 0 15.663 0C16.7741 0 17.8111 0.592592 18.3296 1.62963L19.8111 4.66667C20.2556 4.59259 20.7 4.59259 21.1444 4.59259C23.2185 4.59259 24.9963 5.33333 26.1074 6.66667C27.8111 5.33333 29.9593 4.59259 32.3296 4.59259C33.5889 4.59259 34.7 4.81481 35.663 5.25926C35.8111 5.33333 36.0333 5.48148 36.1815 5.62963C37.5148 4.96296 38.9963 4.59259 40.5519 4.59259C42.9963 4.59259 45.0704 5.55555 46.2556 7.25926C46.8482 8.14815 47.2185 9.11111 47.3667 10.2222C48.8482 6.81481 52.3296 4.59259 56.3296 4.59259C57.2185 4.59259 58.1815 4.74074 58.9222 4.96296C59.0704 4.88889 59.2185 4.88889 59.4407 4.88889C60.0333 4.74074 60.6259 4.74074 61.2185 4.74074C61.8111 4.74074 62.4778 4.74074 63.0704 4.81481C63.5889 4.88889 64.0333 5.03704 64.4037 5.33333C64.7741 5.03704 65.2185 4.81481 65.737 4.81481C66.3296 4.74074 66.9963 4.74074 67.663 4.74074C68.3296 4.74074 68.9222 4.74074 69.5148 4.88889C70.4778 5.03704 71.2185 5.62963 71.5889 6.51852C71.9593 7.33333 71.8111 8.2963 71.2185 9.03704Z" fill="#07401A"/>
                  <path d="M65.1438 12.2962C66.0327 14.1481 67.0697 15.7777 68.0327 17.1851V17.2592C66.8475 17.3333 65.6623 17.3333 64.5512 17.2592C64.0327 16.5185 63.5142 15.4074 63.0697 14.2962L60.7734 17.2592C59.6623 17.3333 58.329 17.3333 57.292 17.2592L61.5883 12.074C60.8475 10.7407 60.1068 9.33328 59.6623 7.33328C60.6994 7.25921 61.7364 7.25921 62.7734 7.33328C63.0697 8.29625 63.366 9.33328 63.7364 10.2962L66.0327 7.33328C67.0697 7.18513 68.2549 7.18513 69.2179 7.33328L65.1438 12.2962ZM16.9957 6.07402C17.292 6.1481 17.5142 5.99995 17.366 5.70365L15.9586 2.81476C15.8846 2.59254 15.5883 2.59254 15.4401 2.66662L11.8845 3.99995C11.5883 4.07402 11.5883 4.37032 11.8845 4.44439L12.9957 4.74069C12.1068 6.66662 11.0697 9.62958 10.1808 11.4814C9.21788 13.5555 8.69936 14.9629 7.06973 14.9629C5.4401 14.9629 5.14381 13.7037 5.88455 11.8518C6.69936 9.70365 8.0327 9.11106 9.58825 9.55551C10.0327 8.96291 10.329 8.07402 10.4771 7.25921C10.0327 7.11106 9.51418 7.11106 9.06973 7.11106C6.55122 7.11106 4.10677 8.37032 3.14381 11.1111C1.7364 14.5925 2.92159 17.3333 6.77344 17.3333C9.58825 17.3333 11.1438 16.074 12.9957 12.1481C14.0327 9.99995 14.8475 7.8518 15.8845 5.77773L16.9957 6.07402ZM24.4031 10.8888C23.7364 12.6666 21.5883 13.4074 17.5142 13.3333C17.5142 14.5185 18.329 15.037 19.8105 15.037C20.8475 15.037 21.9586 14.8148 22.6994 14.3703C22.9216 15.1111 22.9216 15.7777 22.7734 16.4444C21.5142 17.1111 20.0327 17.2592 18.9216 17.2592C14.6994 17.2592 14.1068 14.074 14.9957 11.6296C15.8105 9.25921 18.0327 7.11106 21.0697 7.11106C23.9586 7.18513 25.1438 9.03699 24.4031 10.8888ZM20.6253 9.25921C19.4401 9.25921 18.5512 9.99995 18.0327 11.2592C20.5512 11.2592 21.4401 10.8888 21.6623 10.2962C21.8105 9.8518 21.6623 9.25921 20.6253 9.25921ZM32.1808 9.55551C32.6994 9.55551 33.2179 9.62958 33.5142 9.8518C34.0327 9.11106 34.4031 8.37032 34.4031 7.62958C33.9586 7.40736 33.1438 7.25921 32.1808 7.25921C28.9216 7.25921 26.329 9.18514 25.366 11.8518C24.4771 14.3703 25.1438 17.4814 29.292 17.4814C30.4031 17.4814 31.5142 17.2592 32.2549 16.8888C32.4771 16.1481 32.5512 15.4074 32.329 14.6666C31.8105 14.8888 31.0697 15.1111 30.2549 15.1111C28.1808 15.1111 27.9586 13.5555 28.4031 12.2222C28.9216 10.6666 30.1808 9.55551 32.1808 9.55551ZM46.6253 13.9259C45.366 13.9259 44.6994 14.7407 44.4031 15.4814C44.1068 16.3703 44.4771 17.4074 45.8845 17.4074C47.0697 17.4074 47.8105 16.6666 48.1068 15.9259C48.4031 14.9629 48.1068 13.9259 46.6253 13.9259ZM44.4771 13.037C43.4401 15.7777 40.9957 17.3333 38.1808 17.3333C34.4031 17.3333 33.292 14.3703 34.2549 11.5555C35.1438 9.03699 37.4401 7.18513 40.4771 7.18513C44.329 7.18513 45.5142 10.074 44.4771 13.037ZM40.1068 9.48143C38.6994 9.48143 37.7364 10.7407 37.366 11.9999C36.8475 13.5555 37.1438 15.1111 38.6994 15.1111C40.0327 15.1111 40.9957 13.9259 41.4401 12.6666C41.8845 11.1111 41.7364 9.48143 40.1068 9.48143ZM54.4031 14.9629C52.329 14.9629 52.1068 13.4074 52.5512 12.074C53.0697 10.6666 54.329 9.55551 56.329 9.55551C56.8475 9.55551 57.366 9.62958 57.6623 9.8518C58.1808 9.11106 58.5512 8.37032 58.5512 7.62958C58.1068 7.40736 57.292 7.25921 56.329 7.25921C53.0697 7.25921 50.4771 9.18514 49.5142 11.8518C48.6253 14.3703 49.292 17.4814 53.4401 17.4814C54.5512 17.4814 55.6623 17.2592 56.4031 16.8888C56.6253 16.1481 56.6994 15.4074 56.4771 14.6666C55.9586 14.7407 55.2179 14.9629 54.4031 14.9629Z" fill="#D0EC1A"/>
                </svg>
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

            // Scroll animations - immediately show elements, no hidden state
            const animatedElements = section.querySelectorAll(".animate-on-scroll");
            
            // Set initial visible state for all elements immediately
            animatedElements.forEach((el, index) => {
              const element = el as HTMLElement;
              element.style.opacity = "0";
              element.style.transform = "translateY(20px)";
              element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
              
              // Stagger the animation
              setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
              }, 50 + index * 100);
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


