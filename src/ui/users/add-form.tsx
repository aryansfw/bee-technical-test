"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../button";
import Input from "../input";
import { addUser } from "@/actions/user";
import { UserState } from "@/types/user";

export default function AddUserForm() {
  const initialState: UserState = {
    message: "",
    errors: {} as { name?: string[]; job?: string[] },
  };
  const [state, formAction] = useActionState(addUser, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, {
        position: "bottom-right",
        duration: 3000,
      });

      router.push("/users");
    }

    if (!state.success && state.message) {
      toast.error(state.message, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }, [state.success, state.message, router]);

  return (
    <form action={formAction} className="space-y-4">
      <Input
        name="name"
        label="Name"
        placeholder="Name"
        error={state.errors?.name?.[0]}
      />
      <Input
        name="job"
        label="Job"
        placeholder="Job"
        error={state.errors?.job?.[0]}
      />
      <Button>Add User</Button>
    </form>
  );
}
