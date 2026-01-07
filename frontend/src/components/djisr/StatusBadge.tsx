import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, AlertTriangle, Clock, X } from "lucide-react";

type BadgeStatus = "verified" | "pending" | "warning" | "error";

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
  animate?: boolean;
}

const statusConfig: Record<BadgeStatus, {
  icon: React.ElementType;
  bgClass: string;
  borderClass: string;
  textClass: string;
  defaultLabel: string;
}> = {
  verified: {
    icon: Check,
    bgClass: "bg-card",
    borderClass: "border-djisr-green",
    textClass: "text-djisr-green",
    defaultLabel: "Verified",
  },
  pending: {
    icon: Clock,
    bgClass: "bg-card",
    borderClass: "border-gray-400",
    textClass: "text-gray-500",
    defaultLabel: "Pending",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-card",
    borderClass: "border-djisr-orange",
    textClass: "text-djisr-orange",
    defaultLabel: "Warning",
  },
  error: {
    icon: X,
    bgClass: "bg-card",
    borderClass: "border-djisr-red",
    textClass: "text-djisr-red",
    defaultLabel: "Error",
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className,
  animate = true,
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  const badge = (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border",
        config.bgClass,
        config.borderClass,
        className
      )}
    >
      <Icon className={cn("w-3.5 h-3.5", config.textClass)} />
      <span className={cn("text-data font-medium", config.textClass)}>
        {label || config.defaultLabel}
      </span>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {badge}
      </motion.div>
    );
  }

  return badge;
};

export { StatusBadge };
export type { BadgeStatus };
