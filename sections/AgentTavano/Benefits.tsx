export interface Benefit {
  title: string;
  description: string;
  metric: string;
}

export interface Props {
  title?: string;
  benefits?: Benefit[];
}

export default function Benefits({
  title = "Por que escolher o Agent Tavano?",
  benefits = []
}: Props) {
  return (
    <section class="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background decorations */}
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          <div class="w-24 h-1 bg-white mx-auto"></div>
        </div>

        {/* Benefits Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              class="group p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="flex items-start space-x-6">
                {/* Metric Circle */}
                <div class="flex-shrink-0">
                  <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                    <span class="text-sm font-bold text-center leading-tight">
                      {benefit.metric}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-3 group-hover:text-white/90 transition-colors">
                    {benefit.title}
                  </h3>
                  <p class="text-white/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Progress bar animation */}
              <div class="mt-6 h-1 bg-white/20 rounded-full overflow-hidden">
                <div class="h-full bg-white/40 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="group">
            <div class="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
            <div class="text-white/70 text-sm">Projetos Criados</div>
          </div>
          <div class="group">
            <div class="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
            <div class="text-white/70 text-sm">Taxa de Sucesso</div>
          </div>
          <div class="group">
            <div class="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">24h</div>
            <div class="text-white/70 text-sm">Tempo Médio</div>
          </div>
          <div class="group">
            <div class="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">∞</div>
            <div class="text-white/70 text-sm">Possibilidades</div>
          </div>
        </div>
      </div>
    </section>
  );
}