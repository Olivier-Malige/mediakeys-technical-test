import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API_PATHS } from "../../constants/path";

import { User } from "../../interfaces/user";

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const { data } = useQuery<User, Error>(["user"], async () => {
    const res = await axios.get(API_PATHS.USER);
    return res.data;
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
