"use client";

import { ResultSet } from "@libsql/client";
type insertTaskFn = {
    ({title}: {title: string}): Promise<ResultSet>
}
export default function CreateTask({insertTask}: {insertTask: insertTaskFn}) {

  return (
    <button onClick={() => insertTask({title: "From Button"})}>
        Press pls
    </button>
  )
}
