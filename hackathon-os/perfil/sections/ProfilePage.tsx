import { useUser } from "../../islands/UserContext.tsx";
import { useState } from "preact/hooks";

export default function ProfilePage() {
  const { currentUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});

  if (!currentUser) {
    return (
      <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
          <div class="text-center py-16">
            <p class="text-gray-500 text-lg">Faça login para ver seu perfil.</p>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleSave = () => {
    // Mock: just toggle editing
    alert("Perfil atualizado com sucesso!");
    setEditing(false);
  };

  const seniorityOptions = ["estudante", "estagio", "junior", "senior", "staff"];
  const areaOptions = ["designer", "arquiteto", "desenvolvedor", "dados", "growth", "outros"];

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-3xl">
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
          <p class="text-gray-600">Gerencie suas informações pessoais</p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-8">
          {/* Profile Photo */}
          <div class="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
            {currentUser.photo ? (
              <img src={currentUser.photo} alt={currentUser.name} class="w-24 h-24 rounded-full" />
            ) : (
              <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {getInitials(currentUser.name)}
              </div>
            )}
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 mb-1">{currentUser.name}</h2>
              <p class="text-gray-600 mb-2">{currentUser.email}</p>
              <span class="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {currentUser.role}
              </span>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Editar Perfil
              </button>
            )}
          </div>

          {editing ? (
            /* Edit Mode */
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: (e.target as HTMLInputElement).value})}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="linkedin.com/in/seuperfil"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="text"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: (e.target as HTMLInputElement).value})}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="github.com/seuusuario"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Senioridade</label>
                <select
                  value={formData.seniority}
                  onChange={(e) => setFormData({...formData, seniority: (e.target as HTMLSelectElement).value})}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {seniorityOptions.map(opt => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Área de Atuação</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: (e.target as HTMLSelectElement).value})}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {areaOptions.map(opt => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bio (opcional)</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: (e.target as HTMLTextAreaElement).value})}
                  rows={4}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  class="flex-1 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormData(currentUser);
                  }}
                  class="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">LinkedIn</label>
                {currentUser.linkedin ? (
                  <a href={`https://${currentUser.linkedin}`} target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">
                    {currentUser.linkedin}
                  </a>
                ) : (
                  <p class="text-gray-400 italic">Não informado</p>
                )}
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">GitHub</label>
                {currentUser.github ? (
                  <a href={`https://${currentUser.github}`} target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline">
                    {currentUser.github}
                  </a>
                ) : (
                  <p class="text-gray-400 italic">Não informado</p>
                )}
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Senioridade</label>
                <p class="text-gray-900 capitalize">{currentUser.seniority}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500 mb-1">Área de Atuação</label>
                <p class="text-gray-900 capitalize">{currentUser.area}</p>
              </div>

              {currentUser.bio && (
                <div>
                  <label class="block text-sm font-medium text-gray-500 mb-1">Bio</label>
                  <p class="text-gray-900">{currentUser.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}