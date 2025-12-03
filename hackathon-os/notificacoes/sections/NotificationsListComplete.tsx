import AppWrapper from "../../sections/AppWrapper.tsx";
import NotificationsList from "./NotificationsList.tsx";

export default function NotificationsListComplete() {
  return (
    <AppWrapper currentPage="notificacoes">
      <NotificationsList />
    </AppWrapper>
  );
}
