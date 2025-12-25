import React from 'react';
import { Feather, PenTool } from 'lucide-react';
import { QuizModal, Question } from '../components/QuizModal';
import { useState } from 'react';

export const Legacy: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const questions: Question[] = [
        { id: 1, text: "Do you worry about forgetting precious moments?", options: ["Constantly", "Sometimes", "No"] },
        { id: 2, text: "Have you lost someone whose voice you wish you had saved?", options: ["Yes", "No"] },
        { id: 3, text: "Do you have wisdom you want to pass down?", options: ["Yes", "Not yet"] },
        { id: 4, text: "If you left today, is your story complete?", options: ["Yes", "No"] },
    ];

    return (
        <div className="min-h-screen pt-24 px-6 md:px-12 flex flex-col items-center justify-center text-center">
            <QuizModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                questions={questions}
                resultTitle="ARCHIVE STATUS:"
                resultValue="PENDING"
                quizType="legacy"
            />
            <div className="glass-panel p-12 rounded-full mb-8 relative group">
                <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Feather className="w-16 h-16 text-gold-500 relative z-10" strokeWidth={1} />
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-light mb-6 text-glow">
                Legacy Journal
            </h1>
            <p className="max-w-xl text-lg text-stone-400 font-mono leading-relaxed mb-10">
                Write for eternity. AI-assisted journaling that captures your philosophy and story for future generations.
            </p>

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-gold-500 text-stone-950 font-display font-medium text-lg rounded-full hover:bg-gold-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(217,119,6,0.3)]"
            >
                BEGIN THE ARCHIVE
            </button>
        </div>
    );
};
