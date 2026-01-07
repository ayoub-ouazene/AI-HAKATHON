import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BaselineInput } from "@/components/djisr/BaselineInput";
import { DjisrButton } from "@/components/djisr/DjisrButton";
import { LogoUpload } from "@/components/djisr/LogoUpload";
import { StepIndicator } from "@/components/djisr/StepIndicator";
import { TrustBox } from "@/components/djisr/TrustBox";
import { AIRewriteBox } from "@/components/djisr/AIRewriteBox";
import { BigNumberInput } from "@/components/djisr/BigNumberInput";
import { BentoCard, BentoCardLabel, BentoCardTitle } from "@/components/djisr/BentoCard";

import { registerFounder } from "@/lib/api";

const TOTAL_STEPS = 4;

const sectors = ["SaaS", "Fintech", "Agritech", "E-commerce", "Healthtech", "Edtech", "Logistics", "Other"];

const FounderRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Account
    founderName: "",
    email: "",
    password: "",
    phone: "",
    linkedinUrl: "",
    // Company
    companyName: "",
    websiteUrl: "",
    sector: "",
    description: "",
    logoUrl: null as File | null,
    // Team & Traction
    numFounders: 1,
    hasTechnicalFounder: false,
    experienceYears: 0,
    monthlyUsers: 0,
    // Docs
    pitchDeckUrl: null as File | null,
    videoPitchUrl: "",
    cnrcUrl: null as File | null,
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Account
        return !!formData.founderName && !!formData.email && !!formData.password;
      case 1: // Company
        return !!formData.companyName && !!formData.sector && !!formData.description;
      case 2: // Team
        return formData.numFounders > 0;
      case 3: // Docs
        return true; // Optional fields mainly
      default:
        return false;
    }
  };

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      console.log("Submitting Founder Form:", formData);
      await registerFounder(formData);
      navigate("/startup/dashboard");
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
            {/* Abstract wave pattern */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[200%] h-[1px] bg-primary-foreground"
                style={{
                  top: `${10 + i * 4}%`,
                  left: "-50%",
                  transform: `rotate(${Math.sin(i) * 10}deg)`
                }}
                animate={{
                  x: ["-10%", "10%"],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 5 + i * 0.2,
                  repeat: Infinity,
                  yoyo: Infinity,
                  ease: "easeInOut"
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
              Build
            </motion.h1>
            <motion.p
              className="text-body text-primary-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Launch your startup with Djisr
            </motion.p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col">
          <header className="p-6 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2 lg:hidden">
              <Building2 className="w-5 h-5" />
              <span className="text-bento-title font-semibold">Djisr</span>
            </div>
            <div className="text-micro uppercase text-muted-foreground">
              Startup Registration
            </div>
          </header>

          <div className="flex-1 flex items-center">
            <main className="flex-1 p-6 md:p-12 max-w-2xl mx-auto w-full">
              <AnimatePresence mode="wait">
                {/* Step 1: Founder Account */}
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
                      <h2 className="text-section font-semibold mb-2">Founder Account</h2>
                      <p className="text-body text-muted-foreground">Create your founder profile</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaselineInput
                          label="Full Name"
                          placeholder="Founder Name"
                          value={formData.founderName}
                          onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                        />
                        <BaselineInput
                          label="Phone Number"
                          placeholder="+213..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <BaselineInput
                        label="Email Address"
                        type="email"
                        placeholder="founder@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <BaselineInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <BaselineInput
                        label="LinkedIn URL"
                        placeholder="https://linkedin.com/in/..."
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      />
                    </div>

                    <DjisrButton
                      size="full"
                      onClick={nextStep}
                      disabled={!isStepValid()}
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </DjisrButton>
                  </motion.div>
                )}

                {/* Step 2: Company Info */}
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
                      <h2 className="text-section font-semibold mb-2">Company Details</h2>
                      <p className="text-body text-muted-foreground">Tell us about your startup</p>
                    </div>

                    <LogoUpload
                      onUpload={(file) => setFormData({ ...formData, logoUrl: file })}
                      className="mb-8"
                    />

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BaselineInput
                          label="Company Name"
                          placeholder="Acme Inc."
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                        <BaselineInput
                          label="Website URL"
                          placeholder="https://acme.com"
                          value={formData.websiteUrl}
                          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="text-micro uppercase text-muted-foreground mb-3 block font-medium">
                          Sector
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {sectors.map((sector) => (
                            <motion.button
                              key={sector}
                              className={`px-4 py-2 rounded-full border text-sm transition-colors ${formData.sector === sector
                                ? "bg-foreground text-background border-foreground"
                                : "bg-background text-foreground border-border hover:border-foreground"
                                }`}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFormData({ ...formData, sector })}
                            >
                              {sector}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Short Description</label>
                        <textarea
                          className="w-full min-h-[120px] p-3 rounded-lg border bg-background resize-none focus:outline-none focus:border-foreground transition-colors"
                          placeholder="Briefly describe your startup..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <DjisrButton variant="secondary" onClick={prevStep}>Back</DjisrButton>
                      <DjisrButton size="full" onClick={nextStep} disabled={!isStepValid()}>
                        Continue <ArrowRight className="w-4 h-4" />
                      </DjisrButton>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Team & Traction */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-3"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-section font-semibold mb-2">Team & Traction</h2>
                      <p className="text-body text-muted-foreground">Key metrics and team structure</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Number of Founders</label>
                        <input
                          type="number"
                          min="1"
                          className="w-full p-3 border rounded-lg bg-background"
                          value={formData.numFounders}
                          onChange={(e) => setFormData({ ...formData, numFounders: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Years of Experience</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full p-3 border rounded-lg bg-background"
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Monthly Active Users</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full p-3 border rounded-lg bg-background"
                          value={formData.monthlyUsers}
                          onChange={(e) => setFormData({ ...formData, monthlyUsers: parseInt(e.target.value) || 0 })}
                        />
                      </div>

                      <div className="flex items-center gap-3 p-4 border rounded-lg md:col-span-2">
                        <input
                          type="checkbox"
                          id="technical"
                          checked={formData.hasTechnicalFounder}
                          onChange={(e) => setFormData({ ...formData, hasTechnicalFounder: e.target.checked })}
                          className="w-5 h-5 accent-black"
                        />
                        <label htmlFor="technical" className="text-sm font-medium cursor-pointer">
                          We have a technical founder / CTO
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <DjisrButton variant="secondary" onClick={prevStep}>Back</DjisrButton>
                      <DjisrButton size="full" onClick={nextStep} disabled={!isStepValid()}>
                        Continue <ArrowRight className="w-4 h-4" />
                      </DjisrButton>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Documents */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-4"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-section font-semibold mb-2">Documents & Pitch</h2>
                      <p className="text-body text-muted-foreground">Upload your materials</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Video Pitch URL</label>
                        <BaselineInput
                          placeholder="https://youtube.com/..."
                          value={formData.videoPitchUrl}
                          onChange={(e) => setFormData({ ...formData, videoPitchUrl: e.target.value })}
                        />
                      </div>

                      <div className="space-y-4">
                        <BentoCardLabel>Pitch Deck (PDF)</BentoCardLabel>
                        <div className="border border-dashed border-border rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                          <p className="text-sm text-muted-foreground">Click to upload Pitch Deck</p>
                        </div>

                        <BentoCardLabel>CNRC / Registration (PDF)</BentoCardLabel>
                        <div className="border border-dashed border-border rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                          <p className="text-sm text-muted-foreground">Click to upload CNRC</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <DjisrButton variant="secondary" onClick={prevStep} disabled={isSubmitting}>Back</DjisrButton>
                      <DjisrButton size="full" onClick={handleComplete} disabled={isSubmitting}>
                        {isSubmitting ? "Completing..." : <>Complete Registration <ArrowRight className="w-4 h-4" /></>}
                      </DjisrButton>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </main>

            {/* Step Indicator */}
            <div className="hidden md:flex items-center pr-16 bg-white/50 ">
              <StepIndicator steps={TOTAL_STEPS} currentStep={currentStep} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderRegistration;
