import React from 'react';
import { Flame, Dna, Activity, Zap, Layers } from 'lucide-react';

export const MealPlan: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#e0b9a6] selection:text-black">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-[#e0b9a6] rounded-full mix-blend-screen filter blur-[100px] opacity-[0.05]" />
                <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[40%] bg-[#cf5c5c] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
                <header className="mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0b9a6]/10 border border-[#e0b9a6]/20 text-[#e0b9a6] text-xs tracking-widest uppercase mb-6">
                        <Flame className="w-3 h-3" />
                        <span>Metabolic Sovereignty</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                        The Biological Firewall.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {/* UK Spelling: Optimise */}
                        Standard diets are bloatware for your biology. We engineer fuel protocols
                        that optimise executive function and eliminate inflammation.
                    </p>
                </header>

                <div className="mb-24">
                    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 overflow-hidden transition-all duration-500 hover:border-[#e0b9a6]/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#e0b9a6]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4 text-amber-500">
                                    <Activity className="w-8 h-8" />
                                    {/* UK Spelling: Unoptimised */}
                                    <span className="text-sm tracking-widest uppercase font-semibold">Metabolic Status: Unoptimised</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white">Construct Fuel Protocol</h2>
                                <p className="text-gray-400">
                                    {/* UK Spelling: Stabilise, Maximise */}
                                    Input your biometric data. Our engine generates a precise nutritional architecture
                                    designed to stabilise glucose, maximise ATP production, and clarify cognition.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                        <span>Glucose Variability High</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="relative px-10 py-5 bg-[#e0b9a6] text-black font-bold tracking-wide text-lg rounded-xl hover:bg-[#d4a895] transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(224,185,166,0.5)]">
                                    INITIATE PROTOCOL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Dna className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Bio-Individual Code</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {/* UK Spelling: Analyse */}
                            We analyse your specific metabolic profile to determine the exact fuel sources your system requires.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Zap className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Cognitive Velocity</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {/* UK Spelling: Prioritise */}
                            Eliminate "brain fog" at the source. Our protocols prioritise neuro-protective fats for sustained deep work.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Layers className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Systemic Hardening</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {/* UK Spelling: Defence */}
                            Treat inflammation as a security breach. We deploy nutritional countermeasures to harden your biological defence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
