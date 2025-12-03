import { useUser } from "./UserContext.tsx";
import { mockUsers } from "../data/mockData.ts";

export default function UserSelector() {
  const { currentUser, setCurrentUser } = useUser();

  const handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const userId = target.value;

    if (userId === "none") {
      setCurrentUser(null);
    } else {
      const user = mockUsers.find((u) => u.id === userId);
      if (user) {
        setCurrentUser(user);
      }
    }
  };

  return (
    <div class="fixed top-4 right-4 z-50 bg-yellow-400 border-2 border-yellow-600 rounded-lg shadow-lg p-3 max-w-xs">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xs font-bold">🧪 MODO TESTE</span>
      </div>
      <select
        value={currentUser?.id || "none"}
        onChange={handleChange}
        class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
      >
        <option value="none">👤 Não logado</option>
        <option value="1">🔧 Admin Master</option>
        <option value="2">📋 Maria Organizadora</option>
        <option value="3">⚖️ Carlos Jurado</option>
        <option value="4">👨‍💻 João Silva (Participante)</option>
        <option value="5">👩‍🎨 Ana Costa (Participante)</option>
        <option value="6">👨‍💼 Pedro Santos (Participante)</option>
        <option value="7">⚖️ Fernanda Lima (Jurado)</option>
      </select>
      {currentUser && (
        <div class="mt-2 text-xs text-gray-700">
          <div class="font-semibold">{currentUser.name}</div>
          <div class="text-gray-600">{currentUser.role}</div>
        </div>
      )}
    </div>
  );
}
