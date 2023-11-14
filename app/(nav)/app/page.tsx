import { options } from "@/app/api/auth/[...nextauth]/options";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function App() {
  const session = await getServerSession(options);
  console.log("here");
  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, session?.user.id || ""));

  return (
    <section className="py-12 px-12">
      <h1 className="mb-16 text-2xl font-medium">Tasks</h1>

      <DataTable data={result} columns={columns} />
    </section>
  );
}
