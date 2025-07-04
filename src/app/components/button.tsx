import { forwardRef } from "react";
import { cn } from "../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          `w-full flex justify-center items-center px-4 py-3`,
          `bg-blue-500 text-white rounded-md`,
          `hover:bg-blue-600 cursor-pointer`,
          className
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
