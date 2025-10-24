import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'; // <-- 1. ADICIONADO
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

// 2. MODIFICADO
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);