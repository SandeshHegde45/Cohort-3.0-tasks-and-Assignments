import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#1a1a1a",
                  color: "#f7f7f7",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "14px",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "13px",
                },
                success: { iconTheme: { primary: "#c8f400", secondary: "#0d0d0d" } },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
