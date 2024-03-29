"use client";

import { insertLift } from "@/actions/actions";
import { LiftDataSchema, LiftInputs } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function NewLift() {
  const [isFetching, setIsFetching] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<LiftInputs>({ resolver: zodResolver(LiftDataSchema) });

  const processForm: SubmitHandler<LiftInputs> = async (data) => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    const asdf = await insertLift(data);
    console.log(asdf);

    setIsFetching(false);
    reset();
  };

  return (
    <section className="flex gap-6 items-center">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-row gap-4 sm:w-1/2"
        style={{ opacity: !isFetching ? 1 : 0.7 }}
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
    </section>
  );
}
