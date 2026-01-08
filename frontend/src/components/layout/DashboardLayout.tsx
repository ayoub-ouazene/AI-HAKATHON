import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Mic2, LineChart,
    Search, Briefcase, LogOut, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import mainLogo from "@/assets/DjisrUp-main-logo.png";

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, userName } = useUser();
    const isStartupContext = location.pathname.startsWith("/startup");

    const STARTUP_LINKS = [
        { name: "Mission Control", path: "/startup/dashboard", icon: LayoutDashboard },
        { name: "Pitch Studio", path: "/startup/pitch", icon: Mic2 },
        { name: "Financial Vault", path: "/startup/financials", icon: LineChart },
    ];

    const INVESTOR_LINKS = [
        { name: "Portfolio", path: "/investor/dashboard", icon: Briefcase },
        { name: "Discovery Feed", path: "/investor/feed", icon: Search },
    ];

    const links = isStartupContext ? STARTUP_LINKS : INVESTOR_LINKS;

    return (
        <div className="flex min-h-screen bg-[#F9F9F9] font-sans text-foreground">

            {/* Sidebar */}
            <aside className="w-[240px] bg-[#F9F9F9] border-r border-[#E5E5E5] flex flex-col fixed inset-y-0 left-0 z-50">

                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-transparent">
                    <img src={mainLogo} alt="Djisr Logo" className="h-7 w-auto" />
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    <div className="px-2 mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {isStartupContext ? "Founder Workspace" : "Investor Suite"}
                        </span>
                    </div>

                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-white text-black shadow-sm border border-[#E5E5E5]"
                                        : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                                )}
                            >
                                <link.icon className={cn("w-4 h-4", isActive ? "text-black" : "text-muted-foreground")} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer User Profile */}
                <div className="p-4 border-t border-[#E5E5E5]">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                            {userName ? userName.substring(0, 2).toUpperCase() : (isStartupContext ? "AF" : "AI")}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">
                                {userName || (isStartupContext ? "AgriFlow Inc." : "Amine I.")}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                                {isStartupContext ? "Foundation Plan" : "Accredited"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-[240px] relative bg-white min-h-screen">
                <div key={location.pathname} className="animate-in fade-in duration-300 min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
