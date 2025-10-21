import { useUser } from "../../islands/UserContext.tsx";
import AppWrapper from "../../sections/AppWrapper.tsx";
import { useState } from "preact/hooks";

export default function AdminEventCreate() {
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    banner: "",
    url: "",
    status: "aberto",
    requiresExtraFields: false,
    extraFields: ["", "", ""],
    participantsListPublic: true,
    maxTeamSize: 5,
    allowUserChallenges: true,
    challengesVotingPublic: false,
    registrationDeadline: "",
    submissionDeadline: "",
    evaluationDeadline: "",
    submissionRequirements: [] as string[],
    evaluationCriteria: [
      { name: "Inovação", weight: 30 },
      { name: "Execução Técnica", weight: 30 },
      { name: "Impacto", weight: 25 },
      { name: "Apresentação", weight: 15 }
    ],
    intro: "",
    awards: ""
  });

  const [reqInput, setReqInput] = useState("");

  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "organizador")) {
    return (
      <AppWrapper>
        <div class="min-h-screen bg-gray-50 py-8">
          <div class="container mx-auto px-4">
            <div class="text-center py-16">
              <p class="text-gray-500 text-lg">Acesso negado. Apenas administradores e organizadores podem acessar esta página.</p>
            </div>
          </div>
        </div>
      </AppWrapper>
    );
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    alert("Evento criado com sucesso! (Mock)");
    window.location.href = "/hackathon-os/eventos";
  };

  const addRequirement = () => {
    if (reqInput.trim()) {
      setFormData({
        ...formData,
        submissionRequirements: [...formData.submissionRequirements, reqInput.trim()]
      });
      setReqInput("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      submissionRequirements: formData.submissionRequirements.filter((_, i) => i !== index)
    });
  };

  const updateCriteria = (index: number, field: "name" | "weight", value: string | number) => {
    const newCriteria = [...formData.evaluationCriteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setFormData({ ...formData, evaluationCriteria: newCriteria });
  };

  return (
    <AppWrapper>
      <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4 max-w-4xl">
          <div class="mb-8">
            <a href="/hackathon-os/eventos" class="text-purple-600 hover:text-purple-700 mb-4 inline-block">
              ← Voltar para eventos
            </a>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Criar Novo Evento</h1>
            <p class="text-gray-600">Configure todos os detalhes do seu hackathon</p>
          </div>

          <form onSubmit={handleSubmit} class="space-y-8">
            {/* Informações Básicas */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Informações Básicas</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Evento *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: Hackathon AI 2024"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Descrição *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: (e.target as HTMLTextAreaElement).value})}
                    rows={3}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Descreva o evento..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">URL do Banner</label>
                  <input
                    type="url"
                    value={formData.banner}
                    onChange={(e) => setFormData({...formData, banner: (e.target as HTMLInputElement).value})}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Site do Evento</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: (e.target as HTMLInputElement).value})}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: (e.target as HTMLSelectElement).value})}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="aberto">Aberto</option>
                    <option value="encerrado">Encerrado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Configurações de Inscrição */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Configurações de Inscrição</h2>
              
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="extraFields"
                    checked={formData.requiresExtraFields}
                    onChange={(e) => setFormData({...formData, requiresExtraFields: (e.target as HTMLInputElement).checked})}
                    class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label for="extraFields" class="text-sm font-medium text-gray-700">
                    Exigir campos adicionais na inscrição (máximo 3)
                  </label>
                </div>

                {formData.requiresExtraFields && (
                  <div class="ml-8 space-y-2">
                    {formData.extraFields.map((field, i) => (
                      <input
                        key={i}
                        type="text"
                        value={field}
                        onChange={(e) => {
                          const newFields = [...formData.extraFields];
                          newFields[i] = (e.target as HTMLInputElement).value;
                          setFormData({...formData, extraFields: newFields});
                        }}
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder={`Pergunta ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Configurações de Times */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Configurações de Times</h2>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tamanho Máximo do Time</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxTeamSize}
                  onChange={(e) => setFormData({...formData, maxTeamSize: parseInt((e.target as HTMLInputElement).value)})}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Prazos */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Prazos</h2>
              
              <div class="grid md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Inscrição *</label>
                  <input
                    type="date"
                    required
                    value={formData.registrationDeadline}
                    onChange={(e) => setFormData({...formData, registrationDeadline: (e.target as HTMLInputElement).value})}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Submissão *</label>
                  <input
                    type="date"
                    required
                    value={formData.submissionDeadline}
                    onChange={(e) => setFormData({...formData, submissionDeadline: (e.target as HTMLInputElement).value})}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Avaliação *</label>
                  <input
                    type="date"
                    required
                    value={formData.evaluationDeadline}
                    onChange={(e) => setFormData({...formData, evaluationDeadline: (e.target as HTMLInputElement).value})}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Requisitos de Submissão */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Requisitos de Submissão</h2>
              
              <div class="space-y-3">
                <div class="flex gap-2">
                  <input
                    type="text"
                    value={reqInput}
                    onChange={(e) => setReqInput((e.target as HTMLInputElement).value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                    class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: Video do YouTube"
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    Adicionar
                  </button>
                </div>

                {formData.submissionRequirements.length > 0 && (
                  <div class="space-y-2">
                    {formData.submissionRequirements.map((req, i) => (
                      <div key={i} class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span class="text-gray-700">{req}</span>
                        <button
                          type="button"
                          onClick={() => removeRequirement(i)}
                          class="text-red-600 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Critérios de Avaliação */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Critérios de Avaliação</h2>
              
              <div class="space-y-3">
                {formData.evaluationCriteria.map((criteria, i) => (
                  <div key={i} class="flex gap-3">
                    <input
                      type="text"
                      value={criteria.name}
                      onChange={(e) => updateCriteria(i, "name", (e.target as HTMLInputElement).value)}
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Nome do critério"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={criteria.weight}
                      onChange={(e) => updateCriteria(i, "weight", parseInt((e.target as HTMLInputElement).value))}
                      class="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="%"
                    />
                  </div>
                ))}
              </div>
              <p class="text-sm text-gray-500 mt-2">
                Total: {formData.evaluationCriteria.reduce((sum, c) => sum + c.weight, 0)}%
              </p>
            </div>

            {/* Desafios */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Configurações de Desafios</h2>
              
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="allowUserChallenges"
                    checked={formData.allowUserChallenges}
                    onChange={(e) => setFormData({...formData, allowUserChallenges: (e.target as HTMLInputElement).checked})}
                    class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label for="allowUserChallenges" class="text-sm font-medium text-gray-700">
                    Permitir que participantes proponham desafios
                  </label>
                </div>

                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="challengesVotingPublic"
                    checked={formData.challengesVotingPublic}
                    onChange={(e) => setFormData({...formData, challengesVotingPublic: (e.target as HTMLInputElement).checked})}
                    class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label for="challengesVotingPublic" class="text-sm font-medium text-gray-700">
                    Votação pública nos desafios propostos
                  </label>
                </div>
              </div>
            </div>

            {/* Outras Configs */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Outras Configurações</h2>
              
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="participantsPublic"
                  checked={formData.participantsListPublic}
                  onChange={(e) => setFormData({...formData, participantsListPublic: (e.target as HTMLInputElement).checked})}
                  class="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <label for="participantsPublic" class="text-sm font-medium text-gray-700">
                  Lista de participantes pública
                </label>
              </div>
            </div>

            {/* Conteúdo */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Conteúdo</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Introdução e Regras</label>
                  <textarea
                    value={formData.intro}
                    onChange={(e) => setFormData({...formData, intro: (e.target as HTMLTextAreaElement).value})}
                    rows={4}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Bem-vindo ao evento..."
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Premiação</label>
                  <textarea
                    value={formData.awards}
                    onChange={(e) => setFormData({...formData, awards: (e.target as HTMLTextAreaElement).value})}
                    rows={3}
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="1º Lugar: R$ 10.000 | 2º Lugar: R$ 5.000..."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div class="flex gap-4">
              <button
                type="submit"
                class="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
              >
                Criar Evento
              </button>
              <a
                href="/hackathon-os/eventos"
                class="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center"
              >
                Cancelar
              </a>
            </div>
          </form>
        </div>
      </div>
    </AppWrapper>
  );
}