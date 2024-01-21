"use client";

import { insertTask } from "@/actions/actions";
import { Task } from "@/types/types";
import { TaskDataSchema, TaskInputs } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function NewTask() {
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState<Task | undefined>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TaskInputs>({ resolver: zodResolver(TaskDataSchema) });

  const processForm: SubmitHandler<TaskInputs> = async (data) => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    const asdf = await insertTask(data);
    console.log(asdf);
    setIsFetching(false);
    reset();

    setData(asdf);
  };

  return (
    <section className="flex gap-6 items-center">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-row gap-4 sm:w-1/2"
        style={{ opacity: !isFetching ? 1 : 0.7 }}
      >
        <Input
          placeholder="Title"
          className="rounded-lg"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-sm text-red-400">{errors.title.message}</p>
        )}

        <Input
          placeholder="Description"
          className="rounded-lg"
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}
        <Button>Create</Button>
      </form>
    </section>
  );
}
