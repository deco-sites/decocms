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
    <section id="features" class="py-20 bg-base-100">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-6">
            {title}
          </h2>
          <div class="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              class="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div class="text-center">
                <div class="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h3 class="text-xl font-bold text-primary mb-4">
                  {feature.title}
                </h3>
                
                <p class="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover effect */}
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom decoration */}
        <div class="mt-16 text-center">
          <div class="inline-flex items-center space-x-2 text-gray-400">
            <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div class="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-200"></div>
            <div class="w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
}