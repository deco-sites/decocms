import { useSignal } from "@preact/signals";

interface Feature {
  id: number;
  title: string;
  description: string;
  status: string;
  upvotes: number;
  category?: string;
  created_at: string;
}

interface Props {
  features: Feature[];
}

const ITEMS_PER_PAGE = 10;

const statusConfig: Record<string, { label: string; aliases: string[] }> = {
  all: { label: "All", aliases: [] },
  planned: { label: "Planned", aliases: ["planned", "Planned"] },
  in_progress: { label: "In Progress", aliases: ["in_progress", "In Progress", "in progress"] },
  under_review: { label: "Under Review", aliases: ["under_review", "Under Review", "under review"] },
  released: { label: "Released", aliases: ["released", "Released"] },
};

function normalizeStatus(status: string): string {
  const normalized = status.toLowerCase().replace(/\s+/g, '_');
  return normalized;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
}

const ChevronUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

// UpvoteButton chama ACTION via fetch (padrão correto para Islands)
function UpvoteButton({ featureId, initialUpvotes }: { featureId: number; initialUpvotes: number }) {
  const upvotes = useSignal(initialUpvotes);
  const isUpvoting = useSignal(false);
  const hasUpvoted = useSignal(false);

  const handleUpvote = async () => {
    if (isUpvoting.value || hasUpvoted.value) return;
    
    isUpvoting.value = true;
    
    try {
      console.log("🗳️ [ISLAND] Upvoting feature", featureId);
      
      // CORRIGIDO: Island chama ACTION via fetch
      const response = await fetch('/live/invoke/site/actions/upvoteFeature.ts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureId }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("✅ [ISLAND] Upvote result:", result);
      
      // Atualiza com o novo valor retornado pela action
      if (result?.success && result?.upvotes !== undefined) {
        upvotes.value = result.upvotes;
        hasUpvoted.value = true;
        
        // Remove o feedback visual após 2 segundos
        setTimeout(() => {
          hasUpvoted.value = false;
        }, 2000);
      }
    } catch (error) {
      console.error("❌ [ISLAND ERROR] Error upvoting:", error);
    } finally {
      isUpvoting.value = false;
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={isUpvoting.value}
      class={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all cursor-pointer ${
        hasUpvoted.value 
          ? 'border-blue-400 bg-blue-50 text-blue-600'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      } ${isUpvoting.value ? 'opacity-50 cursor-wait' : ''}`}
      title={hasUpvoted.value ? 'Thanks for voting!' : 'Upvote this feature'}
    >
      <ChevronUpIcon />
      <span class="text-sm font-medium">{upvotes.value}</span>
    </button>
  );
}

export default function RoadmapFiltered({ features }: Props) {
  const selectedFilter = useSignal<string>("all");
  const currentPage = useSignal<number>(1);

  const filteredFeatures = features
    .filter((f) => {
      if (selectedFilter.value === "all") return true;
      return normalizeStatus(f.status) === selectedFilter.value;
    })
    .sort((a, b) => b.upvotes - a.upvotes);

  const totalPages = Math.ceil(filteredFeatures.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE;
  const paginatedFeatures = filteredFeatures.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (filter: string) => {
    selectedFilter.value = filter;
    currentPage.value = 1;
  };

  const handlePageChange = (page: number) => {
    currentPage.value = page;
    document.getElementById('roadmap-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getStatusBadge = (status: string) => {
    const normalizedStatus = normalizeStatus(status);
    const config = statusConfig[normalizedStatus] || statusConfig.planned;
    return (
      <span class={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
        normalizedStatus === "planned" ? "bg-blue-100 text-blue-700" :
        normalizedStatus === "in_progress" ? "bg-yellow-100 text-yellow-700" :
        normalizedStatus === "under_review" ? "bg-purple-100 text-purple-700" :
        "bg-green-100 text-green-700"
      }`}>
        {config.label}
      </span>
    );
  };

  return (
    <div class="w-full max-w-6xl mx-auto">
      {/* Switchbar */}
      <div class="flex gap-6 mb-8 border-b border-gray-200">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = key === "all" 
            ? features.length 
            : features.filter(f => normalizeStatus(f.status) === key).length;
          
          const isActive = selectedFilter.value === key;
          
          return (
            <button
              key={key}
              onClick={() => handleFilterChange(key)}
              class={`pb-3 font-medium transition-all duration-200 relative ${
                isActive
                  ? "text-primary-dark"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {config.label}
              {isActive && (
                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-dark"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Cards Container */}
      <div id="roadmap-cards" class="min-h-[800px] mb-8">
        {paginatedFeatures.length === 0 ? (
          <div class="flex items-center justify-center h-64">
            <p class="text-gray-500 text-lg">No features found for this filter.</p>
          </div>
        ) : (
          <div class="space-y-4">
            {paginatedFeatures.map((feature) => (
              <div
                key={feature.id}
                class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100"
              >
                <div class="flex items-start gap-4">
                  <UpvoteButton featureId={feature.id} initialUpvotes={feature.upvotes} />

                  <div class="flex-1">
                    <div class="flex items-start justify-between gap-4 mb-2">
                      <h3 class="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      {getStatusBadge(feature.status)}
                    </div>
                    <p class="text-gray-600 mb-3">{feature.description}</p>
                    <div class="flex items-center gap-4 text-sm text-gray-500">
                      {feature.category && (
                        <span class="px-2 py-1 bg-gray-100 rounded-md">{feature.category}</span>
                      )}
                      <span>{formatRelativeTime(feature.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div class="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage.value - 1)}
            disabled={currentPage.value === 1}
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
          >
            ← Previous
          </button>
          
          <div class="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                class={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                  currentPage.value === page
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage.value + 1)}
            disabled={currentPage.value === totalPages}
            class="px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
          >
            Next →
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div class="text-center mt-4 text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredFeatures.length)} of {filteredFeatures.length} features
        </div>
      )}
    </div>
  );
}
