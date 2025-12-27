import React from 'react';
import { Shield, Activity, Radio, Brain, Lock } from 'lucide-react';

export const Detox: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#e0b9a6] selection:text-black">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#e0b9a6] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#a6c1e0] rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
                <header className="mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0b9a6]/10 border border-[#e0b9a6]/20 text-[#e0b9a6] text-xs tracking-widest uppercase mb-6">
                        <Shield className="w-3 h-3" />
                        <span>Active Countermeasures Deployed</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                        The Dopamine Shield.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        The attention economy treats your mind as a resource to be mined.
                        We provide the sovereign architecture to jam the signals, block the noise,
                        and reclaim your cognitive bandwidth.
                    </p>
                </header>

                <div className="mb-24">
                    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 overflow-hidden transition-all duration-500 hover:border-[#e0b9a6]/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#e0b9a6]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4 text-[#e0b9a6]">
                                    <Activity className="w-8 h-8" />
                                    <span className="text-sm tracking-widest uppercase font-semibold">System Status: Vulnerable</span>
                                </div>
                                {/* UK Spelling: Initialise, Defence */}
                                <h2 className="text-3xl font-bold text-white">Initialise Defence Protocol</h2>
                                <p className="text-gray-400">
                                    Deploy agentic filters to intercept algorithmic hooks before they reach your perception.
                                    Turn your device into a tool, not a trap.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span>Algorithmic Feeds Active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="relative px-10 py-5 bg-[#e0b9a6] text-black font-bold tracking-wide text-lg rounded-xl hover:bg-[#d4a895] transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(224,185,166,0.5)]">
                                    ACTIVATE SHIELD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Radio className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Signal Jamming</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Our AI preemptively silences non-urgent interruptions based on your "Deep Work" calendar, ensuring zero context switching.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Brain className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Neuro-Resilience</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {/* UK Spelling: Analyse, Optimise */}
                            We analyse your "Time to Focus" metrics to measure flow state and optimise your environment.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Lock className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Sovereign Data</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {/* UK Spelling: Behavioural */}
                            Your behavioural data is processed locally. No advertisers ever see your vulnerabilities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
