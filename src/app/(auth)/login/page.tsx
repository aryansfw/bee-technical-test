"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { LoginSchema } from "@/app/schemas/auth";
import { LoginRequest } from "@/app/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error("Error: " + json.error || "Something went wrong", {
        position: "bottom-right",
      });
      return;
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <form
        className="flex flex-col items-center min-w-[500px] rounded-xl bg-white px-16 py-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold">Hello!</h1>
          <p>Please login to your account :)</p>
        </div>
        <div className="mt-12 space-y-4 w-full">
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
        </div>

        <Button className="mt-16">Login</Button>
      </form>
    </div>
  );
}
