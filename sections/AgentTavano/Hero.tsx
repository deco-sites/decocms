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
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        {backgroundImage && (
          <img 
            src={backgroundImage} 
            alt="Background" 
            class="w-full h-full object-cover opacity-20"
          />
        )}
      </div>
      
      {/* Animated background elements */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div class="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <div class="mb-6">
          <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
            🤖 Powered by AI
          </span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        
        <h2 class="text-xl md:text-2xl font-light mb-8 text-white/90 max-w-3xl mx-auto">
          {subtitle}
        </h2>
        
        <p class="text-lg md:text-xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed">
          {description}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={ctaLink}
            class="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            {ctaText}
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
          
          <a 
            href="#demo"
            class="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            Ver Demonstração
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </a>
        </div>
        
        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}