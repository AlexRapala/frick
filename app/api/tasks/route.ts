import { tasks } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { getServerSession } from "next-auth/next";

import { CreateTask } from "@/types/types";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { options } from "../auth/[...nextauth]/options";
import { z } from "zod";
import { FormDataSchema } from "@/types/zod";
import { eq } from "drizzle-orm";

type Inputs = z.infer<typeof FormDataSchema>;

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  const data = await request.json();

  const parsedData = FormDataSchema.safeParse(data);

  if (parsedData.success) {
    const id = uuidv4();
    const result = await db.insert(tasks).values({
      id: id,
      title: data.title,
      description: data.description,
      userId: session?.user.id,
    });

    const query = await db.select().from(tasks).where(eq(tasks.id, id)).get();
    console.log(query);
    return Response.json(query);
  } else {
    return Response.json(parsedData);
  }
  /*

  console.log(result);*/
}
