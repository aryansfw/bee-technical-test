"use server";
import { revalidatePath } from "next/cache";
import z from "zod";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema, RegisterSchema } from "../schemas/auth";

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  job: z.string().min(1, "Job is required"),
});

export type State<ErrorData> = {
  success?: boolean;
  message?: string | null;
  errors?: ErrorData;
};

export type UserState = State<{
  name?: string[];
  job?: string[];
}>;

export type LoginState = State<{
  email?: string[];
  password?: string[];
}>;

export type RegisterState = State<{
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
}>;

export async function addUser(_prevState: UserState, formData: FormData) {
  const data = {
    name: formData.get("name"),
    job: formData.get("job"),
  };

  const validated = UserSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return {
      success: false,
      message: "Failed to add user",
    };
  }

  revalidatePath("/users");

  return {
    success: true,
    message: "User added successfully",
  };
}

export async function editUser(
  id: string,
  _prevState: UserState,
  formData: FormData
) {
  const data = {
    name: formData.get("name"),
    job: formData.get("job"),
  };

  const validated = UserSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return {
      success: false,
      message: "Failed to edit user",
    };
  }

  revalidatePath("/users");

  return {
    success: true,
    message: "User edited successfully",
  };
}

export async function login(_prevState: LoginState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = LoginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json: { token?: string; error?: string } = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: json.error || "Login failed",
    };
  }

  if (json.token) {
    cookieStore.set("token", json.token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
      sameSite: "lax",
      secure: true,
    });
  }

  return {
    success: true,
    message: "Login successful",
  };
}

export async function register(_prevState: RegisterState, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validated = RegisterSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json: { token?: string; error?: string } = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: json.error || "Registration failed",
    };
  }

  if (json.token) {
    cookieStore.set("token", json.token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
      sameSite: "lax",
      secure: true,
    });
  }

  return {
    success: true,
    message: "Registration successful",
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  redirect("/login");
}
