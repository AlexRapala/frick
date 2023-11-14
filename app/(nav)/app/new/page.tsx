import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/turso";
import { tasks } from "@/drizzle/schema";
import NewTask from "@/components/new-task";

export default async function Home() {
  const session = await getServerSession(options);

  const results = await db.select().from(tasks);
  console.log(results);

  return (
    <section className="py-24 px-24">
      <div className="container">
        <h1 className="mb-16 text-2xl font-medium">Tasks</h1>
      </div>
      <NewTask />
    </section>
  );
}
