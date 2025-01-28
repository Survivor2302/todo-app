import React, { createContext, useContext } from "react";
import { Storage } from "@ionic/storage";

export const StorageContext = createContext<Storage | null>(null);

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
}

export const StorageProvider: React.FC<{
  storage: Storage;
  children: React.ReactNode;
}> = ({ storage, children }) => {
  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
};
