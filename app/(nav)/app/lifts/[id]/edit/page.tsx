import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/turso";
import { tasks } from "@/drizzle/schema";
import NewTask from "@/components/new-task";
import NewLift from "@/components/new-lift";
import { getLift } from "@/actions/actions";
import EditLift from "@/components/edit-lift";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(options);
  console.log(params.id);
  const req = await getLift(session?.user.id || "", params.id)();
  return (
    <section className="py-24 px-24">
      <div className="container">
        <h1 className="mb-16 text-2xl font-medium">Lifts</h1>
        {req.length === 1 && <EditLift lift={req[0]} />}
      </div>
    </section>
  );
}
