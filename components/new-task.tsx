"use client";

import { CreateTask } from "@/types/types";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function NewTask() {
  const [data, setData] = useState<CreateTask>();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateTask>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const processForm: SubmitHandler<CreateTask> = async (data) => {
    const resp = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(resp);
    const asdf = await resp.json();
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
          {...register("title", { required: "Title is required" })}
        />
        {errors.title?.message && (
          <p className="text-sm text-red-400">{errors.title.message}</p>
        )}

        <Input
          placeholder="description"
          className="rounded-lg"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 4,
              message: "Message must have at least 4 characters",
            },
          })}
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
