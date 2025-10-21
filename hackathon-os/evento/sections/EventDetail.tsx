import { useUser } from "../../islands/UserContext.tsx";
import { getEventById } from "../../data/mockData.ts";

interface EventDetailProps {
  eventId: string;
  currentTab?: string;
}

export default function EventDetail({ eventId, currentTab = "intro" }: EventDetailProps) {
  const { currentUser } = useUser();
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
          <div class="text-center py-16">
            <p class="text-gray-500 text-lg">Evento não encontrado.</p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "intro", label: "Intro e Regras", icon: "📋" },
    { id: "premiacoes", label: "Premiação", icon: "🏆" },
    { id: "participantes", label: "Participantes", icon: "👥" },
    { id: "times", label: "Times", icon: "👨‍👩‍👧‍👦" },
    { id: "jurados", label: "Jurados", icon: "⚖️" },
    { id: "desafios", label: "Desafios", icon: "🎯" },
    { id: "submissoes", label: "Submissões", icon: "📤" },
    { id: "classificacao", label: "Classificação", icon: "🥇" },
    { id: "organizacao", label: "Organização", icon: "🏢" },
  ];

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Event Header */}
      <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div class="container mx-auto px-4 py-8">
          <div class="flex items-center gap-4 mb-4">
            <a href="/hackathon-os/eventos" class="text-white/80 hover:text-white">
              ← Voltar para eventos
            </a>
          </div>
          <h1 class="text-4xl font-bold mb-2">{event.name}</h1>
          <p class="text-white/90 text-lg">{event.description}</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div class="container mx-auto px-4">
          <div class="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <a
                key={tab.id}
                href={`/hackathon-os/evento/${eventId}/${tab.id}`}
                class={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  currentTab === tab.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <span class="mr-1">{tab.icon}</span>
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div class="container mx-auto px-4 py-8">
        {currentTab === "intro" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Bem-vindo ao {event.name}!</h2>
            <div class="prose max-w-none">
              <p class="text-gray-700 leading-relaxed">
                {event.intro || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
              <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">Regras do Evento</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li>Times de até {event.config.maxTeamSize} pessoas</li>
                <li>Prazo de inscrição: {new Date(event.config.deadlines.registration).toLocaleDateString("pt-BR")}</li>
                <li>Prazo de submissão: {new Date(event.config.deadlines.submission).toLocaleDateString("pt-BR")}</li>
                <li>Prazo de avaliação: {new Date(event.config.deadlines.evaluation).toLocaleDateString("pt-BR")}</li>
                <li>Projetos devem ser originais e criados durante o evento</li>
                <li>Respeite o código de conduta e seja colaborativo</li>
              </ul>
            </div>
          </div>
        )}

        {currentTab === "premiacoes" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Premiação</h2>
            <div class="prose max-w-none mb-8">
              <p class="text-gray-700 text-lg">{event.awards}</p>
            </div>
            
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Critérios de Avaliação</h3>
            <div class="space-y-3">
              {event.config.evaluationCriteria.map(criteria => (
                <div key={criteria.name} class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span class="font-medium text-gray-900">{criteria.name}</span>
                  <span class="text-purple-600 font-bold">{criteria.weight}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === "participantes" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Participantes</h2>
            {event.config.participantsListPublic || currentUser?.role === "admin" || currentUser?.role === "organizador" ? (
              <div>
                <p class="text-gray-600 mb-4">{event.registrations} participantes inscritos</p>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Mock participant cards */}
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} class="p-4 border border-gray-200 rounded-lg">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          P{i}
                        </div>
                        <div>
                          <div class="font-medium text-gray-900">Participante {i}</div>
                          <div class="text-sm text-gray-500">Desenvolvedor</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p class="text-gray-500 italic">A lista de participantes não está pública.</p>
            )}
          </div>
        )}

        {currentTab === "times" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Times</h2>
              <a
                href={`/hackathon-os/evento/${eventId}/criar-time`}
                class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Criar Time
              </a>
            </div>
            <p class="text-gray-600 mb-6">Times de até {event.config.maxTeamSize} membros</p>
            <div class="space-y-4">
              {/* Mock teams will be shown in dedicated component */}
              <p class="text-gray-500 italic">Nenhum time criado ainda. Seja o primeiro!</p>
            </div>
          </div>
        )}

        {currentTab === "jurados" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Jurados</h2>
            <div class="grid md:grid-cols-2 gap-4">
              {/* Mock judges */}
              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    CJ
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Carlos Jurado</div>
                    <div class="text-sm text-gray-500">Arquiteto de Software</div>
                  </div>
                </div>
                <p class="text-sm text-gray-600">Arquiteto de Software, mentor e jurado em hackathons</p>
              </div>
              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    FL
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Fernanda Lima</div>
                    <div class="text-sm text-gray-500">Tech Lead</div>
                  </div>
                </div>
                <p class="text-sm text-gray-600">Tech Lead e mentora</p>
              </div>
            </div>
          </div>
        )}

        {currentTab === "desafios" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Desafios</h2>
              {event.config.allowUserChallenges && (
                <a
                  href={`/hackathon-os/evento/${eventId}/propor-desafio`}
                  class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Propor Desafio
                </a>
              )}
            </div>
            {/* Challenges will be shown in dedicated component */}
            <p class="text-gray-500 italic">Desafios serão carregados aqui...</p>
          </div>
        )}

        {currentTab === "submissoes" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Submissões</h2>
              <a
                href={`/hackathon-os/evento/${eventId}/submeter`}
                class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Nova Submissão
              </a>
            </div>
            <div class="mb-6">
              <h3 class="font-semibold text-gray-900 mb-2">Requisitos para Submissão:</h3>
              <ul class="list-disc list-inside space-y-1 text-gray-700">
                {event.config.submissionRequirements.map(req => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </div>
            <p class="text-gray-500 italic">Submissões serão listadas aqui...</p>
          </div>
        )}

        {currentTab === "classificacao" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Classificação</h2>
            <div class="space-y-3">
              {/* Mock rankings */}
              {[1, 2, 3].map(position => (
                <div key={position} class={`flex items-center gap-4 p-4 rounded-lg ${
                  position === 1 ? "bg-yellow-50 border-2 border-yellow-400" :
                  position === 2 ? "bg-gray-50 border-2 border-gray-400" :
                  "bg-orange-50 border-2 border-orange-400"
                }`}>
                  <div class="text-3xl">
                    {position === 1 ? "🥇" : position === 2 ? "🥈" : "🥉"}
                  </div>
                  <div class="flex-1">
                    <div class="font-bold text-gray-900">Time #{position}</div>
                    <div class="text-sm text-gray-600">Projeto Exemplo {position}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-gray-900">
                      {position === 1 ? "95" : position === 2 ? "88" : "82"}
                    </div>
                    <div class="text-xs text-gray-500">pontos</div>
                  </div>
                </div>
              ))}
            </div>
            <p class="text-gray-500 italic text-center mt-8">Classificação será atualizada após avaliações.</p>
          </div>
        )}

        {currentTab === "organizacao" && (
          <div class="bg-white rounded-lg shadow-md p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Equipe de Organização</h2>
            <div class="grid md:grid-cols-2 gap-4">
              {/* Mock organizers */}
              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    MO
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Maria Organizadora</div>
                    <div class="text-sm text-gray-500">Organizadora Principal</div>
                  </div>
                </div>
                <p class="text-sm text-gray-600">Organizadora de eventos tech há 5 anos</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}