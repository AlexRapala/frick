"use client";

import { CreateTask } from "@/types/types";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodFormattedError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTask } from "@/actions/actions";
import { FormDataSchema } from "@/types/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { tasks } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";
import { revalidateTag } from "next/cache";

type Inputs = z.infer<typeof FormDataSchema>;
type Task = InferSelectModel<typeof tasks>;

export default function NewTask() {
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState<Task | undefined>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) });

  const processForm: SubmitHandler<CreateTask> = async (data) => {
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
