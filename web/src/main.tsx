import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/global.css";

import { GlobalServices } from "./shared/contexts/global.context.tsx";
import { StorageServices } from "./shared/contexts/storage.context.tsx";
import { ToastServices } from "./shared/contexts/toast.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalServices>
      <StorageServices>
        <ToastServices>
          <App />
        </ToastServices>
      </StorageServices>
    </GlobalServices>
  </StrictMode>
);
