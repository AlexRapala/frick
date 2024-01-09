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

type Inputs = z.infer<typeof FormDataSchema>;
type Task = InferSelectModel<typeof tasks>;

export default function NewTask() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState<
    | Task
    | {
        error: ZodFormattedError<
          { title: string; description: string },
          string
        >;
      }
    | undefined
  >();

  const isMutating = isFetching || isPending;

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) });

  const processForm: SubmitHandler<CreateTask> = async (data) => {
    setIsFetching(true);

    const asdf = await insertTask(data);
    console.log(asdf);
    setIsFetching(false);
    reset();

    startTransition(() => {
      router.refresh();
    });
    setData(asdf);
  };

  return (
    <section className="flex gap-6 items-center">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-col gap-4 sm:w-1/2"
        style={{ opacity: !isMutating ? 1 : 0.7 }}
      >
        <Input
          placeholder="title"
          className="rounded-lg"
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-sm text-red-400">{errors.title.message}</p>
        )}

        <Input
          placeholder="description"
          className="rounded-lg"
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}
        <Button>Submit</Button>
      </form>
      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
