import { lifts } from "@/drizzle/schema";
import { db } from "@/lib/turso";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { options } from "../auth/[...nextauth]/options";
import { z } from "zod";
import { LiftDataSchema } from "@/types/zod";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  const data = await request.json();

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
    
    const query = await db.select().from(lifts).where(eq(lifts.id, id)).get();
    console.log(query);
    return Response.json(query);
  } else {
    return Response.json(parsedData);
  }
  /*

  console.log(result);*/
}
