"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default async function Page() {
  return (
    <div className="flex justify-center items-center flex-col gap-8 py-24">
      <Link href="/">
        <Logo width="40px" height="40px" />
      </Link>

      <>
        <div key={"google"}>
          <Button onClick={() => signIn("google", { callbackUrl: "/app" })}>
            Sign in with {"Google"}
          </Button>
        </div>
        <div key={"github"}>
          <Button onClick={() => signIn("github", { callbackUrl: "/app" })}>
            Sign in with {"Github"}
          </Button>
        </div>
      </>
    </div>
  );
}
