import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Flame, Infinity, Home, Activity } from 'lucide-react';

export const CommandBar: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const navItems = [
        { name: 'SANCTUARY', path: '/', icon: Home, color: 'text-gray-400', activeColor: 'text-[#e0b9a6]' },
        { name: 'DIAGNOSTIC', path: '/quiz', icon: Activity, color: 'text-gray-400', activeColor: 'text-[#e0b9a6]' },
        { name: 'SHIELD', path: '/detox', icon: Shield, color: 'text-red-400', activeColor: 'text-red-500' },
        { name: 'FIREWALL', path: '/meal-plan', icon: Flame, color: 'text-amber-400', activeColor: 'text-amber-500' },
        { name: 'ARCHIVE', path: '/legacy', icon: Infinity, color: 'text-purple-400', activeColor: 'text-purple-500' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_-10px_rgba(0,0,0,0.8)] px-4 py-4 flex items-center justify-between">

                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 group transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-50 hover:opacity-100'}`}
                        >
                            <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white/10 shadow-[0_0_15px_-5px_rgba(255,255,255,0.2)]' : 'bg-transparent'}`}>
                                <Icon className={`w-5 h-5 ${isActive ? item.activeColor : 'text-gray-300'}`} />
                            </div>
                            <span className={`text-[9px] font-bold tracking-widest ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}

            </div>
        </div>
    );
};
