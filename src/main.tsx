import React from "react";
import { createRoot } from "react-dom/client";
import { Storage } from "@ionic/storage";
import { StorageProvider } from "./lib/context/StorageContext";
import { Task } from "./lib/model/task.class";
import App from "./App";

const initialize = async () => {
  const storage = new Storage();
  await storage.create();
  Task.initialize(storage);

  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <StorageProvider storage={storage}>
        <App />
      </StorageProvider>
    </React.StrictMode>
  );
};

initialize();
