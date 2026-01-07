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

const StartupDashboard = () => {
    const navigate = useNavigate();
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
                    <h1 className="text-2xl font-semibold tracking-tight">Good Morning, Alex.</h1>
                    <Dialog>
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
                                    <Input id="amount" placeholder="100,000 DZD" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="equity" className="text-right">
                                        Equity
                                    </Label>
                                    <Input id="equity" placeholder="5%" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="desc" className="text-right">
                                        Details
                                    </Label>
                                    <Textarea id="desc" placeholder="Brief description..." className="col-span-3" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <DjisrButton type="submit" size="sm" className="text-white">Post Offer</DjisrButton>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                {/* 2. Risk Pulse Widget */}
                <motion.div variants={itemVariants} className="col-span-1 min-h-[300px]">
                    <BentoCard className="h-full flex flex-col relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <BentoCardTitle>AI Risk Assessment</BentoCardTitle>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            {/* Gauge SVG */}
                            <div className="relative w-48 h-24 mb-4 transition-transform duration-500 group-hover:scale-105">
                                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                                    {/* Background Track */}
                                    <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="hsl(var(--muted))" strokeWidth="20" strokeLinecap="round" />
                                    {/* Fill (85%) */}
                                    <path
                                        d="M 10 100 A 90 90 0 0 1 190 100"
                                        fill="none"
                                        stroke="hsl(var(--djisr-green))"
                                        strokeWidth="20"
                                        strokeLinecap="round"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 - (283 * 0.85)} // 85% fill
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                                    <span className="text-4xl font-bold tracking-tighter tabular-nums block">85</span>
                                    <span className="text-xs uppercase text-muted-foreground font-medium">Trust Score</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Low Risk
                                </span>
                            </div>
                        </div>
                    </BentoCard>
                </motion.div>

                {/* 3. Traction Widget */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 lg:col-span-1 min-h-[300px]">
                    <BentoCard className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <BentoCardTitle>Investor Interest</BentoCardTitle>
                            <span className="text-micro text-muted-foreground">LAST 30 DAYS</span>
                        </div>

                        <div className="mt-auto">
                            <div className="mb-2">
                                <span className="text-4xl font-bold tracking-tighter tabular-nums">12</span>
                                <span className="text-sm text-muted-foreground ml-2">Active Views</span>
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

                {/* 4. Waiting List Widget (Vertical) */}
                <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2 min-h-[300px]">
                    <BentoCard className="h-full flex flex-col p-0 overflow-hidden">
                        <div className="p-6 pb-2">
                            <BentoCardTitle>Active Negotiations</BentoCardTitle>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {[
                                { name: "Sarah Chen", role: "Angel Investor", status: "Reviewing", initials: "SC" },
                                { name: "Apex Capital", role: "Venture Fund", status: "Offer Sent", initials: "AC" },
                                { name: "Global Ventures", role: "Corporate VC", status: "Reviewing", initials: "GV" },
                                { name: "Marcus Reid", role: "Angel Investor", status: "Meeting", initials: "MR" },
                            ].map((item, i) => (
                                <div key={i} className="group flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/40 last:border-0 cursor-pointer relative overflow-hidden">
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium border border-border">
                                            {item.initials}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 relative z-10">
                                        <span className={cn(
                                            "text-xs px-2 py-1 rounded-full border",
                                            item.status === "Offer Sent" ? "bg-foreground text-background border-foreground" : "bg-card text-muted-foreground border-border"
                                        )}>
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Slide in Action */}
                                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-background/80 backdrop-blur-sm flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-20">
                                        <button className="p-2 rounded-full hover:bg-muted">
                                            <MoveRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BentoCard>
                </motion.div>

                {/* 5. Quick Actions Grid */}
                <motion.div variants={itemVariants} className="col-span-1">
                    <Dialog>
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
                                    <Input placeholder="e.g. 50,000 DZD" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Burn Rate</Label>
                                    <Input placeholder="e.g. 20,000 DZD" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <DjisrButton size="sm" className="text-white">Save Updates</DjisrButton>
                            </div>
                        </DialogContent>
                    </Dialog>
                </motion.div>

                <motion.div variants={itemVariants} className="col-span-1">
                    <div className="h-full">
                        <BentoCard
                            className="flex flex-col items-center justify-center text-center gap-4 group cursor-pointer h-full"
                            hover
                            onClick={() => navigate("/pitch-studio")}
                        >
                            <div className="p-3 bg-muted rounded-full group-hover:-translate-y-1 transition-transform duration-300">
                                <Sparkles className="w-6 h-6 stroke-1" />
                            </div>
                            <span className="font-medium">Edit Pitch Deck</span>
                        </BentoCard>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default StartupDashboard;
