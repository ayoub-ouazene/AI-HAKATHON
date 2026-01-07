import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerLoaderProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({
  className,
  lines = 3,
  showAvatar = false,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {showAvatar && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 shimmer rounded" />
            <div className="h-3 w-24 shimmer rounded" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 shimmer rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
};

export { ShimmerLoader };
