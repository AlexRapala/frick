import { tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { getServerSession } from "next-auth/next";

import { CreateTask } from "@/types/types";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { options } from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  const data: CreateTask = await request.json();

  const result = await db.insert(tasks).values({
    id: uuidv4(),
    title: data.title,
    description: data.description,
    userId: session?.user.id,
  });
  console.log(result);
  return Response.json(data);
}
