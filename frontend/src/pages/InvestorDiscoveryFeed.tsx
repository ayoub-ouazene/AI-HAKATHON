import { useState } from "react";
import { Link } from "react-router-dom";
import {
    LayoutGrid, CheckCircle2, ArrowRight, ChevronDown, AlertTriangle, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getDeals } from "@/lib/api";

// Types matching Backend Response
interface StartupInfo {
    companyName: string;
    logoUrl: string | null;
    description: string;
}

interface Deal {
    id: number;
    startupId: number;
    amountRequested: string;
    equityOffered: string;
    offerType: string;
    riskScore: number;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    isActive: boolean;
    createdAt: string;
    startup: StartupInfo;
}

const FILTER_CATEGORIES = ["All", "Fintech", "AgriTech", "SaaS", "Health", "EdTech", "Energy"];
const RISK_OPTIONS = ["All", "LOW", "MEDIUM", "HIGH"];

const InvestorDiscoveryFeed = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [riskFilter, setRiskFilter] = useState("All");
    const [isRiskMenuOpen, setIsRiskMenuOpen] = useState(false);

    // Fetch Deals
    const { data: deals = [], isLoading, error } = useQuery<Deal[]>({
        queryKey: ["deals"],
        queryFn: getDeals,
    });

    // Filter Logic
    const filteredDeals = deals.filter(deal => {
        // Note: Backend doesn't return 'sector' within the deal/startup object in the example provided,
        // so we might need to adjust filtering later. For now, we'll skip category filtering 
        // OR assume description contains keywords if strict matching isn't possible yet.
        // Let's assume 'All' for now to show all data.

        // Use riskLevel for risk filtering
        const matchesRisk = riskFilter === "All" || deal.riskLevel === riskFilter;
        return matchesRisk;
    });

    return (
        <div className="min-h-screen bg-background noise-overlay">

            {/* Sticky Header */}
            <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
                <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between gap-4">

                    {/* Center: Scrollable Filters (Visual only for now if sector missing) */}
                    <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-x flex items-center gap-2 px-2">
                        {FILTER_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap border",
                                    activeFilter === cat
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-muted-foreground border-border hover:border-black/20 hover:text-foreground"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Right: Risk Dropdown */}
                    <div className="hidden sm:flex items-center gap-3 min-w-fit pl-4 relative">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Risk Tolerance</span>
                        <div className="relative">
                            <button
                                onClick={() => setIsRiskMenuOpen(!isRiskMenuOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white text-sm font-medium hover:bg-muted/50 transition-colors w-32 justify-between"
                            >
                                {riskFilter === "All" ? "Any Risk" : `${riskFilter} Risk`}
                                <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform", isRiskMenuOpen && "rotate-180")} />
                            </button>

                            {isRiskMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsRiskMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-border rounded-lg shadow-lg z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        {RISK_OPTIONS.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setRiskFilter(option);
                                                    setIsRiskMenuOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors flex items-center justify-between",
                                                    riskFilter === option ? "text-black font-medium bg-muted/20" : "text-muted-foreground"
                                                )}
                                            >
                                                {option === "All" ? "Any" : option}
                                                {riskFilter === option && <CheckCircle2 className="w-3 h-3 text-black" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Feed */}
            <main className="mx-auto max-w-2xl p-6 sm:p-8">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                        <p className="mt-4 text-sm text-muted-foreground">Loading opportunities...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        Failed to load deals. Please try again later.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {filteredDeals.map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}

                        {/* Empty State */}
                        {filteredDeals.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/50">
                                <LayoutGrid className="w-16 h-16 stroke-1 mb-4" />
                                <p className="text-lg font-medium">No matching deals found</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

const DealCard = ({ deal }: { deal: Deal }) => {
    return (
        <div className="group relative w-full bg-white border border-[#E5E5E5] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 ease-out cursor-pointer overflow-hidden transform hover:-translate-y-2">

            {/* Top Badge: Risk & Verification */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                {/* Risk Badge */}
                <div className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-sm border rounded-full shadow-sm",
                    deal.riskLevel === "LOW" ? "bg-green-50/90 border-green-200 text-green-700" :
                        deal.riskLevel === "MEDIUM" ? "bg-yellow-50/90 border-yellow-200 text-yellow-700" :
                            "bg-red-50/90 border-red-200 text-red-700"
                )}>
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-[10px] font-bold tracking-wide uppercase">{deal.riskLevel} Risk</span>
                </div>
            </div>

            <div className="p-6 flex flex-col h-full gap-6">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-black text-white flex items-center justify-center font-bold text-lg overflow-hidden">
                        {/* Display Logo Only if it's a valid URL, otherwise Initial */}
                        {deal.startup.logoUrl ? (
                            // Simple check if it's a URL or base64. 
                            // If it's just a filename (backend upload), we might need a full URL here. 
                            // Assuming it might be a full URL for now or a Cloudinary path.
                            <img src={deal.startup.logoUrl} alt={deal.startup.companyName} className="w-full h-full object-cover" />
                        ) : (
                            deal.startup.companyName.charAt(0)
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-foreground leading-tight">{deal.startup.companyName}</h3>
                        <span className="text-xs text-muted-foreground">Tech • Algiers</span>
                    </div>
                </div>

                {/* Pitch */}
                <p className="text-sm text-[#555] leading-relaxed line-clamp-3">
                    {deal.startup.description}
                </p>

                <div className="mt-auto relative">
                    {/* Bottom Data Section - Fades out on hover */}
                    <div className="grid grid-cols-2 gap-4 transition-opacity duration-300 group-hover:opacity-0 delay-100">
                        <div>
                            <span className="block text-[10px] uppercase text-muted-foreground font-medium tracking-wide">Ask</span>
                            <span className="text-base font-bold text-foreground">${Number(deal.amountRequested).toLocaleString()}</span>
                        </div>
                        <div>
                            <span className="block text-[10px] uppercase text-muted-foreground font-medium tracking-wide">Equity</span>
                            <span className="text-base font-medium text-muted-foreground text-green-600">{deal.equityOffered}%</span>
                        </div>
                    </div>

                    {/* "View Deal Room" Button - Slides up on hover */}
                    <Link to={`/investor/deal-room/${deal.id}`} state={{ deal }} className="absolute inset-0 z-20">
                        <div className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                            <div className="w-full bg-black text-white px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg">
                                <span>View Deal Room</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default InvestorDiscoveryFeed;
