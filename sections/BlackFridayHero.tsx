import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: ImageWidget;
  discount?: string;
}

export default function BlackFridayHero({
  title = "🔥 BLACK FRIDAY NA DECO",
  subtitle = "O melhor lugar para criar seu e-commerce",
  description =
    "Aproveite descontos incríveis e crie sua loja online com a plataforma mais moderna do mercado. Performance, conversão e resultados garantidos!",
  ctaText = "COMEÇAR AGORA",
  ctaLink = "/",
  backgroundImage =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
  discount = "ATÉ 50% OFF",
}: Props) {
  return (
    <div class="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Black Friday Background"
            class="w-full h-full object-cover opacity-30"
          />
        )}
      </div>

      {/* Animated particles */}
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse">
        </div>
        <div class="absolute top-1/3 right-1/3 w-1 h-1 bg-red-500 rounded-full animate-bounce">
        </div>
        <div class="absolute bottom-1/4 left-1/3 w-3 h-3 bg-orange-400 rounded-full animate-ping">
        </div>
        <div class="absolute top-1/2 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse">
        </div>
      </div>

      {/* Content */}
      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Discount Badge */}
        <div class="inline-block mb-6">
          <span class="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full text-xl font-bold animate-pulse shadow-lg">
            {discount}
          </span>
        </div>

        {/* Main Title */}
        <h1 class="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
          <span class="bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle */}
        <h2 class="text-2xl md:text-3xl text-gray-200 font-semibold mb-6">
          {subtitle}
        </h2>

        {/* Description */}
        <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div class="text-3xl mb-2">⚡</div>
            <h3 class="text-white font-semibold mb-1">Performance</h3>
            <p class="text-gray-300 text-sm">
              Sites ultra-rápidos com Edge Computing
            </p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div class="text-3xl mb-2">💰</div>
            <h3 class="text-white font-semibold mb-1">Conversão</h3>
            <p class="text-gray-300 text-sm">
              Aumente suas vendas com IA e otimização
            </p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div class="text-3xl mb-2">🚀</div>
            <h3 class="text-white font-semibold mb-1">Facilidade</h3>
            <p class="text-gray-300 text-sm">
              Visual editor e deploy automático
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div class="space-y-4">
          <a
            href={ctaLink}
            class="inline-block bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            {ctaText}
          </a>
          <p class="text-gray-400 text-sm">
            ⏰ Oferta por tempo limitado • Sem compromisso
          </p>
        </div>

        {/* Trust indicators */}
        <div class="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div class="text-white text-sm">
            <span class="font-semibold">1000+</span> lojas criadas
          </div>
          <div class="text-white text-sm">
            <span class="font-semibold">99.9%</span> uptime
          </div>
          <div class="text-white text-sm">
            <span class="font-semibold">24/7</span> suporte
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent">
      </div>
    </div>
  );
}
