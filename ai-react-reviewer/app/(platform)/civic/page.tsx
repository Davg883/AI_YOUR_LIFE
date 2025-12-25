"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Landmark, TrendingUp, AlertTriangle, RefreshCcw, FileText, Megaphone, Bot } from "lucide-react";
import { useState } from "react";

export default function CivicPage() {
    const data = useQuery(api.civic.getCivicDashboard);
    const seed = useMutation(api.civic.seedCivicData);
    const [seeding, setSeeding] = useState(false);

    const handleSeed = async () => {
        setSeeding(true);
        await seed({});
        setSeeding(false);
        window.location.reload();
    };

    if (!data) return <div className="p-8 text-slate-400">Loading Civic Intelligence...</div>;

    const { stats, apps, comments } = data;
    const sentimentPercent = stats.total > 0 ? (stats.support / stats.total) * 100 : 50;

    return (
        <div className="min-h-screen bg-slate-100/50 p-6 space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                        <Landmark className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">CivicOS</h1>
                        <p className="text-xs font-mono text-slate-500">PLANNING INTELLIGENCE & PUBLIC ENGAGEMENT</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" size="icon" onClick={handleSeed} disabled={seeding}>
                        <RefreshCcw className={`w-4 h-4 ${seeding ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </div>

            {/* WARNING CARD: COORDINATED ATTACK DETECTION */}
            {stats.anomalies > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start justify-between">
                    <div className="flex gap-3">
                        <Bot className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-red-900 uppercase">Anomaly Detected: Coordinated Bot Activity</h3>
                            <p className="text-sm text-red-700 mt-1">
                                CivicOS has identified {stats.anomalies} comments with identical text patterns originating from different user accounts. This may indicate a coordinated "astroturfing" campaign.
                            </p>
                        </div>
                    </div>
                    <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700">
                        Investigate
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COL: APPLICATIONS & SENTIMENT */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Active Applications
                    </h2>

                    {apps.map((app: any) => (
                        <Card key={app._id} className="@container border-l-4 border-l-blue-500">
                            <CardHeader className="flex flex-row items-start justify-between pb-2">
                                <div>
                                    <Badge variant="outline" className="mb-2 font-mono text-[10px]">{app.ref}</Badge>
                                    <h3 className="text-xl font-black text-slate-900">{app.site}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{app.description}</p>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-blue-600 uppercase">{app.status}</Badge>
                                    <div className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Target Decision</div>
                                    <div className="text-xs font-mono font-bold text-slate-700">{new Date(app.decisionTargetDate).toLocaleDateString('en-GB')}</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* SENTIMENT BAR */}
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs font-bold uppercase text-slate-500 mb-2">
                                        <span>Public Sentiment</span>
                                        <span>{Math.round(sentimentPercent)}% Positive</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
                                        <div
                                            className="h-full bg-emerald-500 transition-all duration-1000"
                                            style={{ width: `${sentimentPercent}%` }}
                                        />
                                        <div
                                            className="h-full bg-rose-500 transition-all duration-1000"
                                            style={{ width: `${100 - sentimentPercent}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400">
                                        <div className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500" /> {stats.support} Supporting</div>
                                        <div className="flex items-center gap-1 text-rose-500">{stats.objections} Objecting <AlertTriangle className="w-3 h-3" /></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mt-8">
                        <Megaphone className="w-4 h-4" /> Recent Comments
                    </h2>
                    <div className="space-y-3">
                        {comments.map((c: any) => (
                            <div key={c._id} className={`p-4 bg-white rounded-xl border shadow-sm transition-all ${c.anomalyDetected ? 'border-red-300 bg-red-50/50' : 'border-slate-200'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-slate-900">{c.author}</span>
                                        {c.anomalyDetected && <Badge variant="destructive" className="text-[10px]">BOT DETECTED</Badge>}
                                        <Badge variant="outline" className={`text-[10px] uppercase ${c.type === 'objection' ? 'text-red-600 border-red-200 bg-red-50' : 'text-emerald-600 border-emerald-200 bg-emerald-50'}`}>
                                            {c.type}
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-slate-400">{new Date(c.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed italic">"{c.text}"</p>
                                <div className="flex gap-2 mt-3">
                                    {c.keyTopics.map((t: string) => (
                                        <Badge key={t} variant="secondary" className="text-[10px] text-slate-500">{t}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COL: INTELLIGENCE METRICS */}
                <div className="space-y-4">
                    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Civic Intelligence</h3>
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                            Analyzing public consultations for key objection themes and astroturfing campaigns.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                            <div>
                                <span className="block text-[10px] text-slate-500 uppercase">Consultations</span>
                                <span className="text-xl font-bold font-mono text-white">{apps.length}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] text-slate-500 uppercase">Comments Processed</span>
                                <span className="text-xl font-bold font-mono text-emerald-400">{stats.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
