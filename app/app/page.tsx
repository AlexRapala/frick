import { db } from "@/lib/turso";
import { tasks, users } from "@/drizzle/schema";

export default async function App() {
  return (
    <section className="py-24 px-24">
      <div className="container">
        <h1 className="mb-16 text-2xl font-medium">Tasks</h1>
      </div>
      <h2>Dash</h2>
    </section>
  );
}
