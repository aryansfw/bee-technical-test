"use server";
import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { LoginState, RegisterState } from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
