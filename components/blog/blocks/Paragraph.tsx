import type { ParagraphBlock } from "../../../types/blogContent.ts";

export function Paragraph({ text }: ParagraphBlock) {
  return (
    <p
      className="text-dc-600 text-[16px] font-normal font-sans leading-[1.5] mb-6 break-words [&_strong]:font-semibold [&_strong]:text-dc-800 [&_em]:italic [&_code]:bg-dc-100 [&_code]:text-dc-800 [&_code]:px-2 [&_code]:py-px [&_code]:rounded-md [&_code]:font-mono [&_a]:text-primary-dark [&_a]:underline hover:[&_a]:opacity-80"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
