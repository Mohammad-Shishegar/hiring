import Loading from "#base/src/components/loading";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

import { MainRoutes } from "src/Routes/MainRoutes";
import { AuthRoutes } from "src/Routes/AuthRoutes";

import NotFound from "src/Pages/NotFoundPage";
import ErrorBoundary from "#base/src/components/ErrorBoundary/ErrorBoundary";

import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useErrorContext } from "#base/src/helpers/contexts/BoundaryContext";
import ErorrPage from "src/Pages/Error";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "src/Routes/ProtectedRoute";
import { GuestRoute } from "src/Routes/GuestRoute";

const queryClient = new QueryClient();

export default function App() {
  const { hasError } = useErrorContext();

  if (hasError) return <ErorrPage />;

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>در حال لود صفحات...</div>}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position="bottom-center" />

          <Routes>
            {MainRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute>
                    <MainLayout>{element}</MainLayout>
                  </ProtectedRoute>
                }
              />
            ))}

            {AuthRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <GuestRoute>
                    <AuthLayout>{element}</AuthLayout>
                  </GuestRoute>
                }
              />
            ))}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
