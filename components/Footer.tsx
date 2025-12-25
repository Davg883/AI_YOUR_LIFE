import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-8 border-t border-white/5 bg-slate-950/50 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">System Operational</span>
                </div>
                <p className="text-slate-600 text-xs font-mono">&copy; 2025 AI_BIZ_SYSTEMS // ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
};
