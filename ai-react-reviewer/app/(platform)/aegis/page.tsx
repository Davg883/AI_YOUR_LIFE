"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaseCard } from "@/components/aegis/CaseCard";
import { EvidenceUpload } from "@/components/aegis/EvidenceUpload";
import { Shield, Calendar, FileText, RefreshCcw, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function AegisPage() {
    const data = useQuery(api.aegis.getAegisDashboard);
    const seed = useMutation(api.aegis.seedAegisData);
    const [seeding, setSeeding] = useState(false);

    const handleSeed = async () => {
        setSeeding(true);
        await seed({});
        setSeeding(false);
        window.location.reload();
    };

    if (!data) return <div className="p-8 text-slate-400">Connecting to Legal War Room...</div>;

    return (
        <div className="min-h-screen bg-slate-100/50 p-6 space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">AegisOS</h1>
                        <p className="text-xs font-mono text-slate-500">STRATEGIC DEFENCE & LEGAL COMPLIANCE</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <EvidenceUpload />
                    <Button variant="ghost" size="icon" onClick={handleSeed} disabled={seeding}>
                        <RefreshCcw className={`w-4 h-4 ${seeding ? "animate-spin" : ""}`} />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COL: ACTIVE CASES */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Critical Disputes
                    </h2>
                    {data.cases.length === 0 ? (
                        <div className="p-8 text-center border rounded-xl border-dashed text-slate-400">No Active Cases</div>
                    ) : (
                        data.cases.map((c: any) => <CaseCard key={c._id} caseData={c} />)
                    )}

                    {/* TIMELINE */}
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mt-8">
                        <Calendar className="w-4 h-4" /> Strategic Timeline
                    </h2>
                    <div className="bg-white rounded-xl border shadow-sm p-4 space-y-4">
                        {data.events.map((event: any) => (
                            <div key={event._id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                <div className="flex-col items-center text-center w-12">
                                    <span className="text-xs font-bold text-slate-400 block">{new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                                    <span className="text-lg font-black text-slate-900 block">{new Date(event.date).getDate()}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-slate-800">{event.title}</h4>
                                    <Badge variant="outline" className="text-[10px] mt-1">{event.type}</Badge>
                                </div>
                                <Badge variant={event.type === 'deadline' ? 'destructive' : 'secondary'}>
                                    {Math.ceil((event.date - Date.now()) / (1000 * 60 * 60 * 24))} DAYS
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COL: INTELLIGENCE FEED */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Intelligence Feed
                    </h2>
                    <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg">
                        <h3 className="font-bold text-lg mb-2">AI Paralegal Active</h3>
                        <p className="text-indigo-200 text-xs leading-relaxed mb-4">
                            Monitoring incoming correspondence for "Hostile" sentiment and extracting deadlines automatically.
                        </p>
                        <div className="flex items-center justify-between text-xs font-mono pt-4 border-t border-indigo-700/50">
                            <span>EVIDENCE PROCESSED</span>
                            <span className="font-bold text-xl">{data.evidenceCount}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
