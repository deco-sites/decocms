import type { StatsBlock } from "../../../types/blogContent.ts";

export function Stats({ stats }: StatsBlock) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="p-8 rounded-xl bg-white border border-dc-200 flex flex-col gap-0.5"
        >
          <div className="text-5xl font-bold text-dc-800 mb-0 leading-none">
            {stat.number}
          </div>
          <div className="text-[16px] text-dc-800 font-normal leading-[1.5]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

