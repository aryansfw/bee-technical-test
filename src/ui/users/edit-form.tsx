"use client";

import { editUser } from "@/actions/user";
import { UserState } from "@/types/user";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../button";
import Input from "../input";

export default function EditUserForm({
  user,
}: {
  user: { id: string; name: string; job: string };
}) {
  const initialState: UserState = {
    message: "",
    errors: {} as { name?: string[]; job?: string[] },
  };
  const editUserWithId = editUser.bind(null, user.id);
  const [state, formAction, isPending] = useActionState(
    editUserWithId,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, {
        position: "bottom-right",
        duration: 3000,
      });

      router.push(`/users/${user.id}`);
    }

    if (!state.success && state.message) {
      toast.error(state.message, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }, [state.success, state.message, router, user.id]);

  return (
    <form action={formAction} className="space-y-4">
      <Input
        name="name"
        label="Name"
        placeholder="Name"
        defaultValue={user.name}
        error={state.errors?.name?.[0]}
      />
      <Input
        name="job"
        label="Job"
        placeholder="Job"
        defaultValue={user.job}
        error={state.errors?.job?.[0]}
      />
      <Button isLoading={isPending}>Edit User</Button>
    </form>
  );
}
