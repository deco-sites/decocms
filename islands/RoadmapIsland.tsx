import { useState, useEffect } from "preact/hooks";
import type { Signal } from "@preact/signals";

interface Feature {
  id: number;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  upvotes: number;
  category: string;
}

interface Props {
  features: Signal<Feature[]>;
}

export default function RoadmapIsland({ features }: Props) {
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpvote = async (featureId: number) => {
    try {
      setLoading(featureId);
      setError(null);
      
      console.log('🗳️ [ISLAND] Starting upvote for feature', featureId);
      
      // Chama a tool DIRETAMENTE via callTool global (disponível em views)
      const result = await globalThis.callTool({
        integration: 'i:tools-management',
        tool: 'UPVOTE_FEATURE',
        arguments: { featureId }
      });
      
      console.log('✅ [ISLAND] Upvote result:', result);
      
      if (result.success) {
        // Atualiza o contador localmente
        features.value = features.value.map((f) =>
          f.id === featureId ? { ...f, upvotes: result.upvotes } : f
        );
        console.log('🎉 [ISLAND] Updated features:', features.value);
      } else {
        setError('Failed to upvote');
      }
    } catch (err) {
      console.error('❌ [ISLAND ERROR] Error upvoting:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(null);
    }
  };

  const statusColors = {
    planned: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    planned: "Planejado",
    "in-progress": "Em Progresso",
    completed: "Concluído",
  };

  return (
    <div class="space-y-4">
      {error && (
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {features.value.map((feature) => (
        <div
          key={feature.id}
          class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <span
                  class={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[feature.status]
                  }`}
                >
                  {statusLabels[feature.status]}
                </span>
              </div>
              <p class="text-gray-600 mb-3">{feature.description}</p>
              <span class="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                {feature.category}
              </span>
            </div>

            <div class="flex flex-col items-center ml-4">
              <button
                onClick={() => handleUpvote(feature.id)}
                disabled={loading === feature.id}
                class={`p-2 rounded-lg transition-colors ${
                  loading === feature.id
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                title="Votar nesta funcionalidade"
              >
                {loading === feature.id ? (
                  <span class="text-sm">⏳</span>
                ) : (
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </button>
              <span class="text-sm font-semibold text-gray-700 mt-1">
                {feature.upvotes}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
