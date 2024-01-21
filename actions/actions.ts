"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { lifts, tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import {
  LiftDataSchema,
  LiftInputs,
  TaskDataSchema,
  TaskInputs,
} from "@/types/zod";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { revalidateTag, unstable_cache } from "next/cache";
import { v4 as uuidv4 } from "uuid";

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
  async (id) => {
    return await db
      .select()
      .from(lifts)
      .where(eq(lifts.userId, id))
      .orderBy(desc(lifts.created))
      .limit(10);
  },
  ["lifts"],
  {
    tags: ["lifts"],
  }
);

export async function insertTask(data: TaskInputs) {
  const session = await getServerSession(options);

  const parsedData = TaskDataSchema.safeParse(data);

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

export async function insertLift(data: LiftInputs) {
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
