import type { BlockquoteBlock } from "../../../types/blogContent.ts";

export function Blockquote(
  { text, cite, variant = "default" }: BlockquoteBlock,
) {
  if (variant === "quote") {
    return (
      <blockquote className="border-l-4 border-l-primary-dark bg-dc-50 border border-dc-200 p-6 rounded-lg my-8">
        <p className="text-[16px] leading-[1.5] mb-0">{text}</p>
        {cite && (
          <cite className="block mt-3 text-sm not-italic text-dc-600 font-semibold">
            {cite}
          </cite>
        )}
      </blockquote>
    );
  }

  return (
    <blockquote className="my-8 border-l-4 border-dc-200 text-[16px] pl-6 text-dc-800 leading-[1.5] break-words">
      {text}
    </blockquote>
  );
}
