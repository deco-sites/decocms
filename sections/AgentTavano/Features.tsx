export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Props {
  title?: string;
  features?: Feature[];
}

export default function Features({
  title = "O que o Agent Tavano pode fazer por você",
  features = []
}: Props) {
  return (
    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        {/* Header - matching homepage style */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {title}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Descubra todas as capacidades do seu assistente de IA especializado
          </p>
          <div class="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              class="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div class="relative z-10 text-center">
                <div class="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h3 class="text-xl font-bold text-primary mb-4 group-hover:text-primary/90 transition-colors">
                  {feature.title}
                </h3>
                
                <p class="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              {/* Decorative elements */}
              <div class="absolute top-4 right-4 w-8 h-8 border-2 border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute bottom-4 left-4 w-4 h-4 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
              
              {/* Progress indicator */}
              <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                <div class="h-full bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom section with stats */}
        <div class="mt-20">
          <div class="text-center mb-12">
            <p class="text-gray-500 text-lg">
              Junte-se a centenas de empresas que já transformaram seus negócios
            </p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div class="group">
              <div class="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">10x</div>
              <div class="text-gray-600 text-sm">Mais Rápido</div>
            </div>
            <div class="group">
              <div class="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <div class="text-gray-600 text-sm">Precisão</div>
            </div>
            <div class="group">
              <div class="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div class="text-gray-600 text-sm">Disponível</div>
            </div>
            <div class="group">
              <div class="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div class="text-gray-600 text-sm">Personalizado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}