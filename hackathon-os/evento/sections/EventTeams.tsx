import { useUser } from "../../islands/UserContext.tsx";
import {
  getEventById,
  getEventTeams,
  getUserById,
} from "../../data/mockData.ts";

interface EventTeamsProps {
  eventId: string;
}

export default function EventTeams({ eventId }: EventTeamsProps) {
  const { currentUser } = useUser();
  const event = getEventById(eventId);
  const teams = getEventTeams(eventId);

  if (!event) return null;

  const userTeam = teams.find((t) =>
    t.memberIds.includes(currentUser?.id || "")
  );

  return (
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-semibold text-gray-900">Times Formados</h3>
          <p class="text-gray-600 text-sm">
            Máximo de {event.config.maxTeamSize} membros por time
          </p>
        </div>
        {!userTeam && currentUser && (
          <a
            href={`/hackathon-os/evento/${eventId}/criar-time`}
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            Criar Meu Time
          </a>
        )}
      </div>

      {teams.length === 0
        ? (
          <div class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="text-6xl mb-4">👥</div>
            <p class="text-gray-500 text-lg mb-4">Nenhum time criado ainda.</p>
            <p class="text-gray-400">Seja o primeiro a criar um time!</p>
          </div>
        )
        : (
          <div class="grid md:grid-cols-2 gap-6">
            {teams.map((team) => {
              const leader = getUserById(team.leaderId);
              const members = team.memberIds.map((id) => getUserById(id))
                .filter(Boolean);
              const isUserInTeam = team.memberIds.includes(
                currentUser?.id || "",
              );

              return (
                <div
                  key={team.id}
                  class={`bg-white rounded-lg shadow-md p-6 ${
                    isUserInTeam ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  {isUserInTeam && (
                    <div class="mb-3">
                      <span class="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        Seu Time
                      </span>
                    </div>
                  )}

                  <h4 class="text-xl font-bold text-gray-900 mb-2">
                    {team.name}
                  </h4>
                  <p class="text-gray-600 text-sm mb-4">{team.description}</p>

                  <div class="mb-4">
                    <div class="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Membros ({members.length}/{event.config.maxTeamSize})
                    </div>
                    <div class="space-y-2">
                      {members.map((member) =>
                        member && (
                          <div key={member.id} class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {member.name.split(" ").map((n) =>
                                n[0]
                              ).join("").toUpperCase().slice(0, 2)}
                            </div>
                            <div class="flex-1 min-w-0">
                              <div class="text-sm font-medium text-gray-900 truncate">
                                {member.name}
                                {member.id === team.leaderId && (
                                  <span class="ml-2 text-xs text-purple-600">
                                    👑 Líder
                                  </span>
                                )}
                              </div>
                              <div class="text-xs text-gray-500 capitalize">
                                {member.area}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {team.challengeId && (
                    <div class="pt-3 border-t border-gray-200">
                      <div class="text-xs font-semibold text-gray-500 uppercase mb-1">
                        Desafio
                      </div>
                      <div class="text-sm text-purple-600 font-medium">
                        {team.challengeId === "ch1" && "Healthcare AI"}
                        {team.challengeId === "ch4" && "Energia Renovável"}
                      </div>
                    </div>
                  )}

                  {isUserInTeam && team.leaderId === currentUser?.id && (
                    <div class="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={`/hackathon-os/evento/${eventId}/time/${team.id}/editar`}
                        class="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Gerenciar Time →
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
