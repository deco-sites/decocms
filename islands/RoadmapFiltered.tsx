import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

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

const ITEMS_PER_PAGE = 10;

const STATUS_KEYS = ["backlog", "in_progress", "under_review", "released"] as const;

const statusConfig: Record<string, { label: string; aliases: string[] }> = {
  backlog: { label: "Backlog", aliases: ["backlog", "Backlog", "priority", "Priority"] },
  in_progress: { label: "In Progress", aliases: ["in_progress", "In Progress", "in progress"] },
  under_review: { label: "Under Review", aliases: ["under_review", "Under Review", "under review"] },
  released: { label: "Released", aliases: ["released", "Released", "done", "Done"] },
};

function normalizeStatus(status: string): string {
  const normalized = status.toLowerCase().replace(/\s+/g, '_');
  // Map priority and backlog to the same category
  if (normalized === "priority") return "backlog";
  if (normalized === "done") return "released";
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

export default function RoadmapFiltered({ features, onOpenModal }: Props) {
  const selectedFilter = useSignal<string>("backlog");
  const currentPage = useSignal<number>(1);
  const indicatorStyle = useSignal<{ left: number; width: number }>({ left: 0, width: 0 });
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredFeatures = features
    .filter((f) => {
      return normalizeStatus(f.status) === selectedFilter.value;
    })
    .sort((a, b) => {
      // Priority items first
      if (a.isPriority && !b.isPriority) return -1;
      if (!a.isPriority && b.isPriority) return 1;
      // Then sort by date (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const totalPages = Math.ceil(filteredFeatures.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE;
  const paginatedFeatures = filteredFeatures.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Update indicator position when selected filter changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = STATUS_KEYS.indexOf(selectedFilter.value as typeof STATUS_KEYS[number]);
      const activeTab = tabRefs.current[activeIndex];
      const container = tabsContainerRef.current;
      
      if (activeTab && container) {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        indicatorStyle.value = {
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        };
      }
    };

    updateIndicator();
    // Also update on window resize
    globalThis.addEventListener('resize', updateIndicator);
    return () => globalThis.removeEventListener('resize', updateIndicator);
  }, [selectedFilter.value]);

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
    const config = statusConfig[normalizedStatus] || statusConfig.backlog;
    return (
      <span class={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
        normalizedStatus === "backlog" ? "bg-blue-100 text-blue-700" :
        normalizedStatus === "in_progress" ? "bg-yellow-100 text-yellow-700" :
        normalizedStatus === "under_review" ? "bg-purple-100 text-purple-700" :
        "bg-green-100 text-green-700"
      }`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (isPriority: boolean) => {
    if (!isPriority) return null;
    return (
      <span class="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
        </svg>
        Priority
      </span>
    );
  };

  return (
    <div class="w-full max-w-6xl mx-auto">
      {/* Switchbar */}
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div class="relative" ref={tabsContainerRef}>
          {/* Tabs */}
          <div class="flex gap-4 sm:gap-6 overflow-x-auto">
            {STATUS_KEYS.map((key, index) => {
              const config = statusConfig[key];
              const isActive = selectedFilter.value === key;
              
              return (
                <button
                  key={key}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  onClick={() => handleFilterChange(key)}
                  class={`pb-3 font-medium transition-colors duration-200 whitespace-nowrap text-sm sm:text-base ${
                    isActive
                      ? "text-primary-dark"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {config.label}
                </button>
              );
            })}
          </div>
          
          {/* Border line */}
          <div class="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200" />
          
          {/* Sliding indicator */}
          <div
            class="absolute bottom-0 h-[2px] bg-primary-dark transition-all duration-300 ease-in-out"
            style={{
              left: `${indicatorStyle.value.left}px`,
              width: `${indicatorStyle.value.width}px`,
            }}
          />
        </div>
        
        {/* Submit Feature Request Button */}
        {onOpenModal && (
          <button
            onClick={onOpenModal}
            class="flex items-center justify-center gap-2 px-4 py-2 bg-primary-dark text-primary-light font-medium rounded-lg hover:bg-primary-dark/90 transition-colors text-sm w-full sm:w-auto"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Submit Feature Request
          </button>
        )}
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
                <div class="flex items-start justify-between gap-4 mb-2">
                  <h3 class="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    {getPriorityBadge(feature.isPriority || false)}
                    {getStatusBadge(feature.status)}
                  </div>
                </div>
                <p class="text-gray-600 mb-3">{feature.description}</p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  {feature.category && (
                    <span class="px-2 py-1 bg-gray-100 rounded-md">{feature.category}</span>
                  )}
                  <span>{formatRelativeTime(feature.created_at)}</span>
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
                    ? "bg-primary-dark text-primary-light shadow-md"
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
