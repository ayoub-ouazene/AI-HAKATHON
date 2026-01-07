import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoCardProps {
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({
  className,
  children,
  hover = true,
  padding = "lg",
  onClick,
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
    none: "p-0",
  };

  if (hover) {
    return (
      <motion.div
        className={cn(
          "rounded-lg border border-border bg-card text-card-foreground",
          "transition-shadow duration-300",
          paddingClasses[padding],
          className
        )}
        onClick={onClick}
        whileHover={{
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          y: -2,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-bento",
        paddingClasses[padding],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
BentoCard.displayName = "BentoCard";

const BentoCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 mb-4", className)}
    {...props}
  />
));
BentoCardHeader.displayName = "BentoCardHeader";

const BentoCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-bento-title font-medium text-foreground", className)}
    {...props}
  />
));
BentoCardTitle.displayName = "BentoCardTitle";

const BentoCardLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-micro uppercase font-medium text-muted-foreground", className)}
    {...props}
  />
));
BentoCardLabel.displayName = "BentoCardLabel";

export { BentoCard, BentoCardHeader, BentoCardTitle, BentoCardLabel };
