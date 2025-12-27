import React from 'react';
import { Database, Key, Infinity, Fingerprint, Cpu } from 'lucide-react';

export const Legacy: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-[#e0b9a6] selection:text-black">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[#e0b9a6] rounded-full mix-blend-screen filter blur-[130px] opacity-[0.04]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[130px] opacity-[0.04]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
                <header className="mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0b9a6]/10 border border-[#e0b9a6]/20 text-[#e0b9a6] text-xs tracking-widest uppercase mb-6">
                        <Infinity className="w-3 h-3" />
                        <span>Temporal Sovereignty</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                        The Deep Archive.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Social media is a vanishing stream. The Archive is bedrock.
                        We provide the cryptographic vault to capture your philosophy, your voice,
                        and your wisdom for the only audience that matters: the future.
                    </p>
                </header>

                <div className="mb-24">
                    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 overflow-hidden transition-all duration-500 hover:border-[#e0b9a6]/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#e0b9a6]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4 text-purple-400">
                                    <Database className="w-8 h-8" />
                                    <span className="text-sm tracking-widest uppercase font-semibold">Archive Status: Ephemeral</span>
                                </div>
                                {/* UK Spelling: Initialise */}
                                <h2 className="text-3xl font-bold text-white">Initialise Intellectual Estate</h2>
                                <p className="text-gray-400">
                                    Begin the transfer. Our AI Biographer actively interviews you, extracting
                                    core memories and values to construct a high-fidelity model of your mind.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                        <span>Memory Decay Detected</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="relative px-10 py-5 bg-[#e0b9a6] text-black font-bold tracking-wide text-lg rounded-xl hover:bg-[#d4a895] transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(224,185,166,0.5)]">
                                    SECURE LEGACY
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Cpu className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">The AI Biographer</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Don't face the blank page. Our Socratic Engine asks the right questions at the right time to extract stories you didn't know you remembered.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Key className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Zero-Knowledge Vault</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your thoughts are encrypted client-side. We cannot read them. Advertisers cannot mine them. You hold the only key.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-[#e0b9a6]/30 transition-colors group">
                        <Fingerprint className="w-10 h-10 text-gray-400 group-hover:text-[#e0b9a6] mb-6 transition-colors" />
                        <h3 className="text-xl font-bold text-white mb-3">Generational Transfer</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Set "Time Lock" protocols to release specific archives to specific heirs at exact moments in the future.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
