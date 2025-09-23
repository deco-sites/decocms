export interface ShowcaseItem {
  title: string;
  description: string;
  image?: string;
  code?: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  items?: ShowcaseItem[];
}

export default function Showcase({
  title = "Veja o Agent Tavano em ação",
  subtitle = "Exemplos reais de como o Agent Tavano transforma ideias em código funcional",
  items = []
}: Props) {
  return (
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-6">
            {title}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
          <div class="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Showcase Grid */}
        <div class="space-y-16">
          {items.map((item, index) => (
            <div 
              key={index}
              class={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div class="flex-1 space-y-6">
                <h3 class="text-2xl md:text-3xl font-bold text-primary">
                  {item.title}
                </h3>
                <p class="text-lg text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Code snippet if available */}
                {item.code && (
                  <div class="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                    <pre class="text-green-400 text-sm">
                      <code>{item.code}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Visual */}
              <div class="flex-1">
                <div class="relative group">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      class="w-full rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
                    />
                  ) : (
                    <div class="w-full h-80 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
                      <div class="text-center">
                        <div class="text-6xl mb-4">🚀</div>
                        <p class="text-gray-500">Demo em breve</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay effect */}
                  <div class="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div class="mt-20 text-center">
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 class="text-2xl font-bold text-primary mb-4">
              Pronto para ver seu projeto ganhar vida?
            </h3>
            <p class="text-gray-600 mb-6">
              Experimente o Agent Tavano e transforme suas ideias em realidade digital
            </p>
            <a 
              href="#contact"
              class="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
              Começar Agora
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}