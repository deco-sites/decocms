import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "../components/ui/Button.tsx";
import Icon from "../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import MarkupBadge from "../components/ui/MarkupBadge.tsx";

/**
 * @titleBy name
 */
export interface PricingPlanFeature {
  /**
   * @title Nome da funcionalidade
   * @description Nome da funcionalidade incluída no plano
   */
  name: string;
  /**
   * @title Ícone
   * @description Nome do ícone Material Design a ser exibido
   */
  icon: string;
  /**
   * @title Destaque
   * @description Se a funcionalidade deve ser destacada com badge
   */
  highlight?: boolean;
  /**
   * @title Texto do destaque
   * @description Texto para exibir no badge de destaque (ex: "20% markup")
   */
  highlightText?: string;
}

/**
 * @titleBy name
 */
export interface PricingPlan {
  /**
   * @title Nome do plano
   * @description Nome do plano (ex: Free, Starter, Growth, Scale)
   */
  name: string;
  /**
   * @title Preço
   * @description Preço mensal do plano em USD
   */
  price: number;
  /**
   * @title Texto do preço
   * @description Texto adicional do preço (ex: "converted into AI credits")
   */
  priceText?: string;
  /**
   * @title Número de assentos
   * @description Quantidade de assentos incluídos no plano
   */
  seats: number;
  /**
   * @title Descrição
   * @description Descrição do público-alvo do plano
   */
  description: string;
  /**
   * @title Imagem do plano
   * @description Imagem ou ícone representativo do plano
   */
  image: ImageWidget;
  /**
   * @title Funcionalidades
   * @description Lista de funcionalidades incluídas no plano
   */
  features: PricingPlanFeature[];
  /**
   * @title URL do botão
   * @description URL para onde o botão "Get Started" direciona
   */
  buttonUrl?: string;
  /**
   * @title Texto do botão
   * @description Texto do botão de ação
   */
  buttonText?: string;
}

/**
 * @titleBy name
 */
export interface CustomPlanFeature {
  /**
   * @title Nome da funcionalidade
   * @description Nome da funcionalidade do plano customizado
   */
  name: string;
  /**
   * @title Ícone
   * @description Nome do ícone Material Design a ser exibido
   */
  icon: string;
}

export interface CustomPlan {
  /**
   * @title Título
   * @description Título do plano customizado
   */
  title: string;
  /**
   * @title Imagem de fundo
   * @description Imagem decorativa de fundo do plano customizado
   */
  backgroundImage?: ImageWidget;
  /**
   * @title Funcionalidades
   * @description Lista de funcionalidades do plano customizado
   */
  features: CustomPlanFeature[];
  /**
   * @title Texto do botão
   * @description Texto do botão de ação
   */
  buttonText: string;
  /**
   * @title URL do botão
   * @description URL para onde o botão direciona
   */
  buttonUrl?: string;
}

export interface Props {
  /**
   * @title Título da seção
   * @description Título principal da seção de preços
   */
  title?: string;
  /**
   * @title Subtítulo
   * @description Texto explicativo abaixo do título
   */
  subtitle?: string;
  /**
   * @title Planos de preços
   * @description Lista de planos de preços disponíveis
   */
  plans: PricingPlan[];
  /**
   * @title Plano customizado
   * @description Configuração do plano customizado
   */
  customPlan: CustomPlan;
}

const defaultProps: Props = {
  title: "Simple pricing",
  subtitle:
    "Test deco.chat 7-days for free, with your team. No credit card required.",
  plans: [
    {
      name: "Free",
      price: 500,
      priceText: "converted into AI credits",
      seats: 1,
      description: "For hobbyist projects by solo devs.",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff01967e-4617-4163-971f-165832658f77",
      buttonText: "Get Started",
      buttonUrl: "/signup",
      features: [
        {
          name: "AI Usage Rate",
          icon: "bolt",
          highlight: true,
          highlightText: "20% markup",
        },
        {
          name: "Tap-up credits",
          icon: "add_chart",
        },
        {
          name: "$2 AI credits",
          icon: "attach_money",
        },
      ],
    },
    {
      name: "Starter",
      price: 500,
      priceText: "converted into AI credits",
      seats: 50,
      description: "For businesses growing AI operations",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff01967e-4617-4163-971f-165832658f77",
      buttonText: "Get Started",
      buttonUrl: "/signup",
      features: [
        {
          name: "Optimized AI Usage Rate",
          icon: "bolt",
          highlight: true,
          highlightText: "15% markup",
        },
        {
          name: "Support via ticket — no SLA",
          icon: "support_agent",
        },
        {
          name: "Weekly Office Hours",
          icon: "groups",
        },
        {
          name: "Premium support for $1k",
          icon: "diamond",
        },
      ],
    },
    {
      name: "Growth",
      price: 2500,
      priceText: "converted into AI credits",
      seats: 50,
      description: "For organizations deploying AI at scale",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff01967e-4617-4163-971f-165832658f77",
      buttonText: "Get Started",
      buttonUrl: "/signup",
      features: [
        {
          name: "Better AI Usage Rate",
          icon: "bolt",
          highlight: true,
          highlightText: "10% markup",
        },
        {
          name: "Manage different workspaces",
          icon: "workspaces",
        },
        {
          name: "Support via ticket with SLA",
          icon: "support_agent",
        },
        {
          name: "Success Team support with SLA",
          icon: "military_tech",
        },
        {
          name: "1h/ week of dedicated technical support",
          icon: "build",
        },
      ],
    },
    {
      name: "Scale",
      price: 7500,
      priceText: "converted into AI credits",
      seats: 100,
      description: "For organizations deploying AI at scale",
      image:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff01967e-4617-4163-971f-165832658f77",
      buttonText: "Get Started",
      buttonUrl: "/signup",
      features: [
        {
          name: "Best AI Usage Rate",
          icon: "bolt",
          highlight: true,
          highlightText: "5% markup",
        },
        {
          name: "Manage different workspaces",
          icon: "workspaces",
        },
        {
          name: "Support via ticket with priority SLA",
          icon: "support_agent",
        },
        {
          name: "Dedicated Success Team",
          icon: "supervisor_account",
        },
        {
          name: "3h/ week of dedicated technical support",
          icon: "build",
        },
      ],
    },
  ],
  customPlan: {
    title: "Need more scale?",
    backgroundImage:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff01967e-4617-4163-971f-165832658f77",
    features: [
      {
        name: "500+ Builder Seats",
        icon: "person",
      },
      {
        name: "Custom integrations",
        icon: "extension",
      },
      {
        name: "Self-hosting options",
        icon: "dns",
      },
      {
        name: "BYOK (Bring Your Own Keys)",
        icon: "key",
      },
    ],
    buttonText: "Let's talk!",
    buttonUrl: "/contact",
  },
};

export default function PricingPlans({
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  plans = defaultProps.plans,
  customPlan = defaultProps.customPlan,
}: Props) {
  return (
    <div className="w-full bg-dc-50 p-4">
      <div className="w-full max-w-[1440px] mx-auto bg-dc-50 rounded-3xl px-0 md:px-16 py-10 flex flex-col items-center gap-16 overflow-hidden">
        {/* Header */}
        <div className="w-full flex flex-col items-center gap-6">
          <h1 className="text-center text-dc-800 text-4xl md:text-[3.5rem] font-medium leading-tight">
            {title}
          </h1>
          <p className="text-center text-dc-500 text-base md:text-lg font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Pricing Plans Grid */}
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="flex-1 bg-dc-100 rounded-xl p-8 flex flex-col items-center gap-6 overflow-hidden"
              >
                {/* Plan Image */}
                <div className="w-36 h-36 relative">
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    width={144}
                    height={144}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Plan Content */}
                <div className="w-full flex flex-col gap-12">
                  <div className="w-full flex flex-col gap-6">
                    <div className="w-full flex flex-col gap-6">
                      {/* Plan Name */}
                      <h3 className="text-left text-dc-800 text-2xl font-medium leading-10">
                        {plan.name}
                      </h3>

                      {/* Price */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-baseline gap-1">
                          <span className="text-[#7F9300] text-4xl font-medium leading-tightest">
                            ${plan.price.toLocaleString()}
                          </span>
                          <span className="text-dc-400 text-lg font-normal leading-none">
                            /month
                          </span>
                        </div>
                        <p className="text-dc-400 text-base font-normal leading-none italic min-h-[1.25rem]">
                          {plan.priceText}
                        </p>
                      </div>

                      {/* Seats */}
                      <div className="w-full flex flex-col gap-4">
                        <div className="w-full h-px bg-dc-300"></div>
                        <div className="w-full flex justify-between items-start">
                          <span className="text-dc-500 text-lg font-normal leading-none">
                            Seats
                          </span>
                          <span className="text-dc-500 text-lg font-normal leading-none">
                            {plan.seats}
                          </span>
                        </div>
                        <div className="w-full h-px bg-dc-300"></div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-dc-500 text-lg font-normal leading-tight">
                      {plan.description}
                    </p>

                    {/* Button */}
                    <Button
                      variant="primary"
                      size="medium"
                      href={plan.buttonUrl}
                      className="w-full"
                    >
                      {plan.buttonText || "Get Started"}
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="w-full flex flex-col gap-4">
                    <h4 className="text-dc-400 text-sm font-medium leading-none">
                      Highlighted Features:
                    </h4>
                    <div className="w-full flex flex-col gap-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="w-full flex items-start gap-2"
                        >
                          <div className="pt-1 flex items-start">
                            <Icon
                              name={feature.icon}
                              size="small"
                              class="text-purple-light"
                            />
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <span className="text-dc-500 text-base font-normal leading-tight">
                              {feature.name}
                            </span>
                            {feature.highlight && feature.highlightText && (
                              <MarkupBadge text={feature.highlightText} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Plan */}
          <div className="w-full bg-primary-dark rounded-xl p-6 md:p-12 pb-64 md:pb-12 flex items-center gap-6 overflow-hidden relative">
            <div className="flex-1 flex flex-col justify-center items-start gap-6 relative z-10">
              <h3 className="text-dc-100 text-2xl md:text-3xl font-medium leading-10">
                {customPlan.title}
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-4">
                  {customPlan.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon
                        name={feature.icon}
                        size="small"
                        class="text-primary-light"
                      />
                      <span className="text-dc-200 text-base font-normal leading-tight">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {customPlan.features.slice(2).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon
                        name={feature.icon}
                        size="small"
                        class="text-primary-light"
                      />
                      <span className="text-dc-200 text-base font-normal leading-tight">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                variant="primary"
                size="medium"
                href={customPlan.buttonUrl}
                className="px-8 md:px-16"
              >
                {customPlan.buttonText}
              </Button>
            </div>

            {/* Background Image */}
            {customPlan.backgroundImage && (
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 md:-right-20 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 w-[400px] h-[300px] md:w-[533px] md:h-[462px]">
                <Image
                  src={customPlan.backgroundImage}
                  alt="Background decoration"
                  width={533}
                  height={462}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Preview() {
  return <PricingPlans {...defaultProps} />;
}
