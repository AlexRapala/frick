import { z } from "zod";

export const FormDataSchema = z.object({
  title: z.string().nonempty("Name is required."),
  description: z
    .string()
    .nonempty("Message is required.")
    .min(6, { message: "Description must be at least 6 characters." }),
});
