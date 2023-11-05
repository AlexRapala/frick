import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import { db } from "@/lib/turso";
import { tasks, users } from "@/drizzle/schema";
import { insertTask } from "@/actions/actions";
import NewTask from "@/components/NewTask";
import { ModeToggle } from "@/components/DarkModeToggle";
import { NavMenu } from "@/components/NavMenu";

export default async function Home() {
  const session = await getServerSession(options);

  const results = await db.select().from(tasks);
  console.log(results);

  return (
    <section className="py-24 px-24">
      <NavMenu />
      <ModeToggle />
      <div className="container">
        <h1 className="mb-16 text-2xl font-medium">Tasks</h1>
      </div>
      <NewTask />
    </section>
  );
}
