"use server";

import { db } from "@/lib/turso";
import { tasks } from "@/drizzle/schema";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { v4 as uuidv4 } from "uuid";
import { FormDataSchema } from "@/types/zod";
import { CreateTask } from "@/types/types";
import { eq } from "drizzle-orm";

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
    return query;
  }

  if (parsedData.error) {
    return { error: parsedData.error.format() };
  }
}
