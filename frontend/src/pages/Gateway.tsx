import { motion } from "framer-motion";
import { ArrowRight, Lock, Activity, CheckCircle2, LayoutTemplate, Building2, TrendingUp, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DjisrButton } from "@/components/djisr/DjisrButton";
import mainLogo from "@/assets/DjisrUp-main-logo.png";

const Gateway = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-neutral-200 noise-overlay overflow-x-hidden">

            {/* Navigation / Header */}
            <nav className="fixed top-0 w-full z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={mainLogo} alt="Djisr Logo" className="h-8 w-auto" />
                    </div>
                    <div className="flex gap-6 text-sm text-neutral-500 font-medium">
                        <DjisrButton className="h-14 px-8 rounded-full text-lg bg-black text-white hover:bg-neutral-800 hover:scale-105 transition-all shadow-xl">
                            <Link to="/login" className="text-white hover:opacity-70 transition-opacity">Sign In</Link>

                        </DjisrButton>
                    </div>
                </div>
            </nav>

            {/* SECTION A: HERO */}
            <section className="relative pt-32 pb-32 flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-5xl mx-auto z-10"
                >
                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.95] mb-8 text-neutral-900">
                        The Operating System for <br />
                        <span className="text-neutral-400">Modern Venture Capital.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Connect verified startups with accredited investors. AI-powered due diligence, frictionless deal flow, and instant capital deployment.
                    </motion.p>

                    <motion.div variants={fadeInUp}>
                        <a href="#cta-block">
                            <DjisrButton className="h-14 px-8 rounded-full text-lg bg-black text-white hover:bg-neutral-800 hover:scale-105 transition-all shadow-xl">
                                Start Verification <ArrowRight className="ml-2 w-5 h-5" />
                            </DjisrButton>
                        </a>
                    </motion.div>
                </motion.div>

                {/* 3D Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, rotateX: 12, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, rotateX: 12, scale: 0.9, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="mt-20 w-full max-w-6xl relative z-0"
                    style={{ perspective: "1000px" }}
                >
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border border-neutral-200 bg-white ring-1 ring-black/5 transform rotate-x-12">
                        {/* Mock UI Header */}
                        <div className="h-12 border-b border-neutral-100 flex items-center px-4 gap-2 bg-neutral-50/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-neutral-300" />
                                <div className="w-3 h-3 rounded-full bg-neutral-300" />
                                <div className="w-3 h-3 rounded-full bg-neutral-300" />
                            </div>
                            <div className="w-full text-center">
                                <div className="w-32 h-2 bg-neutral-200 rounded-full mx-auto opacity-50" />
                            </div>
                        </div>

                        {/* Mock Dashboard Content Placeholders */}
                        <div className="p-6 grid grid-cols-12 gap-6 h-[500px] bg-white">
                            {/* Sidebar */}
                            <div className="col-span-2 space-y-4">
                                <div className="w-full h-8 bg-neutral-100 rounded-md" />
                                <div className="w-full h-8 bg-neutral-50 rounded-md" />
                                <div className="w-full h-8 bg-neutral-50 rounded-md" />
                            </div>

                            {/* Main Chart Area */}
                            <div className="col-span-10 grid grid-cols-3 gap-6">
                                <div className="col-span-3 h-64 bg-neutral-50 rounded-xl border border-neutral-100 p-4 relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-100/50 to-transparent" />
                                    <div className="w-1/3 h-4 bg-neutral-200 rounded mb-4" />
                                    {/* Chart line mock */}
                                    <svg className="w-full h-full absolute bottom-0 left-0 stroke-neutral-300" viewBox="0 0 100 40" preserveAspectRatio="none">
                                        <path d="M0 30 Q 10 25, 20 28 T 40 20 T 60 25 T 80 10 T 100 15" fill="none" strokeWidth="0.5" />
                                    </svg>
                                </div>
                                <div className="col-span-1 h-40 bg-neutral-50 rounded-xl border border-neutral-100 p-4">
                                    <div className="w-1/2 h-4 bg-neutral-200 rounded mb-2" />
                                    <div className="w-1/4 h-8 bg-neutral-900 rounded mt-4 opacity-10" />
                                </div>
                                <div className="col-span-1 h-40 bg-neutral-50 rounded-xl border border-neutral-100 p-4">
                                    <div className="w-1/2 h-4 bg-neutral-200 rounded mb-2" />
                                    <div className="w-1/4 h-8 bg-neutral-900 rounded mt-4 opacity-10" />
                                </div>
                                <div className="col-span-1 h-40 bg-neutral-50 rounded-xl border border-neutral-100 p-4">
                                    <div className="w-1/2 h-4 bg-neutral-200 rounded mb-2" />
                                    <div className="w-1/4 h-8 bg-neutral-900 rounded mt-4 opacity-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Glow Behind */}
                    <div className="absolute -inset-10 bg-gradient-to-t from-neutral-200/50 to-transparent blur-3xl -z-10 opacity-50" />
                </motion.div>
            </section>

            {/* SECTION B: TRUST TICKER */}
            <section className="w-full border-y border-neutral-100 py-10 overflow-hidden bg-white/50 backdrop-blur-sm relative">
                <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest border border-neutral-200 px-3 py-1 rounded-full bg-white">Trusted Ecosystem</span>
                    <span className="text-xs font-medium text-neutral-400">Powering Next-Gen Ventures</span>
                </div>

                <div className="relative w-full mask-linear-fade">
                    <div className="flex gap-16 items-center animate-scroll whitespace-nowrap w-max">
                        {/* Partners Data */}
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-16 items-center">
                                {/* Stripe - Purple */}
                                <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF]">
                                        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current"><path d="M14 18.5c0-1.5 1.5-2 3.5-2s3.5.5 3.5.5v-3s-1.5-.5-3.5-.5-5 1.5-5 5c0 4.5 6.5 4.5 6.5 7s-1.5 2.5-4 2.5-4-1-4-1v3.5s1.5.5 4 .5c4.5 0 6.5-2.5 6.5-6 0-5-6.5-5-6.5-7.5z" /></svg>
                                    </div>
                                    <span className="font-bold text-xl text-neutral-800">Stripe</span>
                                </div>

                                {/* YC - Orange */}
                                <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-[#F06529]/10 flex items-center justify-center text-[#F06529]">
                                        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current"><rect x="4" y="4" width="24" height="24" rx="4" /><path d="M11 10h2.5l2.5 5 2.5-5H21l-4 7v5h-2.5v-5z" fill="white" /></svg>
                                    </div>
                                    <span className="font-bold text-xl text-neutral-800 tracking-tighter">Y Combinator</span>
                                </div>

                                {/* Sequoia - Green */}
                                <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-[#00966C]/10 flex items-center justify-center text-[#00966C]">
                                        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current"><path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm-2 18h-2v-2h2v2zm4 0h-2v-2h2v2zm0-4h-6v-2h6v2zm0-4h-6v-2h6v2z" /></svg>
                                    </div>
                                    <span className="font-bold text-xl text-neutral-800 italic">Sequoia</span>
                                </div>

                                {/* SVB - Blue */}
                                <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-[#00A5F0]/10 flex items-center justify-center text-[#00A5F0]">
                                        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current"><path d="M6 16l10-10 10 10-10 10L6 16zm4 0l6 6 6-6-6-6-6 6z" /></svg>
                                    </div>
                                    <span className="font-bold text-xl text-neutral-800">Silicon Valley Bank</span>
                                </div>

                                {/* Techstars - Teal */}
                                <div className="group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-[#0EC8CE]/10 flex items-center justify-center text-[#0EC8CE]">
                                        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current"><circle cx="16" cy="16" r="10" /></svg>
                                    </div>
                                    <span className="font-bold text-xl font-mono text-neutral-800">Techstars</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION C: BENTO GRID */}
            <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-4">Built for Speed & Trust.</h2>
                    <p className="text-neutral-500">The infrastructure for the next generation of company building.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: AI Due Diligence (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="col-span-1 md:col-span-2 bg-white rounded-3xl border border-neutral-100 p-8 flex flex-col md:flex-row gap-8 items-center shadow-bento hover:shadow-bento-hover hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex-1 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center border border-neutral-100">
                                <Activity className="w-6 h-6 text-neutral-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900">Instant Verification.</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Stop chasing paper. Our AI validates CNRC documents, financial statements, and cap tables in seconds, not weeks.
                            </p>
                        </div>
                        <div className="flex-1 w-full bg-neutral-50 rounded-2xl h-48 relative overflow-hidden flex items-center justify-center border border-neutral-100">
                            {/* Animation Loop */}
                            <div className="w-32 h-40 bg-white shadow-sm border border-neutral-200 rounded-lg relative">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-green-500/10 to-transparent scan-line"></div>
                                <div className="absolute bottom-4 right-4 animate-in fade-in zoom-in duration-500 delay-1000">
                                    <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-200 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Deal Rooms (Vertical) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-1 md:col-span-1 row-span-2 bg-white rounded-3xl border border-neutral-100 p-8 flex flex-col justify-between shadow-bento hover:shadow-bento-hover hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="space-y-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center border border-neutral-100">
                                <LayoutTemplate className="w-6 h-6 text-neutral-700" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-900">Curated Deal Flow.</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Match with startups based on thesis, sector, and risk appetite. Receive AI-curated memos weekly.
                            </p>
                        </div>
                        <div className="w-full h-64 bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden relative p-4 flex flex-col gap-3">
                            {["Fintech Seed", "AI Series A", "SaaS Pre-Seed"].map((item, i) => (
                                <div key={i} className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-neutral-100" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-xs text-neutral-900">{item}</div>
                                        <div className="w-12 h-1.5 bg-neutral-100 rounded-full mt-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Card 3: Secure Rails (Square) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="col-span-1 md:col-span-2 bg-white rounded-3xl border border-neutral-100 p-8 flex items-center gap-8 shadow-bento hover:shadow-bento-hover hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="w-32 h-32 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100 shrink-0">
                            <Lock className="w-12 h-12 text-neutral-900 stroke-1" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Bank-Grade Security.</h3>
                            <p className="text-neutral-500 leading-relaxed max-w-md">
                                End-to-end encryption for all sensitive data. We use the same infrastructure as the world's leading financial institutions.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION D: CTA */}
            <section id="cta-block" className="py-32 px-6">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto bg-[#1A1A1A] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-8">Ready to bridge the gap?</h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/onboarding/startup">
                                <button className="h-14 px-8 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors w-full sm:w-auto min-w-[180px]">
                                    I'm a Founder
                                </button>
                            </Link>
                            <Link to="/onboarding/investor">
                                <button className="h-14 px-8 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto min-w-[180px]">
                                    I'm an Investor
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
                </motion.div>
            </section>

            {/* SECTION E: FOOTER */}
            <footer className="bg-[#FAFAFA] border-t border-neutral-100 py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img src={mainLogo} alt="Djisr Logo" className="h-8 w-auto" />
                        </div>
                        <p className="text-neutral-500 text-sm">
                            Connecting visionaries with capital. The operating system for modern venture in Algeria.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-black">For Founders</a></li>
                            <li><a href="#" className="hover:text-black">For Investors</a></li>
                            <li><a href="#" className="hover:text-black">Pricing</a></li>
                            <li><a href="#" className="hover:text-black">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-black">About Us</a></li>
                            <li><a href="#" className="hover:text-black">Careers</a></li>
                            <li><a href="#" className="hover:text-black">Blog</a></li>
                            <li><a href="#" className="hover:text-black">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-black">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-black">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-100 text-center text-xs text-neutral-400">
                    © 2026 Djisr Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Gateway;
