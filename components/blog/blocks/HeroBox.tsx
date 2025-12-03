import type { HeroBoxBlock } from "../../../types/blogContent.ts";

export function HeroBox(
  { title, content, variant = "default", buttons }: HeroBoxBlock,
) {
  const bgClass = variant === "accent" ? "bg-purple-dark" : "bg-primary-dark";
  const titleClass = variant === "accent"
    ? "text-purple-light"
    : "text-primary-light";
  const contentClass = variant === "accent"
    ? "text-purple-light"
    : "text-primary-light";

  const buttonVariantStyles = {
    primary: "bg-primary-light text-primary-dark border-0",
    secondary: "bg-dc-50 text-dc-800 border border-dc-200",
    ghost: "bg-transparent text-primary-light border border-primary-light",
  };

  return (
    <div
      className={`${bgClass} border border-dc-200 rounded-xl p-6 my-6 flex flex-col gap-6`}
    >
      <h3
        className={`text-2xl font-medium mb-0 mt-0 ${titleClass} leading-[1.5]`}
      >
        {title}
      </h3>
      <p className={`text-[16px] mb-0 ${contentClass} leading-[1.5]`}>
        {content}
      </p>
      {buttons && buttons.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {buttons.map((button, i) => (
            <a
              key={i}
              href={button.href}
              className={`inline-flex items-center gap-2 px-4 py-2 h-10 rounded-xl font-medium text-[16px] leading-5 no-underline transition-all hover:opacity-90 whitespace-nowrap ${
                buttonVariantStyles[button.variant]
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
