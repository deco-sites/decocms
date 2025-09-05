import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface ModelPricingData {
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
  /**
   * @title Cor do ícone
   * @description Cor de fundo do ícone do provedor
   */
  iconColor?: string;
}

interface ModelPricingTableProps {
  /**
   * @title Dados dos modelos
   * @description Lista de modelos com seus preços
   */
  models: ModelPricingData[];
  /**
   * @title Classes adicionais
   * @description Classes CSS adicionais para estilização
   */
  className?: string;
}

export default function ModelPricingTable(
  { models, className = "" }: ModelPricingTableProps,
) {
  return (
    <div
      className={`w-full max-w-5xl mx-auto flex flex-col gap-4 ${className}`}
    >
      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-dc-200 overflow-hidden">
        <div className="flex">
          {/* Model Column */}
          <div className="w-[300px] lg:w-[400px] flex flex-col">
            {/* Header */}
            <div className="h-14 px-4 py-2 border-b border-dc-200 flex items-center">
              <div className="text-dc-400 text-base font-medium">
                Model
              </div>
            </div>

            {/* Model Rows */}
            {models.map((model, index) => (
              <div
                key={index}
                className="h-20 p-4 border-b border-dc-200 last:border-b-0 flex items-center gap-3"
              >
                {model.providerIcon && (
                  <div className="w-8 h-8 flex-shrink-0">
                    <Image
                      src={model.providerIcon}
                      alt={model.provider}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="text-dc-700 text-lg font-normal leading-snug">
                    {model.name}
                  </div>
                  <div className="text-dc-400 text-lg font-normal leading-snug">
                    {model.provider}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Tokens Column */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="h-14 px-4 py-2 border-b border-dc-200 flex items-center justify-center">
              <div className="text-dc-400 text-base font-medium">
                Input Tokens
              </div>
            </div>

            {/* Input Token Rows */}
            {models.map((model, index) => (
              <div
                key={index}
                className="h-20 p-4 border-b border-dc-200 last:border-b-0 flex items-center justify-center"
              >
                <div className="text-dc-700 text-lg font-normal leading-snug">
                  ${model.inputCost.toFixed(2)} / 1M tokens
                </div>
              </div>
            ))}
          </div>

          {/* Output Tokens Column */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="h-14 px-4 py-2 border-b border-dc-200 flex items-center justify-center">
              <div className="text-dc-400 text-base font-medium">
                Output Tokens
              </div>
            </div>

            {/* Output Token Rows */}
            {models.map((model, index) => (
              <div
                key={index}
                className="h-20 p-4 border-b border-dc-200 last:border-b-0 flex items-center justify-center"
              >
                <div className="text-dc-700 text-lg font-normal leading-snug">
                  ${model.outputCost.toFixed(2)} / 1M tokens
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {models.map((model, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-dc-200 p-4 flex flex-col gap-4"
          >
            {/* Model Info */}
            <div className="flex items-center gap-3">
              {model.providerIcon && (
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src={model.providerIcon}
                    alt={model.provider}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-dc-700 text-base font-medium leading-snug">
                  {model.name}
                </div>
                <div className="text-dc-400 text-sm font-normal leading-snug">
                  {model.provider}
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between py-2 border-b border-dc-100">
                <span className="text-dc-400 text-sm font-medium">
                  Input Tokens
                </span>
                <span className="text-dc-700 text-sm font-normal">
                  ${model.inputCost.toFixed(2)} / 1M tokens
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-dc-400 text-sm font-medium">
                  Output Tokens
                </span>
                <span className="text-dc-700 text-sm font-normal">
                  ${model.outputCost.toFixed(2)} / 1M tokens
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
