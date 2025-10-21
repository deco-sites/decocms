import { useUser } from "../../islands/UserContext.tsx";
import { getEventById, getEventChallenges, mockChallenges } from "../../data/mockData.ts";
import { useState } from "preact/hooks";

interface EventChallengesProps {
  eventId: string;
}

export default function EventChallenges({ eventId }: EventChallengesProps) {
  const { currentUser } = useUser();
  const event = getEventById(eventId);
  const [challenges, setChallenges] = useState(mockChallenges.filter(c => c.eventId === eventId));

  if (!event) return null;

  const approvedChallenges = challenges.filter(c => c.approved);
  const pendingChallenges = challenges.filter(c => !c.approved);

  const canSeePending = currentUser?.role === "admin" || currentUser?.role === "organizador";

  const handleVote = (challengeId: string) => {
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, votes: c.votes + 1 } : c
    ));
  };

  const handleApprove = (challengeId: string) => {
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, approved: true } : c
    ));
    alert("Desafio aprovado!");
  };

  return (
    <div class="space-y-6">
      {/* Approved Challenges */}
      <div>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Desafios Oficiais</h3>
        <div class="grid md:grid-cols-2 gap-4">
          {approvedChallenges.map(challenge => (
            <div key={challenge.id} class="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
              <h4 class="text-lg font-bold text-gray-900 mb-2">{challenge.name}</h4>
              <p class="text-gray-700 mb-4">{challenge.description}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <span>👍</span>
                  <span>{challenge.votes} votos</span>
                </div>
                {event.config.challengesVotingPublic && (
                  <button
                    onClick={() => handleVote(challenge.id)}
                    class="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    Votar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Challenges (Admin/Organizer only) */}
      {canSeePending && pendingChallenges.length > 0 && (
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Desafios Propostos (Pendentes)</h3>
          <div class="space-y-3">
            {pendingChallenges.map(challenge => (
              <div key={challenge.id} class="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 mb-1">{challenge.name}</h4>
                    <p class="text-gray-700 text-sm mb-2">{challenge.description}</p>
                    {challenge.proposedBy && (
                      <p class="text-xs text-gray-500">Proposto por participante</p>
                    )}
                  </div>
                  <div class="flex gap-2">
                    <button
                      onClick={() => handleApprove(challenge.id)}
                      class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                      Aprovar
                    </button>
                    <button class="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                      Rejeitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Public Pending Challenges */}
      {event.config.challengesVotingPublic && !canSeePending && pendingChallenges.length > 0 && (
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Desafios Propostos pela Comunidade</h3>
          <div class="grid md:grid-cols-2 gap-4">
            {pendingChallenges.map(challenge => (
              <div key={challenge.id} class="bg-white border border-gray-300 rounded-lg p-4">
                <h4 class="font-bold text-gray-900 mb-2">{challenge.name}</h4>
                <p class="text-gray-700 text-sm mb-3">{challenge.description}</p>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">{challenge.votes} votos</span>
                  <button
                    onClick={() => handleVote(challenge.id)}
                    class="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    Votar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {event.config.allowUserChallenges && (
        <div class="text-center">
          <a
            href={`/hackathon-os/evento/${eventId}/propor-desafio`}
            class="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            <span>💡</span>
            Propor Novo Desafio
          </a>
        </div>
      )}
    </div>
  );
}