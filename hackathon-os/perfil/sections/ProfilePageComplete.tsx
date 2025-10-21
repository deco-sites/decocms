import AppWrapper from "../../sections/AppWrapper.tsx";
import ProfilePage from "./ProfilePage.tsx";

export default function ProfilePageComplete() {
  return (
    <AppWrapper currentPage="perfil">
      <ProfilePage />
    </AppWrapper>
  );
}