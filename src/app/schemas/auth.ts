import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Email address is invalid")
    .min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const RegisterSchema = LoginSchema.extend({
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
