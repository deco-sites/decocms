import type { CardGridBlock } from "../../../types/blogContent.ts";

export function CardGrid({ columns, cards }: CardGridBlock) {
  const gridClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-2 my-6 ${gridClass}`}>
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white border border-dc-200 rounded-xl p-6 flex flex-col items-start gap-4"
        >
          {card.icon && (
            <div className="size-6 text-dc-600 shrink-0 text-2xl">
              {card.icon}
            </div>
          )}
          <div className="flex flex-col gap-0.5 w-full">
            <h4 className="text-[16px] font-medium text-dc-800 mb-0 mt-0 leading-[1.5]">
              {card.title}
            </h4>
            <p
              className="text-[16px] text-dc-600 mb-0 leading-[1.5] [&_em]:italic"
              dangerouslySetInnerHTML={{ __html: card.content }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
