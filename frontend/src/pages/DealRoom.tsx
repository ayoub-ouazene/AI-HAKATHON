import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight, ChevronLeft, CheckCircle2, Play, FileText,
    Download, Shield, TrendingUp, Users, Building2, AlertTriangle, AlertOctagon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DjisrButton } from "@/components/djisr/DjisrButton";
import { BentoCard } from "@/components/djisr/BentoCard";
import { STARTUPS } from "@/data/startups";
import { DealNegotiationModal } from "@/components/djisr/DealNegotiationModal";

const DealRoom = () => {
    const { id } = useParams();
    const location = useLocation();
    const dealData = location.state?.deal;

    const [activeTab, setActiveTab] = useState("overview");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);

    // For Hackathon Demo: Use localStorage slides for all startups
    const sharedSlides = (() => {
        const saved = localStorage.getItem("pitch_deck_slides");
        if (saved) {
            try {
                return JSON.parse(saved).map((s: any) => ({
                    title: s.title,
                    bolt: s.bullets[0] || "Innovation at scale." // Mapping bullets to 'bolt' expected by DealRoom UI
                }));
            } catch (e) {
                return [];
            }
        }
        return [];
    })();

    // Normalize Data (Map Backend Deal/Startup to UI format)
    // If we have real data, map it. Otherwise fall back to mock for direct links (for now)
    const mockStartup = STARTUPS.find(s => s.id === id) || STARTUPS[0];

    // Derived Startup Object for UI
    const startup = dealData ? {
        id: dealData.id,
        name: dealData.startup.companyName,
        logo: dealData.startup.logoUrl ? <img src={dealData.startup.logoUrl} alt="" className="w-full h-full object-cover" /> : dealData.startup.companyName.charAt(0),
        oneLiner: dealData.startup.description.substring(0, 100) + "...", // Fallback one-liner
        tags: ["Tech", "SaaS", "AI"], // Fallback tags
        verified: true, // Assume verified if inactive check passed
        riskLevel: dealData.riskLevel.charAt(0) + dealData.riskLevel.slice(1).toLowerCase(), // "LOW" -> "Low"
        riskScore: dealData.riskScore,
        videoUrl: dealData.startup.videoPitchUrl || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
        problem: dealData.startup.description, // Use description for problem section
        solution: "Our solution leverages advanced AI to solve this problem efficiently...", // Placeholder if solution not split
        riskAnalysis: "Automated analysis indicates strong fundamentals with managed execution risk.",
        marketTraction: [
            { label: "Monthly Users", value: dealData.startup.monthlyUsers || 0 }, // If returned
            { label: "Experience", value: (dealData.startup.experienceYears || 0) + " Yrs" }
        ],
        team: [
            { name: dealData.startup.founderName || "Founder", role: "CEO", bio: "Experienced founder.", avatar: "https://i.pravatar.cc/150?u=a" }
        ],
        ask: Number(dealData.amountRequested).toLocaleString() + " DZD",
        equity: dealData.equityOffered + "%",
        offerType: dealData.offerType, // Added for dynamic label
        committed: 45, // Mock
        valuation: "10M DZD", // Mock or derived
        minTicket: "50k DZD",
        slides: sharedSlides, // Using slides from localStorage
        logoUrl: dealData.startup.logoUrl // For fallback
    } : mockStartup;

    return (
        <div className="min-h-screen bg-background noise-overlay font-sans text-foreground">

            <DealNegotiationModal
                isOpen={isDealModalOpen}
                onClose={() => setIsDealModalOpen(false)}
                startupName={startup.name}
                dealId={Number(startup.id) || 0}
            />

            {/* Header / Breadcrumbs */}
            <div className="bg-white/50 backdrop-blur-sm border-b border-border sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/investor/feed" className="hover:text-foreground transition-colors">Startups</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">{startup.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Risk Badge in Header */}
                        <div className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm",
                            startup.riskLevel === "Low" ? "bg-green-50 border-green-200 text-green-700" :
                                startup.riskLevel === "Moderate" ? "bg-yellow-50 border-yellow-200 text-yellow-700" :
                                    "bg-red-50 border-red-200 text-red-700"
                        )}>
                            <Shield className="w-3 h-3" />
                            {startup.riskLevel} Risk
                        </div>
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse ml-2" />
                        <span className="text-xs font-medium text-green-700 uppercase tracking-wide">Live Deal</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Hero Header */}
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between mb-10">
                    <div className="flex gap-5">
                        <div className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-sm">
                            {startup.logo}
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight">{startup.name}</h1>
                            <p className="text-lg text-muted-foreground">{startup.oneLiner}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-border rounded-full text-xs font-medium shadow-sm">
                                    <Building2 className="w-3 h-3 text-muted-foreground" />
                                    {startup.tags[0]}
                                </span>
                                {startup.verified && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700 shadow-sm">
                                        <CheckCircle2 className="w-3 h-3" />
                                        AI Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column: Main Content (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Video Pitch */}
                        <div className="aspect-video bg-black/5 rounded-2xl border border-border overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Play className="w-6 h-6 text-black ml-1 fill-black" />
                                </div>
                            </div>
                            <img
                                src={startup.videoUrl}
                                alt="Founder Pitch"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-border">
                            <div className="flex gap-6">
                                {["Overview", "Team", "Analysis", "Deck"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={cn(
                                            "pb-3 text-sm font-medium transition-all border-b-2",
                                            activeTab === tab.toLowerCase()
                                                ? "text-black border-black"
                                                : "text-muted-foreground border-transparent hover:text-foreground"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Narrative Content */}
                        <div className="space-y-8 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-8"
                                    >
                                        {/* AI Risk Analysis Section */}
                                        <section className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                                            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3 flex items-center gap-2">
                                                <AlertOctagon className="w-4 h-4" />
                                                Djisr AI Risk Analysis
                                            </h3>
                                            <p className="text-slate-700 text-sm leading-relaxed">
                                                {startup.riskAnalysis}
                                            </p>
                                            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-500">
                                                <span>Score: <span className="text-slate-900">{startup.riskScore}/100</span></span>
                                                <span>Confidence: <span className="text-slate-900">High</span></span>
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-semibold mb-3 text-black">The Problem</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {startup.problem}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-semibold mb-3 text-black">The Solution</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {startup.solution}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-xl font-semibold mb-3 text-black">Market Traction</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                {startup.marketTraction.map((item, idx) => (
                                                    <BentoCard key={idx} padding="md">
                                                        <div className="text-2xl font-bold">{item.value}</div>
                                                        <div className="text-xs text-muted-foreground uppercase font-medium">{item.label}</div>
                                                    </BentoCard>
                                                ))}
                                            </div>
                                        </section>
                                    </motion.div>
                                )}

                                {activeTab === "team" && (
                                    <motion.div
                                        key="team"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    >
                                        {startup.team?.map((member) => (
                                            <div key={member.name} className="flex gap-4 p-4 border border-border rounded-xl bg-white hover:shadow-md transition-shadow">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-16 h-16 rounded-full object-cover bg-slate-100"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-lg">{member.name}</h4>
                                                    <span className="text-xs font-medium text-black/60 uppercase tracking-wide">{member.role}</span>
                                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                        {member.bio}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeTab === "analysis" && (
                                    <motion.div
                                        key="analysis"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-6"
                                    >
                                        {/* Financial Summary */}
                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-center py-10">
                                            <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold text-slate-900">Financial Projections</h3>
                                            <p className="text-slate-500 max-w-sm mx-auto mt-2 text-sm">
                                                Detailed 5-year financial models, P&L statements, and growth projections are available in the Data Room.
                                            </p>
                                            <div className="mt-6 flex justify-center gap-3">
                                                <button className="px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                                                    <Download className="w-4 h-4 text-slate-400" />
                                                    Download Summary
                                                </button>
                                                <button className="px-4 py-2 bg-black text-white border border-black rounded-lg text-sm font-medium shadow-sm hover:bg-black/90 transition-colors">
                                                    Request Full Access
                                                </button>
                                            </div>
                                        </div>

                                        {/* Key Metrics */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <BentoCard padding="md">
                                                <div className="text-xs font-medium text-muted-foreground uppercase mb-2 tracking-wide">Monthly Burn</div>
                                                <div className="text-xl font-bold">450k DZD <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                                                <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-[40%] bg-red-400 rounded-full" />
                                                </div>
                                            </BentoCard>
                                            <BentoCard padding="md">
                                                <div className="text-xs font-medium text-muted-foreground uppercase mb-2 tracking-wide">Runway</div>
                                                <div className="text-xl font-bold">14 Months</div>
                                                <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-[65%] bg-green-500 rounded-full" />
                                                </div>
                                            </BentoCard>
                                        </div>

                                        {/* Cap Table Preview */}
                                        <div className="border border-border rounded-xl p-6">
                                            <h4 className="font-semibold mb-4 text-sm">Cap Table Composition</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Founders</span>
                                                    <span className="font-medium">65%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-slate-800 h-full rounded-full" style={{ width: '65%' }} />
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Investors</span>
                                                    <span className="font-medium">25%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-slate-400 h-full rounded-full" style={{ width: '25%' }} />
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">ESOP Pool</span>
                                                    <span className="font-medium">10%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-slate-200 h-full rounded-full" style={{ width: '10%' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "deck" && (
                                    <motion.div
                                        key="deck"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-6"
                                    >
                                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
                                            {/* Watermark for demo logic */}
                                            <div className="absolute top-2 left-6 opacity-20 text-[10px] font-bold uppercase tracking-widest text-purple-600">AI Generated Preview</div>

                                            {/* Page Number */}
                                            <div className="absolute top-6 right-6 font-mono text-xs text-muted-foreground bg-white border border-border px-2 py-1 rounded-md">
                                                {currentSlide + 1} / {startup.slides?.length || 0}
                                            </div>

                                            {startup.slides && startup.slides.length > 0 ? (
                                                <div className="w-full max-w-2xl px-6">
                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={currentSlide}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -20 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="space-y-6"
                                                        >
                                                            <h3 className="text-3xl font-bold tracking-tight text-foreground">
                                                                {startup.slides[currentSlide].title}
                                                            </h3>
                                                            <div className="w-16 h-1 bg-black mx-auto rounded-full opacity-10" />
                                                            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                                                "{startup.slides[currentSlide].bolt}"
                                                            </p>
                                                        </motion.div>
                                                    </AnimatePresence>

                                                    {/* Controls */}
                                                    <div className="flex items-center justify-center gap-4 mt-12">
                                                        <button
                                                            onClick={() => setCurrentSlide(prev => (prev === 0 ? startup.slides.length - 1 : prev - 1))}
                                                            className="p-3 rounded-full hover:bg-white hover:shadow-md border border-transparent hover:border-border transition-all"
                                                        >
                                                            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                                                        </button>

                                                        {/* Dots */}
                                                        <div className="flex gap-2">
                                                            {startup.slides.map((_, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => setCurrentSlide(idx)}
                                                                    className={cn(
                                                                        "w-2 h-2 rounded-full transition-all",
                                                                        idx === currentSlide ? "bg-black w-4" : "bg-slate-300 hover:bg-slate-400"
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>

                                                        <button
                                                            onClick={() => setCurrentSlide(prev => (prev === startup.slides.length - 1 ? 0 : prev + 1))}
                                                            className="p-3 rounded-full hover:bg-white hover:shadow-md border border-transparent hover:border-border transition-all"
                                                        >
                                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-muted-foreground">No slides available</div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar (1/3) */}
                    <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">

                        {/* Investment Card */}
                        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm space-y-6">
                            <div>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Raising</span>
                                <div className="text-3xl font-bold text-foreground mt-1">{startup.ask}</div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span>{startup.committed}% Committed</span>
                                    <span className="text-green-600">Active</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-black rounded-full" style={{ width: `${startup.committed}%` }} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                <div>
                                    <span className="block text-[10px] text-muted-foreground uppercase">Valuation</span>
                                    <span className="font-semibold text-sm">{startup.valuation}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-muted-foreground uppercase">
                                        {/* Dynamic Label based on mapped offerType */}
                                        {startup.offerType === 'ROYALTY' ? 'Royalty' : 'Equity'}
                                    </span>
                                    <span className="font-semibold text-sm">{startup.equity}</span>
                                </div>
                            </div>

                            <DjisrButton
                                size="lg"
                                onClick={() => setIsDealModalOpen(true)}
                                className="w-full bg-black hover:bg-black/90 text-white font-semibold"
                            >
                                Reserve Allocation
                            </DjisrButton>

                            <p className="text-[10px] text-center text-muted-foreground">
                                All investments are subject to risk. <a href="#" className="underline">Learn more</a>.
                            </p>
                        </div>

                        {/* Data Room Preview */}
                        <div className="bg-[#F9F9F9] rounded-2xl p-6 border border-transparent">
                            <h4 className="font-medium text-sm mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-muted-foreground" />
                                Data Room
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg border border-border/50 shadow-sm opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Pitch Deck.pdf</span>
                                    </div>
                                    <Shield className="w-3 h-3 text-muted-foreground" />
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg border border-border/50 shadow-sm opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Financials.xls</span>
                                    </div>
                                    <Shield className="w-3 h-3 text-muted-foreground" />
                                </div>
                                <div className="flex items-center justify-between text-sm p-3 bg-white rounded-lg border border-border/50 shadow-sm opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Legal Docs.zip</span>
                                    </div>
                                    <Shield className="w-3 h-3 text-muted-foreground" />
                                </div>
                            </div>
                            <button className="w-full mt-4 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg py-2 bg-white">
                                Request Access
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealRoom;
