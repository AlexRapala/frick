import { z } from "zod";

export const FormDataSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z
    .string()
    .min(1, { message: "Message is required." })
    .min(6, { message: "Description must be at least 6 characters." }),
});

export const LiftDataSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  weight: z
    .string()
    .min(1, { message: "You must have hoisted something dumbass." }),
  reps: z.string().min(1, { message: "Enter the reps stupid fuck" }),
});
