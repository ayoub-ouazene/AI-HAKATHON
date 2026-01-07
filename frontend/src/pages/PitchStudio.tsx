import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Film, ChevronRight, Upload, Layout } from "lucide-react";
import { BentoCard } from "@/components/djisr/BentoCard";
import { DjisrButton } from "@/components/djisr/DjisrButton";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Slide {
    id: number;
    title: string;
    bullets: string[];
}

const PitchStudio = () => {
    const [rawInput, setRawInput] = useState("");
    const [isRefining, setIsRefining] = useState(false);
    const [statusText, setStatusText] = useState("Analyzing input...");
    const [generatedSlides, setGeneratedSlides] = useState<Slide[]>([]);

    const handleRefine = () => {
        setIsRefining(true);
        setGeneratedSlides([]);
        setStatusText("Analyzing text & PDF...");

        // Simulate AI processing steps
        setTimeout(() => setStatusText("Structuring narrative..."), 1500);
        setTimeout(() => setStatusText("Designing slides..."), 3000);

        setTimeout(() => {
            setIsRefining(false);
            setGeneratedSlides([
                { id: 1, title: "Problem", bullets: ["Manual diligence is slow and costly", "Startups struggle to access global capital", "Lack of verified data creates trust gap"] },
                { id: 2, title: "Solution: Djisr", bullets: ["AI-First Investment Bridge", "Automated data verification workflow", "Standardized deal flow for investors"] },
                { id: 3, title: "Market Opportunity", bullets: ["$5B+ Venture Capital gap in MENA", "Growing startup ecosystem (20% YoY)", "Digital transformation mandate"] },
                { id: 4, title: "Business Model", bullets: ["SaaS subscription for Startups", "Success fee on funded deals", "Enterprise API for Corporate VCs"] },
                { id: 5, title: "Traction", bullets: ["500+ Verified Startups", "12 Active Venture Funds", "$2M in Facilitated LOIs"] },
            ]);
        }, 4500);
    };

    return (
        <div className="min-h-screen bg-background noise-overlay p-6 sm:p-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">Pitch Studio</span>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight">Draft Your Pitch</h1>
                </header>

                {/* Main Stage: Magic Editor */}
                <BentoCard className="min-h-[600px] relative overflow-hidden flex flex-col" padding="none" hover={false}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 flex-1">
                        {/* Left Column: Input (Text + PDF) */}
                        <div className="p-8 border-b lg:border-b-0 lg:border-r border-border h-full flex flex-col gap-6">
                            <div className="flex-1 flex flex-col">
                                <span className="text-sm font-medium text-muted-foreground mb-4 block">1. Describe your vision</span>
                                <textarea
                                    className="flex-1 w-full bg-transparent border border-border rounded-lg p-4 resize-none focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50 text-base leading-relaxed"
                                    placeholder="Paste your rough notes, value proposition, or traction details here..."
                                    value={rawInput}
                                    onChange={(e) => setRawInput(e.target.value)}
                                />
                            </div>

                            <div className="h-1/3 flex flex-col">
                                <span className="text-sm font-medium text-muted-foreground mb-4 block">2. Add Reference (Optional)</span>
                                <div className="flex-1 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer group">
                                    <div className="p-2 bg-muted rounded-full group-hover:scale-110 transition-transform">
                                        <Upload className="w-5 h-5" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-sm text-foreground">Drop PDF / One-Pager</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: AI Slide Output */}
                        <div className={cn(
                            "p-8 bg-[#FAFAFA] dark:bg-muted/10 h-full flex flex-col relative transition-all duration-500 overflow-hidden",
                            isRefining && "blur-sm"
                        )}>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-sm font-medium text-foreground">AI Generated Slides</span>
                                {generatedSlides.length > 0 && <span className="text-xs text-muted-foreground">{generatedSlides.length} Slides Created</span>}
                            </div>

                            {/* Skeleton / Status during refining */}
                            <AnimatePresence>
                                {isRefining && (
                                    <motion.div
                                        key="loader"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#FAFAFA]/50 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-3 text-foreground font-medium animate-pulse">
                                            <Sparkles className="w-5 h-5" />
                                            {statusText}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Empty State */}
                            {!isRefining && generatedSlides.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/40 gap-4">
                                    <Layout className="w-16 h-16 stroke-1" />
                                    <p className="text-sm">Ready to generate your deck</p>
                                </div>
                            )}

                            {/* Slides List */}
                            <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
                                <AnimatePresence mode="popLayout">
                                    {generatedSlides.map((slide, index) => (
                                        <motion.div
                                            key={slide.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.15 }}
                                            className="aspect-video bg-white shadow-sm border border-border rounded-lg p-6 flex flex-col gap-4 hover:shadow-md transition-shadow cursor-default"
                                        >
                                            <div className="h-8 border-b border-border/50 pb-2">
                                                <h3 className="font-semibold text-lg">{slide.title}</h3>
                                            </div>
                                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                                {slide.bullets.map((bullet, i) => (
                                                    <li key={i}>{bullet}</li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Center Action Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <button
                            onClick={handleRefine}
                            className="bg-background text-foreground border border-border px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium"
                        >
                            <Sparkles className="w-4 h-4 text-purple-500 fill-purple-500" />
                            Generate Slides
                        </button>
                    </div>
                </BentoCard>

                {/* Lower Stage: Video (Separate) */}
                <div className="grid grid-cols-1">
                    <BentoCard className="h-[200px] flex flex-row items-center gap-8" padding="lg">
                        <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 bg-muted rounded-full">
                            <Film className="w-12 h-12 text-muted-foreground stroke-1" />
                        </div>
                        <div className="flex-1 space-y-2">
                            <h3 className="text-lg font-medium">Add Video Pitch (Optional)</h3>
                            <p className="text-muted-foreground text-sm max-w-md">
                                Upload a 60-second video of you explaining your vision. A human touch increases trust score by ~15%.
                            </p>
                            <div className="flex gap-4 mt-4">
                                <DjisrButton variant="secondary" size="sm" className="text-black border border-border">
                                    Browse MP4
                                </DjisrButton>
                            </div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </div>
    );
};

export default PitchStudio;
