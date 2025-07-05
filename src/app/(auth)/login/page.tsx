"use client";

import { login, LoginState } from "@/lib/actions";
import Button from "@/ui/button";
import Input from "@/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const initialState: LoginState = {
    message: "",
    errors: {} as { email?: string[]; password?: string[] },
  };
  const [state, formAction] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message, {
        position: "bottom-right",
        duration: 3000,
      });

      router.push("/");
    }

    if (!state.success && state.message) {
      toast.error(state.message, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }, [state.success, state.message, router]);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        className="flex flex-col items-center min-w-[500px] rounded-xl bg-white px-16 py-20"
        action={formAction}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Hello!</h1>
          <p>Please login to your account :)</p>
        </div>
        <div className="mt-8 space-y-4 w-full">
          <Input
            label="Email"
            placeholder="Email"
            name="email"
            error={state.errors?.email?.[0]}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            error={state.errors?.password?.[0]}
          />
        </div>

        <div className="w-full text-right">
          <Button className="mt-12">Login</Button>
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href={"/register"}
              className="text-blue-500 hover:underline hover:text-blue-600"
            >
              Register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
