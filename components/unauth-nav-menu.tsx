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
import Logo from "./logo";
import Link from "next/link";
export function UnauthedNavMenu() {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex direction-row gap-4">
        <ModeToggle />
        <Link href="/api/auth/signin">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
}
