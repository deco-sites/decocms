interface MarkupBadgeProps {
  /**
   * @title Texto do badge
   * @description Texto a ser exibido no badge (ex: "20% markup")
   */
  text: string;
  /**
   * @title Classes adicionais
   * @description Classes CSS adicionais para estilização
   */
  className?: string;
}

export default function MarkupBadge(
  { text, className = "" }: MarkupBadgeProps,
) {
  return (
    <div
      className={`px-3 py-1 bg-primary-light w-fit rounded-full inline-flex items-center justify-center ${className}`}
    >
      <span className="text-primary-dark text-sm font-normal leading-none">
        {text}
      </span>
    </div>
  );
}
