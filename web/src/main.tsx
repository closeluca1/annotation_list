import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";

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
