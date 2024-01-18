import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/lib/turso";
import { tasks } from "@/drizzle/schema";
import NewTask from "@/components/new-task";
import NewLift from "@/components/new-lift";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(options);
  return (
    <section className="py-24 px-24">
      <div className="container">
        <h1 className="mb-16 text-2xl font-medium">Lifts</h1>
      </div>
    </section>
  );
}
