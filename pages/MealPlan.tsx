import React from 'react';
import { Leaf, Soup } from 'lucide-react';
import { QuizModal, Question } from '../components/QuizModal';
import { useState } from 'react';

export const MealPlan: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const questions: Question[] = [
        { id: 1, text: "How are your energy levels mid-afternoon?", options: ["Stable", "Crash", "High"] },
        { id: 2, text: "Do you often experience brain fog?", options: ["Often", "Rarely", "Never"] },
        { id: 3, text: "How much time do you have for cooking daily?", options: ["< 15 mins", "30-60 mins", "Hours"] },
        { id: 4, text: "What is your primary biological goal?", options: ["Weight Loss", "Cognitive Function", "Longevity"] },
    ];

    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
            <QuizModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                questions={questions}
                resultTitle="METABOLIC SYNC:"
                resultValue="OFFLINE"
                quizType="meal-plan"
            />
            <div className="glass-panel p-12 rounded-full mb-8 relative group">
                <div className="absolute inset-0 bg-sage-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Soup className="w-16 h-16 text-sage-500 relative z-10" strokeWidth={1} />
                <Leaf className="w-8 h-8 text-stone-100 absolute -top-2 -right-2 rotate-12" strokeWidth={1.5} />
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 text-glow">
                Metabolic Reset
            </h1>
            <p className="max-w-xl text-lg text-stone-400 font-mono leading-relaxed mb-10">
                Nutrition designed for cognitive clarity. Automated meal planning based on your unique biology and goals.
            </p>

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-sage-500 text-stone-950 font-display font-medium text-lg rounded-full hover:bg-sage-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
                BUILD MY PROTOCOL
            </button>
        </div>
    );
};
