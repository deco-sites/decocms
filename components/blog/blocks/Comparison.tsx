import type { ComparisonBlock } from "../../../types/blogContent.ts";
import Icon from "../../ui/Icon.tsx";

export function Comparison({ before, after }: ComparisonBlock) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-6">
      <div className="p-6 rounded-xl border border-red-300 bg-red-50 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon name="close" size="xl" class="text-red-800" />
          <h4 className="text-[16px] font-normal mb-0 mt-0 leading-[1.5] text-red-800">
            {before.title}
          </h4>
        </div>
        <ul className="list-disc ml-6 text-[16px] mb-0 text-red-800">
          {before.items.map((item, i) => (
            <li key={i} className="leading-[1.5] mb-2 text-[16px]">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 rounded-xl border border-lime-300 bg-lime-50 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon name="check" size="xl" class="text-lime-800" />
          <h4 className="text-[16px] font-normal mb-0 mt-0 leading-[1.5] text-lime-800">
            {after.title}
          </h4>
        </div>
        <ul className="list-disc ml-6 text-[16px] mb-0 text-lime-800">
          {after.items.map((item, i) => (
            <li key={i} className="leading-[1.5] mb-2 text-[16px]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
