'use server'

import { db } from "@/lib/turso";
import { tasks } from "@/drizzle/schema";
import {getServerSession} from 'next-auth/next';
import { options } from '@/app/api/auth/[...nextauth]/options';
import {v4 as uuidv4} from 'uuid';

export async function insertTask({title}: {title: string}) {
    const session = await getServerSession(options);

    return await db.insert(tasks).values({id: uuidv4(), title: title, userId: session?.user.id});
    
}