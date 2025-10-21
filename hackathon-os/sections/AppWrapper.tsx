import { UserProvider } from "../islands/UserContext.tsx";
import UserSelector from "../islands/UserSelector.tsx";
import MainLayout from "../islands/MainLayout.tsx";

interface AppWrapperProps {
  children: any;
  currentPage?: string;
}

export default function AppWrapper({ children, currentPage }: AppWrapperProps) {
  return (
    <UserProvider>
      <UserSelector />
      <MainLayout currentPage={currentPage}>
        {children}
      </MainLayout>
    </UserProvider>
  );
}