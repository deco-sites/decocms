import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { invoke } from "../runtime.ts";

interface Feature {
  id: string;
  title: string;
  description: string;
  status: "planned" | "under-review" | "in-progress" | "released";
  upvotes: number;
  hasUpvoted?: boolean;
}

const STATUS_LABELS = {
  planned: "Planned",
  "under-review": "Under Review",
  "in-progress": "In Progress",
  released: "Released",
};

const STATUS_COLORS = {
  planned: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  "under-review": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  released: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export default function RoadmapFeaturesList() {
  const features = useSignal<Feature[]>([]);
  const loading = useSignal(true);
  const error = useSignal<string | null>(null);
  const selectedStatus = useSignal<string>("all");

  // Load features on mount
  useEffect(() => {
    console.log("[Island] Loading features...");
    
    invoke["i:tools-management"].GET_ROADMAP_FEATURES()
      .then((result: any) => {
        console.log("[Island] Success! Result:", result);
        features.value = result.features || [];
        loading.value = false;
      })
      .catch((err: Error) => {
        console.error("[Island] Error loading features:", err);
        error.value = err.message;
        loading.value = false;
      });
  }, []);

  const handleUpvote = async (featureId: string) => {
    try {
      console.log("[Island] Upvoting feature:", featureId);
      await invoke["i:tools-management"].UPVOTE_FEATURE({ featureId });
      
      // Reload features
      const result = await invoke["i:tools-management"].GET_ROADMAP_FEATURES();
      features.value = result.features || [];
    } catch (err: any) {
      console.error("[Island] Error upvoting:", err);
      error.value = err.message;
    }
  };

  const filteredFeatures = selectedStatus.value === "all"
    ? features.value
    : features.value.filter((f) => f.status === selectedStatus.value);

  return (
    <div class="w-full">
      {/* Status Filter */}
      <div class="flex gap-2 mb-8 flex-wrap justify-center">
        <button
          onClick={() => selectedStatus.value = "all"}
          class={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedStatus.value === "all"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          All
        </button>
        {Object.entries(STATUS_LABELS).map(([status, label]) => (
          <button
            key={status}
            onClick={() => selectedStatus.value = status}
            class={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedStatus.value === status
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading.value && (
        <div class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">Loading features...</p>
        </div>
      )}

      {/* Error State */}
      {error.value && (
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
          <p class="text-red-800 dark:text-red-200">{error.value}</p>
        </div>
      )}

      {/* Features List */}
      {!loading.value && !error.value && (
        <div class="space-y-4">
          {filteredFeatures.length === 0 ? (
            <div class="text-center py-12">
              <p class="text-gray-600 dark:text-gray-400">
                No features found for this status.
              </p>
            </div>
          ) : (
            filteredFeatures.map((feature) => (
              <div
                key={feature.id}
                class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div class="flex gap-4">
                  {/* Upvote Button */}
                  <button
                    onClick={() => handleUpvote(feature.id)}
                    class={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border transition-colors ${
                      feature.hasUpvoted
                        ? "bg-primary text-white border-primary"
                        : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    <span class="text-xl">▲</span>
                    <span class="text-sm font-bold">{feature.upvotes}</span>
                  </button>

                  {/* Feature Content */}
                  <div class="flex-1">
                    <div class="flex items-start justify-between gap-4 mb-2">
                      <h3 class="text-xl font-semibold">{feature.title}</h3>
                      <span
                        class={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          STATUS_COLORS[feature.status]
                        }`}
                      >
                        {STATUS_LABELS[feature.status]}
                      </span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
