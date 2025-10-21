import { useUser } from "./UserContext.tsx";
import { getUserNotifications, getUserRegistrations, mockEvents } from "../data/mockData.ts";
import { useState } from "preact/hooks";

interface MainLayoutProps {
  children: any;
  currentPage?: string;
}

export default function MainLayout({ children, currentPage }: MainLayoutProps) {
  const { currentUser, setCurrentUser, isLoggedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const notifications = currentUser ? getUserNotifications(currentUser.id) : [];
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const registrations = currentUser ? getUserRegistrations(currentUser.id) : [];
  const approvedEvents = registrations
    .filter(r => r.status === "aprovado")
    .map(r => mockEvents.find(e => e.id === r.eventId))
    .filter(Boolean);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.href = "/hackathon-os";
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/hackathon-os" class="flex items-center gap-2">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">H</span>
              </div>
              <span class="font-bold text-xl text-gray-900">Hackathon OS</span>
            </a>

            {/* Desktop Navigation */}
            {isLoggedIn ? (
              <nav class="hidden md:flex items-center gap-6">
                <a 
                  href="/hackathon-os/eventos" 
                  class={`text-sm font-medium transition-colors ${
                    currentPage === "eventos" ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  Eventos
                </a>
                
                <a 
                  href="/hackathon-os/notificacoes" 
                  class={`text-sm font-medium transition-colors relative ${
                    currentPage === "notificacoes" ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  Notificações
                  {unreadCount > 0 && (
                    <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </a>

                {/* Eventos Aprovados */}
                {approvedEvents.length > 0 && (
                  <div class="relative group">
                    <button class="text-sm font-medium text-gray-700 hover:text-purple-600 flex items-center gap-1">
                      Meus Eventos
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div class="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {approvedEvents.map(event => event && (
                        <a 
                          href={`/hackathon-os/evento/${event.id}`}
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {event.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profile Dropdown */}
                <div class="relative group">
                  <button class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {currentUser?.photo ? (
                      <img src={currentUser.photo} alt={currentUser.name} class="w-8 h-8 rounded-full" />
                    ) : (
                      <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {getInitials(currentUser?.name || "")}
                      </div>
                    )}
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div class="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <a href="/hackathon-os/perfil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg">
                      Meu Perfil
                    </a>
                    {(currentUser?.role === "admin" || currentUser?.role === "organizador") && (
                      <a href="/hackathon-os/admin" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Painel Admin
                      </a>
                    )}
                    <button 
                      onClick={handleLogout}
                      class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-b-lg"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </nav>
            ) : (
              <div class="flex gap-4">
                <a href="/hackathon-os/login" class="text-gray-700 hover:text-purple-600 font-medium">
                  Login
                </a>
                <a 
                  href="/hackathon-os/cadastro" 
                  class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cadastre-se
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              class="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && isLoggedIn && (
            <div class="md:hidden border-t border-gray-200 py-4">
              <a href="/hackathon-os/eventos" class="block py-2 text-gray-700 hover:text-purple-600">
                Eventos
              </a>
              <a href="/hackathon-os/notificacoes" class="block py-2 text-gray-700 hover:text-purple-600">
                Notificações {unreadCount > 0 && `(${unreadCount})`}
              </a>
              <a href="/hackathon-os/perfil" class="block py-2 text-gray-700 hover:text-purple-600">
                Meu Perfil
              </a>
              {(currentUser?.role === "admin" || currentUser?.role === "organizador") && (
                <a href="/hackathon-os/admin" class="block py-2 text-gray-700 hover:text-purple-600">
                  Painel Admin
                </a>
              )}
              <button onClick={handleLogout} class="block py-2 text-red-600 hover:text-red-700">
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main>
        {children}
      </main>
    </div>
  );
}