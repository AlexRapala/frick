import { options } from "@/app/api/auth/[...nextauth]/options";
import { columns, columnsLifts } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { lifts, tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

async function Dashboard() {
  const session = await getServerSession(options);
  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, session?.user.id || ""))
    .limit(10)
    .orderBy(desc(tasks.created));

  const liftsq = await db
    .select()
    .from(lifts)
    .where(eq(lifts.userId, session?.user.id || ""))
    .limit(10)
    .orderBy(desc(lifts.created));
  return (
    <>
      <h1 className="mb-16 text-2xl font-medium">Lifts</h1>
      <DataTable data={liftsq} columns={columnsLifts} />
      <h1 className="mb-16 text-2xl font-medium">Tasks</h1>

      <DataTable data={result} columns={columns} />
    </>
  );
}
export default function Page() {
  return (
    <section className="py-12 px-12">
      <Suspense fallback={null}>
        <Dashboard />
      </Suspense>
    </section>
  );
}
