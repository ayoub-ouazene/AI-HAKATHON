import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface BaselineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const BaselineInput = React.forwardRef<HTMLInputElement, BaselineInputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="relative w-full">
        {label && (
          <label className="text-micro uppercase text-muted-foreground mb-2 block font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "w-full border-0 border-b border-border bg-transparent px-0 py-3",
              "text-body text-foreground placeholder:text-muted-foreground",
              "transition-colors duration-300 ease-out",
              "focus:outline-none focus:ring-0",
              error && "border-djisr-red",
              className
            )}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 h-[1px] bg-foreground"
            initial={{ width: 0, x: "-50%" }}
            animate={{
              width: isFocused ? "100%" : 0,
              x: "-50%",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        {error && (
          <p className="mt-2 text-micro text-djisr-red">{error}</p>
        )}
      </div>
    );
  }
);
BaselineInput.displayName = "BaselineInput";

export { BaselineInput };
