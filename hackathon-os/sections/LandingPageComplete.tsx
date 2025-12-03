import { UserProvider } from "../islands/UserContext.tsx";
import UserSelector from "../islands/UserSelector.tsx";
import LandingPage from "./LandingPage.tsx";

export default function LandingPageComplete() {
  return (
    <UserProvider>
      <UserSelector />
      <LandingPage />
    </UserProvider>
  );
}
