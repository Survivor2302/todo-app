import { Storage } from "@ionic/storage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Task } from "@/lib/model/task.class";
import { Table } from "@tanstack/react-table";
import { TaskService } from "@/lib/services/task.service";
import { useTaskService } from "@/lib/context/TaskServiceContext";

interface DeleteAllTasksDialogProps {
  selectedRows?: Task[];
  table: Table<any>;
}

export function DeleteAllTasksDialog({ table }: DeleteAllTasksDialogProps) {
  const [open, setOpen] = useState(false);
  const taskService = useTaskService();
  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original as Task);

  const handleDeleteTasks = async () => {
    if (selectedRows && selectedRows.length > 0) {
      for (const task of selectedRows) {
        await taskService.delete(task.id);
      }
    } else {
      await taskService.deleteAll();
    }
    table.resetRowSelection();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          {selectedRows && selectedRows.length > 0
            ? `Delete Selected Tasks (${selectedRows.length})`
            : "Delete All Tasks"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>
            {selectedRows && selectedRows.length > 0
              ? "Delete Selected Tasks"
              : "Delete All Tasks"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            {selectedRows && selectedRows.length > 0
              ? `Are you sure you want to delete ${selectedRows.length} selected task(s)?`
              : "Are you sure you want to delete all tasks?"}{" "}
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTasks}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
