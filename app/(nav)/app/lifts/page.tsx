import { getLifts } from "@/actions/actions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import NewLift from "@/components/new-lift";
import { columns, columnsLifts } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { lifts, tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Suspense } from "react";

async function Lifts() {
  const liftsq = await getLifts();

  return <DataTable data={liftsq} columns={columnsLifts} />;
}

export default async function Page() {
  return (
    <section className="py-8 px-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Lifts</h1>
      </div>
      <div className="flex flex-col gap-2">
        <NewLift />
        <Suspense fallback={null}>
          <Lifts />
        </Suspense>
      </div>
    </section>
  );
}
