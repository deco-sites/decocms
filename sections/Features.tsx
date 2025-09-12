import type { ImageWidget } from "apps/admin/widgets.ts";
import FeaturesInteractive from "../islands/FeaturesInteractive.tsx";

export interface FeatureItem {
  name: string;
  image?: ImageWidget;
}
export interface Feature {
  title: string;
  description: string;
  items: FeatureItem[];
  imagePosition: "left" | "right";
}

export interface Props {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  /**
   * @title Align Images Opposite
   * @description When enabled, images align to the opposite side (left images align right, right images align left)
   */
  alignImageOpposite?: boolean;
}

export default function Features({
  title = "One place to build, run, and monetize your agents",
  subtitle =
    "Govern access, trace every step, and turn reusable modules into paid products.",
  alignImageOpposite,
  features = [
    {
      title: "Connect your context",
      description:
        "Unify data, tools and models with policy, RBAC and observability — your agents always get the right context, safely.",
      items: [
        {
          name: "MCP-native connectors",
          image: "https://placehold.co/600x400",
        },
        {
          name: "Policy routing & RBAC",
          image: "https://placehold.co/600x400",
        },
        { name: "Spend caps & budgets", image: "https://placehold.co/600x400" },
        { name: "Audit trail", image: "https://placehold.co/600x400" },
      ],
      imagePosition: "right",
    },
    {
      title: "Prototype in chat, ship in code. Same repo.",
      description:
        "Ship agents, workflows and views in the same runtime: TypeScript SDK, typed RPC and edge deploy.",
      items: [
        {
          name: "Chat → Code prototyping",
          image: "https://placehold.co/600x400",
        },
        { name: "TS SDK & CLI", image: "https://placehold.co/600x400" },
        { name: "Typed RPC", image: "https://placehold.co/600x400" },
        {
          name: "Edge deploy & environments",
          image: "https://placehold.co/600x400",
        },
      ],
      imagePosition: "left",
    },
    {
      title: "Govern & observe your runs",
      description:
        "No vibe debugging: logs, traces, error analytics and cost-per-step to optimize quality and spend, with roles, approvals and tenancy.",
      items: [
        { name: "Logs & traces", image: "https://placehold.co/600x400" },
        { name: "Error analytics", image: "https://placehold.co/600x400" },
        {
          name: "Cost per step & budgets",
          image: "https://placehold.co/600x400",
        },
        {
          name: "Roles, approvals & tenancy",
          image: "https://placehold.co/600x400",
        },
      ],
      imagePosition: "right",
    },
    {
      title: "Reuse & monetize with our marketplace",
      description:
        "Install ready-made modules — or publish your own. Wallet-based per-run billing turns apps into revenue.",
      items: [
        { name: "One-click installs", image: "https://placehold.co/600x400" },
        { name: "Publish modules", image: "https://placehold.co/600x400" },
        {
          name: "Per-run billing (wallet)",
          image: "https://placehold.co/600x400",
        },
        { name: "Templates & packages", image: "https://placehold.co/600x400" },
      ],
      imagePosition: "left",
    },
  ],
}: Props) {
  return (
    <section class="w-full px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-40 bg-dc-50 flex flex-col justify-start items-center gap-6 sm:gap-8 lg:gap-14">
      <div class="w-full max-w-8xl flex flex-col justify-start items-center gap-6 sm:gap-8 lg:gap-14">
        {/* Header */}
        <div class="self-stretch flex flex-col justify-start items-center gap-4 sm:gap-5 lg:gap-6">
          <h2 class="w-full max-w-3xl text-center text-dc-800 text-2xl sm:text-3xl lg:text-5xl font-medium leading-tight">
            {title}
          </h2>
          <p class="self-stretch text-center text-dc-500 text-sm sm:text-base lg:text-lg font-normal leading-relaxed px-4 sm:px-0">
            {subtitle}
          </p>
        </div>

        {/* Feature Cards - Interactive */}
        <FeaturesInteractive
          features={features}
          alignImageOpposite={alignImageOpposite}
        />
      </div>
    </section>
  );
}
