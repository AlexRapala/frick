"use client";

import Link from "next/link";
import Logo from "./logo";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
export function UnauthedNavMenu() {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div>
        <Link href="/">
          <Logo width="40px" height="40px" />
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
