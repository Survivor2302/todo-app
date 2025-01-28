import { Storage } from '@ionic/storage';
import { useState, useEffect } from 'react';

const storage = new Storage();
let storageInitialized = false;

export const useStorage = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initStorage = async () => {
      if (!storageInitialized) {
        await storage.create();
        storageInitialized = true;
      }
      setIsReady(true);
    };
    initStorage();
  }, []);

  const setItem = async (key: string, value: any) => {
    await storage.set(key, value);
  };

  const getItem = async (key: string) => {
    return await storage.get(key);
  };

  const removeItem = async (key: string) => {
    await storage.remove(key);
  };

  const getAllItems = async () => {
    const items: any[] = [];
    await storage.forEach((value, key) => {
      items.push({ key, value });
    });
    return items;
  };

  const clearAll = async () => {
    await storage.clear();
  };

  return {
    isReady,
    setItem,
    getItem,
    removeItem,
    getAllItems,
    clearAll,
  };
}; 