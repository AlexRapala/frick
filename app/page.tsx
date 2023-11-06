import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import { db } from "@/lib/turso";
import { tasks, users } from "@/drizzle/schema";
import { insertTask } from "@/actions/actions";
import NewTask from "@/components/NewTask";
import { ModeToggle } from "@/components/DarkModeToggle";
import { NavMenu } from "@/components/NavMenu";

export default async function Home() {
  const results = await db.select().from(tasks);
  console.log(results);

  return (
    <section className="py-24 px-24">
      <div className="container">
        <h1 className="mb-16 text-2xl font-medium">Tasks</h1>
      </div>
      <h2>Dash</h2>
    </section>
  );
}
