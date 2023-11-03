"use client";
import { insertTask } from '@/actions/actions';
import { useSession } from 'next-auth/react';

export default function CreateTask() {


  return (
    <button onClick={() => insertTask({title: "From Button"})}>
        Press pls
    </button>
  )
}
