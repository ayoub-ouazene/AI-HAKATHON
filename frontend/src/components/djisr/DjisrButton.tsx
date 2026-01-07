import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const djisrButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-muted",
        ghost: "hover:bg-muted text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 text-body rounded-lg",
        sm: "h-10 px-4 text-data rounded-md",
        lg: "h-14 px-8 text-white rounded-lg",
        full: "h-14 w-full text-white rounded-lg",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface DjisrButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof djisrButtonVariants> {
  asChild?: boolean;
}

const DjisrButton: React.FC<DjisrButtonProps> = ({
  className,
  variant,
  size,
  asChild = false,
  children,
  disabled,
  onClick,
  type = "button",
}) => {
  if (asChild) {
    return (
      <Slot className={cn(djisrButtonVariants({ variant, size, className }))}>
        {children}
      </Slot>
    );
  }

  return (
    <motion.button
      type={type}
      className={cn(djisrButtonVariants({ variant, size, className }))}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );
};

export { DjisrButton, djisrButtonVariants };
