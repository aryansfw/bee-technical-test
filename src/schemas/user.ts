import z from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  job: z.string().min(1, "Job is required"),
});
