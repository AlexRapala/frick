import { ColumnDef } from "@tanstack/react-table";
import { Lift, Task } from "@/types/types";

export const columnsLifts: ColumnDef<Lift>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "weight",
    header: "weight",
  },
  {
    accessorKey: "reps",
    header: "reps",
  },
];

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
