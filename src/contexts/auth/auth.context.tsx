import { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAuthUser } from "../../api/user";

import { User } from "../../interfaces/user";

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useQuery<User, Error>(["user"], () => {
    return getAuthUser();
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
