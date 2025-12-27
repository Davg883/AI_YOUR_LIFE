import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cpu, Archive, ArrowRight, Activity } from 'lucide-react';

export const Home: React.FC = () => {
    return (
        <main className="min-h-screen bg-stone-950 text-stone-100 selection:bg-rose-500/30">

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://res.cloudinary.com/dptqxjhb8/image/upload/v1766691940/orangery_fnhmne.png')" }}
                />

                {/* Dimming Layer */}
                <div className="absolute inset-0 z-10 bg-stone-950/40" />

                <div className="relative z-20">
                    {/* Micro-Copy Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-stone-950/60 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-stone-300">
                            ZERO ADS • ZERO TRACKING • 100% SOVEREIGN
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8 animate-fade-in drop-shadow-lg">
                        <span className="text-white drop-shadow-md">The Sanctuary</span>
                        <br />
                        <span className="text-stone-200 drop-shadow-md">in the Machine.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-mono mb-12 leading-relaxed drop-shadow-md">
                        Digital tools for analogue living. We use Sovereign AI to automate the noise so you can return to the signal.
                    </p>

                    {/* Primary CTA: Run System Diagnostic */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/quiz">
                            <button className="group relative px-10 py-5 bg-[#e0b9a6] text-black font-bold tracking-wide text-lg rounded-xl hover:bg-[#d4a895] transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(224,185,166,0.5)] inline-flex items-center gap-3">
                                <Activity className="w-5 h-5" />
                                RUN SYSTEM DIAGNOSTIC
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Grid - Protective Measures */}
            <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: Detox - The Dopamine Shield */}
                    <Link to="/detox" className="group">
                        <div className="glass-panel p-8 h-full flex flex-col items-start glass-panel-hover overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-all duration-500" />

                            <Shield className="w-10 h-10 text-rose-500 mb-6" strokeWidth={1} />

                            <h3 className="text-2xl font-display text-stone-100 mb-3 group-hover:text-rose-400 transition-colors">The Dopamine Shield</h3>
                            <p className="text-stone-400 font-mono text-sm leading-relaxed mb-8 flex-grow">
                                The algorithm is designed to addict you. This protocol breaks the loop. Lock your distractions and reclaim 4 hours of deep work a day.
                            </p>

                            <div className="flex items-center text-xs font-bold tracking-widest uppercase text-stone-500 group-hover:text-rose-400 transition-colors">
                                <span>ACTIVATE SHIELD</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: Meal Plan - The Biological Firewall */}
                    <Link to="/meal-plan" className="group">
                        <div className="glass-panel p-8 h-full flex flex-col items-start glass-panel-hover overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-sage-500/10 rounded-full blur-xl group-hover:bg-sage-500/20 transition-all duration-500" />

                            <Cpu className="w-10 h-10 text-sage-500 mb-6" strokeWidth={1} />

                            <h3 className="text-2xl font-display text-stone-100 mb-3 group-hover:text-sage-400 transition-colors">The Biological Firewall</h3>
                            <p className="text-stone-400 font-mono text-sm leading-relaxed mb-8 flex-grow">
                                Modern food systems create brain fog. Our Vision Agent scans your fridge to generate high-performance fuel, zero waste, zero decision fatigue.
                            </p>

                            <div className="flex items-center text-xs font-bold tracking-widest uppercase text-stone-500 group-hover:text-sage-400 transition-colors">
                                <span>FUEL THE ENGINE</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 3: Legacy - The Deep Archive */}
                    <Link to="/legacy" className="group">
                        <div className="glass-panel p-8 h-full flex flex-col items-start glass-panel-hover overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold-500/10 rounded-full blur-xl group-hover:bg-gold-500/20 transition-all duration-500" />

                            <Archive className="w-10 h-10 text-gold-500 mb-6" strokeWidth={1} />

                            <h3 className="text-2xl font-display text-stone-100 mb-3 group-hover:text-gold-400 transition-colors">The Deep Archive</h3>
                            <p className="text-stone-400 font-mono text-sm leading-relaxed mb-8 flex-grow">
                                Social media is a ghost with no memory. Build a permanent, encrypted vault for your life's work. Curate your wisdom, not your feed.
                            </p>

                            <div className="flex items-center text-xs font-bold tracking-widest uppercase text-stone-500 group-hover:text-gold-400 transition-colors">
                                <span>SECURE LEGACY</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                </div>
            </section>
        </main>
    );
};
