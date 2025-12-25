import React from 'react';
import { Lock, Smartphone } from 'lucide-react';
import { QuizModal, Question } from '../components/QuizModal';
import { useState } from 'react';

export const Detox: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const questions: Question[] = [
        { id: 1, text: "What is the first thing you touch in the morning?", options: ["Phone", "Water", "Partner/Pet"] },
        { id: 2, text: "How many hours a day do you scroll?", options: ["< 1hr", "2-4 hrs", "4+ hrs"] },
        { id: 3, text: "Do you feel anxious without your phone?", options: ["Yes", "No"] },
        { id: 4, text: "Can you watch a movie without checking notifications?", options: ["Yes", "No"] },
        { id: 5, text: "Do you want to reclaim 10 hours a week?", options: ["Yes", "No"] },
    ];

    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
            <QuizModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                questions={questions}
                resultTitle="DOPAMINE DEBT:"
                resultValue="HIGH"
                quizType="detox"
            />
            <div className="glass-panel p-12 rounded-full mb-8 relative group">
                <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Smartphone className="w-16 h-16 text-rose-500 relative z-10" strokeWidth={1} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Lock className="w-8 h-8 text-stone-100/80" strokeWidth={1.5} />
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 text-glow">
                Digital Detox
            </h1>
            <p className="max-w-xl text-lg text-stone-400 font-mono leading-relaxed mb-10">
                Reclaim your attention span. Our algorithmic shield prevents doomscrolling and restores your dopamine baseline.
            </p>

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-stone-100 text-stone-950 font-display font-medium text-lg rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
                ANALYZE SCREEN TIME
            </button>
        </div>
    );
};
