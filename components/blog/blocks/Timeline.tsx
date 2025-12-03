import type { TimelineBlock } from "../../../types/blogContent.ts";

export function Timeline({ items }: TimelineBlock) {
  return (
    <div className="my-8">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex gap-4 items-start relative ${
            i !== items.length - 1
              ? "pb-8 after:content-[''] after:absolute after:left-[5px] after:top-[12px] after:bottom-0 after:w-[2px] after:bg-dc-200"
              : ""
          }`}
        >
          <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary-light border-2 border-primary-dark relative z-10 mt-1" />
          <div className="flex-1">
            <h4 className="text-lg font-bold text-primary-dark mb-2 mt-0 leading-[1.5]">
              {item.title}
            </h4>
            <p className="text-[16px] text-dc-600 mb-0 leading-[1.5]">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
