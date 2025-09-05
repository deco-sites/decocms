import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Signal } from "@preact/signals";

export interface FeatureItem {
  name: string;
  image?: ImageWidget;
}

export interface Feature {
  title: string;
  description: string;
  items: FeatureItem[];
  imagePosition: "left" | "right";
}

function FeatureCard({ feature, featureIndex, activeFeatures, handleFeatureClick }: {
  feature: Feature;
  featureIndex: number;
  activeFeatures: Signal<{ [key: number]: number }>; // index of active item per feature
  handleFeatureClick: (featureIndex: number, itemIndex: number) => void;
}) {
  const activeItemIndex = activeFeatures.value[featureIndex] ?? 0;
  const activeItem = feature.items[activeItemIndex];
  const progress = useSignal<number>(0);

  // Auto-advance timer and progress updater (5s per item)
  useEffect(() => {
    progress.value = 0;
    const stepMs = 50;
    const totalMs = 5000;
    const increment = 100 / (totalMs / stepMs);

    const intervalId = setInterval(() => {
      const next = progress.value + increment;
      if (next >= 100) {
        progress.value = 100;
        clearInterval(intervalId);
        const nextIndex = (activeItemIndex + 1) % feature.items.length;
        handleFeatureClick(featureIndex, nextIndex);
      } else {
        progress.value = next;
      }
    }, stepMs);

    return () => clearInterval(intervalId);
  }, [featureIndex, activeItemIndex, feature.items.length]);

  const content = (
    <div class="flex-1 self-stretch pl-8 pr-20 py-8 flex flex-col justify-between items-start">
      <div class="self-stretch flex flex-col justify-start items-start gap-6">
        <h3 class="self-stretch text-dc-900 text-5xl font-medium leading-[57.60px]">
          {feature.title}
        </h3>
        <p class="self-stretch text-dc-500 text-2xl font-normal leading-9">
          {feature.description}
        </p>
      </div>
      <div class="self-stretch flex flex-col justify-start items-start gap-2">
        {feature.items.map((item, itemIndex) => {
          const isActive = activeItemIndex === itemIndex;
          const buttonClasses = `self-stretch p-4 rounded-xl flex justify-center items-center gap-2 transition-colors relative overflow-hidden ${
            isActive
              ? "bg-dc-50 text-dc-800"
              : "bg-dc-200 text-dc-500 hover:bg-dc-300"
          }`;

          return (
            <button
              key={itemIndex}
              type="button"
              onClick={() => handleFeatureClick(featureIndex, itemIndex)}
              class={buttonClasses}
            >
              <div class="flex-1 text-left text-lg font-normal leading-relaxed relative z-10">
                {item.name}
              </div>
              {isActive && (
                <div
                  class="absolute left-0 inset-y-0 z-0"
                  style={{ width: `${progress.value}%`, backgroundColor: "#F1FE9F" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const image = (
    <div class="flex-1 h-[662px] p-3 relative bg-[#D0EC1A] rounded-2xl border border-dc-200 flex flex-col justify-end items-end gap-4 overflow-hidden">
      <div class="w-[794px] h-[780px] absolute left-0 top-[-22.57px] opacity-20 bg-[#07401A]"></div>

      {activeItem?.image && (
        <div class="absolute inset-3 bg-white rounded-xl overflow-hidden">
          <img
            src={activeItem.image}
            alt={activeItem.name}
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );

  return (
    <div class="w-full max-w-[1312px] h-[678px] p-2 bg-dc-100 rounded-xl flex justify-start items-center gap-6 overflow-hidden">
      {feature.imagePosition === "left" ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
}

export default function FeaturesInteractive({ features }: { features: Feature[] }) {
  const initialActive = Object.fromEntries(
    features.map((_, idx) => [idx, 0])
  ) as { [key: number]: number };

  const activeFeatures = useSignal<{ [key: number]: number }>(initialActive);

  const handleFeatureClick = (featureIndex: number, itemIndex: number) => {
    activeFeatures.value = {
      ...activeFeatures.value,
      [featureIndex]: itemIndex,
    };
  };

  return (
    <div class="self-stretch flex flex-col justify-center items-center gap-4">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          feature={feature}
          featureIndex={index}
          activeFeatures={activeFeatures}
          handleFeatureClick={handleFeatureClick}
        />
      ))}
    </div>
  );
}


