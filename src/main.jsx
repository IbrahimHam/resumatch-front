import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <StrictMode>
          <div className="flex flex-col min-h-screen pt-16">
            <App />
          </div>
        </StrictMode>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
