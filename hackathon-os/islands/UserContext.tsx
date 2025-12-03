import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import type { User } from "../data/mockData.ts";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  isLoggedIn: false,
});

export function UserProvider({ children }: { children: any }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);

  useEffect(() => {
    // Carregar do localStorage
    const stored = localStorage.getItem("hackathon-os-user");
    if (stored) {
      setCurrentUserState(JSON.parse(stored));
    }
  }, []);

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem("hackathon-os-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("hackathon-os-user");
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn: !!currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
