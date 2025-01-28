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

interface AddTaskDialogProps {}

// Extract unique values from tasks.json
const STATUS_OPTIONS = ["todo", "in progress", "backlog", "canceled", "done"];
const LABEL_OPTIONS = ["bug", "feature", "documentation"];
const PRIORITY_OPTIONS = ["low", "medium", "high"];

export function AddTaskDialog({}: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    status: "todo",
    label: "bug",
    priority: "high",
  });

  const handleAddTask = async () => {
    await Task.create(newTask);
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
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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
              {PRIORITY_OPTIONS.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
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
              {LABEL_OPTIONS.map((label) => (
                <SelectItem key={label} value={label}>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
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
