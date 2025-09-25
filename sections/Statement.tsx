export interface Props {
  /** @title Statement */
  title?: string;
}

export default function Statement({
  title =
    "The control plane that turns AI prototypes into production—governed, observable, and cost-clear.",
}: Props) {
  return (
    <section class="w-full px-16 py-28 flex flex-col justify-center items-center bg-[#FAFAF9]">
      <div class="w-full max-w-[1280px] flex justify-center items-center">
        <h2 class="text-[64px] font-medium text-[#1C1917] leading-[64px] tracking-[-0.96px] text-center max-w-[900px]">
          {title}
        </h2>
      </div>
    </section>
  );
}
