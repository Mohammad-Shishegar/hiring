import { Navigate } from "react-router-dom";
import { useAuth } from "#base/src/helpers/contexts/AuthContext";
import Loading from "#base/src/components/loading";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { isAuth, loadingAuth } = useAuth();

  if (false) return <Loading />;

  // return isAuth ? children : <Navigate to="/login" replace />;
  return true ? children : <Navigate to="/login" replace />;
};
