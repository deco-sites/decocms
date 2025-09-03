import { useSignal } from "@preact/signals";

export interface Feature {
  title: string;
  description: string;
  items: string[];
}

export interface Props {
  /** @title Título Principal */
  title?: string;
  /** @title Subtítulo */
  subtitle?: string;
  /** @title Features */
  features?: Feature[];
}

export default function Features({
  title = "One place to build, run, and monetize your agents",
  subtitle = "Govern access, trace every step, and turn reusable modules into paid products.",
  features = [
    {
      title: "Connect your context",
      description: "Unify data, tools and models with policy, RBAC and observability — your agents always get the right context, safely.",
      items: ["MCP-native connectors", "Policy routing & RBAC", "Spend caps & budgets", "Audit trail"]
    },
    {
      title: "Prototype in chat, ship in code. Same repo.",
      description: "Ship agents, workflows and views in the same runtime: TypeScript SDK, typed RPC and edge deploy.",
      items: ["Chat → Code prototyping", "TS SDK & CLI", "Typed RPC", "Edge deploy & environments"]
    },
    {
      title: "Govern & observe your runs",
      description: "No vibe debugging: logs, traces, error analytics and cost-per-step to optimize quality and spend, with roles, approvals and tenancy.",
      items: ["Logs & traces", "Error analytics", "Cost per step & budgets", "Roles, approvals & tenancy"]
    },
    {
      title: "Reuse & monetize with our marketplace",
      description: "Install ready-made modules — or publish your own. Wallet-based per-run billing turns apps into revenue.",
      items: ["One-click installs", "Publish modules", "Per-run billing (wallet)", "Templates & packages"]
    }
  ]
}: Props) {
  const activeFeatures = useSignal<{[key: number]: number}>({
    0: 0, 1: 1, 2: 0, 3: 0
  });

  const handleFeatureClick = (featureIndex: number, itemIndex: number) => {
    activeFeatures.value = {
      ...activeFeatures.value,
      [featureIndex]: itemIndex
    };
  };

  const FeatureCard = ({ feature, featureIndex, isImageLeft }: { feature: Feature, featureIndex: number, isImageLeft: boolean }) => {
    const content = (
      <div class="flex-1 self-stretch pl-8 pr-20 py-8 flex flex-col justify-between items-start">
        <div class="self-stretch flex flex-col justify-start items-start gap-6">
          <h3 class="self-stretch text-[#1C1917] text-5xl font-medium leading-[57.60px]">
            {feature.title}
          </h3>
          <p class="self-stretch text-[#78716C] text-2xl font-normal leading-9">
            {feature.description}
          </p>
        </div>
        <div class="self-stretch flex flex-col justify-start items-start gap-2">
          {feature.items.map((item, itemIndex) => (
            <button
              key={itemIndex}
              type="button"
              onClick={() => handleFeatureClick(featureIndex, itemIndex)}
              class={`self-stretch p-4 rounded-xl flex justify-center items-center gap-2 transition-colors ${
                activeFeatures.value[featureIndex] === itemIndex
                  ? "bg-[#FAF9F7] text-[#1C1917]"
                  : "bg-[#E7E5E4] text-[#78716C] hover:bg-[#F0EFEE]"
              }`}
            >
              <div class="flex-1 text-left text-lg font-normal leading-relaxed">
                {item}
              </div>
            </button>
          ))}
        </div>
      </div>
    );

    const renderFeatureContent = () => {
      // Feature 1 (index 0) - Connect your context
      if (featureIndex === 0) {
        const activeItem = activeFeatures.value[featureIndex];
        if (activeItem === 0) { // MCP-native connectors
          return (
            <div class="absolute inset-3 bg-white rounded-xl p-6 flex flex-col gap-4">
              {/* Header */}
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-[#D0EC1A] rounded-lg flex items-center justify-center">
                    <div class="w-4 h-4 bg-[#07401A] rounded-sm"></div>
                  </div>
                  <span class="text-[#1C1917] font-medium">MCP Connectors</span>
                </div>
                <div class="text-[#78716C] text-sm">Connected: 12</div>
              </div>
              
              {/* Connector Grid */}
              <div class="grid grid-cols-4 gap-3 flex-1">
                {/* Row 1 */}
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Slack</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">GitHub</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-green-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Notion</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-red-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Gmail</span>
                </div>
                
                {/* Row 2 */}
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Discord</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Linear</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-yellow-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Figma</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-indigo-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Airtable</span>
                </div>
                
                {/* Row 3 */}
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-pink-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Drive</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-gray-600 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Zendesk</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-teal-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Shopify</span>
                </div>
                <div class="bg-[#F5F4F0] rounded-lg p-3 flex flex-col items-center gap-2">
                  <div class="w-8 h-8 bg-emerald-500 rounded-lg"></div>
                  <span class="text-xs text-[#1C1917]">Stripe</span>
                </div>
              </div>
              
              {/* Footer */}
              <div class="flex justify-between items-center text-sm text-[#78716C]">
                <span>60+ integrations available</span>
                <button type="button" class="text-[#D0EC1A] bg-[#07401A] px-3 py-1 rounded-lg text-xs">
                  Add New
                </button>
              </div>
            </div>
          );
        }
      }
      
      // Default placeholder for other features/items
      return (
        <div class="absolute inset-4 flex items-center justify-center">
          <div class="text-[#07401A] text-lg font-medium text-center">
            Feature {featureIndex + 1} - Item {activeFeatures.value[featureIndex] + 1}
          </div>
        </div>
      );
    };

    const image = (
      <div class="flex-1 h-[662px] p-3 relative bg-[#D0EC1A] rounded-2xl border border-[#E7E5E4] flex flex-col justify-end items-end gap-4 overflow-hidden">
        <div class="w-[794px] h-[780px] absolute left-0 top-[-22.57px] opacity-20 bg-[#07401A]"></div>
        {renderFeatureContent()}
      </div>
    );

    return (
      <div class="w-full max-w-[1312px] h-[678px] p-2 bg-[#F5F4F0] rounded-xl flex justify-start items-center gap-6 overflow-hidden">
        {isImageLeft ? (
          <>
            {image}
            {content}
          </>
        ) : (
          <>
            {content}
            {image}
          </>
        )}
      </div>
    );
  };

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

        {/* Feature Cards */}
        <div class="self-stretch flex flex-col justify-center items-center gap-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              featureIndex={index}
              isImageLeft={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
