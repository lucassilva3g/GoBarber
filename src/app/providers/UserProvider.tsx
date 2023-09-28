import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { getUserById } from "@/api/user/queries/getUserById";

import { UserContext } from "../contexts/UserContext";

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserViewModel>();
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;

  const { data, isLoading } = useQuery(
    ["usuario", id],
    () => (id ? getUserById({ id }) : null),
    {
      enabled: !!id,
    },
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
