export interface ContextItem {
  icon: string;
  title: string;
  description: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  contextItems?: ContextItem[];
}

export default function Context({
  title = "Contexto Completo do Seu Negócio",
  subtitle =
    "O Agent Tavano conhece profundamente todos os aspectos da sua operação",
  contextItems = [],
}: Props) {
  return (
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-4">
            {title}
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
          <div class="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Context Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contextItems.map((item, index) => (
            <div
              key={index}
              class="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>

              {/* Content */}
              <div class="relative z-10">
                <div class="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                <h3 class="text-xl font-bold text-primary mb-4 group-hover:text-primary/90 transition-colors">
                  {item.title}
                </h3>

                <p class="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div class="absolute top-4 right-4 w-8 h-8 border-2 border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
              <div class="absolute bottom-4 left-4 w-4 h-4 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section with connecting lines visual */}
        <div class="mt-20 text-center">
          <div class="relative">
            <div class="flex justify-center items-center space-x-4 mb-8">
              <div class="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <div class="w-16 h-0.5 bg-gradient-to-r from-primary to-primary/30">
              </div>
              <div class="w-4 h-4 bg-primary/60 rounded-full animate-pulse delay-300">
              </div>
              <div class="w-16 h-0.5 bg-gradient-to-r from-primary/30 to-primary">
              </div>
              <div class="w-3 h-3 bg-primary rounded-full animate-pulse delay-600">
              </div>
            </div>

            <p class="text-gray-500 text-sm font-medium">
              Todos os dados conectados e sincronizados em tempo real
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
