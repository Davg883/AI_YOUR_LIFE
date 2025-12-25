import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Brain, Sparkles, CheckCircle } from 'lucide-react';

export interface Question {
    id: number;
    text: string;
    options: string[];
}

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    questions: Question[];
    resultTitle?: string;
    resultValue?: string;
    quizType?: string;
}

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export const QuizModal: React.FC<QuizModalProps> = ({
    isOpen,
    onClose,
    questions,
    resultTitle = "ALIGNMENT SCORE:",
    resultValue = "LOW",
    quizType = "general"
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isCalculating, setIsCalculating] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const captureLead = useMutation(api.leads.capture);

    useEffect(() => {
        if (isOpen) {
            setCurrentQuestionIndex(0);
            setAnswers({});
            setIsCalculating(false);
            setIsFinished(false);
            setEmail('');
            setIsSubmitted(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleAnswer = (answer: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsCalculating(true);
            setTimeout(() => {
                setIsCalculating(false);
                setIsFinished(true);
            }, 2000);
        }
    };

    const handleRecalculate = () => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setIsFinished(false);
    };

    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-stone-900/90 border border-rose-500/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col min-h-[500px] animate-in fade-in zoom-in-95 duration-300">

                {/* Progress Bar */}
                <div className="relative h-1 w-full bg-stone-800">
                    <div
                        className="absolute top-0 left-0 h-full bg-sage-500 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        style={{ width: `${isFinished ? '100%' : `${progressPercentage}%`}` }}
                    />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-100 hover:bg-white/5 rounded-full transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="flex-1 flex flex-col p-8 md:p-12 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />

                    {!isFinished && !isCalculating && (
                        <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-500">
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800/50 border border-stone-700/50 mb-6">
                                    <Brain className="w-3 h-3 text-sage-400" />
                                    <span className="text-xs font-mono text-sage-400 tracking-widest uppercase">
                                        Analyzing Sector... {Math.round(progressPercentage)}%
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-display text-stone-100 leading-tight">
                                    {questions[currentQuestionIndex].text}
                                </h2>
                            </div>

                            <div className="grid gap-4 mt-auto">
                                {questions[currentQuestionIndex].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option)}
                                        className="group relative flex items-center justify-between p-6 text-left border border-white/5 bg-white/5 rounded-xl hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300"
                                    >
                                        <span className="text-lg text-stone-300 group-hover:text-stone-100 font-medium">{option}</span>
                                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-rose-500 group-hover:bg-rose-500/20 transition-all">
                                            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-rose-400" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isCalculating && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                            <div className="relative mb-8">
                                <div className="w-24 h-24 rounded-full border-4 border-stone-800 border-t-rose-500 animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center text-rose-500">
                                    <Brain className="w-8 h-8 animate-pulse" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-mono text-stone-200 mb-2">Processing Telemetry...</h3>
                            <p className="text-stone-500">Comparing with Sovereign compliance standards.</p>
                        </div>
                    )}

                    {isFinished && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                            <div className="mb-6 p-4 bg-gold-500/10 border border-gold-500/30 rounded-full animate-bounce">
                                <Sparkles className="w-12 h-12 text-gold-500" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-display text-stone-100 mb-2">
                                {resultTitle} <span className="text-gold-500 text-glow">{resultValue}</span>
                            </h2>
                            <p className="text-stone-400 max-w-md mx-auto mb-8 leading-relaxed font-mono text-sm">
                                Your current operating system is limiting your potential.
                                <br />
                                Initiate the Sovereign Protocol to reclaim your baseline.
                            </p>

                            <div className="w-full max-w-sm bg-stone-800/50 p-6 rounded-xl border border-white/5">
                                <label className="block text-left text-xs font-mono text-stone-500 uppercase tracking-widest mb-3">
                                    Send Protocol To:
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter email to receive your Protocol"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 bg-stone-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-500 transition-colors placeholder:text-stone-700"
                                    />
                                    <button
                                        className="bg-rose-600 hover:bg-rose-500 text-white px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={isSubmitted || !email}
                                        onClick={async () => {
                                            if (!email) return;
                                            try {
                                                await captureLead({
                                                    email,
                                                    type: quizType,
                                                    score: resultValue,
                                                    answers
                                                });
                                                setIsSubmitted(true);
                                                // alert(`Protocol sent to ${email} (Simulation)`); // Removed simulation alert
                                            } catch (error) {
                                                console.error("Failed to capture lead:", error);
                                                alert("Failed to save. Please try again.");
                                            }
                                        }}
                                    >
                                        {isSubmitted ? <CheckCircle className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="mt-4 text-[10px] text-stone-600">
                                    {isSubmitted ? "Protocol Sent. Check your inbox." : "Encrypted via Sovereign Secure Protocol. No spam, ever."}
                                </p>
                            </div>

                            <button
                                onClick={handleRecalculate}
                                className="mt-8 text-xs font-mono text-stone-500 hover:text-stone-300 underline decoration-stone-800 underline-offset-4 transition-colors"
                            >
                                RE-RUN DIAGNOSTIC
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};
