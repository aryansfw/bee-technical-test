import z from "zod";
import { LoginSchema } from "../schemas/auth";
import { State } from "./api";

export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = LoginRequest & {
  confirmPassword: string;
};

export type LoginState = State<{
  email?: string[];
  password?: string[];
}>;

export type RegisterState = State<{
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}>;
