import type { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@/drizzle/adapter";
import { db } from "@/lib/turso";

export const options: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
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
