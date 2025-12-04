import RoadmapWithModal from "../islands/RoadmapWithModal.tsx";

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
  featureId?: number; // Para upvote action
}

// Static features data
const STATIC_FEATURES: RoadmapFeature[] = [
  // BACKLOG (regular)
  {
    id: 1,
    title: "Observability & PD for Workflows",
    description: "Problem: As a customer, I don't know when my key workflows stopped running. Solution: Add an alert app to key workflows.",
    status: "Backlog",
    upvotes: 12,
    created_at: "2025-10-21",
    isPriority: false,
  },
  {
    id: 2,
    title: "Billing & Wallet Tool Usage Tracking",
    description: "Problem: Need to have tool usage and billing visible in the wallet. Verify the current state.",
    status: "Backlog",
    upvotes: 8,
    created_at: "2025-10-20",
    isPriority: false,
  },
  {
    id: 3,
    title: "MCP Revamp",
    description: "Add deco.chat OAuth for all MCPs (Cursor, Claude and ChatGPT); Allow customize Client ID and Client Secret for downstream OAuth (Github, Google); Add scopes; Improve DX for new OAuth apps.",
    status: "Backlog",
    upvotes: 25,
    created_at: "2025-07-06",
    isPriority: false,
  },
  
  // BACKLOG (priority)
  {
    id: 4,
    title: "Workspace to Project Migration",
    description: "Today we're always converting org/project to deprecated workspace format. Need to use strong ref foreign key to project/organization. This unlocks creating multiple projects in an organization.",
    status: "Backlog",
    upvotes: 42,
    created_at: "2025-09-15",
    isPriority: true,
  },
  {
    id: 5,
    title: "Healthcheck App v1",
    description: "Problem: Need to improve observability of business results for e-commerce stores. Solution: Healthcheck App (V1) with Order & Revenue Anomaly Tracker Dashboard, Custom Alarms via email.",
    status: "Backlog",
    upvotes: 38,
    created_at: "2025-10-15",
    isPriority: true,
  },
  {
    id: 6,
    title: "Wallet Metrics Feature",
    description: "[WIP] Get usage metrics on wallet.",
    status: "Backlog",
    upvotes: 15,
    created_at: "2025-09-01",
    isPriority: true,
  },
  {
    id: 7,
    title: "Enable Knip to Reject Passing on CI",
    description: "Basic knip setup returns status 0 even with errors on CI. Need to fix all errors then let knip reject by returning non-0 status.",
    status: "Backlog",
    upvotes: 5,
    created_at: "2025-10-26",
    isPriority: true,
  },
  {
    id: 8,
    title: "Decouple Auth from Supabase",
    description: "Decouple authentication from Supabase for greater flexibility and independence.",
    status: "Backlog",
    upvotes: 22,
    created_at: "2025-10-26",
    isPriority: true,
  },
  {
    id: 9,
    title: "Database Migrations DX",
    description: "Improve Developer Experience for database migrations, including Policy creation.",
    status: "Backlog",
    upvotes: 18,
    created_at: "2025-10-26",
    isPriority: true,
  },
  
  // IN PROGRESS
  {
    id: 10,
    title: "Migrate MCP Apify to MCPs Repository",
    description: "MCP Apify currently in apps repo needs migration to dedicated MCPs repository for better organization.",
    status: "In Progress",
    upvotes: 14,
    created_at: "2025-11-20",
    isPriority: false,
  },
  {
    id: 11,
    title: "App Store UI Implementation - Figma Design",
    description: "Implementation of the new interface based on Figma design.",
    status: "In Progress",
    upvotes: 31,
    created_at: "2025-11-20",
    isPriority: false,
  },
  {
    id: 12,
    title: "Edit Homepage or Add About Page",
    description: "Edit the home page of decocms or add a new 'about' page to get approved by Google.",
    status: "In Progress",
    upvotes: 9,
    created_at: "2025-11-10",
    isPriority: false,
  },
  {
    id: 13,
    title: "Self-host Cloudflare Independence",
    description: "Don't depend on Cloudflare for agents to run.",
    status: "In Progress",
    upvotes: 27,
    created_at: "2025-11-25",
    isPriority: false,
  },
  {
    id: 14,
    title: "Slack Integration",
    description: "Slack for Gupy - communication integration.",
    status: "In Progress",
    upvotes: 11,
    created_at: "2025-10-28",
    isPriority: false,
  },
  
  // RELEASED (Done)
  {
    id: 15,
    title: "App Marketplace Cleanup",
    description: "Verify current state and clean up non-functional apps from the marketplace.",
    status: "Released",
    upvotes: 45,
    created_at: "2025-10-13",
    isPriority: false,
  },
  {
    id: 16,
    title: "Update README - Running Locally",
    description: "Running the Deco Engine Locally - guide for contributing to the engine.",
    status: "Released",
    upvotes: 33,
    created_at: "2025-10-20",
    isPriority: false,
  },
  {
    id: 17,
    title: "Vibe Coding Client-Side Views",
    description: "Implement client-side 'Views' system with real-time generation, full refresh cycles without losing state, vibe coding experiences for front-end logic.",
    status: "Released",
    upvotes: 67,
    created_at: "2025-10-09",
    isPriority: false,
  },
  {
    id: 18,
    title: "QA Happy Path",
    description: "Testing and guaranteeing happy path for Workshop - workflow creation, database, views.",
    status: "Released",
    upvotes: 28,
    created_at: "2025-10-13",
    isPriority: false,
  },
  {
    id: 19,
    title: "Pinned & Recent Resources Sidebar",
    description: "Add sidebar showing Recent Threads (last 5 resources/threads interacted with) and Pinned Threads (manually pinned).",
    status: "Released",
    upvotes: 52,
    created_at: "2025-10-09",
    isPriority: false,
  },
  {
    id: 20,
    title: "Implement MCP OAuth for Deco Apps",
    description: "It'd be amazing if deco made it easy to use MCPs created here in other agents (especially Cursor). Follow and expand protocol towards compatibility.",
    status: "Released",
    upvotes: 89,
    created_at: "2025-10-17",
    isPriority: false,
  },
  {
    id: 21,
    title: "List Workflow Runs",
    description: "Feature to list workflow executions.",
    status: "Released",
    upvotes: 41,
    created_at: "2025-09-23",
    isPriority: false,
  },
  {
    id: 22,
    title: "Workflow UI",
    description: "Add Intent Step, Playable Step, decopilot playing next steps, Publish, @ for tools and previous steps, decopilot creating new steps, Input/Cron/Webhook, Share.",
    status: "Released",
    upvotes: 76,
    created_at: "2025-09-15",
    isPriority: false,
  },
];

export default function RoadmapPage({
  title = "Product Roadmap",
  subtitle = "See what we're building and what's next — vote for the features you want to see shipped.",
  features = []
}: Props) {
  // Use static features if no features are provided
  const displayFeatures = features.length > 0 ? features : STATIC_FEATURES;
  
  return (
    <section class="w-full bg-dc-50 flex flex-col p-2">
      <div class="bg-dc-100 pt-2 rounded-[24px] flex flex-col min-h-[calc(100vh-16px)] relative overflow-hidden">
        <div class="flex-1 flex relative z-10">
          <main class="flex flex-col w-full pt-40 sm:pt-48 lg:pt-40 pb-16 relative px-4 sm:px-6 lg:px-32">
            {/* Header - Centralizado */}
            <div class="text-center mb-12">
              <h1 class="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-medium leading-none tracking-tight text-dc-900 mb-6">{title}</h1>
              <p class="text-lg md:text-xl text-dc-500 max-w-2xl leading-relaxed mx-auto">{subtitle}</p>
            </div>

            {/* Island with switchbar, cards and modal */}
            <RoadmapWithModal 
              features={displayFeatures}
              modalTitle="Request a Feature"
              successMessage="Thank you! Your feature request has been submitted successfully."
            />
          </main>
        </div>
      </div>
    </section>
  );
}

// Loader: Retorna props com features estáticas como fallback
export const loader = async (props: Props, _req: Request, _ctx: unknown) => {
  return {
    ...props,
    features: props.features || STATIC_FEATURES,
  };
};
