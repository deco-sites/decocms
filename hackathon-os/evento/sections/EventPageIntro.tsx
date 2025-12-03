import AppWrapper from "../../sections/AppWrapper.tsx";
import { useUser } from "../../islands/UserContext.tsx";
import { getEventById } from "../../data/mockData.ts";
import { useState } from "preact/hooks";
import EventChallenges from "./EventChallenges.tsx";
import EventTeams from "./EventTeams.tsx";

interface EventPageIntroProps {
  eventId?: string;
}

export default function EventPageIntro(
  { eventId = "evt1" }: EventPageIntroProps,
) {
  const { currentUser } = useUser();
  const [currentTab, setCurrentTab] = useState("intro");
  const event = getEventById(eventId);

  if (!event) {
    return (
      <AppWrapper>
        <div class="min-h-screen bg-gray-50 py-8">
          <div class="container mx-auto px-4">
            <div class="text-center py-16">
              <p class="text-gray-500 text-lg">Evento não encontrado.</p>
            </div>
          </div>
        </div>
      </AppWrapper>
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
    <AppWrapper>
      <div class="min-h-screen bg-gray-50">
        {/* Event Header */}
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div class="container mx-auto px-4 py-8">
            <div class="flex items-center gap-4 mb-4">
              <a
                href="/hackathon-os/eventos"
                class="text-white/80 hover:text-white"
              >
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
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  class={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                    currentTab === tab.id
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  <span class="mr-1">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div class="container mx-auto px-4 py-8">
          {currentTab === "intro" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                Bem-vindo ao {event.name}!
              </h2>
              <div class="prose max-w-none">
                <p class="text-gray-700 leading-relaxed mb-6">
                  {event.intro ||
                    "Este é um evento incrível onde você terá a oportunidade de criar soluções inovadoras, colaborar com pessoas talentosas e aprender muito!"}
                </p>
                <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  Regras do Evento
                </h3>
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                  <li>Times de até {event.config.maxTeamSize} pessoas</li>
                  <li>
                    Prazo de inscrição:{" "}
                    {new Date(event.config.deadlines.registration)
                      .toLocaleDateString("pt-BR")}
                  </li>
                  <li>
                    Prazo de submissão:{" "}
                    {new Date(event.config.deadlines.submission)
                      .toLocaleDateString("pt-BR")}
                  </li>
                  <li>
                    Prazo de avaliação:{" "}
                    {new Date(event.config.deadlines.evaluation)
                      .toLocaleDateString("pt-BR")}
                  </li>
                  <li>
                    Projetos devem ser originais e criados durante o evento
                  </li>
                  <li>Respeite o código de conduta e seja colaborativo</li>
                  <li>Divirta-se e aprenda muito! 🚀</li>
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

              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Critérios de Avaliação
              </h3>
              <div class="space-y-3">
                {event.config.evaluationCriteria.map((criteria) => (
                  <div
                    key={criteria.name}
                    class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span class="font-medium text-gray-900">
                      {criteria.name}
                    </span>
                    <span class="text-purple-600 font-bold text-lg">
                      {criteria.weight}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === "participantes" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Participantes
              </h2>
              {event.config.participantsListPublic ||
                  currentUser?.role === "admin" ||
                  currentUser?.role === "organizador"
                ? (
                  <div>
                    <p class="text-gray-600 mb-4">
                      {event.registrations} participantes inscritos
                    </p>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          class="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                        >
                          <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                              P{i}
                            </div>
                            <div>
                              <div class="font-medium text-gray-900">
                                Participante {i}
                              </div>
                              <div class="text-sm text-gray-500">
                                Desenvolvedor
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
                : (
                  <p class="text-gray-500 italic">
                    A lista de participantes não está pública.
                  </p>
                )}
            </div>
          )}

          {currentTab === "times" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <EventTeams eventId={eventId} />
            </div>
          )}

          {currentTab === "jurados" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Jurados</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 border border-gray-200 rounded-lg">
                  <div class="flex items-center gap-4 mb-3">
                    <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      CJ
                    </div>
                    <div>
                      <div class="font-bold text-gray-900 text-lg">
                        Carlos Jurado
                      </div>
                      <div class="text-sm text-gray-500">
                        Arquiteto de Software
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600">
                    Arquiteto de Software, mentor e jurado em hackathons
                  </p>
                  <div class="mt-3 flex gap-2">
                    <a href="#" class="text-gray-400 hover:text-blue-600">
                      🔗 LinkedIn
                    </a>
                    <a href="#" class="text-gray-400 hover:text-gray-900">
                      💻 GitHub
                    </a>
                  </div>
                </div>
                <div class="p-6 border border-gray-200 rounded-lg">
                  <div class="flex items-center gap-4 mb-3">
                    <div class="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      FL
                    </div>
                    <div>
                      <div class="font-bold text-gray-900 text-lg">
                        Fernanda Lima
                      </div>
                      <div class="text-sm text-gray-500">Tech Lead</div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600">Tech Lead e mentora</p>
                  <div class="mt-3 flex gap-2">
                    <a href="#" class="text-gray-400 hover:text-blue-600">
                      🔗 LinkedIn
                    </a>
                    <a href="#" class="text-gray-400 hover:text-gray-900">
                      💻 GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === "desafios" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Desafios</h2>
              <EventChallenges eventId={eventId} />
            </div>
          )}

          {currentTab === "submissoes" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Submissões</h2>
                <button class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
                  Nova Submissão
                </button>
              </div>
              <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 class="font-semibold text-gray-900 mb-2">
                  Requisitos para Submissão:
                </h3>
                <ul class="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  {event.config.submissionRequirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              </div>
              <div class="space-y-4">
                <div class="border border-gray-200 rounded-lg p-6">
                  <div class="flex items-start justify-between mb-3">
                    <div>
                      <h4 class="font-bold text-gray-900 text-lg">
                        MediScan AI
                      </h4>
                      <p class="text-sm text-gray-500">Time: AI Pioneers</p>
                    </div>
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Submetido
                    </span>
                  </div>
                  <p class="text-gray-700 text-sm mb-3">
                    Sistema de IA para análise de exames médicos usando visão
                    computacional
                  </p>
                  <div class="flex gap-2 text-sm">
                    <a href="#" class="text-purple-600 hover:underline">
                      📺 Vídeo
                    </a>
                    <a href="#" class="text-purple-600 hover:underline">
                      💻 GitHub
                    </a>
                    <a href="#" class="text-purple-600 hover:underline">
                      📄 Apresentação
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === "classificacao" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Classificação
              </h2>
              <div class="space-y-3">
                {[
                  {
                    position: 1,
                    name: "AI Pioneers",
                    project: "MediScan AI",
                    score: 95,
                    medal: "🥇",
                    bg: "bg-yellow-50",
                    border: "border-yellow-400",
                  },
                  {
                    position: 2,
                    name: "Code Warriors",
                    project: "SmartLearn",
                    score: 88,
                    medal: "🥈",
                    bg: "bg-gray-50",
                    border: "border-gray-400",
                  },
                  {
                    position: 3,
                    name: "Tech Innovators",
                    project: "AccessAI",
                    score: 82,
                    medal: "🥉",
                    bg: "bg-orange-50",
                    border: "border-orange-400",
                  },
                ].map((item) => (
                  <div
                    key={item.position}
                    class={`flex items-center gap-4 p-6 rounded-lg border-2 ${item.bg} ${item.border}`}
                  >
                    <div class="text-4xl">{item.medal}</div>
                    <div class="flex-1">
                      <div class="font-bold text-gray-900 text-lg">
                        {item.name}
                      </div>
                      <div class="text-sm text-gray-600">{item.project}</div>
                    </div>
                    <div class="text-right">
                      <div class="text-3xl font-bold text-gray-900">
                        {item.score}
                      </div>
                      <div class="text-xs text-gray-500">pontos</div>
                    </div>
                  </div>
                ))}
              </div>
              <p class="text-gray-500 italic text-center mt-8">
                Classificação final após avaliação dos jurados.
              </p>
            </div>
          )}

          {currentTab === "organizacao" && (
            <div class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Equipe de Organização
              </h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="p-6 border border-gray-200 rounded-lg">
                  <div class="flex items-center gap-4 mb-3">
                    <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      MO
                    </div>
                    <div>
                      <div class="font-bold text-gray-900 text-lg">
                        Maria Organizadora
                      </div>
                      <div class="text-sm text-gray-500">
                        Organizadora Principal
                      </div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600">
                    Organizadora de eventos tech há 5 anos
                  </p>
                  <div class="mt-3 flex gap-2">
                    <a href="#" class="text-gray-400 hover:text-blue-600">
                      🔗 LinkedIn
                    </a>
                    <a href="#" class="text-gray-400 hover:text-gray-900">
                      💻 GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppWrapper>
  );
}
