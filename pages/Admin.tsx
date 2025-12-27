import React from 'react';
import { useQuery } from "convex/react";
import { useAuth, SignIn, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { api } from "../convex/_generated/api";
import { Shield, Flame, Infinity, Users, CheckCircle2, TrendingUp, Activity, ArrowLeft, Lock, AlertTriangle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Admin: React.FC = () => {
    const { isLoaded, isSignedIn } = useAuth();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] right-[20%] w-[40%] h-[40%] bg-green-500 rounded-full mix-blend-screen filter blur-[200px] opacity-[0.03]" />
                <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-[#e0b9a6] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.03]" />
            </div>

            {/* Loading State */}
            {!isLoaded && (
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center">
                        <Activity className="w-12 h-12 text-[#e0b9a6] animate-pulse mx-auto mb-4" />
                        <p className="text-gray-500 font-mono text-sm tracking-widest">INITIALISING SECURITY PROTOCOLS...</p>
                    </div>
                </div>
            )}

            {/* 🔒 STATE 1: UNAUTHENTICATED */}
            <SignedOut>
                <div className="relative z-10 h-screen flex flex-col items-center justify-center p-6">
                    <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-6 animate-pulse">
                        <Lock className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-white">Restricted Area</h1>
                    <p className="text-gray-500 mb-8 text-center max-w-md">
                        Mission Control access requires sovereign clearance. Establish identity to proceed.
                    </p>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                        <SignIn
                            routing="hash"
                            afterSignInUrl="/#/admin"
                            appearance={{
                                elements: {
                                    rootBox: "mx-auto",
                                    card: "bg-transparent shadow-none",
                                    headerTitle: "text-white",
                                    headerSubtitle: "text-gray-400",
                                    socialButtonsBlockButton: "bg-white/10 border-white/10 text-white hover:bg-white/20",
                                    formFieldLabel: "text-gray-400",
                                    formFieldInput: "bg-black/50 border-white/10 text-white",
                                    footerActionLink: "text-[#e0b9a6]",
                                }
                            }}
                        />
                    </div>
                    <Link to="/" className="mt-8 text-gray-500 hover:text-[#e0b9a6] transition-colors text-sm flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Return to Sanctuary
                    </Link>
                </div>
            </SignedOut>

            {/* 🔓 STATE 2: AUTHENTICATED */}
            <SignedIn>
                <AdminDashboard />
            </SignedIn>
        </div>
    );
};

// Separate component for the dashboard content
const AdminDashboard: React.FC = () => {
    const data = useQuery(api.leads.getDashboardMetrics);

    // Loading state
    if (data === undefined) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <Activity className="w-12 h-12 text-[#e0b9a6] animate-pulse mx-auto mb-4" />
                    <p className="text-gray-500 font-mono text-sm tracking-widest">VERIFYING CLEARANCE LEVEL...</p>
                </div>
            </div>
        );
    }

    // Error state (unauthorized)
    if ('error' in data || data === null) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6">
                <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2 text-white">Access Denied</h1>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                    Your identity is verified but you lack sufficient clearance for Mission Control.
                    Contact the system administrator.
                </p>
                <Link to="/" className="text-[#e0b9a6] hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Return to Sanctuary
                </Link>
            </div>
        );
    }

    const conversionRate = data.metrics.total > 0
        ? Math.round((data.metrics.convertedCount / data.metrics.total) * 100)
        : 0;

    // 📊 CSV Export Function
    const downloadTelemetry = () => {
        if (!data) return;

        // 1. Define Headers
        const headers = [
            "Timestamp",
            "Email",
            "Recommendation",
            "Shield Score",
            "Firewall Score",
            "Archive Score",
            "Status"
        ];

        // 2. Map Data to Rows
        const rows = data.leads.map(lead => [
            new Date(lead.createdAt).toISOString(),
            lead.email,
            `"${lead.recommendation || 'N/A'}"`, // Quote to handle commas
            lead.scores?.shield ?? 0,
            lead.scores?.firewall ?? 0,
            lead.scores?.archive ?? 0,
            lead.converted ? "CONVERTED" : "PENDING"
        ]);

        // 3. Construct CSV String
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        // 4. Trigger Download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `luminous_telemetry_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative z-10 p-8">
            {/* Header */}
            <header className="max-w-7xl mx-auto mb-12">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#e0b9a6] transition-colors mb-6 text-sm">
                    <ArrowLeft className="w-4 h-4" /> Return to Sanctuary
                </Link>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold tracking-widest text-green-500 uppercase">System Operational</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white">Mission Control</h1>
                        <p className="text-gray-500 mt-1">Real-time telemetry from the Diagnostic Engine.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={downloadTelemetry}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
                        >
                            <Download size={14} /> Exfiltrate Data
                        </button>
                        <div className="text-right">
                            <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Commander Active</p>
                            <p className="font-mono text-sm text-[#e0b9a6]">{data.commander}</p>
                        </div>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 border-2 border-[#e0b9a6]"
                                }
                            }}
                        />
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid gap-8">

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {/* Total Leads */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                        <div className="flex justify-between items-start mb-4">
                            <Users className="text-gray-400" />
                            <span className="text-xs font-mono text-gray-500">TOTAL LEADS</span>
                        </div>
                        <div className="text-4xl font-bold text-white">{data.metrics.total}</div>
                    </div>

                    {/* Shield Count */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield size={60} />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <Shield className="text-red-400" />
                            <span className="text-xs font-mono text-red-400/80">DEFENCE</span>
                        </div>
                        <div className="text-4xl font-bold text-red-100">{data.metrics.shieldCount}</div>
                    </div>

                    {/* Firewall Count */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Flame size={60} />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <Flame className="text-amber-400" />
                            <span className="text-xs font-mono text-amber-400/80">METABOLIC</span>
                        </div>
                        <div className="text-4xl font-bold text-amber-100">{data.metrics.firewallCount}</div>
                    </div>

                    {/* Archive Count */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Infinity size={60} />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <Infinity className="text-purple-400" />
                            <span className="text-xs font-mono text-purple-400/80">LEGACY</span>
                        </div>
                        <div className="text-4xl font-bold text-purple-100">{data.metrics.archiveCount}</div>
                    </div>

                    {/* Conversion Rate */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={60} />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <TrendingUp className="text-green-400" />
                            <span className="text-xs font-mono text-green-400/80">CONVERTED</span>
                        </div>
                        <div className="text-4xl font-bold text-green-100">{conversionRate}%</div>
                        <p className="text-xs text-gray-500 mt-1">{data.metrics.convertedCount} / {data.metrics.total}</p>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <h3 className="font-bold tracking-wide text-white">Recent Interceptions</h3>
                        <span className="text-xs font-mono text-gray-500">Last 100 records</span>
                    </div>

                    {data.leads.length === 0 ? (
                        <div className="p-12 text-center">
                            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500">No diagnostic data captured yet.</p>
                            <p className="text-gray-600 text-sm mt-1">Complete a diagnostic at <Link to="/quiz" className="text-[#e0b9a6] hover:underline">/quiz</Link> to begin.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-white/5 text-xs uppercase font-bold text-gray-200">
                                    <tr>
                                        <th className="px-6 py-4">Timestamp</th>
                                        <th className="px-6 py-4">Identity (Email)</th>
                                        <th className="px-6 py-4">Diagnostic Result</th>
                                        <th className="px-6 py-4 text-center">Scores (S/F/A)</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {data.leads.map((lead) => (
                                        <tr key={lead._id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs">
                                                {new Date(lead.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                                <br />
                                                <span className="text-gray-600">{new Date(lead.createdAt).toLocaleDateString('en-GB')}</span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-white">{lead.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded border text-[10px] uppercase tracking-wide font-bold
                          ${lead.recommendation?.includes('Attention') ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                        lead.recommendation?.includes('Metabolic') ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                            'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                                                    {lead.recommendation || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center font-mono">
                                                {lead.scores ? (
                                                    <>
                                                        <span className="text-red-400">{lead.scores.shield}</span> /
                                                        <span className="text-amber-400"> {lead.scores.firewall}</span> /
                                                        <span className="text-purple-400"> {lead.scores.archive}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-600">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {lead.converted ? (
                                                    <span className="inline-flex items-center gap-1 text-green-400 text-xs font-bold">
                                                        <CheckCircle2 size={12} /> CONVERTED
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-600 text-xs">PENDING</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="text-center py-8">
                    <p className="text-xs text-gray-600">
                        Luminous Deep Intelligence • Mission Control v1.0 • Secured by Clerk
                    </p>
                </footer>
            </div>
        </div>
    );
};
