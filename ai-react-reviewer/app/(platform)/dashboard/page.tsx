"use client";

import { useUser } from "@clerk/nextjs";
import { UnifiedLauncher } from "@/components/UnifiedLauncher";
import { AcademyGrid } from "@/components/AcademyGrid";

export default function Dashboard() {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-slate-900 font-serif">
                        Welcome back, {user?.firstName || "Partner"}.
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Manage your AI infrastructure and intelligence assets.
                    </p>
                </div>

                {/* The Launchpad (ChefOS / SiteOS / Aegis) */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Active Systems</h2>
                        <span className="text-xs font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                            ● SYSTEM ONLINE
                        </span>
                    </div>
                    {/* This component handles the 'Locked/Active' logic */}
                    <UnifiedLauncher />
                </section>

                {/* The Academy (Books/Manuals) */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Knowledge Base</h2>
                    <AcademyGrid />
                </section>
            </div>
        </div>
    );
}
