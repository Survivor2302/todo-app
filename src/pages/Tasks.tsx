import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useState, useEffect } from "react";
import { TaskService } from "@/lib/services/task.service";
import { Task } from "@/lib/model/task.class";
import { Storage } from "@ionic/storage";
import { useTaskService } from "@/lib/context/TaskServiceContext";

const Tasks: React.FC = () => {
  const taskService = useTaskService();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const allTasks = await taskService.getAll();
      setTasks(allTasks);
    };
    loadTasks();

    // S'abonner aux changements
    const subscription = taskService.subscribe((updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => subscription();
  }, [taskService]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={false}>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <DataTable data={tasks} columns={columns} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
