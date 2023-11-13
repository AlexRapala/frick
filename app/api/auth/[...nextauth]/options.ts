import type { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/turso";
import { Adapter } from "next-auth/adapters";
import { accounts, users } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

function getAdapter(): Adapter {
  return {
    // @ts-ignore
    ...DrizzleAdapter(db),
    async getUserByAccount(providerAccountId) {
      console.log(providerAccountId);
      const results = await db
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, providerAccountId.provider),
            eq(accounts.providerAccountId, providerAccountId.providerAccountId)
          )
        )
        .get();

      return results?.user ?? null;
    },
  };
}

export const options: NextAuthOptions = {
  // @ts-ignore
  adapter: getAdapter(),
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }: { session: Session; token: any }) {
      if (session && token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
