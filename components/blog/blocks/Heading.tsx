import type { HeadingBlock } from "../../../types/blogContent.ts";

export function Heading({ level, text }: HeadingBlock) {
  const baseStyles =
    "[&_strong]:font-bold [&_em]:italic [&_code]:bg-dc-100 [&_code]:text-dc-800 [&_code]:px-2 [&_code]:py-px [&_code]:rounded-md [&_code]:font-mono";

  const className = {
    1: `text-dc-800 text-[30px] font-bold font-sans leading-[1.25] mt-2 mb-4 break-words ${baseStyles}`,
    2: `text-dc-800 text-2xl font-semibold font-sans leading-[1.25] mt-12 mb-4 break-words ${baseStyles}`,
    3: `text-dc-800 text-xl font-semibold font-sans leading-[1.25] mt-8 mb-4 break-words ${baseStyles}`,
    4: `text-dc-800 text-base font-semibold font-sans leading-[1.5] mt-6 mb-4 break-words ${baseStyles}`,
    5: `text-dc-800 text-sm font-medium font-sans leading-[1.5] mt-4 mb-4 break-words ${baseStyles}`,
    6: `text-dc-800 text-sm font-medium font-sans leading-[1.5] mt-4 mb-4 break-words ${baseStyles}`,
  }[level];

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: text }} />
  );
}
