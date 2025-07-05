"use server";

import { UserSchema } from "@/schemas/user";
import { DeleteUserState, UserState } from "@/types/user";
import { revalidatePath } from "next/cache";

export async function addUser(
  _prevState: UserState,
  formData: FormData
): Promise<UserState> {
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
): Promise<UserState> {
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`,
    {
      method: "PUT",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    return {
      success: false,
      message: "Failed to edit user",
    };
  }

  revalidatePath("/users");
  revalidatePath("/users/[id");

  return {
    success: true,
    message: "User edited successfully",
  };
}

export async function deleteUser(id: string): Promise<DeleteUserState> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return {
      success: false,
      message: "Failed to delete user",
    };
  }
  revalidatePath("/users");

  return {
    success: true,
    message: "User deleted successfully",
  };
}
