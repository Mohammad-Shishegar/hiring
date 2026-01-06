import Loading from "#base/src/components/loading";
import { lazy, Suspense } from "react";

// const Test = lazy(() => import("../Pages/MainPages/TableExample"));
const Test = lazy(() => import("../Pages/MainPages/AssessmentsExample"));
const Test2 = lazy(() => import("../Pages/MainPages/Test"));
const Dashboard = lazy(() => import("../Pages/MainPages/Dashboard"));
const HRDashboard = lazy(() => import("../Pages/MainPages/HrDashboard"));

export const MainRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Test />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "/hr-dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <HRDashboard />
      </Suspense>
    ),
  },
  {
    path: "/test",
    element: (
      <Suspense fallback={<Loading />}>
        <Test />
      </Suspense>
    ),
  },
  {
    path: "/test2",
    element: (
      <Suspense fallback={<Loading />}>
        <Test2 />
      </Suspense>
    ),
  },
];
