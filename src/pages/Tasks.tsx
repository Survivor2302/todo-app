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
import { Task } from "@/lib/model/task.class";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const allTasks = await Task.getAll();
      setTasks(allTasks);
    };
    loadTasks();

    // S'abonner aux changements
    const subscribtion = Task.subscribe((updatedTasks) => {
      setTasks(updatedTasks);
    });

    return () => subscribtion();
  }, []);

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
