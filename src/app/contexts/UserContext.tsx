import { createContext } from "react";

interface UserContextProps {
  user?: UserViewModel;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined,
);
