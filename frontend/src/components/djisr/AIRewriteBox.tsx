import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DjisrButton } from "./DjisrButton";
import { ShimmerLoader } from "./ShimmerLoader";

interface AIRewriteBoxProps {
  rawText: string;
  onTextChange: (text: string) => void;
  className?: string;
}

const mockAIOutput = `We're building the future of logistics in Algeria. Our AI-powered platform reduces delivery times by 40% while cutting operational costs in half.

With a proven track record of 10,000+ successful deliveries and partnerships with major retailers, we're positioned to capture the rapidly growing e-commerce market in North Africa.

Our proprietary routing algorithm and real-time tracking system have achieved 99.2% on-time delivery rates, setting a new industry standard.`;

const AIRewriteBox: React.FC<AIRewriteBoxProps> = ({
  rawText,
  onTextChange,
  className,
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [aiText, setAiText] = React.useState("");
  const [displayedText, setDisplayedText] = React.useState("");
  const [highlightedWords, setHighlightedWords] = React.useState<number[]>([]);

  const handleRewrite = () => {
    setIsProcessing(true);
    setDisplayedText("");
    setHighlightedWords([]);

    // Simulate AI processing
    setTimeout(() => {
      setAiText(mockAIOutput);
      typewriterEffect(mockAIOutput);
    }, 1500);
  };

  const typewriterEffect = (text: string) => {
    const words = text.split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText((prev) =>
          currentIndex === 0 ? words[0] : prev + " " + words[currentIndex]
        );

        // Highlight key words
        const keyWords = ["AI-powered", "40%", "99.2%", "10,000+"];
        if (keyWords.some((kw) => words[currentIndex].includes(kw))) {
          setHighlightedWords((prev) => [...prev, currentIndex]);
        }

        currentIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 50);
  };

  const renderTextWithHighlights = () => {
    const words = displayedText.split(" ");
    return words.map((word, index) => (
      <span
        key={index}
        className={cn(
          highlightedWords.includes(index) && "keyword-highlight px-1 rounded"
        )}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6", className)}>
      {/* Raw Input */}
      <div className="space-y-3">
        <label className="text-micro uppercase font-medium text-muted-foreground">
          Your Pitch
        </label>
        <textarea
          value={rawText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Describe your startup in your own words..."
          className={cn(
            "w-full h-64 p-4 rounded-lg border border-border bg-card",
            "text-body text-muted-foreground resize-none",
            "focus:outline-none focus:ring-1 focus:ring-foreground",
            "placeholder:text-gray-400"
          )}
        />
      </div>

      {/* Rewrite Button (Center) */}
      <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-10 flex justify-center lg:block">
        <DjisrButton
          variant="primary"
          size="icon"
          onClick={handleRewrite}
          disabled={!rawText || isProcessing}
          className="rounded-full w-14 h-14 shadow-float"
        >
          <motion.div
            animate={isProcessing ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 2,
              repeat: isProcessing ? Infinity : 0,
              ease: "linear",
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </DjisrButton>
      </div>

      {/* AI Output */}
      <div className="space-y-3 relative">
        <label className="text-micro uppercase font-medium text-muted-foreground">
          AI-Enhanced Pitch
        </label>
        <motion.div
          className={cn(
            "w-full h-64 p-4 rounded-lg border border-border bg-card overflow-auto",
            "transition-all duration-300"
          )}
          animate={{
            filter: isProcessing && !displayedText ? "blur(4px)" : "blur(0px)",
          }}
        >
          <AnimatePresence mode="wait">
            {isProcessing && !displayedText ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ShimmerLoader lines={5} />
              </motion.div>
            ) : displayedText ? (
              <motion.p
                key="text"
                className="text-body text-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {renderTextWithHighlights()}
                {isProcessing && <span className="typewriter-cursor" />}
              </motion.p>
            ) : (
              <motion.p
                key="placeholder"
                className="text-body text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Click the sparkle button to enhance your pitch with AI...
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export { AIRewriteBox };
