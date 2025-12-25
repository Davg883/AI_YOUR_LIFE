import Link from 'next/link';
import { ReactNode } from 'react';

export default function WebsiteLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans antialiased">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
                        <span className="text-xl font-bold tracking-tight">AI Your Business</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">Intelligence</Link>
                        <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/sign-in" className="text-slate-300 hover:text-white transition-colors">Sign In</Link>
                        <Link href="/sign-up" className="bg-white text-slate-900 px-5 py-2 rounded-full font-medium hover:bg-slate-100 transition-colors">Get Started</Link>
                    </div>
                </div>
            </nav>

            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 py-12 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">V</div>
                            <span className="font-bold text-slate-300">AI Your Business</span>
                        </div>
                        <div className="flex gap-8 text-sm text-slate-400">
                            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-xs text-slate-600">
                        © 2025 AI Your Business. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
