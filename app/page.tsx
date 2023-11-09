import { db } from "@/lib/turso";
import { tasks, users } from "@/drizzle/schema";

export default async function Home() {
  return (
    <section className="py-24 px-24">
      <div>This is the home screen</div>
    </section>
  );
}
