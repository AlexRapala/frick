import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { NavMenu } from "@/components/nav-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { UnauthedNavMenu } from "@/components/unauth-nav-menu";

export const metadata: Metadata = {
  title: "Frick",
  description: "Project management for people who need it",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {session?.user && <NavMenu session={session} />}

          {!session?.user && <UnauthedNavMenu />}

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
