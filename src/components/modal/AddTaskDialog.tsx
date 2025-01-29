import { Task } from "@/lib/model/task.class";
import { Storage } from "@ionic/storage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { labels, priorities, statuses } from "@/lib/data";
import { TaskService } from "@/lib/services/task.service";
import { useTaskService } from "@/lib/context/TaskServiceContext";

interface AddTaskDialogProps {}

export function AddTaskDialog({}: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const taskService = useTaskService();
  const [newTask, setNewTask] = useState({
    title: "",
    status: "todo",
    label: "bug",
    priority: "high",
  });

  const handleAddTask = async () => {
    await taskService.create(newTask);
    setOpen(false);
    setNewTask({
      title: "",
      status: "todo",
      label: "bug",
      priority: "high",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <DialogDescription>Create a new task to get started.</DialogDescription>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <Select
            value={newTask.status}
            onValueChange={(value) => setNewTask({ ...newTask, status: value })}
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
            value={newTask.priority}
            onValueChange={(value) =>
              setNewTask({ ...newTask, priority: value })
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
            value={newTask.label}
            onValueChange={(value) => setNewTask({ ...newTask, label: value })}
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
          <Button onClick={handleAddTask}>Create Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
