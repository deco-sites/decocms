import { useSection } from "@deco/deco/hooks";
import RoadmapFiltered from "../islands/RoadmapFiltered.tsx";

interface Feature {
  id: number;
  title: string;
  description: string;
  status: "planned" | "in_progress" | "under_review" | "released";
  upvotes: number;
  category: string;
  createdAt: string;
}

export interface Props {
  title?: string;
  description?: string;
  features: Feature[];
}

export default function ProductRoadmap({
  title = "Product Roadmap",
  description = "See what we're building next and vote on features you'd like to see.",
  features = [],
}: Props) {
  return (
    <section class="w-full bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 pt-48 pb-16">
        {/* Header */}
        <div class="text-center mb-12 max-w-3xl mx-auto">
          <h1 class="hero-h1 mb-4">{title}</h1>
          <p class="text-lg text-gray-600">{description}</p>
        </div>

        {/* Filtered Roadmap Island */}
        <RoadmapFiltered features={features} />
      </div>
    </section>
  );
}
