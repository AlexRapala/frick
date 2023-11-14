import { ColumnDef } from "@tanstack/react-table";
import { CreateTask } from "@/types/types";

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
