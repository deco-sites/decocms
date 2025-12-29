import type { StepsBlock } from "../../../types/blogContent.ts";

export function Steps({ steps }: StepsBlock) {
  return (
    <div className="my-8">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`flex gap-5 items-start relative pb-5 ${
            i !== steps.length - 1
              ? "after:content-[''] after:absolute after:left-[11px] after:top-[24px] after:bottom-0 after:w-[2px] after:bg-dc-300"
              : ""
          }`}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-light text-dc-800 flex items-center justify-center font-normal text-[16px] relative z-10 leading-none">
            {step.number}
          </div>
          <div className="flex-1 flex flex-col gap-2.5 pt-0.5">
            <h3 className="text-xl font-medium text-dc-800 mb-0 mt-0 leading-[1.5]">
              {step.title}
            </h3>
            <div 
              className="text-[16px] text-dc-600 mb-0 leading-[1.5] [&_strong]:font-semibold [&_strong]:text-dc-800 [&_em]:italic [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-4 [&_ul:last-child]:mb-0 [&_li]:mb-1 [&_li:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: step.content }}
            />
            {step.goal && (
              <p className="text-[16px] text-dc-600 mb-0 leading-[1.5] font-semibold">
                <strong>Goal:</strong> {step.goal}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
