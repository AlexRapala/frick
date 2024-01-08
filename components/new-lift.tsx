"use client";

import { CreateLift } from "@/types/types";
import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormDataSchema, LiftDataSchema } from "@/types/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

type Inputs = z.infer<typeof LiftDataSchema>;

export default function NewTask() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState<CreateLift>();

  const isMutating = isFetching || isPending;

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(LiftDataSchema) });

  const processForm: SubmitHandler<CreateLift> = async (data) => {
    setIsFetching(true);

    const resp = await fetch("/api/lifts", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(resp);
    const asdf = await resp.json();
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
          placeholder="name"
          className="rounded-lg"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}

        <Input
          placeholder="weight"
          className="rounded-lg"
          {...register("weight")}
        />
        {errors.weight?.message && (
          <p className="text-sm text-red-400">{errors.weight.message}</p>
        )}

        <Input
          placeholder="reps"
          className="rounded-lg"
          {...register("reps")}
        />
        {errors.reps?.message && (
          <p className="text-sm text-red-400">{errors.reps.message}</p>
        )}
        <Button>Submit</Button>
      </form>
      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
