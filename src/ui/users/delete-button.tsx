"use client";

import { deleteUser } from "@/actions/user";
import { DeleteUserState } from "@/types/user";
import { TrashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../button";

export default function DeleteUserForm({ id }: { id: string }) {
  const initialState: DeleteUserState = {
    message: "",
  };
  const deleteUserWithId = deleteUser.bind(null, id);
  const [state, formAction, isPending] = useActionState(
    deleteUserWithId,
    initialState
  );
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
      <Button isLoading={isPending} icon={TrashIcon} buttonType="danger">
        <span className="hidden md:block">Delete</span>
      </Button>
    </form>
  );
}
