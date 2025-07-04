"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  (
    | {
        label?: string;
        error?: string;
      }
    | {
        type: "password";
        label?: string;
        isPasswordVisible?: boolean;
        error?: string;
      }
  );

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && <label className="font-medium">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-2 focus:outline-none ring ring-gray-500 focus:ring-blue-500 rounded-md",
              className
            )}
            placeholder={props.placeholder}
            type={props.type}
            {...props}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
