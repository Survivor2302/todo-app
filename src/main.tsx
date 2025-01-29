import React from "react";
import { createRoot } from "react-dom/client";
import { Storage } from "@ionic/storage";
import { AppProvider } from "./lib/context/AppProvider";
import App from "./App";

const initialize = async () => {
  const storage = new Storage();
  await storage.create();

  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <AppProvider storage={storage}>
        <App />
      </AppProvider>
    </React.StrictMode>
  );
};

initialize();
