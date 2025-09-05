import { ComponentChildren } from "preact";

export interface ButtonProps {
  /**
   * @title Variante
   * @description Estilo visual do botão
   */
  variant?: "primary" | "secondary" | "ghost";
  /**
   * @title Tamanho
   * @description Tamanho do botão
   */
  size?: "small" | "medium" | "large";
  /**
   * @title URL
   * @description Link para onde o botão direciona (opcional)
   */
  href?: string;
  /**
   * @title Ação de clique
   * @description Função executada ao clicar no botão (para botões que não são links)
   */
  onClick?: () => void;
  /**
   * @title Classes adicionais
   * @description Classes CSS adicionais para personalização
   */
  className?: string;
  /**
   * @title Conteúdo do botão
   * @description Texto ou elementos dentro do botão
   */
  children: ComponentChildren;
  /**
   * @title Tipo do botão
   * @description Define o tipo do botão (para formulários)
   */
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant = "primary",
  size = "medium",
  href,
  onClick,
  className = "",
  children,
  type = "button",
}: ButtonProps) {
  // Base classes for all buttons
  const baseClasses =
    "rounded-xl inline-flex justify-center items-center font-medium transition-colors";

  // Variant-specific classes
  const variantClasses = {
    primary:
      "bg-primary-light text-primary-dark hover:bg-primary-light/90 active:bg-primary-light/80",
    secondary:
      "bg-dc-50 text-dc-800 outline outline-1 outline-offset-[-0.5px] outline-dc-300 hover:bg-dc-100 active:bg-dc-200",
    ghost: "bg-transparent text-dc-500 hover:bg-dc-100 active:bg-dc-200",
  };

  // Size-specific classes
  const sizeClasses = {
    small: "px-3 py-2 text-sm gap-1.5",
    medium: "px-4 py-2.5 text-base gap-2",
    large: "px-5 py-3 text-lg gap-2.5",
  };

  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${
    sizeClasses[size]
  } ${className}`;

  // Render as link if href is provided
  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
