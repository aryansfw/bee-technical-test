"use client";

import { DeleteState, deleteUser } from "@/lib/actions";
import { TrashIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../button";

export default function DeleteUserForm({ id }: { id: string }) {
  const initialState: DeleteState = {
    message: "",
  };
  const deleteUserWithId = deleteUser.bind(null, id);
  const [state, formAction] = useActionState(deleteUserWithId, initialState);
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
      <Button icon={TrashIcon} buttonType="danger">
        Delete
      </Button>
    </form>
  );
}
