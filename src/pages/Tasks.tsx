import { z } from "zod";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { taskSchema } from "@/lib/schema";
import tasksData from "./tasks.json";

const Tasks: React.FC = () => {
  const tasks = z.array(taskSchema).parse(tasksData);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={false}>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex h-full">
          <DataTable data={tasks} columns={columns} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
