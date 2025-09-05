import type { ImageWidget } from "apps/admin/widgets.ts";
import ModelPricingTable, {
  type ModelPricingData,
} from "../components/ui/ModelPricingTable.tsx";

export interface ModelPricing {
  /**
   * @title ID do modelo
   * @description Identificador único do modelo
   */
  id: string;
  /**
   * @title Nome do modelo
   * @description Nome descritivo do modelo
   */
  name: string;
  /**
   * @title Custo de entrada
   * @description Custo por 1M tokens de entrada (em USD)
   */
  inputCost: number;
  /**
   * @title Custo de saída
   * @description Custo por 1M tokens de saída (em USD)
   */
  outputCost: number;
  /**
   * @title Provedor
   * @description Nome do provedor do modelo
   */
  provider: string;
  /**
   * @title Ícone do provedor
   * @description Ícone/logo do provedor do modelo
   */
  providerIcon?: ImageWidget;
}

/**
 * @titleBy name
 */
export interface ProviderConfig {
  /**
   * @title Nome do provedor
   * @description Nome exato do provedor (ex: OpenAI, Anthropic, Vertex)
   */
  name: string;
  /**
   * @title Ícone customizado
   * @description Ícone/logo customizado para este provedor
   */
  customIcon?: ImageWidget;
}

export interface Props {
  /**
   * @title Título da tabela de modelos
   * @description Título da seção de preços dos modelos
   */
  title?: string;
  /**
   * @title Descrição da tabela de modelos
   * @description Descrição explicativa da tabela de modelos
   */
  description?: string;
  /**
   * @title Modelos a exibir
   * @description Lista de IDs de modelos para exibir na tabela de preços
   */
  modelsToShow?: string[];
  /**
   * @title Configuração de provedores
   * @description Configure ícones e cores customizadas para cada provedor
   */
  providerConfigs?: ProviderConfig[];
}

// Cache for models data
let cachedModelsData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Helper function to get provider icon and color
function getProviderIconAndColor(
  provider: string,
  providerConfigs: ProviderConfig[] = [],
): { icon?: ImageWidget; color?: string } {
  // First check if there's a custom configuration
  const customConfig = providerConfigs.find((config) =>
    config.name === provider
  );
  if (customConfig && customConfig.customIcon) {
    return {
      icon: customConfig.customIcon,
    };
  }

  // No fallback needed - just return empty if no custom icon
  return {};
}

// Helper function to process models data
function processModelsData(
  data: any,
  modelsToShow: string[],
  providerConfigs: ProviderConfig[] = [],
): ModelPricingData[] {
  const allModels: ModelPricingData[] = [];
  const seenModels = new Set<string>(); // Track models to prevent duplicates

  for (const [providerKey, providerData] of Object.entries(data)) {
    const provider = providerData as any;
    if (provider.models) {
      for (const [modelKey, modelData] of Object.entries(provider.models)) {
        const model = modelData as any;
        if (model.cost && model.id && !seenModels.has(model.id)) {
          // Add to seen set to prevent duplicates
          seenModels.add(model.id);

          const { icon, color } = getProviderIconAndColor(
            provider.name,
            providerConfigs,
          );

          allModels.push({
            id: model.id,
            name: model.name,
            inputCost: model.cost.input || 0,
            outputCost: model.cost.output || 0,
            provider: provider.name,
            providerIcon: icon,
            iconColor: color,
          });
        }
      }
    }
  }

  // Filter models based on the ones we want to show (maintain order)
  const filteredModels: ModelPricingData[] = [];
  for (const modelId of modelsToShow) {
    const model = allModels.find((m) => m.id === modelId);
    if (model) {
      filteredModels.push(model);
    }
  }

  return filteredModels;
}

// Loader function to fetch models data with caching
export async function loader(props: Props, _req: Request) {
  const now = Date.now();

  // Check if we need to fetch fresh data
  if (!cachedModelsData || now - lastFetchTime > CACHE_DURATION) {
    try {
      console.log("Fetching fresh models data from API...");
      const response = await fetch("https://models.dev/api.json");
      cachedModelsData = await response.json();
      lastFetchTime = now;
    } catch (error) {
      console.error("Failed to fetch models pricing:", error);
      // If we have cached data, use it; otherwise return empty array
      if (!cachedModelsData) {
        return {
          ...props,
          modelsPricing: [],
        };
      }
    }
  } else {
    console.log("Using cached models data...");
  }

  // Process the cached data
  const modelsToShow = props.modelsToShow || [
    "gpt-4.1-mini",
    "gemini-2.5-pro",
    "gemini-2.5-flash-lite-preview-06-17",
    "claude-sonnet-4-20250514",
    "claude-3-7-sonnet-20250219",
    "gpt-4.1",
    "gpt-4.1-nano",
    "o3-mini",
    "grok-4",
  ];

  const filteredModels = processModelsData(
    cachedModelsData,
    modelsToShow,
    props.providerConfigs,
  );

  return {
    ...props,
    modelsPricing: filteredModels,
  };
}

const defaultProps: Props = {
  title: "AI Models Pricing",
  description:
    "Transparent pricing for all AI models. Use all models inside of Agents, Workflows and UIs.",
  modelsToShow: [
    "gpt-4.1-mini",
    "gemini-2.5-pro",
    "gemini-2.5-flash-lite-preview-06-17",
    "claude-sonnet-4-20250514",
    "claude-3-7-sonnet-20250219",
    "gpt-4.1",
    "gpt-4.1-nano",
    "o3-mini",
    "grok-4",
  ],
  providerConfigs: [
    {
      name: "OpenAI",
    },
    {
      name: "Anthropic",
    },
    {
      name: "Vertex",
    },
    {
      name: "Google",
    },
    {
      name: "xAI",
    },
  ],
};

export default function ModelsTable({
  title = defaultProps.title,
  description = defaultProps.description,
  modelsPricing = [],
}: Props & { modelsPricing?: ModelPricingData[] }) {
  return (
    <div className="w-full bg-dc-50 px-4 md:px-8 lg:px-16 py-16 md:py-24 lg:py-40">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-8 md:gap-12 lg:gap-14">
        {/* Header */}
        <div className="w-full flex flex-col items-center gap-4 md:gap-6">
          <h1 className="text-center text-dc-800 text-4xl md:text-[3.5rem] font-medium leading-tight">
            {title}
          </h1>
          <p className="text-center text-dc-500 text-base md:text-lg font-normal leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>

        {/* Models Table */}
        {modelsPricing && modelsPricing.length > 0 && (
          <div className="w-full flex flex-col gap-4">
            <ModelPricingTable models={modelsPricing} />
          </div>
        )}
      </div>
    </div>
  );
}

export function Preview() {
  return <ModelsTable {...defaultProps} />;
}
