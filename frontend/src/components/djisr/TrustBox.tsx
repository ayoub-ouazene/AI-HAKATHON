import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type TrustState = "idle" | "scanning" | "verified" | "error";

interface TrustBoxProps {
  onFileUpload: (file: File) => void;
  className?: string;
}

const scanningTexts = [
  "Analyzing document vectors...",
  "Cross-referencing CNRC database...",
  "Verifying authenticity...",
  "Validating fiscal signature...",
];

const TrustBox: React.FC<TrustBoxProps> = ({ onFileUpload, className }) => {
  const [state, setState] = React.useState<TrustState>("idle");
  const [isDragging, setIsDragging] = React.useState(false);
  const [scanText, setScanText] = React.useState("");
  const [scanIndex, setScanIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setState("scanning");
    onFileUpload(file);

    // Simulate scanning animation
    let index = 0;
    const interval = setInterval(() => {
      if (index < scanningTexts.length) {
        setScanText(scanningTexts[index]);
        setScanIndex(index);
        index++;
      } else {
        clearInterval(interval);
        setState("verified");
      }
    }, 800);
  };

  return (
    <motion.div
      className={cn(
        "relative w-full rounded-lg border border-border bg-card overflow-hidden",
        "diagonal-stripes",
        className
      )}
      animate={{
        borderColor: isDragging ? "hsl(var(--foreground))" : "hsl(var(--border))",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Scanning overlay */}
      <AnimatePresence>
        {state === "scanning" && (
          <motion.div
            className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Scanning line */}
            <div className="scan-line" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative p-8 md:p-12 min-h-[280px] flex flex-col items-center justify-center cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => state === "idle" && inputRef.current?.click()}
      >
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6"
                animate={{
                  scale: isDragging ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <FileText className="w-8 h-8 text-muted-foreground" />
              </motion.div>
              <h3 className="text-section font-semibold text-foreground mb-2">
                AI Trust Verification
              </h3>
              <p className="text-body text-muted-foreground max-w-md">
                Drop your CNRC or Tax Documents here for instant AI-powered verification
              </p>
              <p className="text-micro uppercase text-muted-foreground mt-4">
                PDF, JPG, or PNG up to 10MB
              </p>
            </motion.div>
          )}

          {state === "scanning" && (
            <motion.div
              key="scanning"
              className="flex flex-col items-center text-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Shield className="w-12 h-12 text-djisr-green mb-6 animate-pulse" />
              <div className="h-8">
                <motion.p
                  key={scanIndex}
                  className="text-body text-foreground font-mono"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {scanText}
                  <span className="typewriter-cursor" />
                </motion.p>
              </div>
            </motion.div>
          )}

          {state === "verified" && (
            <motion.div
              key="verified"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              >
                <StatusBadge status="verified" label="Document Verified" />
              </motion.div>
              <p className="text-body text-muted-foreground">
                Your business documents have been authenticated
              </p>
              <button
                className="mt-4 text-micro uppercase text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setState("idle");
                }}
              >
                Upload another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export { TrustBox };
