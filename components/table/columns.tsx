"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Lift, Task } from "@/types/types";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import EditLift from "../edit-lift";

export const columnsLifts: ColumnDef<Lift>[] = [
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Drawer direction="bottom">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <DrawerTrigger className="w-full [&>div]:p-0">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DrawerTrigger>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit</DrawerTitle>
              <DrawerDescription>
                <EditLift lift={row.original} />
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    },
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
