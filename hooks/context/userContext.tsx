import { ReactNode, createContext } from "react";
import useUser from "../useUser";
import { UserContextType } from "@/constants/User";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, login, register, logout, error } = useUser();

  return (
    <UserContext.Provider
      value={{
        error,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
