import type { ImageWidget } from "apps/admin/widgets.ts";
import FeaturesInteractive from "../islands/FeaturesInteractive.tsx";

export interface FeatureItem { name: string; image?: ImageWidget }
export interface Feature { title: string; description: string; items: FeatureItem[]; imagePosition: "left" | "right" }

export interface Props { title?: string; subtitle?: string; features?: Feature[] }

export default function Features({
  title = "One place to build, run, and monetize your agents",
  subtitle = "Govern access, trace every step, and turn reusable modules into paid products.",
  features = [
    {
      title: "Connect your context",
      description: "Unify data, tools and models with policy, RBAC and observability — your agents always get the right context, safely.",
      items: [
        { name: "MCP-native connectors", image: "https://placehold.co/600x400" },
        { name: "Policy routing & RBAC", image: "https://placehold.co/600x400" },
        { name: "Spend caps & budgets", image: "https://placehold.co/600x400" },
        { name: "Audit trail", image: "https://placehold.co/600x400" }
      ],
      imagePosition: "right"
    },
    {
      title: "Prototype in chat, ship in code. Same repo.",
      description: "Ship agents, workflows and views in the same runtime: TypeScript SDK, typed RPC and edge deploy.",
      items: [
        { name: "Chat → Code prototyping", image: "https://placehold.co/600x400" },
        { name: "TS SDK & CLI", image: "https://placehold.co/600x400" },
        { name: "Typed RPC", image: "https://placehold.co/600x400" },
        { name: "Edge deploy & environments", image: "https://placehold.co/600x400" }
      ],
      imagePosition: "left"
    },
    {
      title: "Govern & observe your runs",
      description: "No vibe debugging: logs, traces, error analytics and cost-per-step to optimize quality and spend, with roles, approvals and tenancy.",
      items: [
        { name: "Logs & traces", image: "https://placehold.co/600x400" },
        { name: "Error analytics", image: "https://placehold.co/600x400" },
        { name: "Cost per step & budgets", image: "https://placehold.co/600x400" },
        { name: "Roles, approvals & tenancy", image: "https://placehold.co/600x400" }
      ],
      imagePosition: "right"
    },
    {
      title: "Reuse & monetize with our marketplace",
      description: "Install ready-made modules — or publish your own. Wallet-based per-run billing turns apps into revenue.",
      items: [
        { name: "One-click installs", image: "https://placehold.co/600x400" },
        { name: "Publish modules", image: "https://placehold.co/600x400" },
        { name: "Per-run billing (wallet)", image: "https://placehold.co/600x400" },
        { name: "Templates & packages", image: "https://placehold.co/600x400" }
      ],
      imagePosition: "left"
    }
  ]
}: Props) {
  return (
    <section class="w-full px-16 py-40 bg-[#FAFAF9] flex flex-col justify-start items-center gap-14">
      <div class="w-full max-w-[1440px] flex flex-col justify-start items-center gap-14">
        {/* Header */}
        <div class="self-stretch flex flex-col justify-start items-center gap-6">
          <h2 class="w-full max-w-[780px] text-center text-[#1C1917] text-6xl font-medium leading-[64px]">
            {title}
          </h2>
          <p class="self-stretch text-center text-[#78716C] text-lg font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Feature Cards - Interactive */}
        <FeaturesInteractive features={features} />
      </div>
    </section>
  );
}
