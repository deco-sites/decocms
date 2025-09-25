import { useSection } from "@deco/deco/hooks";
import CountdownIsland from "../islands/CountdownIsland.tsx";

export interface Props {
  title?: string;
  subtitle?: string;
  endDate?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function BlackFridayCountdown({
  title = "⏰ OFERTA POR TEMPO LIMITADO",
  subtitle = "Aproveite antes que acabe!",
  endDate = "2024-11-29T23:59:59",
  backgroundColor = "bg-red-600",
  textColor = "text-white",
}: Props) {
  return (
    <section class={`${backgroundColor} ${textColor} py-8 px-4`}>
      <div class="container mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-2">
          {title}
        </h2>
        <p class="text-lg mb-6 opacity-90">
          {subtitle}
        </p>

        <CountdownIsland
          endDate={endDate}
          textColor={textColor}
        />

        <div class="mt-6">
          <p class="text-sm opacity-75">
            ⚡ Não perca essa oportunidade única!
          </p>
        </div>
      </div>
    </section>
  );
}
