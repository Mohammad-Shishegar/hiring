import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "#base/src/helpers/contexts/AuthContext";
import { StateProvider } from "#base/src/helpers/contexts/StateContext";
import { ThemeProvider } from "#base/src/helpers/contexts/ThemeContext";
import { ErrorProvider } from "#base/src/helpers/contexts/BoundaryContext";

import "./index.css";
import App from "src/App";
import { BrowserRouter } from "react-router-dom";

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
