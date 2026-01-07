import Loading from "#base/src/components/loading";
import { lazy, Suspense } from "react";
import Dashboard from "../Pages/AuthPages/Dashboard";

const Login = lazy(() => import("../Pages/AuthPages/Login"));
const Forgotpass = lazy(() => import("../Pages/AuthPages/Forgotpass"));
const Registration = lazy(() => import("../Pages/AuthPages/Registration"));
export const AuthRoutes = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
    handle: { title: "login" },
  },
  {
    path: "/forgotpass",
    element: (
      <Suspense fallback={<Loading />}>
        <Forgotpass />
      </Suspense>
    ),
    handle: { title: "forgotpass" },
  },
  {
    path: "/registration",
    element: (
      <Suspense fallback={<Loading />}>
        <Registration />
      </Suspense>
    ),
    handle: { title: "registration" },
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
    handle: { title: "introduction" },
  },
];
