import z from "zod";
import { LoginSchema } from "../schemas/auth";

export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = LoginRequest & {
  confirmPassword: string;
};
