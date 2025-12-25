import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Soup, Feather, ArrowRight } from 'lucide-react';

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
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8 animate-fade-in drop-shadow-lg">
                        <span className="text-white drop-shadow-md">Reclaim your attention.</span>
                        <br />
                        <span className="text-stone-200 drop-shadow-md">Reset your biology.</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-lg text-white font-mono mb-12 leading-relaxed drop-shadow-md">
                        The modern world is designed to drain you. We build tools to restore your sovereignty.
                        Step into a life of clarity, vitality, and purpose.
                    </p>

                    <div className="flex gap-4">
                        {/* CTA could go here */}
                    </div>
                </div>
            </section>

            {/* The Grid */}
            <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Card 1: Detox */}
                    <Link to="/detox" className="group">
                        <div className="glass-panel p-8 h-full flex flex-col items-start glass-panel-hover overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-all duration-500" />

                            <Smartphone className="w-10 h-10 text-rose-500 mb-6" strokeWidth={1} />

                            <h3 className="text-2xl font-display text-stone-100 mb-3 group-hover:text-rose-400 transition-colors">Digital Detox</h3>
                            <p className="text-stone-400 font-mono text-sm leading-relaxed mb-8 flex-grow">
                                Break the dopamine loop. Lock your distractions and reclaim 4+ hours of your day.
                            </p>

                            <div className="flex items-center text-xs font-bold tracking-widest uppercase text-stone-500 group-hover:text-stone-300 transition-colors">
                                <span>Initiate</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: Meal Plan */}
                    <Link to="/meal-plan" className="group">
                        <div className="glass-panel p-8 h-full flex flex-col items-start glass-panel-hover overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-sage-500/10 rounded-full blur-xl group-hover:bg-sage-500/20 transition-all duration-500" />

                            <Soup className="w-10 h-10 text-sage-500 mb-6" strokeWidth={1} />

                            <h3 className="text-2xl font-display text-stone-100 mb-3 group-hover:text-sage-400 transition-colors">Metabolic Reset</h3>
                            <p className="text-stone-400 font-mono text-sm leading-relaxed mb-8 flex-grow">
                                Fuel your mind, not just your body. Algorithmic nutrition planning for cognitive peak.
                            </p>

                            <div className="flex items-center text-xs font-bold tracking-widest uppercase text-stone-500 group-hover:text-stone-300 transition-colors">
                                <span>Nourish</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 3: Legacy */}
                    <Link to="/legacy" className="group">
                        <div className="glass-panel p-8 h-full flex flex-col items-start glass-panel-hover overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold-500/10 rounded-full blur-xl group-hover:bg-gold-500/20 transition-all duration-500" />

                            <Feather className="w-10 h-10 text-gold-500 mb-6" strokeWidth={1} />

                            <h3 className="text-2xl font-display text-stone-100 mb-3 group-hover:text-gold-400 transition-colors">Legacy Journal</h3>
                            <p className="text-stone-400 font-mono text-sm leading-relaxed mb-8 flex-grow">
                                What will you leave behind? Curate your wisdom and story in an eternal digital vault.
                            </p>

                            <div className="flex items-center text-xs font-bold tracking-widest uppercase text-stone-500 group-hover:text-stone-300 transition-colors">
                                <span>Begin</span>
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>

                </div>
            </section>
        </main>
    );
};
