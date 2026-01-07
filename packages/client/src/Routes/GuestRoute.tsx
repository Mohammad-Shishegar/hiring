import { Navigate } from "react-router-dom";
import { useAuth } from "#base/src/helpers/contexts/AuthContext";
import Loading from "#base/src/components/loading";

interface IGuestRouteProps {
  children: React.ReactNode;
}

export const GuestRoute = ({ children }: IGuestRouteProps) => {
  const { isAuth, loadingAuth } = useAuth();

  if (loadingAuth) return <Loading />;

  return !isAuth ? children : <Navigate to="/hr-dashboard" replace />;
};
