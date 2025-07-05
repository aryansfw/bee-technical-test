import { Icon } from "@phosphor-icons/react";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: Icon;
  buttonType?: "primary" | "danger";
  isLoading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      icon: Icon,
      buttonType = "primary",
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full flex gap-2 justify-center items-center px-4 py-3 text-white rounded-md cursor-pointer",
          "md:text-base text-sm md:px-4 px-3 md:py-3 py-2.5",
          buttonType === "danger" && "bg-red-500 hover:bg-red-600",
          buttonType === "primary" && "bg-blue-500 hover:bg-blue-600",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <CircleNotchIcon className="w-5 md:w-6 h-5 md:h-6 animate-spin" />
        ) : (
          <>
            {Icon && <Icon size={24} />}
            {props.children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
