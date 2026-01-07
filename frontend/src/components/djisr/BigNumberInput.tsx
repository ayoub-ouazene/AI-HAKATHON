import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface BigNumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  suffix?: string;
  prefix?: string;
  value: string;
  onChange: (value: string) => void;
}

const BigNumberInput = React.forwardRef<HTMLInputElement, BigNumberInputProps>(
  ({ className, label, suffix, prefix, value, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow numbers and formatting
      const rawValue = e.target.value.replace(/[^0-9]/g, '');
      onChange(rawValue);
    };

    // Format number with commas
    const formatNumber = (num: string) => {
      if (!num) return '';
      return Number(num).toLocaleString('en-US');
    };

    return (
      <div className="relative w-full">
        {label && (
          <label className="text-micro uppercase text-muted-foreground mb-3 block font-medium">
            {label}
          </label>
        )}
        <div className="relative flex items-baseline gap-2">
          {prefix && (
            <span className="text-big-number font-semibold text-muted-foreground tabular-nums">
              {prefix}
            </span>
          )}
          <input
            type="text"
            inputMode="numeric"
            className={cn(
              "w-full border-0 border-b border-border bg-transparent px-0 py-2",
              "text-big-number font-semibold text-foreground placeholder:text-muted-foreground",
              "transition-colors duration-300 ease-out tabular-nums",
              "focus:outline-none focus:ring-0",
              className
            )}
            ref={ref}
            value={formatNumber(value)}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {suffix && (
            <span className="text-section font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: isFocused ? "100%" : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    );
  }
);
BigNumberInput.displayName = "BigNumberInput";

export { BigNumberInput };
