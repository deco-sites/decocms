import type { ButtonGroupBlock } from "../../../types/blogContent.ts";

export function ButtonGroup({ buttons }: ButtonGroupBlock) {
  const variantStyles = {
    primary: "bg-primary-light text-primary-dark border-0",
    secondary: "bg-dc-50 text-dc-800 border border-dc-200",
    ghost: "bg-transparent text-dc-700 border border-dc-200",
  };

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {buttons.map((button, i) => (
        <a
          key={i}
          href={button.href}
          className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-xl font-medium text-[16px] leading-5 no-underline transition-all hover:opacity-90 whitespace-nowrap ${
            variantStyles[button.variant]
          }`}
        >
          {button.text}
        </a>
      ))}
    </div>
  );
}

