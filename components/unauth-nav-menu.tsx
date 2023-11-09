"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export function UnauthedNavMenu() {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div></div>
      <div className="flex direction-row gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Login</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => signIn("google")}>
              Google
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signIn("github")}>
              Github
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant={"secondary"}>Sign Up</Button>
      </div>
    </div>
  );
}
