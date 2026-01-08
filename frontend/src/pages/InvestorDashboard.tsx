
import { Link } from "react-router-dom";
import { TrendingUp, PieChart, ArrowRight, DollarSign, Wallet, Clock, Loader2 } from "lucide-react";
import { BentoCard } from "@/components/djisr/BentoCard";
import { getInvestorPortfolio } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ActiveInvestment {
    id: string;
    startup_name: string;
    logo_text: string;
    logo_url: string | null;
    one_liner: string;
    status: 'live';
    invested_date: string;
    my_stake_amount: number;
    ownership_percentage: number;
    current_valuation: string;
}

interface PendingOffer {
    id: string;
    startup_name: string;
    logo_text: string;
    logo_url: string | null;
    one_liner: string;
    status: 'pending' | 'negotiating';
    offer_date: string;
    offer_amount: number;
    equity_asked: number;
    implied_valuation: string;
    expiration_date: string;
}

interface DashboardResponse {
    investor_profile: {
        first_name: string;
        total_deployed: number;
    };
    kpi_metrics: {
        pending_offers_count: number;
        active_deals_count: number;
    };
    active_investments: ActiveInvestment[];
    pending_offers: PendingOffer[];
}

const InvestorDashboard = () => {
    const [data, setData] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getInvestorPortfolio();
                console.log("🔥 Full Backend Response:", response);
                setData(response);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load portfolio data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="p-8 space-y-8 font-sans animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex justify-between items-end border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
                    <p className="text-muted-foreground mt-1">Welcome back, {data.investor_profile.first_name}.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Deployed</p>
                    <p className="text-2xl font-bold font-mono">
                        {data.investor_profile.total_deployed.toLocaleString()} DZD
                    </p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <BentoCard padding="lg">
                    <div className="space-y-2">
                        <PieChart className="w-6 h-6 text-black" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Active Deals</h3>
                        <p className="text-4xl font-bold tabular-nums">{data.kpi_metrics.active_deals_count}</p>
                    </div>
                </BentoCard>
                <BentoCard padding="lg">
                    <div className="space-y-2">
                        <Clock className="w-6 h-6 text-black" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Pending Offers</h3>
                        <p className="text-4xl font-bold tabular-nums">{data.kpi_metrics.pending_offers_count}</p>
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
                    {data.active_investments.map(startup => (
                        <Link key={startup.id} to={`/investor/deal-room/${startup.id.replace('deal_', '')}`}>
                            <div className="group bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold overflow-hidden">
                                            {startup.logo_url ? (
                                                <img src={startup.logo_url} alt="" className="w-full h-full object-cover" />
                                            ) : startup.logo_text}
                                        </div>
                                        <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-full border border-green-200">
                                            Live
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{startup.startup_name}</h3>
                                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{startup.one_liner}</p>
                                </div>

                                <div className="space-y-2 pt-4 border-t border-border">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">My Stake</span>
                                        <span className="font-semibold">{startup.my_stake_amount.toLocaleString()} DZD</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Equity</span>
                                        <span className="font-semibold">{startup.ownership_percentage}%</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Current Val</span>
                                        <span className="font-semibold">{startup.current_valuation} DZD</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Add New Placeholder */}
                    <Link to="/investor/feed" className="border border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all">
                            <DollarSign className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">Invest in Next Unicorn</span>
                    </Link>
                </div>
            </div>

            {/* Pending Offers (Same Style) */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Pending Offers</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.pending_offers.length === 0 ? (
                        <div className="col-span-full py-12 text-center border border-dashed rounded-xl bg-muted/20">
                            <p className="text-muted-foreground">No pending offers.</p>
                            <Link to="/investor/feed" className="text-sm font-medium text-black mt-2 inline-block hover:underline">
                                Browse Deals
                            </Link>
                        </div>
                    ) : (
                        data.pending_offers.map(offer => (
                            <Link key={offer.id} to={`/investor/deal-room/${offer.id.replace('offer_', '')}`}>
                                <div className="group bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 bg-slate-100 text-black rounded-lg flex items-center justify-center font-bold overflow-hidden border">
                                                {offer.logo_url ? (
                                                    <img src={offer.logo_url} alt="" className="w-full h-full object-cover" />
                                                ) : offer.logo_text}
                                            </div>
                                            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full border ${offer.status === 'negotiating'
                                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                                : "bg-slate-100 text-slate-600 border-slate-200"
                                                }`}>
                                                {offer.status}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-1">{offer.startup_name}</h3>
                                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{offer.one_liner}</p>
                                    </div>

                                    <div className="space-y-2 pt-4 border-t border-border">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Offer Amount</span>
                                            <span className="font-semibold">{offer.offer_amount.toLocaleString()} DZD</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Equity Asked</span>
                                            <span className="font-semibold">{offer.equity_asked}%</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Implied Val</span>
                                            <span className="font-semibold">{offer.implied_valuation} DZD</span>
                                        </div>
                                        <div className="flex justify-between text-xs pt-1">
                                            <span className="text-muted-foreground text-[10px]">Expires</span>
                                            <span className="text-[10px] text-red-500">{offer.expiration_date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}


                </div>
            </div>
        </div>
    );
};

export default InvestorDashboard;
