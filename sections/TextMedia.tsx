import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @title Eyebrow */
  eyebrow?: string;
  /** @title Título */
  title?: string;
  /** @title Descrição */
  description?: string;
  /** @title Imagem */
  /** @description Imagem exibida no lado direito */
  image?: ImageWidget;
  /** @title Texto alternativo da imagem */
  imageAlt?: string;
}

export default function TextMedia({
  eyebrow = "Control pannel for your AI stack",
  title = "AI demos are easy. Production isn’t.",
  description =
    "DecoCMS bridges the gap between prompts and production. Connect your stack, govern every step, and deploy agentic apps with built-in observability, spend controls, and a marketplace to reuse or monetize your modules.",
  image = "https://placehold.co/1200x900",
  imageAlt = "Section image",
}: Props) {
  return (
    <section class="w-full px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 bg-dc-50 flex flex-col justify-start items-center gap-8 sm:gap-10 lg:gap-14">
      <div class="w-full max-w-[1440px] flex flex-col justify-start items-center gap-8 sm:gap-10 lg:gap-14">
        <div class="self-stretch flex flex-col justify-center items-start gap-4">
          <div class="w-full p-2 rounded-xl flex flex-col lg:flex-row justify-start items-stretch gap-4 sm:gap-6 overflow-hidden">
            <div class="flex-1 self-stretch px-4 sm:px-6 lg:pl-8 py-6 sm:py-7 lg:py-8 flex flex-col justify-between items-start">
              <div class="self-stretch flex-1 flex flex-col justify-start items-start gap-4 sm:gap-5 lg:gap-6">
                <div class="px-3 sm:px-4 py-1 bg-[#D0EC1A] rounded-full inline-flex justify-center items-center gap-2">
                  <div class="w-5 h-5 sm:w-6 sm:h-6">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-full h-full"
                    >
                      <path
                        d="M12 19.65L10.15 21.05C9.95 21.2 9.75 21.2042 9.55 21.0625C9.35 20.9208 9.29167 20.7333 9.375 20.5L10.1 18.2L8.275 16.9C8.075 16.7667 8.01667 16.5833 8.1 16.35C8.18333 16.1167 8.34167 16 8.575 16H10.8L11.5 13.7L7.95 11.6C7.65 11.4167 7.41667 11.175 7.25 10.875C7.08333 10.575 7 10.2333 7 9.85V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H15C15.55 2 16.0208 2.19583 16.4125 2.5875C16.8042 2.97917 17 3.45 17 4V9.85C17 10.2333 16.9167 10.575 16.75 10.875C16.5833 11.175 16.35 11.4167 16.05 11.6L12.5 13.7L13.2 16H15.425C15.6583 16 15.8167 16.1167 15.9 16.35C15.9833 16.5833 15.925 16.7667 15.725 16.9L13.9 18.2L14.625 20.5C14.7083 20.7333 14.65 20.9208 14.45 21.0625C14.25 21.2042 14.05 21.2 13.85 21.05L12 19.65ZM11 4V11.05L12 11.65L13 11.05V4H11Z"
                        fill="#07401A"
                      />
                    </svg>
                  </div>
                  <div class="text-[#07401A] text-sm sm:text-base font-medium leading-tight">
                    {eyebrow}
                  </div>
                </div>
                <h2 class="max-w-3xl text-dc-800 text-2xl sm:text-3xl lg:text-5xl font-medium leading-tight tracking-[-0.02em] lg:pr-20">
                  {title}
                </h2>
                <p class="text-[#78716C] text-base sm:text-lg lg:text-2xl leading-6 sm:leading-7 lg:leading-9 font-light lg:pr-32">
                  {description}
                </p>
              </div>
            </div>

            <div class="flex-1 min-h-[300px] h-[300px] sm:h-[400px] lg:h-[662px] p-2 sm:p-3 relative bg-[#D0EC1A] rounded-2xl border border-[#D6D3D1] overflow-hidden">
              <div class="absolute inset-2 sm:inset-3 bg-white rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt={imageAlt}
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
