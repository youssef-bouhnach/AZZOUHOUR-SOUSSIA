import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { initCsrf } from "./config/api.js";
import "./i18n";

// Prime the CSRF cookie before anything renders
initCsrf().finally(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  );
});
