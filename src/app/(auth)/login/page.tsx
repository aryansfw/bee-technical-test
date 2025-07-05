"use client";

import { login } from "@/actions/auth";
import { LoginState } from "@/types/auth";
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
  const [state, formAction, isPending] = useActionState(login, initialState);
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
    <div className="flex justify-center items-center w-screen min-h-dvh">
      <form
        className="flex justify-center items-center w-full md:w-fit md:min-w-lg min-h-dvh md:min-h-0 rounded-xl bg-white px-8 py-10 md:px-16 md:py-20 shadow-lg"
        action={formAction}
      >
        <div className="flex flex-col justify-center items-center w-full max-w-md">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-blue-600">
              Hello!
            </h1>
            <p className="md:text-base text-sm text-gray-600">
              Please login to your account :)
            </p>
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

          <div className="flex flex-col gap-8 md:gap-1 w-full text-center md:text-right">
            <Button className="mt-12" isLoading={isPending}>Login</Button>
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
        </div>
      </form>
    </div>
  );
}
