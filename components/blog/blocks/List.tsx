import type { ListBlock } from "../../../types/blogContent.ts";

export function List({ ordered, items }: ListBlock) {
  const Tag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal" : "list-disc";

  return (
    <Tag className={`${listClass} pl-6 mb-6 text-dc-600 text-[16px] font-normal font-sans leading-[1.5] break-words [&_strong]:font-semibold [&_strong]:text-dc-800 [&_em]:italic [&_code]:bg-dc-100 [&_code]:text-dc-800 [&_code]:px-2 [&_code]:py-px [&_code]:rounded-md [&_code]:font-mono [&_a]:text-primary-dark [&_a]:underline hover:[&_a]:opacity-80`}>
      {items.map((item, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </Tag>
  );
}

