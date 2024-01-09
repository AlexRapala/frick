import { options } from "@/app/api/auth/[...nextauth]/options";
import { columns, columnsLifts } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { lifts, tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function Home({ params }: { params: { id: string } }) {
  const session = await getServerSession(options);
  console.log(params.id);

  const liftsq = await db
    .select()
    .from(lifts)
    .where(eq(lifts.userId, session?.user.id || ""))
    .where(eq(lifts.id, params.id));

  return (
    <section className="py-12 px-12">
      <h1 className="mb-16 text-2xl font-medium">Lifts</h1>
      <DataTable data={liftsq} columns={columnsLifts} />
    </section>
  );
}
