import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle2, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { DjisrButton } from "./DjisrButton";
import { createInvestmentOffer } from "@/lib/api";
import { toast } from "sonner";

interface DealNegotiationModalProps {
    isOpen: boolean;
    onClose: () => void;
    startupName: string;
    dealId: number;
}

export const DealNegotiationModal = ({ isOpen, onClose, startupName, dealId }: DealNegotiationModalProps) => {
    const [amount, setAmount] = useState<string>("");
    const [equity, setEquity] = useState<number>(5.0);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Derived State: Valuation
    const numericAmount = parseFloat(amount.replace(/\s/g, "")) || 0;
    const valuation = numericAmount && equity > 0 ? (numericAmount / (equity / 100)) : 0;

    const formattedValuation = new Intl.NumberFormat('fr-DZ', {
        style: 'currency',
        currency: 'DZD',
        maximumFractionDigits: 0
    }).format(valuation);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        setAmount(new Intl.NumberFormat('fr-DZ').format(parseInt(val || "0")));
    };

    const handleExecute = async () => {
        setIsLoading(true);
        try {
            await createInvestmentOffer({
                fundingRequestId: dealId,
                proposedAmount: numericAmount,
                proposedEquity: equity
            });

            setIsSuccess(true);
            toast.success("Investment offer sent successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send offer. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Reset on reopen
    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
            setAmount("");
            setEquity(5.0);
            setPaymentMethod(null);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>

                            {!isSuccess ? (
                                <div className="p-8 space-y-8">

                                    {/* Header */}
                                    <div className="text-center space-y-1">
                                        <h2 className="text-xl font-semibold tracking-tight">New Offer for {startupName}</h2>
                                        <p className="text-sm text-slate-500 font-medium">Binding Term Sheet Proposal</p>
                                    </div>

                                    {/* Section A: Terms Engine */}
                                    <div className="space-y-8">

                                        {/* Input 1: Investment Amount */}
                                        <div className="space-y-2 text-center">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Investment Amount</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={amount}
                                                    onChange={handleAmountChange}
                                                    placeholder="0"
                                                    className="w-full text-center text-5xl font-bold bg-transparent border-none focus:ring-0 p-0 placeholder:text-slate-200 tabular-nums"
                                                />
                                                <span className="block text-sm font-medium text-slate-400 mt-2">DZD</span>
                                            </div>
                                        </div>

                                        {/* Input 2: Equity Slider */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Equity Request</label>
                                                <div className="px-3 py-1 bg-slate-100 rounded-lg text-lg font-bold tabular-nums border border-slate-200">
                                                    {equity.toFixed(1)}%
                                                </div>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="100"
                                                step="0.1"
                                                value={equity}
                                                onChange={(e) => setEquity(parseFloat(e.target.value))}
                                                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-black"
                                            />
                                        </div>

                                        {/* Smart Feedback */}
                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Implied Post-Money Valuation</p>
                                            <p className="text-lg font-bold text-slate-900 tabular-nums">{formattedValuation}</p>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-100 border-t border-dashed border-slate-200" />

                                    {/* Section B: Payment Method */}
                                    <div className="space-y-4">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Commitment Method</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            {["CIB", "Edahabia"].map((method) => (
                                                <button
                                                    key={method}
                                                    onClick={() => setPaymentMethod(method)}
                                                    className={cn(
                                                        "flex items-center gap-3 p-3 rounded-xl border-2 transition-all",
                                                        paymentMethod === method
                                                            ? "border-black bg-slate-50"
                                                            : "border-slate-100 hover:border-slate-200 bg-white"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center",
                                                        paymentMethod === method ? "border-black bg-black text-white" : "border-slate-300"
                                                    )}>
                                                        {paymentMethod === method && <CheckCircle2 className="w-3 h-3" />}
                                                    </div>
                                                    <span className="font-semibold text-sm">{method}</span>
                                                    <CreditCard className="w-4 h-4 text-slate-400 ml-auto" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section C: Signature Action */}
                                    <DjisrButton
                                        size="lg"
                                        onClick={handleExecute}
                                        disabled={!numericAmount || !paymentMethod || isLoading}
                                        className="w-full h-16 text-lg bg-black hover:bg-black/90 text-white rounded-xl shadow-xl shadow-black/10 flex items-center justify-between px-8 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <span>{isLoading ? "Processing..." : `Sign & Transfer ${amount || "0"} DZD`}</span>
                                        {!isLoading && <Lock className="w-5 h-5 opacity-70" />}
                                    </DjisrButton>

                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[500px]"
                                >
                                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        >
                                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                                        </motion.div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Offer Sent</h2>
                                        <p className="text-slate-500 font-medium">Funds have been escrowed successfully.</p>
                                    </div>
                                    <div className="pt-8">
                                        <button onClick={onClose} className="text-sm font-semibold hover:underline">
                                            Return to Deal Room
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
