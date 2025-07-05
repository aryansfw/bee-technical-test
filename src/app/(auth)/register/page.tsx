"use client";

import { RegisterSchema } from "@/app/schemas/auth";
import { RegisterRequest } from "@/app/types/auth";
import Button from "@/app/ui/button";
import Input from "@/app/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error("Error: " + json.error || "Something went wrong", {
        position: "bottom-right",
      });
      return;
    }

    toast.success("Registration successful! Redirecting...", {
      position: "bottom-right",
    });

    router.push("/");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        className="flex flex-col items-center min-w-[500px] rounded-xl bg-white px-16 py-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Welcome!</h1>
          <p>Please register a new account :)</p>
        </div>
        <div className="mt-8 space-y-4 w-full">
          <Input
            label="Email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>

        <Button className="mt-12">Register</Button>
      </form>
    </div>
  );
}
