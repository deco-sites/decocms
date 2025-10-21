import { useSignal } from "@preact/signals";

export default function LandingPage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header class="container mx-auto px-4 py-6">
        <nav class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">H</span>
            </div>
            <span class="text-white font-bold text-2xl">Hackathon OS</span>
          </div>
          <div class="flex gap-4">
            <a href="/hackathon-os/login" class="text-white hover:text-purple-300 transition-colors">
              Login
            </a>
            <a 
              href="/hackathon-os/cadastro" 
              class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Cadastre-se
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-6xl font-bold text-white mb-6">
          Organize Hackathons
          <br />
          <span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            de Forma Simples
          </span>
        </h1>
        <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Plataforma completa para gerenciar eventos, times, desafios, submissões e avaliações.
          Tudo em um só lugar.
        </p>
        <div class="flex gap-4 justify-center">
          <a 
            href="/hackathon-os/eventos" 
            class="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Explorar Eventos
          </a>
          <a 
            href="/hackathon-os/cadastro" 
            class="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors border border-white/20"
          >
            Criar Conta
          </a>
        </div>
      </section>

      {/* Features */}
      <section class="container mx-auto px-4 py-20">
        <h2 class="text-4xl font-bold text-white text-center mb-16">
          Tudo que você precisa
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">👥</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Gestão de Times</h3>
            <p class="text-gray-300">
              Crie times, convide membros e organize colaborações de forma eficiente
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Desafios</h3>
            <p class="text-gray-300">
              Defina desafios customizados e permita que participantes proponham novos
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚖️</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Sistema de Avaliação</h3>
            <p class="text-gray-300">
              Configure critérios personalizados e permita que jurados avaliem projetos
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Classificação</h3>
            <p class="text-gray-300">
              Rankings automáticos baseados nas avaliações dos jurados
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔔</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Notificações</h3>
            <p class="text-gray-300">
              Sistema completo de notificações para manter todos informados
            </p>
          </div>

          <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div class="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚙️</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Configurável</h3>
            <p class="text-gray-300">
              Personalize cada aspecto do seu hackathon conforme suas necessidades
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="container mx-auto px-4 py-20">
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 class="text-4xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p class="text-xl text-white/90 mb-8">
            Crie sua conta gratuitamente e organize seu próximo hackathon hoje mesmo
          </p>
          <a 
            href="/hackathon-os/cadastro" 
            class="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Começar Agora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer class="container mx-auto px-4 py-8 border-t border-white/10">
        <div class="text-center text-gray-400">
          <p>© 2024 Hackathon OS. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}