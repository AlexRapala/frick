import { options } from "@/app/api/auth/[...nextauth]/options";
import { columns, columnsLifts } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function App() {
  const session = await getServerSession(options);

  const taskq = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, session?.user.id || ""))
    .limit(10);

  return (
    <section className="py-12 px-12">
      <div className="flex justify-between">
        <h1 className="mb-16 text-2xl font-medium">Lifts</h1>
        <Link href="tasks/new">
          <Button>New Task</Button>
        </Link>
      </div>
      <DataTable data={taskq} columns={columns} />
    </section>
  );
}
