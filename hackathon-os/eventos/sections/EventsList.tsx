import { useUser } from "../../islands/UserContext.tsx";
import { mockEvents, getUserRegistrations, isUserRegisteredInEvent } from "../../data/mockData.ts";
import { useState } from "preact/hooks";

export default function EventsList() {
  const { currentUser, isLoggedIn } = useUser();
  const [filter, setFilter] = useState<"todos" | "abertos" | "encerrados" | "pendentes" | "ativos">("todos");
  
  const registrations = currentUser ? getUserRegistrations(currentUser.id) : [];
  
  const getFilteredEvents = () => {
    if (!isLoggedIn) {
      return mockEvents.filter(e => e.status === "aberto");
    }

    switch (filter) {
      case "abertos":
        return mockEvents.filter(e => e.status === "aberto");
      case "encerrados":
        return mockEvents.filter(e => e.status === "encerrado");
      case "pendentes":
        return mockEvents.filter(e => {
          const reg = isUserRegisteredInEvent(currentUser?.id || "", e.id);
          return reg?.status === "pendente";
        });
      case "ativos":
        return mockEvents.filter(e => {
          const reg = isUserRegisteredInEvent(currentUser?.id || "", e.id);
          return reg?.status === "aprovado";
        });
      default:
        return mockEvents;
    }
  };

  const getEventStatus = (eventId: string) => {
    if (!currentUser) return null;
    return isUserRegisteredInEvent(currentUser.id, eventId);
  };

  const handleRegister = (eventId: string) => {
    if (!isLoggedIn) {
      window.location.href = "/hackathon-os/cadastro";
      return;
    }
    
    // Mock: redirect to registration form
    window.location.href = `/hackathon-os/evento/${eventId}/inscricao`;
  };

  const handleCancelRegistration = (eventId: string) => {
    // Mock: just reload
    alert("Inscrição cancelada!");
    window.location.reload();
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Eventos Disponíveis</h1>
          <p class="text-gray-600">Encontre e participe de hackathons incríveis</p>
        </div>

        {/* Filters - Only show if logged in */}
        {isLoggedIn && (
          <div class="mb-6 flex gap-3 flex-wrap">
            <button
              onClick={() => setFilter("todos")}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "todos" 
                  ? "bg-purple-500 text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("abertos")}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "abertos" 
                  ? "bg-purple-500 text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Abertos
            </button>
            <button
              onClick={() => setFilter("encerrados")}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "encerrados" 
                  ? "bg-purple-500 text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Encerrados
            </button>
            <button
              onClick={() => setFilter("pendentes")}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "pendentes" 
                  ? "bg-purple-500 text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter("ativos")}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "ativos" 
                  ? "bg-purple-500 text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Ativos
            </button>
          </div>
        )}

        {/* Admin Create Button */}
        {currentUser?.role === "admin" || currentUser?.role === "organizador" ? (
          <div class="mb-6">
            <a
              href="/hackathon-os/admin/evento/novo"
              class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Criar Novo Evento
            </a>
          </div>
        ) : null}

        {/* Events Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => {
            const registration = getEventStatus(event.id);
            
            return (
              <div key={event.id} class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Event Banner */}
                <div class="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
                  <img 
                    src={event.banner} 
                    alt={event.name}
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute top-3 right-3">
                    <span class={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.status === "aberto" 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-500 text-white"
                    }`}>
                      {event.status === "aberto" ? "Aberto" : "Encerrado"}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div class="p-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                  
                  <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{event.registrations} inscritos</span>
                  </div>

                  <div class="flex gap-2">
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Saiba Mais
                    </a>
                    
                    {!registration ? (
                      <button
                        onClick={() => handleRegister(event.id)}
                        disabled={event.status === "encerrado"}
                        class={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                          event.status === "encerrado"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-purple-500 text-white hover:bg-purple-600"
                        }`}
                      >
                        {isLoggedIn ? "Inscrever-se" : "Login para Inscrever"}
                      </button>
                    ) : registration.status === "pendente" ? (
                      <div class="flex-1 flex gap-1">
                        <div class="flex-1 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium text-center">
                          Pendente
                        </div>
                        <button
                          onClick={() => handleCancelRegistration(event.id)}
                          class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          title="Cancelar inscrição"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <a
                        href={`/hackathon-os/evento/${event.id}`}
                        class="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium text-center"
                      >
                        Acessar Evento
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div class="text-center py-16">
            <p class="text-gray-500 text-lg">Nenhum evento encontrado com este filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}