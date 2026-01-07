import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepIndicatorProps {
  steps: number;
  currentStep: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {Array.from({ length: steps }).map((_, index) => (
        <div key={index} className="relative flex items-center">
          <motion.div
            className={cn(
              "h-8 w-[2px] rounded-full transition-colors duration-300",
              index < currentStep
                ? "bg-foreground"
                : index === currentStep
                ? "bg-foreground"
                : "bg-gray-200"
            )}
            initial={false}
            animate={{
              scaleY: index === currentStep ? 1 : 0.6,
              opacity: index <= currentStep ? 1 : 0.4,
            }}
            transition={{ duration: 0.3 }}
          />
          {index === currentStep && (
            <motion.div
              className="absolute left-3 text-micro uppercase font-medium text-muted-foreground whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              Step {index + 1}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export { StepIndicator };
