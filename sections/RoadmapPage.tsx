import RoadmapWithModal from "../islands/RoadmapWithModal.tsx";
import listFeatures from "../loaders/listFeatures.ts";

export interface RoadmapFeature {
  id: number;
  title: string;
  description: string;
  status: "Backlog" | "In Progress" | "Under Review" | "Released";
  upvotes: number;
  created_at: string;
  updated_at?: string;
  isPriority?: boolean;
}

export interface Props {
  title?: string;
  subtitle?: string;
  features?: RoadmapFeature[];
  featureId?: number;
}


export default function RoadmapPage({
  title = "Product Roadmap",
  subtitle = "See what we're building and what's next — vote for the features you want to see shipped.",
  features = []
}: Props) {
  // Use static features if no features are provided

  if (!features || features.length === 0) {
    return (
      <section class="w-full bg-dc-50 flex flex-col p-2">
        <div class="bg-dc-100 pt-2 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
          <div class="flex-1 flex items-center justify-center">
            <div class="text-center px-6 py-20">
              <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-dc-200 flex items-center justify-center">
                <svg class="w-8 h-8 text-dc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
              </div>
              <h2 class="text-2xl font-medium text-dc-900 mb-3">No features found</h2>
              <p class="text-dc-500 max-w-md mx-auto">Roadmap features will be displayed here once they become available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 pt-2 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        <div class="flex-1 flex relative z-10">
          <main class="flex flex-col w-full pt-40 sm:pt-48 lg:pt-40 pb-16 relative px-4 sm:px-6 lg:px-32">
            {/* Header - Centered */}
            <div class="text-center mb-12">
              <h1 class="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-medium leading-none tracking-tight text-dc-900 mb-6">{title}</h1>
              <p class="text-lg md:text-xl text-dc-500 max-w-2xl leading-relaxed mx-auto">{subtitle}</p>
            </div>

            {/* Island with switchbar, cards and modal */}
            <RoadmapWithModal 
              features={features}
              modalTitle="Request a Feature"
              successMessage="Thank you! Your feature request has been submitted successfully."
            />
          </main>
        </div>
      </div>
    </section>
  );
}

// Loader: Fetches features from database or uses static ones as fallback
export const loader = async (props: Props, req: Request, _ctx: unknown) => {
  try {
    const result = await listFeatures({}, req);
    
    const features = result.result?.data;
    
    if (features && Array.isArray(features) && features.length > 0) {
      return {
        ...props,
        features: features as RoadmapFeature[],
      };
    }
    
  } catch (error) {
    console.error("❌ [RoadmapPage] Error loading features:", error);
  }
  
  return {
    ...props,
    features: props.features,
  };
};
