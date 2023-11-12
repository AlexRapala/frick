"use client";

import { CreateTask } from "@/types/types";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormDataSchema } from "@/types/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Inputs = z.infer<typeof FormDataSchema>;

export default function NewTask() {
  const [data, setData] = useState<CreateTask>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) });

  const processForm: SubmitHandler<CreateTask> = async (data) => {
    const resp = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(resp);
    const asdf = await resp.json();
    reset();
    setData(asdf);
  };

  return (
    <section className="flex gap-6 items-center">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-col gap-4 sm:w-1/2"
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
