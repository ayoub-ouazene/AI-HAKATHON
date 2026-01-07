import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Check } from "lucide-react";

interface LogoUploadProps {
  onUpload: (file: File) => void;
  value?: string | null;
  className?: string;
}

const LogoUpload: React.FC<LogoUploadProps> = ({
  onUpload,
  value,
  className,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [uploaded, setUploaded] = React.useState(!!value);
  const [preview, setPreview] = React.useState<string | null>(value || null);
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
    if (file && file.type.startsWith("image/")) {
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
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setUploaded(true);
      onUpload(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div
        className={cn(
          "relative w-32 h-32 rounded-full cursor-pointer",
          "border-2 border-dashed transition-colors duration-200",
          isDragging ? "border-foreground scale-110" : "border-gray-300",
          uploaded && "border-solid border-djisr-green"
        )}
        animate={{ scale: isDragging ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute inset-0 rounded-full overflow-hidden"
            >
              <img
                src={preview}
                alt="Logo preview"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute bottom-0 right-0 w-8 h-8 bg-djisr-green rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground"
            >
              <Upload className="w-6 h-6 mb-2" />
              <span className="text-micro uppercase font-medium">Logo</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <p className="mt-3 text-micro uppercase text-muted-foreground">
        {uploaded ? "Click to change" : "Drag & drop or click"}
      </p>
    </div>
  );
};

export { LogoUpload };
