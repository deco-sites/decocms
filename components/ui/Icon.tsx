import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "QuestionMarkCircle"
  | "User"
  | "ShoppingCart"
  | "Bars3"
  | "Heart"
  | "MagnifyingGlass"
  | "XMark"
  | "Plus"
  | "Minus"
  | "MapPin"
  | "Phone"
  | "Elo"
  | "Mastercard"
  | "Visa"
  | "Pix"
  | "Logo"
  | "Facebook"
  | "Instagram"
  | "Tiktok"
  | "Truck"
  | "Discount"
  | "Return"
  | "CreditCard"
  | "Deco"
  | "Discord"
  | "Trash"
  | "FilterList"
  | "WhatsApp"
  | "ArrowsPointingOut"
  | "Linkedin"
  | "XTwitter"
  | "Link"
  | "LinkedinOutline"
  | "FacebookOutline"
  | "TwitterOutline";

interface IconProps {
  /**
   * @title Nome do ícone
   * @description O nome do ícone do Material Design a ser exibido
   */
  name: string;
  /**
   * @title Tamanho do ícone
   * @description Tamanho do ícone (xs, small, medium, large, xl, immense)
   */
  size?: "xs" | "small" | "medium" | "large" | "xl" | "xxl" | "immense";
  /**
   * @title Classes adicionais
   * @description Classes CSS adicionais para estilizar o ícone
   */
  class?: string;
}

export default function Icon({
  name,
  size = "medium",
  class: className = "",
}: IconProps) {
  const sizeClasses = {
    xs: "text-xs", // 12px
    small: "text-sm", // 14px
    medium: "text-base", // 16px
    large: "text-lg", // 18px
    xl: "text-xl", // 20px
    xxl: "text-2xl", // 32px
    immense: "text-8xl", // 80px
  };

  const sizeValues = {
    xs: "12px",
    small: "14px",
    medium: "16px",
    large: "18px",
    xl: "20px",
    xxl: "32px",
    immense: "80px",
  };

  return (
    <span
      class={`material-symbols-rounded ${sizeClasses[size]} ${className}`}
      style={`font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0; font-size: ${
        sizeValues[size]
      } !important;`}
    >
      {name}
    </span>
  );
}

// Exemplo de utilização:
// <Icon name="home" size="medium" class="text-primary-dark" />
// Para tamanhos customizados: <Icon name="home" class="text-2xl text-primary-dark" />
