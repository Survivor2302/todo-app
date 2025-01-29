import { Task } from "@/lib/model/task.class";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { labels, priorities, statuses } from "@/lib/types";
import { TaskService } from "@/lib/services/task.service";
import { Storage } from "@ionic/storage";
import { useTaskService } from "@/lib/context/TaskServiceContext";

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedTask: Task) => Promise<void>;
}

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
  onSave,
}: EditTaskDialogProps) {
  const [editedTask, setEditedTask] = useState({ ...task });
  const taskService = useTaskService();
  const handleSave = async () => {
    await taskService.update(editedTask);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>Make changes to your task.</DialogDescription>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Task title"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <Select
            value={editedTask.status}
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, status: value })
            }
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={editedTask.priority}
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, priority: value })
            }
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={editedTask.label}
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, label: value })
            }
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Label" />
            </SelectTrigger>
            <SelectContent>
              {labels.map((label) => (
                <SelectItem key={label.value} value={label.value}>
                  {label.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
