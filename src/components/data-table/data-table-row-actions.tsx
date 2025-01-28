"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "../../lib/data";
import { taskSchema } from "../../lib/schema";
import { Task } from "@/lib/model/task.class";
import { EditTaskDialog } from "@/components/modal/EditTaskDialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleDelete = async () => {
    await Task.delete(task.id);
  };

  const handleLabelChange = async (newLabel: string) => {
    const updatedTask = new Task({
      ...task,
      label: newLabel,
    });
    await Task.update(updatedTask);
  };

  const handleCopy = async () => {
    const newTask = new Task({
      ...task,
      id: undefined, // L'ID sera généré automatiquement
      title: `${task.title} (Copy)`,
    });
    await Task.create(newTask);
  };

  const handleEdit = async (updatedTask: Task) => {
    await Task.update(updatedTask);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleCopy}>Make a copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={task.label}
                onValueChange={handleLabelChange}
              >
                {labels.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog
        task={task}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleEdit}
      />
    </>
  );
}
