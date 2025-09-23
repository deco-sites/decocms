import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: ImageWidget;
}

export default function Hero({
  title = "Conheça o Agent Tavano",
  subtitle = "Seu assistente inteligente para criação e evolução de e-commerce",
  description = "O Agent Tavano é um assistente de IA especializado que revoluciona a forma como você cria e gerencia sua loja online.",
  ctaText = "Experimente Agora",
  ctaLink = "#features",
  backgroundImage
}: Props) {
  return (
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Background Image */}
      {backgroundImage && (
        <div class="absolute inset-0">
          <img 
            src={backgroundImage} 
            alt="Background" 
            class="w-full h-full object-cover opacity-10"
          />
        </div>
      )}
      
      {/* Animated background elements - similar to homepage */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div class="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        {/* Badge - similar to homepage style */}
        <div class="mb-8">
          <span class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
            <span class="mr-2">🤖</span>
            Powered by Advanced AI
          </span>
        </div>
        
        {/* Main title - matching homepage typography */}
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
          {title.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </h1>
        
        {/* Subtitle */}
        <h2 class="text-xl md:text-2xl font-light mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed">
          {subtitle}
        </h2>
        
        {/* Description */}
        <p class="text-lg md:text-xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>
        
        {/* CTA Buttons - matching homepage style */}
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a 
            href={ctaLink}
            class="group inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <span>{ctaText}</span>
            <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
          
          <a 
            href="#demo"
            class="group inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <span>Ver Demonstração</span>
            <svg class="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </a>
        </div>
        
        {/* Trust indicators */}
        <div class="flex justify-center items-center space-x-8 text-white/60 text-sm">
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Disponível 24/7</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
            <span>Seguro & Confiável</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-600"></div>
            <span>Resultados Garantidos</span>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}