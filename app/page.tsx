import {getServerSession} from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import Image from 'next/image'
import {db } from "@/lib/turso";
import { tasks, users } from '@/drizzle/schema';
import { eq, isNull } from 'drizzle-orm';
import { v4 as uuidv4 } from "uuid";
import { insertTask } from '@/actions/actions';
import CreateTask from '@/components/CreateTask';

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);

  const results = await db.select().from(tasks);
  console.log(results);

  return (
    <CreateTask />
  )
}
