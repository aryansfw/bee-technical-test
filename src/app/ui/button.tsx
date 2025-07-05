import { Icon } from "@phosphor-icons/react";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: Icon;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, icon: Icon, ...props }, ref) => {
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
        {Icon && <Icon size={24} className="mr-2" />}
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
