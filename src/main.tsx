import React from "react";
import { createRoot } from "react-dom/client";
import { Storage } from "@ionic/storage";
import { AppProvider } from "./lib/context/AppProvider";
import App from "./App";
import { LocalNotifications } from "@capacitor/local-notifications";
import { App as CapacitorApp } from "@capacitor/app";

const initialize = async () => {
  const storage = new Storage();
  await storage.create();
  await LocalNotifications.requestPermissions();

  CapacitorApp.addListener("appStateChange", async ({ isActive }) => {
    if (!isActive) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Tu as des tâches en attente",
            body: "N'oublie pas de revenir pour les compléter !",
            id: 1,
          },
        ],
      });
    }
  });

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
