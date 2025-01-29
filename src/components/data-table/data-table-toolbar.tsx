"use client";

import { Table } from "@tanstack/react-table";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

import { priorities, statuses } from "@/lib/types";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { AddTaskDialog } from "../modal/AddTaskDialog";
import { DeleteAllTasksDialog } from "../modal/DeleteTasksDialog";
import { Task } from "@/lib/model/task.class";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div>
      <div className="flex justify-between space-x-2 mb-4">
        <AddTaskDialog />
        <DeleteAllTasksDialog table={table} />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row sm:flex-1 gap-2 sm:items-center">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full sm:w-[150px] lg:w-[250px]"
          />
          <div className="flex flex-wrap gap-2 w-full">
            {table.getColumn("status") && (
              <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Status"
                options={statuses}
              />
            )}
            {table.getColumn("priority") && (
              <DataTableFacetedFilter
                column={table.getColumn("priority")}
                title="Priority"
                options={priorities}
              />
            )}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2" />
              </Button>
            )}
            <DataTableViewOptions table={table} />
          </div>
        </div>
      </div>
    </div>
  );
}
