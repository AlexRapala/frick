import { ColumnDef } from "@tanstack/react-table";
import { CreateTask } from "@/types/types";
import { type InferSelectModel } from "drizzle-orm";
import { lifts } from "@/drizzle/schema";

type Lift = InferSelectModel<typeof lifts>;

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

type Task = {
  id: string;
  title: string | null;
  description: string | null;
  userId: string | null;
  created: string | null;
};

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
