"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";

export default async function SignIn() {
  const providers = (await getProviders()) ?? [];

  return (
    <div className="flex justify-center items-center flex-col gap-8 py-24">
      <Link href="/">
        <Logo />
      </Link>

      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button
              onClick={() => signIn(provider.id, { callbackUrl: "/app" })}
            >
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </>
    </div>
  );
}
