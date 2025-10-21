import { useUser } from "../../islands/UserContext.tsx";
import { getUserNotifications } from "../../data/mockData.ts";
import { useState } from "preact/hooks";

export default function NotificationsList() {
  const { currentUser } = useUser();
  const [notifications, setNotifications] = useState(
    currentUser ? getUserNotifications(currentUser.id) : []
  );

  if (!currentUser) {
    return (
      <div class="min-h-screen bg-gray-50 py-8">
        <div class="container mx-auto px-4">
          <div class="text-center py-16">
            <p class="text-gray-500 text-lg">Faça login para ver suas notificações.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleMarkAsRead = (notifId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notifId ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approval":
        return "✅";
      case "message":
        return "💬";
      case "invitation":
        return "📨";
      case "announcement":
        return "📢";
      default:
        return "🔔";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    return date.toLocaleDateString("pt-BR");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="container mx-auto px-4 max-w-3xl">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Notificações</h1>
            <p class="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}` : 'Tudo lido!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              class="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              Marcar todas como lidas
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="text-6xl mb-4">📭</div>
            <p class="text-gray-500 text-lg">Você não tem notificações ainda.</p>
          </div>
        ) : (
          <div class="space-y-3">
            {notifications.map(notification => (
              <div
                key={notification.id}
                class={`bg-white rounded-lg shadow-sm p-5 transition-all hover:shadow-md ${
                  !notification.read ? "border-l-4 border-purple-500" : ""
                }`}
              >
                <div class="flex gap-4">
                  <div class="text-3xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4 mb-1">
                      <h3 class="font-semibold text-gray-900">{notification.title}</h3>
                      <span class="text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">{notification.message}</p>
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        class="text-purple-600 hover:text-purple-700 text-xs font-medium"
                      >
                        Marcar como lida
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}