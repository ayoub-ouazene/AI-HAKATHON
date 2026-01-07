import { Link } from "react-router-dom";
import { TrendingUp, PieChart, ArrowRight, DollarSign, Wallet } from "lucide-react";
import { BentoCard } from "@/components/djisr/BentoCard";
import { STARTUPS } from "@/data/startups";

const InvestorDashboard = () => {
    // Mock user's portfolio data
    const activeInvestments = STARTUPS.slice(0, 2);

    return (
        <div className="p-8 space-y-8 font-sans animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex justify-between items-end border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
                    <p className="text-muted-foreground mt-1">Welcome back, Amine.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Deployed</p>
                    <p className="text-2xl font-bold font-mono">15,750,000 DZD</p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BentoCard padding="lg" className="bg-black text-white">
                    <div className="space-y-2">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        <h3 className="text-sm font-medium opacity-80 uppercase tracking-wide">Unrealized IRR</h3>
                        <p className="text-4xl font-bold tabular-nums">22.4%</p>
                    </div>
                </BentoCard>
                <BentoCard padding="lg">
                    <div className="space-y-2">
                        <PieChart className="w-6 h-6 text-black" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Active Deals</h3>
                        <p className="text-4xl font-bold tabular-nums">4</p>
                    </div>
                </BentoCard>
                <BentoCard padding="lg">
                    <div className="space-y-2">
                        <Wallet className="w-6 h-6 text-black" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Escrow Balance</h3>
                        <p className="text-4xl font-bold tabular-nums">2.5M <span className="text-base text-muted-foreground font-medium">DZD</span></p>
                    </div>
                </BentoCard>
            </div>

            {/* Active Investments */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Active Allocations</h2>
                    <Link to="/investor/feed" className="text-sm font-medium flex items-center gap-2 hover:underline">
                        Find New Deals <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeInvestments.map(startup => (
                        <Link key={startup.id} to={`/investor/deal-room/${startup.id}`}>
                            <div className="group bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                                        {startup.logo}
                                    </div>
                                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-full border border-green-200">
                                        Live
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-1">{startup.name}</h3>
                                <p className="text-xs text-muted-foreground mb-4 line-clamp-1">{startup.oneLiner}</p>

                                <div className="space-y-2 pt-4 border-t border-border">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">My Stake</span>
                                        <span className="font-semibold">2,000,000 DZD</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Valuation</span>
                                        <span className="font-semibold">{startup.valuation}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Placeholder for "Add New" */}
                    <Link to="/investor/feed" className="border border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Invest in Next Unicorn</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InvestorDashboard;
