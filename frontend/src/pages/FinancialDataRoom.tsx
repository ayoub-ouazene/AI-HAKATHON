import { FileText, Lock, Shield, ArrowUpRight, DollarSign, Download, UploadCloud } from "lucide-react";
import { DjisrButton } from "@/components/djisr/DjisrButton";
import { BentoCard } from "@/components/djisr/BentoCard";

const FinancialDataRoom = () => {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Financial Vault</h1>
                    <p className="text-muted-foreground mt-1">Securely share sensitive financial data with authorized investors.</p>
                </div>
                <DjisrButton className="text-white">
                    <UploadCloud className="w-4 h-4 mr-2 text-white" />
                    Upload Document
                </DjisrButton>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BentoCard padding="lg">
                    <div className="space-y-2">
                        <Lock className="w-6 h-6 text-black" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Access Requests</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-4xl font-bold tabular-nums">12</p>
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">+3 today</span>
                        </div>
                    </div>
                </BentoCard>
                <BentoCard padding="lg">
                    <div className="space-y-2">
                        <Shield className="w-6 h-6 text-black" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Security Level</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold">End-to-End</p>
                            <span className="text-xs text-muted-foreground">Encryption Active</span>
                        </div>
                    </div>
                </BentoCard>
            </div>

            {/* File List */}
            <div className="bg-white border boundary rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b boundary bg-slate-50 flex justify-between items-center">
                    <h3 className="font-semibold text-sm">Protected Documents</h3>
                    <span className="text-xs text-muted-foreground">Last updated 2 hours ago</span>
                </div>
                <div className="divide-y boundary">
                    {[
                        { name: "Q4 2025 Financial Reporting.pdf", size: "2.4 MB", access: "Restricted" },
                        { name: "Series A Term Sheet Draft.pdf", size: "1.1 MB", access: "Private" },
                        { name: "2026 Revenue Projections.xlsx", size: "850 KB", access: "Restricted" },
                        { name: "Cap Table Export.csv", size: "120 KB", access: "Private" },
                    ].map((file, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-200 transition-all">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-foreground">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{file.size} • {file.access}</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400 hover:text-black">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinancialDataRoom;
