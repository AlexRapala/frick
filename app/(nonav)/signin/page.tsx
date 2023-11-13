"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { Provider } from "next-auth/providers/index";

export default async function SignIn() {
  const providers: Provider[] = [];

  return (
    <div className="flex justify-center items-center flex-col gap-8 py-24">
      <Link href="/">
        <Logo />
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
