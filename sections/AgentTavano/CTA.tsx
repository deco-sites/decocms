export interface CTAButton {
  text: string;
  link: string;
}

export interface Props {
  title?: string;
  description?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
}

export default function CTA({
  title = "Pronto para revolucionar seu e-commerce?",
  description = "Experimente o Agent Tavano e descubra como a inteligência artificial pode transformar seu negócio digital.",
  primaryCTA = { text: "Começar Agora", link: "/contact" },
  secondaryCTA = { text: "Ver Demonstração", link: "#demo" }
}: Props) {
  return (
    <section class="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main content */}
        <div class="mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {title}
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <a 
            href={primaryCTA.link}
            class="group inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <span>{primaryCTA.text}</span>
            <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </a>
          
          <a 
            href={secondaryCTA.link}
            class="group inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span>{secondaryCTA.text}</span>
            <svg class="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </a>
        </div>

        {/* Trust indicators */}
        <div class="border-t border-gray-200 pt-8">
          <p class="text-sm text-gray-500 mb-4">Trusted by innovative companies</p>
          <div class="flex justify-center items-center space-x-8 opacity-60">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-600">99.9% Uptime</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Enterprise Security</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span class="text-sm text-gray-600">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div class="mt-12 flex justify-center">
          <div class="flex space-x-2">
            <div class="w-3 h-3 bg-primary/30 rounded-full animate-bounce"></div>
            <div class="w-3 h-3 bg-primary/50 rounded-full animate-bounce delay-100"></div>
            <div class="w-3 h-3 bg-primary/70 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
}