import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuth: boolean;
  loadingAuth: boolean;
  setToken: (token: string, useData: {}) => void;
  deleteToken: () => void;
  userData: {};
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const userDataFake = {
  access: ["ADMIN"],
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState({});

  const setToken = (token: string, userData: {}) => {
    if (token) {
      setLoadingAuth(true);
      setUserData(userData);
      localStorage.setItem("token", token);
      setIsAuth(true);
      setLoadingAuth(false);
    }
  };

  const deleteToken = () => {
    setLoadingAuth(true);
    localStorage.removeItem("token");
    setIsAuth(false);
    setLoadingAuth(false);
  };

  useEffect(() => {
    setLoadingAuth(true);
    const token = localStorage.getItem("token");
    if (token) setIsAuth(true);
    setLoadingAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loadingAuth,
        isAuth,
        deleteToken,
        setToken,
        userData: userDataFake,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);

  if (auth === undefined) throw Error("useContext inside provider");
  return auth;
};

export { useAuth, AuthProvider };
