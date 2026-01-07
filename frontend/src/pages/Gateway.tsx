import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Gem, ArrowRight, Building2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DjisrButton } from "@/components/djisr/DjisrButton";

const Gateway = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState<"founder" | "investor" | null>(null);

    const cardVariants = {
        idle: { scale: 1, filter: "blur(0px)", opacity: 1 },
        hover: { scale: 1.025, filter: "blur(0px)", opacity: 1 },
        dimmed: { scale: 1, filter: "blur(1px)", opacity: 0.8 },
    };

    return (
        <div className="min-h-screen bg-background noise-overlay flex items-center justify-center p-6 sm:p-12 overflow-hidden">

            {/* Background Logo/Header (Optional, but good for context) */}
            <div className="absolute top-6 left-6 flex items-center gap-2 z-50">
                <Building2 className="w-5 h-5 text-foreground" />
                <span className="text-bento-title font-semibold text-foreground">Djisr</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl h-[70vh] items-stretch">

                {/* Founder Card */}
                <motion.div
                    className={cn(
                        "flex-1 relative rounded-2xl border bg-card p-8 sm:p-12 flex flex-col justify-between cursor-pointer transition-colors duration-300",
                        hoveredCard === "founder" ? "border-foreground shadow-2xl" : "border-border shadow-bento"
                    )}
                    initial="idle"
                    animate={
                        hoveredCard === "founder" ? "hover" : hoveredCard === "investor" ? "dimmed" : "idle"
                    }
                    variants={cardVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onMouseEnter={() => setHoveredCard("founder")}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => navigate("/onboarding/startup")}
                >
                    <div className="space-y-6">
                        <TrendingUp className="w-12 h-12 stroke-1 text-foreground" />
                        <div>
                            <h2 className="text-3xl font-medium tracking-tight text-foreground mb-2">Build & Scale</h2>
                            <p className="text-body text-muted-foreground max-w-xs">
                                Verify your startup, pitch with AI, and access capital.
                            </p>
                        </div>
                    </div>

                    {/* Replaced AnimatePresence with direct links */}
                    <div className="flex gap-4 pt-4">
                        <Link to="/onboarding/startup">
                            <DjisrButton className="bg-white text-black hover:bg-white/90">
                                I'm a Founder <ArrowRight className="w-4 h-4 ml-2" />
                            </DjisrButton>
                        </Link>
                        <Link to="/onboarding/investor">
                            <button className="px-6 py-3 rounded-xl font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all font-mono text-sm">
                                Invest Capital
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Investor Card */}
                <motion.div
                    className={cn(
                        "flex-1 relative rounded-2xl border bg-card p-8 sm:p-12 flex flex-col justify-between cursor-pointer transition-colors duration-300",
                        hoveredCard === "investor" ? "border-foreground shadow-2xl" : "border-border shadow-bento"
                    )}
                    initial="idle"
                    animate={
                        hoveredCard === "investor" ? "hover" : hoveredCard === "founder" ? "dimmed" : "idle"
                    }
                    variants={cardVariants}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onMouseEnter={() => setHoveredCard("investor")}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => navigate("/onboarding/investor")}
                >
                    <div className="space-y-6">
                        <Gem className="w-12 h-12 stroke-1 text-foreground" />
                        <div>
                            <h2 className="text-3xl font-medium tracking-tight text-foreground mb-2">Discover & Invest</h2>
                            <p className="text-body text-muted-foreground max-w-xs">
                                Access verified deal flow and manage your portfolio.
                            </p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {hoveredCard === "investor" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex items-center gap-2 text-foreground font-medium"
                            >
                                Get Started <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
};

export default Gateway;
