import {forwardRef} from "react";
import {twMerge} from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className, disabled, type = "button", ...props}, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
          group 
          rounded-lg 
          border 
          border-transparent
          flex
          justify-between items-center
          px-5 
          py-4 
          transition-colors 
          border-gray-300
          bg-gray-100
          dark:border-neutral-700 
          dark:bg-neutral-800/30
          hover:bg-transparent`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
