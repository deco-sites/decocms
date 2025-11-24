import type { ChecklistBlock } from "../../../types/blogContent.ts";

export function Checklist({ items }: ChecklistBlock) {
  return (
    <div className="flex flex-col my-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 py-2 text-[16px] text-dc-600 leading-[1.5] relative pl-7 before:content-['✓'] before:absolute before:left-0 before:flex before:items-center before:justify-center before:w-4 before:h-4 before:rounded-full before:bg-green-600 before:text-white before:text-xs before:font-bold before:shrink-0"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

