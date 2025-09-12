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
  {
    feature,
    featureIndex,
    activeFeatures,
    handleFeatureClick,
    alignImageOpposite,
  }: {
    feature: Feature;
    featureIndex: number;
    activeFeatures: Signal<{ [key: number]: number }>; // index of active item per feature
    handleFeatureClick: (featureIndex: number, itemIndex: number) => void;
    alignImageOpposite?: boolean;
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
        <h3 class="hero-h3 self-stretch">
          {feature.title}
        </h3>
        <p class="self-stretch text-dc-500 text-lg font-normal leading-relaxed">
          {feature.description}
        </p>
      </div>
      <div class="self-stretch flex flex-col justify-start items-start gap-2">
        {feature.items.map((item, itemIndex) => {
          const isActive = activeItemIndex === itemIndex;
          const buttonClasses =
            `self-stretch p-3 sm:p-4 flex justify-center items-center gap-2 transition-colors relative ${
              isActive
                ? "text-dc-800"
                : "text-dc-500 hover:text-dc-600 border-t-2 border-dc-100"
            }`;

          return (
            <button
              key={itemIndex}
              type="button"
              onClick={() => handleFeatureClick(featureIndex, itemIndex)}
              class={buttonClasses}
            >
              {isActive && (
                <>
                  {/* Base border */}
                  <div class="absolute top-0 left-0 right-0 h-0.5 bg-dc-200" />
                  {/* Progress border */}
                  <div
                    class="absolute top-0 left-0 h-0.5 bg-purple-light transition-all duration-100"
                    style={{ width: `${progress.value}%` }}
                  />
                </>
              )}
              <div class="flex-1 text-left text-sm sm:text-base lg:text-lg font-normal leading-relaxed relative z-10">
                {item.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Determine object position based on alignImageOpposite and imagePosition
  const getObjectPosition = () => {
    if (!alignImageOpposite) return "object-center";

    // If alignImageOpposite is true, align to opposite side
    return feature.imagePosition === "right" ? "object-left" : "object-right";
  };

  const image = (
    <div class="flex-1 relative rounded-xl sm:rounded-2xl border border-dc-200 overflow-hidden aspect-[4/5]">
      {activeItem?.image && (
        <img
          src={activeItem.image}
          alt={activeItem.name}
          class={`w-full h-full object-cover ${getObjectPosition()}`}
          loading="lazy"
        />
      )}
    </div>
  );

  return (
    <div class="w-full max-w-[1312px] min-h-[320px] sm:min-h-[420px] lg:h-[678px] p-2 bg-white rounded-xl flex flex-col lg:flex-row justify-start items-stretch gap-4 sm:gap-6 overflow-hidden">
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
  { features, alignImageOpposite }: {
    features: Feature[];
    alignImageOpposite?: boolean;
  },
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
          alignImageOpposite={alignImageOpposite}
        />
      ))}
    </div>
  );
}
