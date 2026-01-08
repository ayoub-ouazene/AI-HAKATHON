import { motion } from "framer-motion";
import { Plus, FileText, Sparkles, MoveRight } from "lucide-react";
import { BentoCard, BentoCardTitle } from "@/components/djisr/BentoCard";
import { cn } from "@/lib/utils";
import { DjisrButton } from "@/components/djisr/DjisrButton";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState, useEffect } from "react";
import { createFundingRequest, getStartupDashboard, respondToInvestmentOffer, addFinancialRecord } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, Check, X, Shield, Users, Calendar, Target, Building2 } from "lucide-react";

interface OfferForm {
    amount: string;
    equity: string;
    description: string;
}

const StartupDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [dashboardData, setDashboardData] = useState<any>(null); // Type this properly if possible
    const [formData, setFormData] = useState<OfferForm>({
        amount: "",
        equity: "",
        description: ""
    });
    const [financialsForm, setFinancialsForm] = useState({
        revenue: "",
        costs: "",
        month: new Date().toISOString().split('T')[0]
    });
    const [financialsOpen, setFinancialsOpen] = useState(false);
    const [welcomeOpen, setWelcomeOpen] = useState(false);

    useEffect(() => {
        // Only show if user is a startup and hasn't seen welcome or generated slides
        const hasSeenWelcome = localStorage.getItem("has_seen_pitch_welcome");
        const hasSlides = localStorage.getItem("pitch_deck_slides");

        if (!hasSeenWelcome && !hasSlides) {
            setWelcomeOpen(true);
            localStorage.setItem("has_seen_pitch_welcome", "true");
        }
    }, []);

    // Fetch Dashboard Data
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getStartupDashboard();
                setDashboardData(data);
            } catch (err) {
                console.error(err);
                // toast.error("Failed to load dashboard data");
            }
        };
        fetchDashboard();
    }, []);

    const handleOfferResponse = async (offerId: number, status: 'ACCEPTED' | 'REJECTED') => {
        try {
            await respondToInvestmentOffer(offerId, status);
            toast.success(`Offer ${status.toLowerCase()}!`);
            // Refresh data
            const data = await getStartupDashboard();
            setDashboardData(data);
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const handleUpdateFinancials = async () => {
        if (!financialsForm.revenue || !financialsForm.costs) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await addFinancialRecord({
                month: financialsForm.month,
                revenue: parseFloat(financialsForm.revenue),
                costs: parseFloat(financialsForm.costs)
            });
            toast.success("Financials updated successfully!");
            setFinancialsOpen(false);
            setFinancialsForm({ revenue: "", costs: "", month: new Date().toISOString().split('T')[0] });
            // Refresh
            const data = await getStartupDashboard();
            setDashboardData(data);
        } catch (error) {
            toast.error("Failed to update financials");
        } finally {
            setLoading(false);
        }
    };

    const handlePostOffer = async () => {
        if (!formData.amount || !formData.equity) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await createFundingRequest({
                amountRequested: parseFloat(formData.amount),
                equityOffered: parseFloat(formData.equity),
                offerType: "EQUITY"
            });
            toast.success("Offer posted successfully!");
            setOpen(false);
            setFormData({ amount: "", equity: "", description: "" });
        } catch (error) {
            console.error(error);
            toast.error("Failed to post offer");
        } finally {
            setLoading(false);
        }
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-background noise-overlay p-6 sm:p-12">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {/* 1. Header Section */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-between mb-2">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Good Morning, {dashboardData?.founderName || "Founder"}.
                        </h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                            <Building2 className="w-3.5 h-3.5" />
                            {dashboardData?.companyName || "Your Startup"} • {dashboardData?.sector || "Tech"}
                        </p>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button className="bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Post New Offer
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Post New Offer</DialogTitle>
                                <DialogDescription>
                                    Create a new investment opportunity for investors.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amount" className="text-right">
                                        Amount
                                    </Label>
                                    <Input
                                        id="amount"
                                        placeholder="100000"
                                        type="number"
                                        className="col-span-3"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="equity" className="text-right">
                                        Equity (%)
                                    </Label>
                                    <Input
                                        id="equity"
                                        placeholder="5"
                                        type="number"
                                        step="0.1"
                                        className="col-span-3"
                                        value={formData.equity}
                                        onChange={(e) => setFormData({ ...formData, equity: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="desc" className="text-right">
                                        Details
                                    </Label>
                                    <Textarea
                                        id="desc"
                                        placeholder="Brief description..."
                                        className="col-span-3"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <DjisrButton
                                    onClick={handlePostOffer}
                                    disabled={loading}
                                    size="sm"
                                    className="text-white"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Post Offer
                                </DjisrButton>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                {/* 2. Active Asks Widget */}
                <motion.div variants={itemVariants} className="col-span-1 min-h-[300px]">
                    <BentoCard className="h-full flex flex-col p-0 overflow-hidden">
                        <div className="p-6 pb-2">
                            <BentoCardTitle>Active Asks</BentoCardTitle>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {dashboardData?.fundingRequests?.map((req: any) => (
                                <div key={req.id} className="p-4 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm font-semibold tracking-tight">
                                            {Number(req.amountRequested).toLocaleString()} DZD
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-djisr-green/10 text-djisr-green uppercase font-bold border border-djisr-green/20">
                                            {req.offerType}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Offering {req.equityOffered}% Equity
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-djisr-green animate-pulse" />
                                        <span className="text-[10px] text-muted-foreground uppercase font-medium">Live</span>
                                    </div>
                                </div>
                            ))}
                            {(!dashboardData?.fundingRequests || dashboardData.fundingRequests.length === 0) && (
                                <div className="p-8 text-center text-xs text-muted-foreground">
                                    No active funding requests.
                                </div>
                            )}
                        </div>
                    </BentoCard>
                </motion.div>
                {/* 3. Traction Widget */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 min-h-[300px]">
                    <BentoCard className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <BentoCardTitle>Investor Interest</BentoCardTitle>
                            <span className="text-micro text-muted-foreground uppercase tracking-widest">Global</span>
                        </div>

                        <div className="mt-auto">
                            <div className="mb-2">
                                <span className="text-4xl font-bold tracking-tighter tabular-nums">
                                    {dashboardData?.fundingRequests?.reduce((acc: number, req: any) => acc + (req.waitingList?.length || 0), 0) || 0}
                                </span>
                                <span className="text-sm text-muted-foreground ml-2">Total Offers</span>
                            </div>

                            {/* Sparkline SVG */}
                            <div className="h-24 w-full relative">
                                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0 25 C10 25, 10 20, 20 18 S 30 22, 40 15 S 50 10, 60 12 S 70 5, 80 8 S 90 2, 100 5 V 30 H 0 Z"
                                        fill="url(#gradient)"
                                        className="text-foreground"
                                    />
                                    <path
                                        d="M0 25 C10 25, 10 20, 20 18 S 30 22, 40 15 S 50 10, 60 12 S 70 5, 80 8 S 90 2, 100 5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        className="text-foreground"
                                    />
                                </svg>
                            </div>
                        </div>
                    </BentoCard>
                </motion.div>

                {/* New Card: Company Snapshot */}
                <motion.div variants={itemVariants} className="col-span-1">
                    <BentoCard className="h-full flex flex-col">
                        <BentoCardTitle className="mb-6">Company Snapshot</BentoCardTitle>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="w-4 h-4" />
                                    <span>Founders</span>
                                </div>
                                <span className="font-medium text-sm">{dashboardData?.numFounders || 1} {dashboardData?.hasTechnicalFounder ? "(+Tech)" : ""}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>Exp. Years</span>
                                </div>
                                <span className="font-medium text-sm">{dashboardData?.experienceYears || 0}y</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Target className="w-4 h-4" />
                                    <span>Monthly Users</span>
                                </div>
                                <span className="font-medium text-sm">{dashboardData?.monthlyUsers?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Shield className="w-4 h-4" />
                                    <span>Verification</span>
                                </div>
                                <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded-full border uppercase font-bold",
                                    dashboardData?.isVerified ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                )}>
                                    {dashboardData?.isVerified ? "Verified" : "Pending"}
                                </span>
                            </div>
                        </div>
                    </BentoCard>
                </motion.div>

                {/* 4. Waiting List Widget (Vertical) */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2 min-h-[300px]">
                    <BentoCard className="h-full flex flex-col p-0 overflow-hidden">
                        <div className="p-6 pb-2">
                            <BentoCardTitle>Active Offers</BentoCardTitle>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {/* Flatten all offers from all funding requests */}
                            {dashboardData?.fundingRequests?.flatMap((req: any) =>
                                req.waitingList.map((offer: any) => ({
                                    ...offer,
                                    dealAmount: req.amountRequested, // Context from request
                                }))
                            ).map((offer: any) => (
                                <div key={offer.id} className="group flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/40 last:border-0 relative">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                                            {offer.investor?.fullName?.substring(0, 2).toUpperCase() || "IV"}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{offer.investor?.fullName || "Investor"}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Proposed: {offer.proposedAmount.toLocaleString()} DZD for {offer.proposedEquity}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {offer.status === 'PENDING' || offer.status === 'COUNTER_OFFER' ? (
                                            <>
                                                <button
                                                    onClick={() => handleOfferResponse(offer.id, 'ACCEPTED')}
                                                    className="p-2 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                                                    title="Accept Offer"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleOfferResponse(offer.id, 'REJECTED')}
                                                    className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                                                    title="Reject Offer"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <span className={cn(
                                                "text-xs px-2 py-1 rounded-full border font-medium",
                                                offer.status === 'ACCEPTED' ? "bg-green-100 text-green-800 border-green-200" :
                                                    offer.status === 'REJECTED' ? "bg-red-50 text-red-600 border-red-100" :
                                                        "bg-muted text-muted-foreground"
                                            )}>
                                                {offer.status}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {(dashboardData?.fundingRequests?.every((req: any) => req.waitingList?.length === 0)) && (
                                <div className="p-6 text-center text-muted-foreground text-sm">
                                    No offers received yet. Your asks are live!
                                </div>
                            )}
                        </div>
                    </BentoCard>
                </motion.div>

                {/* 5. Quick Actions Grid */}
                <motion.div variants={itemVariants} className="col-span-1">
                    <Dialog open={financialsOpen} onOpenChange={setFinancialsOpen}>
                        <DialogTrigger asChild>
                            <div className="h-full">
                                <BentoCard className="flex flex-col items-center justify-center text-center gap-4 group cursor-pointer h-full" hover>
                                    <div className="p-3 bg-muted rounded-full group-hover:-translate-y-1 transition-transform duration-300">
                                        <FileText className="w-6 h-6 stroke-1" />
                                    </div>
                                    <span className="font-medium">Update Financials</span>
                                </BentoCard>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Financials</DialogTitle>
                                <DialogDescription>Update your key metrics for investors.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Monthly Revenue (MRR)</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 50000"
                                        value={financialsForm.revenue}
                                        onChange={(e) => setFinancialsForm({ ...financialsForm, revenue: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Monthly Costs (Burn Rate)</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 20000"
                                        value={financialsForm.costs}
                                        onChange={(e) => setFinancialsForm({ ...financialsForm, costs: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Month</Label>
                                    <Input
                                        type="date"
                                        value={financialsForm.month}
                                        onChange={(e) => setFinancialsForm({ ...financialsForm, month: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <DjisrButton
                                    onClick={handleUpdateFinancials}
                                    disabled={loading}
                                    size="sm"
                                    className="text-white"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                    Save Updates
                                </DjisrButton>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                <motion.div variants={itemVariants} className="col-span-1">
                    <div className="h-full">
                        <BentoCard
                            className={cn(
                                "flex flex-col items-center justify-center text-center gap-4 group cursor-pointer h-full relative overflow-hidden",
                                !localStorage.getItem("pitch_deck_slides") && "border-purple-500/50 bg-purple-500/5"
                            )}
                            hover
                            onClick={() => navigate("/startup/pitch")}
                        >
                            {!localStorage.getItem("pitch_deck_slides") && (
                                <div className="absolute top-3 right-3">
                                    <span className="flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                    </span>
                                </div>
                            )}
                            <div className="p-3 bg-muted rounded-full group-hover:-translate-y-1 transition-transform duration-300">
                                <Sparkles className={cn("w-6 h-6 stroke-1", !localStorage.getItem("pitch_deck_slides") && "text-purple-500")} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-medium">
                                    {!localStorage.getItem("pitch_deck_slides") ? "Generate AI Pitch Deck" : "Edit Pitch Deck"}
                                </span>
                                {!localStorage.getItem("pitch_deck_slides") && (
                                    <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider mt-1">Ready to build</span>
                                )}
                            </div>
                        </BentoCard>
                    </div>
                </motion.div>

            </motion.div>

            {/* Welcome Onboarding Dialog */}
            <Dialog open={welcomeOpen} onOpenChange={setWelcomeOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white border-0 shadow-2xl">
                    <div className="relative h-48 bg-foreground flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute h-px bg-white w-full"
                                    style={{ top: `${i * 20}%` }}
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                                />
                            ))}
                        </div>
                        <Sparkles className="w-16 h-16 text-white relative z-10 animate-pulse" />
                    </div>
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome to your Mission Control.</h2>
                        <p className="text-muted-foreground mb-8">
                            We've analyzed your profile. Ready to generate your first AI-powered pitch deck?
                        </p>
                        <div className="flex flex-col gap-3">
                            <DjisrButton
                                size="lg"
                                className="w-full text-white bg-purple-600 hover:bg-purple-700"
                                onClick={() => {
                                    setWelcomeOpen(false);
                                    navigate("/startup/pitch");
                                }}
                            >
                                Generate My First Deck
                            </DjisrButton>
                            <button
                                onClick={() => setWelcomeOpen(false)}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                            >
                                I'll do it later
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default StartupDashboard;
