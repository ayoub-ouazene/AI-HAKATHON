import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, Briefcase, Sparkles, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { DjisrButton } from "@/components/djisr/DjisrButton";
import { StepIndicator } from "@/components/djisr/StepIndicator";
import { TrustBox } from "@/components/djisr/TrustBox";
import { BentoCard, BentoCardTitle, BentoCardLabel } from "@/components/djisr/BentoCard";
import { DualRangeSlider } from "@/components/djisr/DualRangeSlider";
import { cn } from "@/lib/utils";
import { registerInvestor } from "@/lib/api";
import mainLogo from "@/assets/DjisrUp-main-logo.png";

const TOTAL_STEPS = 2;

const sectors = ["Fintech", "AgriTech", "SaaS", "Health", "Logistics", "E-commerce"];

const InvestorRegistration = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        biography: "",
        sectors: [] as string[],
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    const handleSectorToggle = (sector: string) => {
        setFormData(prev => ({
            ...prev,
            sectors: prev.sectors.includes(sector)
                ? prev.sectors.filter(s => s !== sector)
                : [...prev.sectors, sector]
        }));
    };

    // Validation
    const isStepValid = () => {
        switch (currentStep) {
            case 0: return !!formData.fullName && !!formData.email && !!formData.password;
            case 1: return !!formData.biography && formData.sectors.length > 0;
            default: return false;
        }
    };

    const handleComplete = async () => {
        try {
            setIsSubmitting(true);
            console.log("Submitting Investor Form:", formData);
            const response = await registerInvestor(formData);

            // Auto-login
            login('investor', response.token);

            navigate("/investor/dashboard");
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background noise-overlay">
            <div className="flex min-h-screen">
                {/* Left Panel - Abstract Animation */}
                <div className="hidden lg:flex lg:w-2/5 bg-foreground items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-[1px] bg-primary-foreground"
                                style={{
                                    height: `${Math.random() * 20 + 10}%`,
                                    left: `${10 + i * 5}%`,
                                    top: "-10%",
                                }}
                                animate={{ top: "110%" }}
                                transition={{
                                    duration: Math.random() * 3 + 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                    <div className="relative z-10 text-center px-12">
                        <motion.h1
                            className="text-hero font-medium text-primary-foreground mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Partner
                        </motion.h1>
                        <motion.p
                            className="text-body text-primary-foreground/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Access verified high-growth opportunities
                        </motion.p>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-1 flex flex-col">
                    <header className="p-6 flex items-center justify-between border-b border-border">
                        <div className="flex items-center gap-2 lg:hidden">
                            <img src={mainLogo} alt="Djisr Logo" className="h-6 w-auto" />
                        </div>
                        <div className="text-micro uppercase text-muted-foreground">
                            Investor Registration
                        </div>
                    </header>

                    <div className="flex-1 flex items-center">
                        <main className="flex-1 p-6 md:p-12 max-w-2xl mx-auto w-full">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Account Details */}
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step-1"
                                        variants={pageVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-section font-semibold mb-2">Create Account</h2>
                                            <p className="text-body text-muted-foreground">Enter your personal details</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    className="w-full p-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                                    placeholder="Mourad Oulmi"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full p-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                                    placeholder="investor@venture.dz"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Password</label>
                                                <input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    className="w-full p-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>

                                        <DjisrButton
                                            size="lg"
                                            onClick={nextStep}
                                            disabled={!isStepValid()}
                                            className="w-full"
                                        >
                                            Continue <ArrowRight className="w-4 h-4" />
                                        </DjisrButton>
                                    </motion.div>
                                )}

                                {/* Step 2: Profile & Sectors */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step-2"
                                        variants={pageVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="space-y-8"
                                    >
                                        <div>
                                            <h2 className="text-section font-semibold mb-2">Investment Profile</h2>
                                            <p className="text-body text-muted-foreground">Tell us about your investment focus</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Biography</label>
                                                <textarea
                                                    value={formData.biography}
                                                    onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                                                    className="w-full p-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-black/5 outline-none transition-all min-h-[120px] resize-none"
                                                    placeholder="E.g. I am an angel investor focused on early-stage Agritech startups..."
                                                />
                                            </div>

                                            <div>
                                                <label className="text-micro uppercase text-muted-foreground mb-3 block font-medium">
                                                    Sectors of Interest
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {sectors.map((sector) => (
                                                        <button
                                                            key={sector}
                                                            onClick={() => handleSectorToggle(sector)}
                                                            className={cn(
                                                                "px-4 py-2 rounded-full border text-sm transition-all duration-200",
                                                                formData.sectors.includes(sector)
                                                                    ? "bg-foreground text-background border-foreground shadow-sm"
                                                                    : "bg-background text-foreground border-border hover:border-foreground"
                                                            )}
                                                        >
                                                            {sector}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <DjisrButton variant="secondary" size="lg" onClick={prevStep} className="text-black">
                                                Back
                                            </DjisrButton>
                                            <DjisrButton
                                                size="full"
                                                onClick={handleComplete}
                                                disabled={!isStepValid() || isSubmitting}
                                            >
                                                {isSubmitting ? "Completing..." : <>Complete Registration <Check className="w-4 h-4 ml-2" /></>}
                                            </DjisrButton>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </main>

                        {/* Step Indicator */}
                        <div className="hidden md:flex flex-col items-center pr-16 gap-4">
                            <StepIndicator steps={TOTAL_STEPS} currentStep={currentStep} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorRegistration;
