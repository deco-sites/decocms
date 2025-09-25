export interface Feature {
  icon?: string;
  title?: string;
  description?: string;
  highlight?: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export default function BlackFridayFeatures({
  title = "Por que a deco é o melhor lugar para sua Black Friday?",
  subtitle = "Tudo que você precisa para vender mais nesta Black Friday",
  features = [
    {
      icon: "🚀",
      title: "Deploy em segundos",
      description: "Sua loja no ar em minutos, não em semanas",
      highlight: "10x mais rápido",
    },
    {
      icon: "⚡",
      title: "Performance extrema",
      description: "Sites que carregam em menos de 1 segundo",
      highlight: "Core Web Vitals 100",
    },
    {
      icon: "🤖",
      title: "IA integrada",
      description: "Otimização automática para aumentar conversões",
      highlight: "+30% vendas",
    },
    {
      icon: "📱",
      title: "Mobile-first",
      description: "Experiência perfeita em todos os dispositivos",
      highlight: "100% responsivo",
    },
    {
      icon: "🔧",
      title: "Visual Editor",
      description: "Edite sua loja sem código, em tempo real",
      highlight: "Sem programação",
    },
    {
      icon: "📊",
      title: "Analytics avançado",
      description: "Dados em tempo real para otimizar suas vendas",
      highlight: "Insights poderosos",
    },
  ],
}: Props) {
  return (
    <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div class="container mx-auto px-4">
        {/* Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              class="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Highlight Badge */}
              {feature.highlight && (
                <div class="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                  {feature.highlight}
                </div>
              )}

              {/* Title */}
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p class="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div class="text-center mt-16">
          <div class="bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-2xl p-8 border border-red-500/30 max-w-2xl mx-auto">
            <h3 class="text-2xl font-bold text-white mb-4">
              🎯 Pronto para dominar a Black Friday?
            </h3>
            <p class="text-gray-300 mb-6">
              Junte-se a centenas de lojistas que já escolheram a deco para suas
              vendas online
            </p>
            <a
              href="/"
              class="inline-block bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Começar minha loja agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
