import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight, ChevronLeft, Layout, Loader2 } from "lucide-react";
import { BentoCard } from "@/components/djisr/BentoCard";
import { DjisrButton } from "@/components/djisr/DjisrButton";
import { cn } from "@/lib/utils";
import { generateSlides } from "@/lib/api";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Slide {
    title: string;
    bullets: string[];
}

const PitchStudio = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const response = await generateSlides();
            if (response.data?.slides?.slides) {
                setSlides(response.data.slides.slides);
                setCurrentSlideIndex(0);
                toast.success("Deck generated successfully!");
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate slides. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const nextSlide = () => {
        if (currentSlideIndex < slides.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-background noise-overlay p-6 sm:p-12">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-foreground font-medium">Pitch Studio</span>
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">AI Pitch Deck</h1>
                    </div>

                    {slides.length > 0 && (
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="text-sm flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Sparkles className={cn("w-4 h-4 text-purple-500", isGenerating && "animate-spin")} />
                            {isGenerating ? "Regenerating..." : "Regenerate Deck"}
                        </button>
                    )}
                </header>

                {/* Main Content */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {slides.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full"
                            >
                                <BentoCard className="aspect-video flex flex-col items-center justify-center p-12 text-center gap-6" hover={false}>
                                    <div className="p-6 bg-muted rounded-full relative">
                                        <Layout className="w-12 h-12 text-muted-foreground stroke-1" />
                                        <div className="absolute -top-1 -right-1">
                                            <Sparkles className="w-6 h-6 text-purple-500 fill-purple-500 animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="max-w-md space-y-2">
                                        <h2 className="text-2xl font-semibold tracking-tight">Ready to build your deck?</h2>
                                        <p className="text-muted-foreground">Our AI will analyze your startup profile and metrics to generate a professional 5-slide pitch deck.</p>
                                    </div>
                                    <DjisrButton
                                        size="lg"
                                        className="text-white rounded-full px-8 shadow-xl shadow-purple-500/10"
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5 mr-2 fill-current" />
                                                Generate Slides
                                            </>
                                        )}
                                    </DjisrButton>
                                </BentoCard>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="slider"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                {/* Slide Display */}
                                <div className="relative group">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentSlideIndex}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            className="w-full"
                                        >
                                            <BentoCard className="aspect-video bg-white dark:bg-zinc-900 border-2 border-border p-12 flex flex-col gap-8 shadow-2xl relative" hover={false}>
                                                <div className="flex justify-between items-start">
                                                    <h2 className="text-4xl font-bold tracking-tight text-foreground">{slides[currentSlideIndex].title}</h2>
                                                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">SLIDE {currentSlideIndex + 1}/{slides.length}</span>
                                                </div>
                                                <ul className="space-y-4">
                                                    {slides[currentSlideIndex].bullets.map((bullet, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex gap-4 text-xl text-muted-foreground leading-relaxed"
                                                        >
                                                            <div className="w-2 h-2 rounded-full bg-purple-500 mt-3 shrink-0" />
                                                            {bullet}
                                                        </motion.li>
                                                    ))}
                                                </ul>

                                                {/* Slide Bottom Bar */}
                                                <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center opacity-30 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-sm font-medium tracking-widest uppercase">Djisr Pitch Studio</span>
                                                    <Layout className="w-4 h-4" />
                                                </div>
                                            </BentoCard>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation Buttons */}
                                    <button
                                        onClick={prevSlide}
                                        disabled={currentSlideIndex === 0}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-black/80 shadow-lg border border-border hover:scale-110 transition-all disabled:opacity-0"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        disabled={currentSlideIndex === slides.length - 1}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 dark:bg-black/80 shadow-lg border border-border hover:scale-110 transition-all disabled:opacity-0"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Dots Navigator */}
                                <div className="flex justify-center gap-3">
                                    {slides.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlideIndex(i)}
                                            className={cn(
                                                "w-2 h-2 rounded-full transition-all duration-300",
                                                currentSlideIndex === i
                                                    ? "w-8 bg-purple-500"
                                                    : "bg-muted hover:bg-muted-foreground"
                                            )}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PitchStudio;
