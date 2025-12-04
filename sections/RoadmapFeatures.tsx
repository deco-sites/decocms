import RoadmapFeaturesList from "../islands/RoadmapFeaturesList.tsx";

export interface Props {
  title?: string;
  description?: string;
}

export default function RoadmapFeatures({
  title = "Feature Roadmap",
  description = "Vote for features and help shape our product",
}: Props) {
  return (
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        {/* Header */}
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-4">{title}</h1>
          <p class="text-xl text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Interactive Features List (Island) */}
        <RoadmapFeaturesList />
      </div>
    </div>
  );
}
