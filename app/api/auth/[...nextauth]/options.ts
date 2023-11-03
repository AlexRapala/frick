import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from "@/drizzle/adapter"
import { accounts, db, sessions, users } from "@/lib/turso";
import { Adapter } from "next-auth/adapters";
import { and, eq } from "drizzle-orm";


export const options: NextAuthOptions = {
    adapter: DrizzleAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        session({ session, token}) {
            
            console.log('here');
            console.log(session, token);
    
            return session;
        },
      },
}