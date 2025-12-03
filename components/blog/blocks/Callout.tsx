import type { CalloutBlock } from "../../../types/blogContent.ts";

export function Callout({ title, content, variant = "default" }: CalloutBlock) {
  const variantStyles = {
    default: "bg-white border-dc-200 text-dc-600",
    info: "bg-sky-50 border-sky-200 text-sky-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
    tip: "bg-lime-50 border-lime-300 text-lime-900",
    success: "bg-lime-50 border-lime-300 text-lime-900",
    danger: "bg-red-50 border-red-300 text-red-900",
  };

  return (
    <div
      className={`${
        variantStyles[variant]
      } border rounded-xl p-6 my-6 flex flex-col gap-2`}
    >
      {title && (
        <strong
          className="text-[16px] font-medium text-dc-800 block leading-[1.5]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      <p
        className="text-[16px] mb-0 leading-[1.5] [&_strong]:font-semibold [&_strong]:text-dc-800 [&_em]:italic [&_code]:bg-dc-100 [&_code]:text-dc-800 [&_code]:px-2 [&_code]:py-px [&_code]:rounded-md [&_code]:font-mono [&_a]:text-primary-dark [&_a]:underline hover:[&_a]:opacity-80"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
