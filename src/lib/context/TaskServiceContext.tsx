import React, { createContext, useContext, useEffect, useState } from "react";
import { TaskService } from "@/lib/services/task.service";
import { useStorage } from "./StorageContext";

const TaskServiceContext = createContext<TaskService | null>(null);

export function TaskServiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [taskService, setTaskService] = useState<TaskService | null>(null);
  const storage = useStorage();

  useEffect(() => {
    setTaskService(new TaskService(storage));
  }, [storage]);

  if (!taskService) {
    return <div>Loading...</div>;
  }

  return (
    <TaskServiceContext.Provider value={taskService}>
      {children}
    </TaskServiceContext.Provider>
  );
}

export function useTaskService() {
  const context = useContext(TaskServiceContext);
  if (!context) {
    throw new Error("useTaskService must be used within a TaskServiceProvider");
  }
  return context;
}
