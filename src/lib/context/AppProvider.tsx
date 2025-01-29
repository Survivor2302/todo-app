import React from "react";
import { Storage } from "@ionic/storage";
import { StorageProvider } from "./StorageContext";
import { TaskServiceProvider } from "./TaskServiceContext";

interface AppProviderProps {
  storage: Storage;
  children: React.ReactNode;
}

export function AppProvider({ storage, children }: AppProviderProps) {
  return (
    <StorageProvider storage={storage}>
      <TaskServiceProvider>{children}</TaskServiceProvider>
    </StorageProvider>
  );
}
