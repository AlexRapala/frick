import { getTasks } from "@/actions/actions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import NewTask from "@/components/new-task";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(options);

  const taskq = await getTasks();

  return (
    <section className="py-8 px-8 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium">Tasks</h1>
      </div>
      <div className="flex flex-col gap-2">
        <NewTask />
        <DataTable data={taskq} columns={columns} />
      </div>
    </section>
  );
}
