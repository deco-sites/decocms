import RoadmapFiltered from "../islands/RoadmapFiltered.tsx";
import SuggestFeatureModal from "../islands/SuggestFeatureModal.tsx";
import { useSection } from "@deco/deco/hooks";

export interface RoadmapFeature {
  id: number;
  title: string;
  description: string;
  status: "Planned" | "In Progress" | "Under Review" | "Released";
  upvotes: number;
  created_at: string;
  updated_at: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  features?: RoadmapFeature[];
  featureId?: number; // Para upvote action
}

export default function RoadmapPage({
  title = "Product Roadmap",
  subtitle = "See what we're working on and what's coming next. Vote for features you'd like to see!",
  features = []
}: Props) {
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 pt-2 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        <div class="flex-1 flex relative z-10">
          <main class="flex flex-col w-full pt-40 sm:pt-48 lg:pt-40 pb-16 relative px-4 sm:px-6 lg:px-32">
            {/* Header - Centralizado */}
            <div class="text-center mb-12">
              <h1 class="hero-h1 mb-4">{title}</h1>
              <p class="text-lg text-primary-dark max-w-2xl leading-6 mx-auto">{subtitle}</p>
              
              {/* Debug info */}
              <div class="mt-4 text-sm text-gray-500">
                Features loaded: {features?.length || 0}
              </div>
              
              {/* Refresh Button */}
              <button
                class="mt-6 px-6 py-2 bg-primary-dark text-primary-light rounded-lg hover:bg-primary-dark/90 transition-colors font-medium"
                hx-get={useSection()}
                hx-swap="outerHTML"
                hx-target="closest section"
              >
                🔄 Refresh Features
              </button>
            </div>

            {/* Island with switchbar and cards */}
            <RoadmapFiltered features={features} />

            {/* Add suggestion CTA */}
            <div class="mt-16">
              <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center max-w-3xl mx-auto">
                <h3 class="text-2xl font-semibold text-primary-dark mb-3">Have a feature request?</h3>
                <p class="text-primary-dark/70 mb-6">We'd love to hear your ideas! Submit your suggestion and help shape the future of our product.</p>
                <SuggestFeatureModal
                  buttonText="Submit Feature Request"
                  modalTitle="Request a Feature"
                  successMessage="Thank you! Your feature request has been submitted successfully."
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

// Loader: Busca features da database
export const loader = async (props: Props, _req: Request, ctx: any) => {
  try {
    const result = await ctx.invoke.GET_ROADMAP_FEATURES({});
    
    // A tool retorna { success, features }
    const features = result?.features || [];
    
    console.log('[RoadmapPage] Loaded', features.length, 'features');
    
    return {
      ...props,
      features: Array.isArray(features) ? features : [],
    };
  } catch (error) {
    console.error('[RoadmapPage] Error:', error);
    return {
      ...props,
      features: [],
    };
  }
};

// Action: Upvote feature
export const action = async (props: Props, _req: Request, ctx: any) => {
  if (props.featureId) {
    try {
      await ctx.invoke.UPVOTE_FEATURE({ featureId: props.featureId });
    } catch (error) {
      console.error('[RoadmapPage] Upvote error:', error);
    }
  }
  
  // Recarrega features
  const result = await ctx.invoke.GET_ROADMAP_FEATURES({});
  return {
    ...props,
    features: result?.features || [],
  };
};
