"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { lifts, tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { Lift } from "@/types/types";
import {
  LiftDataSchema,
  LiftInputs,
  TaskDataSchema,
  TaskInputs,
} from "@/types/zod";
import { desc, and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { revalidateTag, unstable_cache } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export const getTasks = (userId: string) =>
  unstable_cache(
    async () => {
      return db
        .select()
        .from(tasks)
        .where(eq(tasks.userId, userId))
        .orderBy(desc(tasks.created))
        .limit(10);
    },
    [`tasks-${userId}`],
    {
      tags: [`tasks-${userId}`],
    }
  );

export const getLifts = (userId: string) =>
  unstable_cache(
    async () => {
      return await db
        .select()
        .from(lifts)
        .where(eq(lifts.userId, userId))
        .orderBy(desc(lifts.created))
        .limit(10);
    },
    [`lifts-${userId}`],
    {
      tags: [`lifts-${userId}`],
    }
  );

export const getLift = (userId: string, id: string) =>
  unstable_cache(
    async () => {
      return await db
        .select()
        .from(lifts)
        .where(and(eq(lifts.userId, userId), eq(lifts.id, id)));
    },
    [`lifts-${userId}`, `lifts-${userId}-${id}`],
    {
      tags: [`lifts-${userId}`, `lifts-${userId}-${id}`],
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

    revalidateTag(`tasks-${session?.user.id}`);

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

    revalidateTag(`lifts-${session?.user.id}`);

    return query;
  }
}

export async function editLift(data: Lift) {
  const session = await getServerSession(options);

  if (session?.user.id !== data.userId) {
    return;
  }

  const parsedData = LiftDataSchema.safeParse(data);

  if (parsedData.success) {
    const result = await db
      .update(lifts)
      .set({
        name: parsedData.data.name,
        weight: parsedData.data.weight,
        reps: parsedData.data.reps,
      })
      .where(and(eq(lifts.userId, data.userId), eq(lifts.id, data.id)));
    console.log(result);
    const query = await db
      .select()
      .from(lifts)
      .where(eq(lifts.id, data.id))
      .get();

    revalidateTag(`lifts-${session?.user.id}`);

    return query;
  }
}
