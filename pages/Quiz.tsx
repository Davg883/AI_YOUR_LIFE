import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { Shield, Flame, Infinity, ArrowRight, CheckCircle2, Lock, Fingerprint, Activity } from 'lucide-react';

export const Quiz: React.FC = () => {
    const [step, setStep] = useState(1);
    const [scores, setScores] = useState({ shield: 0, firewall: 0, archive: 0 });
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [leadId, setLeadId] = useState<Id<"leads"> | null>(null);

    // Convex Mutations
    const captureLead = useMutation(api.leads.captureDiagnostic);
    const markConverted = useMutation(api.leads.markConverted);

    const handleAnswer = (category: 'shield' | 'firewall' | 'archive') => {
        setScores(prev => ({ ...prev, [category]: prev[category] + 1 }));
        setStep(prev => prev + 1);
    };

    const getRecommendation = () => {
        const { shield, firewall, archive } = scores;
        if (shield >= firewall && shield >= archive) return {
            title: 'Attention Defence Required',
            desc: 'Your cognitive bandwidth is compromised by algorithmic interference.',
            icon: Shield,
            path: '/detox',
            color: 'text-red-500',
            action: 'Initialise Shield'
        };
        if (firewall >= shield && firewall >= archive) return {
            title: 'Metabolic Support Required',
            desc: 'Your biology is running on unoptimised fuel sources.',
            icon: Flame,
            path: '/meal-plan',
            color: 'text-amber-500',
            action: 'Construct Firewall'
        };
        return {
            title: 'Legacy Preservation Required',
            desc: 'Your intellectual estate is currently ephemeral and unsecured.',
            icon: Infinity,
            path: '/legacy',
            color: 'text-purple-500',
            action: 'Secure Archive'
        };
    };

    const recommendation = getRecommendation();
    const RecIcon = recommendation.icon;

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const id = await captureLead({
                email,
                scores,
                recommendation: recommendation.title
            });
            setLeadId(id);
            // Move to final result step
            setStep(5);
        } catch (error) {
            console.error("Transmission failed:", error);
            // Still proceed to results even on error (graceful degradation)
            setStep(5);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConversion = async () => {
        if (leadId) {
            try {
                await markConverted({ id: leadId });
            } catch (error) {
                console.error("Conversion tracking failed:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex items-center justify-center p-6 font-sans selection:bg-[#e0b9a6] selection:text-black">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 w-[60%] h-[60%] bg-[#e0b9a6] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05]" />
            </div>

            <div className="relative z-10 w-full max-w-2xl">

                {/* QUESTIONS (Steps 1-3) */}
                {step < 4 && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 shadow-2xl">
                        {/* Header with Progress */}
                        <div className="mb-8 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Activity className="w-4 h-4 text-[#e0b9a6] animate-pulse" />
                                <span className="text-xs font-bold text-[#e0b9a6] tracking-widest uppercase">
                                    Diagnostic Protocol 00{step}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-[#e0b9a6]' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>

                        {/* QUESTION 1 */}
                        {step === 1 && (
                            <div className="animate-fade-in">
                                <h2 className="text-3xl font-bold mb-6 text-white">When you wake, what is your first action?</h2>
                                <div className="space-y-4">
                                    <button onClick={() => handleAnswer('shield')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">I check notifications or social feeds immediately.</span>
                                    </button>
                                    <button onClick={() => handleAnswer('firewall')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">I feel groggy and need caffeine to function.</span>
                                    </button>
                                    <button onClick={() => handleAnswer('archive')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">I reflect on the day ahead, but rarely record my thoughts.</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* QUESTION 2 */}
                        {step === 2 && (
                            <div className="animate-fade-in">
                                <h2 className="text-3xl font-bold mb-6 text-white">Which threat concerns you most?</h2>
                                <div className="space-y-4">
                                    <button onClick={() => handleAnswer('firewall')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">Physical degradation and loss of energy.</span>
                                    </button>
                                    <button onClick={() => handleAnswer('archive')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">That my life's lessons will be forgotten by my children.</span>
                                    </button>
                                    <button onClick={() => handleAnswer('shield')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">That algorithms are rewriting my behaviour.</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* QUESTION 3 */}
                        {step === 3 && (
                            <div className="animate-fade-in">
                                <h2 className="text-3xl font-bold mb-6 text-white">What is your primary objective for 2026?</h2>
                                <div className="space-y-4">
                                    <button onClick={() => handleAnswer('archive')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">To build something that outlasts me.</span>
                                    </button>
                                    <button onClick={() => handleAnswer('shield')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">To reclaim my ability to do Deep Work.</span>
                                    </button>
                                    <button onClick={() => handleAnswer('firewall')} className="w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#e0b9a6]/50 transition-all group">
                                        <span className="block text-lg font-medium group-hover:text-[#e0b9a6] transition-colors">To optimise my biology for peak performance.</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 4: THE GATEKEEPER (Email Capture) */}
                {step === 4 && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center animate-fade-in">
                        <div className="mb-8 inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10">
                            <Lock className="w-12 h-12 text-[#e0b9a6]" />
                        </div>

                        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">Analysis Complete</h2>
                        <h3 className="text-3xl font-bold text-white mb-6">Report Encrypted</h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Diagnostic results are ready. Enter secure transmission coordinate to decrypt your personalised protocol.
                        </p>

                        <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-4">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@domain.co.uk"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-center text-white placeholder-gray-600 focus:outline-none focus:border-[#e0b9a6] transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-10 py-4 bg-[#e0b9a6] text-black font-bold tracking-wide rounded-xl hover:bg-[#d4a895] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <span className="animate-pulse">ESTABLISHING UPLINK...</span>
                                ) : (
                                    <>
                                        <Fingerprint className="w-4 h-4" /> TRANSMIT DATA
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-xs text-gray-600">
                            Your data is encrypted. We do not share with third parties.
                        </p>
                    </div>
                )}

                {/* STEP 5: THE REVEAL */}
                {step === 5 && (
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center animate-fade-in">
                        <div className="mb-8 inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10">
                            <CheckCircle2 className="w-12 h-12 text-[#e0b9a6]" />
                        </div>

                        <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">Diagnostic Complete</h2>
                        <h3 className="text-4xl font-bold text-white mb-6">Priority: {recommendation.title}</h3>
                        <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
                            {recommendation.desc}
                        </p>

                        <Link to={recommendation.path} onClick={handleConversion}>
                            <button className="px-10 py-5 bg-[#e0b9a6] text-black font-bold tracking-wide text-lg rounded-xl hover:bg-[#d4a895] transition-all transform hover:scale-105 shadow-[0_0_30px_-5px_rgba(224,185,166,0.5)] inline-flex items-center gap-3">
                                <RecIcon className="w-5 h-5" />
                                {recommendation.action.toUpperCase()} <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>

                        <p className="mt-8 text-xs text-gray-600">
                            Analysis based on UK Sovereign Intelligence Standards.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
