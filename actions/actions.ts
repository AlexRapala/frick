"use server";

import { db } from "@/lib/turso";
import { tasks } from "@/drizzle/schema";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { v4 as uuidv4 } from "uuid";

export async function insertTask({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const session = await getServerSession(options);

  const result = await db.insert(tasks).values({
    id: uuidv4(),
    title: title,
    description: description,
    userId: session?.user.id,
  });

  console.log(result);
  return result;
}

export async function test({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  if (!title || !description) {
    return { error: "wtf" };
  }
  console.log(title, description);
  return { data: { title, description } };
}
