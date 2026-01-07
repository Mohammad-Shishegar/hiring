import Loading from "#base/src/components/loading";
import { Children, lazy, Suspense } from "react";

// const Test = lazy(() => import("../Pages/MainPages/TableExample"));
const Test = lazy(() => import("../Pages/MainPages/AssessmentsExample"));
const Test2 = lazy(() => import("../Pages/MainPages/Test"));
const Dashboard = lazy(() => import("../Pages/AuthPages/Dashboard"));
const HRDashboard = lazy(() => import("../Pages/MainPages/HrDashboard"));
const Jobs = lazy(() => import("../Pages/MainPages/Jobs"));

export const MainRoutes = [
  // {
  //   path: "/test",
  //   element: (
  //     <Suspense fallback={<Loading />}>
  //       <Test />
  //     </Suspense>
  //   ),
  // },
  {
    path: "/hr-dashboard",
    handle: { title: "Hr Dashboard" },
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HRDashboard />
          </Suspense>
        ),
      },
      {
        path: "jobs",
        handle: { title: "Hr Dashboard" },
        element: (
          <Suspense fallback={<Loading />}>
            <Jobs />
          </Suspense>
        ),
      },
    ],
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

// {
//   path: "/contracts",
//   handle: { title: "قرارداد ها" },
//   children: [
//     {
//       index: true,
//       element: (
//         <Suspense fallback={<Loading />}>
//           <Contracts />
//         </Suspense>
//       ),
//     },
//     {
//       path: ":contractId",
//       handle: { title: "جزییات قرارداد" },
//       element: (
//         <Suspense fallback={<Loading />}>
//           <ContractsDetail />
//         </Suspense>
//       ),
//     },
//   ],
// },
