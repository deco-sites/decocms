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

function FeatureCard(
  { feature, featureIndex, activeFeatures, handleFeatureClick }: {
    feature: Feature;
    featureIndex: number;
    activeFeatures: Signal<{ [key: number]: number }>; // index of active item per feature
    handleFeatureClick: (featureIndex: number, itemIndex: number) => void;
  },
) {
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
    <div class="flex-1 self-stretch px-4 sm:px-6 lg:pl-8 lg:pr-20 py-4 sm:py-6 lg:py-8 flex flex-col justify-between items-start">
      <div class="self-stretch flex flex-col justify-start items-start gap-3 sm:gap-4 lg:gap-6">
        <h3 class="self-stretch text-dc-900 text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
          {feature.title}
        </h3>
        <p class="self-stretch text-dc-500 text-sm sm:text-base lg:text-2xl font-normal leading-relaxed lg:leading-9">
          {feature.description}
        </p>
      </div>
      <div class="self-stretch flex flex-col justify-start items-start gap-2">
        {feature.items.map((item, itemIndex) => {
          const isActive = activeItemIndex === itemIndex;
          const buttonClasses =
            `self-stretch p-3 sm:p-4 rounded-xl flex justify-center items-center gap-2 transition-colors relative overflow-hidden ${
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
              <div class="flex-1 text-left text-sm sm:text-base lg:text-lg font-normal leading-relaxed relative z-10">
                {item.name}
              </div>
              {isActive && (
                <div
                  class="absolute left-0 inset-y-0 z-0"
                  style={{
                    width: `${progress.value}%`,
                    backgroundColor: "#F1FE9F",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const image = (
    <div class="flex-1 relative rounded-xl sm:rounded-2xl border border-dc-200 overflow-hidden aspect-[4/5]">
      {activeItem?.image && (
        <img
          src={activeItem.image}
          alt={activeItem.name}
          class="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );

  return (
    <div class="w-full max-w-[1312px] min-h-[320px] sm:min-h-[420px] lg:h-[678px] p-2 bg-dc-100 rounded-xl flex flex-col lg:flex-row justify-start items-stretch gap-4 sm:gap-6 overflow-hidden">
      {/* Mobile: always content first, then image */}
      <div class="flex flex-col lg:hidden gap-4 sm:gap-6">
        {content}
        {image}
      </div>

      {/* Desktop: respect imagePosition */}
      <div class="hidden lg:flex lg:flex-row w-full gap-6">
        {feature.imagePosition === "left"
          ? (
            <>
              {image}
              {content}
            </>
          )
          : (
            <>
              {content}
              {image}
            </>
          )}
      </div>
    </div>
  );
}

export default function FeaturesInteractive(
  { features }: { features: Feature[] },
) {
  const initialActive = Object.fromEntries(
    features.map((_, idx) => [idx, 0]),
  ) as { [key: number]: number };

  const activeFeatures = useSignal<{ [key: number]: number }>(initialActive);

  const handleFeatureClick = (featureIndex: number, itemIndex: number) => {
    activeFeatures.value = {
      ...activeFeatures.value,
      [featureIndex]: itemIndex,
    };
  };

  return (
    <div class="self-stretch flex flex-col justify-center items-center gap-4 sm:gap-6">
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
