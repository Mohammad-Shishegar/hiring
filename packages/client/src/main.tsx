import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "#base/src/helpers/contexts/AuthContext";
import { StateProvider } from "#base/src/helpers/contexts/StateContext";
import { ThemeProvider } from "#base/src/helpers/contexts/ThemeContext";
import { ErrorProvider } from "#base/src/helpers/contexts/BoundaryContext";

import "./index.css";
import App from "src/App";
import { BrowserRouter } from "react-router-dom";
import { initializeAssessments } from "./services/db/assessmentsDb";

// Initialize MSW worker in development
async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./services/mocks/browser");

  // Start the worker
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

// Initialize database and start MSW worker, then render app
enableMocking()
  .then(() => {
    // Initialize assessments database
    return initializeAssessments();
  })
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <BrowserRouter>
          <ErrorProvider>
            <AuthProvider>
              <StateProvider>
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </StateProvider>
            </AuthProvider>
          </ErrorProvider>
        </BrowserRouter>
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error("Failed to initialize application:", error);
  });
