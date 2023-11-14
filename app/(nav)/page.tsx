import { tasks, users } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { eq } from "drizzle-orm";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  return (
    <section className="py-24 px-24">
      <div>This is the home screen</div>
    </section>
  );
}
