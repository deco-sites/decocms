import { useSignal } from "@preact/signals";
import { invoke } from "../runtime.ts";

interface Feature {
  id: number;
  title: string;
  description: string;
  status: string;
  upvotes: number;
  category?: string;
  created_at: string;
  isPriority?: boolean;
}

interface Props {
  features: Feature[];
  onOpenModal?: () => void;
}

const STATUS_CONFIG = {
  backlog: {
    label: "Backlog",
    color: "bg-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    aliases: ["backlog", "Backlog", "priority", "Priority"],
  },
  in_progress: {
    label: "In Progress",
    color: "bg-yellow-500",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-700",
    aliases: ["in_progress", "In Progress", "in progress"],
  },
  released: {
    label: "Released",
    color: "bg-green-500",
    badgeBg: "bg-green-50",
    badgeText: "text-green-700",
    aliases: ["released", "Released", "done", "Done"],
  },
} as const;

type StatusKey = keyof typeof STATUS_CONFIG;

const STATUS_KEYS: StatusKey[] = ["backlog", "in_progress", "released"];

function normalizeStatus(status: string): StatusKey {
  const normalized = status.toLowerCase().replace(/\s+/g, "_");
  if (normalized === "priority") return "backlog";
  if (normalized === "done") return "released";
  if (normalized === "under_review") return "in_progress";
  return normalized as StatusKey;
}

function UpvoteButton({ featureId, count, onUpvoteSuccess }: { 
  featureId: number; 
  count: number;
  onUpvoteSuccess?: (featureId: number, newCount: number) => void;
}) {
  const hasVoted = useSignal(false);
  const isLoading = useSignal(false);
  const currentCount = useSignal(count);

  const handleToggleVote = async () => {
    if (isLoading.value) return;
    
    try {
      isLoading.value = true;
      
      // @ts-expect-error - invoke types don't include actions, but it works at runtime
      const result = await invoke["site/actions/upvoteFeature"]({
        featureId,
        action: hasVoted.value ? "downvote" : "upvote",
      });
      
      if (result?.success) {
        hasVoted.value = !hasVoted.value;
        currentCount.value = result.upvotes ?? (hasVoted.value ? currentCount.value + 1 : currentCount.value - 1);
        onUpvoteSuccess?.(featureId, currentCount.value);
      }
    } catch (err) {
      console.error('❌ Error toggling vote:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleVote}
      disabled={isLoading.value}
      class={`flex flex-col items-center justify-center min-w-[48px] py-2 px-2 rounded-lg border transition-all duration-200 ${
        hasVoted.value
          ? "bg-primary-dark border-primary-dark text-white"
          : isLoading.value
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      {isLoading.value ? (
        <span class="text-xs">⏳</span>
      ) : (
        <svg
          class="w-4 h-4"
          fill={hasVoted.value ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      )}
      <span class="text-sm font-semibold mt-0.5">
        {currentCount.value}
      </span>
    </button>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div class="flex gap-3">
        <UpvoteButton featureId={feature.id} count={feature.upvotes} />
        <div class="flex-1 min-w-0">
          <div class="flex items-start gap-2 mb-1">
            <h3 class="font-semibold text-gray-900 text-sm leading-tight">
              {feature.title}
            </h3>
            {feature.isPriority && (
              <span class="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700 flex items-center gap-0.5">
                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clip-rule="evenodd"
                  />
                </svg>
                Priority
              </span>
            )}
          </div>
          <p class="text-gray-600 text-xs leading-relaxed line-clamp-2">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({
  statusKey,
  features,
}: {
  statusKey: StatusKey;
  features: Feature[];
}) {
  const config = STATUS_CONFIG[statusKey];
  const count = features.length;

  return (
    <div class="flex flex-col min-w-[280px] md:min-w-0 md:flex-1">
      {/* Column Header */}
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <h2 class="font-semibold text-gray-900 text-base">{config.label}</h2>
          <span
            class={`px-2 py-0.5 rounded-full text-xs font-medium ${config.badgeBg} ${config.badgeText}`}
          >
            {count}
          </span>
        </div>
        <div class={`h-1 rounded-full ${config.color}`} />
      </div>

      {/* Cards Container */}
      <div class="flex-1 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: "calc(100vh - 380px)" }}>
        {features.length === 0 ? (
          <div class="flex items-center justify-center h-32 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p class="text-gray-400 text-sm">No features yet</p>
          </div>
        ) : (
          features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))
        )}
      </div>
    </div>
  );
}

export default function RoadmapKanban({ features, onOpenModal }: Props) {
  // Group features by status
  const featuresByStatus = STATUS_KEYS.reduce((acc, key) => {
    acc[key] = features
      .filter((f) => normalizeStatus(f.status) === key)
      .sort((a, b) => {
        // Priority items first
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;
        // Then sort by upvotes (highest first)
        return b.upvotes - a.upvotes;
      });
    return acc;
  }, {} as Record<StatusKey, Feature[]>);

  return (
    <div class="w-full">
      {/* Submit Feature Request Button */}
      {onOpenModal && (
        <div class="flex justify-end mb-6">
          <button
            type="button"
            onClick={onOpenModal}
            class="flex items-center justify-center gap-2 px-4 py-2 bg-primary-dark text-primary-light font-medium rounded-lg hover:bg-primary-dark/90 transition-colors text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Submit Feature Request
          </button>
        </div>
      )}

      {/* Kanban Board */}
      <div class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:snap-none">
        {STATUS_KEYS.map((key) => (
          <div key={key} class="snap-start">
            <KanbanColumn statusKey={key} features={featuresByStatus[key]} />
          </div>
        ))}
      </div>
    </div>
  );
}

