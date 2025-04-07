import { cn } from "lib/utils";
import * as React from "react";
import EyeOpen from "assets/eye-open.svg";
import EyeClose from "assets/eye-close.svg";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type: givenType, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const isPassword = givenType === "password";
    let type = givenType;    
    let Icon = EyeClose;

    if (isPassword && isVisible) {
      type = "text";
      Icon = EyeOpen;
    }

    const onEyeClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsVisible(prev => !prev);
    };

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <Icon
            /* @ts-ignore */
            onClick={onEyeClick}
            className="w-5 cursor-pointer text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2"
          />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
