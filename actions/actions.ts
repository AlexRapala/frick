"use server";

import { db } from "@/lib/turso";
import { lifts, tasks } from "@/drizzle/schema";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { v4 as uuidv4 } from "uuid";
import { FormDataSchema, LiftDataSchema } from "@/types/zod";
import { CreateLift, CreateTask } from "@/types/types";
import { desc, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

export const getTasks = unstable_cache(
  async () => {
    return db.select().from(tasks).orderBy(desc(tasks.created)).limit(10);
  },
  ["tasks"],
  {
    tags: ["tasks"],
  }
);

export const getLifts = unstable_cache(
  async () => {
    const session = await getServerSession(options);

    return await db
      .select()
      .from(lifts)
      .where(eq(lifts.userId, session?.user.id || ""))
      .orderBy(desc(lifts.created))
      .limit(10);
  },
  ["lifts"],
  {
    tags: ["lifts"],
  }
);

export async function insertTask(data: CreateTask) {
  const session = await getServerSession(options);

  const parsedData = FormDataSchema.safeParse(data);

  if (parsedData.success) {
    const id = uuidv4();
    const result = await db.insert(tasks).values({
      id: id,
      title: parsedData.data.title,
      description: parsedData.data.description,
      userId: session?.user.id,
    });
    console.log(result);
    console.log(id);
    const query = await db.select().from(tasks).where(eq(tasks.id, id)).get();

    revalidateTag("tasks");

    return query;
  }
}

export async function insertLift(data: CreateLift) {
  const session = await getServerSession(options);

  const parsedData = LiftDataSchema.safeParse(data);

  if (parsedData.success) {
    const id = uuidv4();
    const result = await db.insert(lifts).values({
      id: id,
      name: parsedData.data.name,
      weight: parsedData.data.weight,
      reps: parsedData.data.reps,
      userId: session?.user.id,
    });
    console.log(result);
    console.log(id);
    const query = await db.select().from(lifts).where(eq(lifts.id, id)).get();

    revalidateTag("lifts");

    return query;
  }
}
