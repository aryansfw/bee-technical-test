import { Icon } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: Icon;
  buttonType?: "primary" | "danger";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, icon: Icon, buttonType = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full flex justify-center items-center px-4 py-3 text-white rounded-md cursor-pointer",
          buttonType === "danger" && "bg-red-500 hover:bg-red-600",
          buttonType === "primary" && "bg-blue-500 hover:bg-blue-600",
          className
        )}
        {...props}
      >
        {Icon && <Icon size={24} className="mr-2" />}
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
