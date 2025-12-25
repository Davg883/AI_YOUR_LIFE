import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Menu, X } from 'lucide-react';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'DETOX', path: '/detox' },
        { name: 'NOURISH', path: '/meal-plan' },
        { name: 'LEGACY', path: '/legacy' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-stone-950/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center border border-white/10 group-hover:border-rose-500/50 transition-colors">
                        <LayoutGrid className="w-5 h-5 text-rose-400" />
                    </div>
                    <span className="font-mono font-bold text-lg tracking-wider text-stone-200">
                        AI_LIFE<span className="text-rose-500 animate-pulse">_</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-xs font-mono tracking-[0.2em] transition-colors duration-300 ${location.pathname === link.path
                                    ? 'text-rose-400'
                                    : 'text-stone-400 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-stone-400 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-stone-950 border-b border-white/10 p-6 flex flex-col gap-4 backdrop-blur-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-mono tracking-widest text-stone-400 hover:text-rose-400"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};
