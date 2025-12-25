"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { HazardCard } from "@/components/site/HazardCard";
import { HardHat, Activity, ClipboardCheck, AlertOctagon, FileDown, RefreshCcw, Camera } from "lucide-react";
import { useState } from "react";
// Assuming we'll reuse the EvidenceUpload component pattern for fetching but specific for Sites later, 
// for now we'll use a placeholder button as per instructions or the existing uploader if adaptable.
// Instructions say "New Audit" button triggers Seeder for now.

export default function SitePage() {
    const data = useQuery(api.site.getSiteDashboard);
    const seed = useMutation(api.site.seedSiteData);
    const [seeding, setSeeding] = useState(false);

    const handleSeed = async () => {
        setSeeding(true);
        await seed({});
        setSeeding(false);
        window.location.reload();
    };

    const handleGenerateRAMS = () => {
        alert("Generating RAMS PDF based on detected hazards...");
    };

    if (!data) return <div className="p-8 text-slate-400">Connecting to Site Monitor...</div>;

    const { sites, stats, hazards } = data;

    return (
        <div className="min-h-screen bg-slate-100/50 p-6 space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 text-orange-700 rounded-lg">
                        <HardHat className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">SiteOS</h1>
                        <p className="text-xs font-mono text-slate-500">CONSTRUCTION SAFETY & AI RISK ASSESSMENT</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50" onClick={handleSeed} disabled={seeding}>
                        {seeding ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <Activity className="w-4 h-4 mr-2" />}
                        Run Safety Drill
                    </Button>
                    <Button onClick={handleGenerateRAMS} className="bg-slate-900 hover:bg-slate-800">
                        <FileDown className="w-4 h-4 mr-2" /> RAMS Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COL: SITE STATUS */}
                <div className="space-y-6">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4" /> Active Locations
                    </h2>

                    {sites.map((site: any) => (
                        <Card key={site._id} className="border-l-4 border-l-orange-500 shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge variant="outline" className="mb-2 uppercase text-[10px] bg-orange-50 text-orange-700 border-orange-200">
                                            {site.type}
                                        </Badge>
                                        <h3 className="text-xl font-black text-slate-900">{site.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-1">
                                            <Activity className="w-3 h-3 text-emerald-500" /> Live Monitoring
                                        </p>
                                    </div>
                                    <div className="text-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Risk Score</div>
                                        <div className="text-2xl font-black text-slate-900">85</div>
                                        <div className="text-[10px] font-bold text-orange-600">HIGH</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="bg-red-50 p-2 rounded border border-red-100 text-center">
                                        <span className="block text-2xl font-bold text-red-600">{stats.criticalHazards}</span>
                                        <span className="text-[10px] font-bold text-red-400 uppercase">Critical</span>
                                    </div>
                                    <div className="bg-slate-50 p-2 rounded border border-slate-100 text-center">
                                        <span className="block text-2xl font-bold text-slate-700">{stats.openHazards}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Open Issues</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-bold text-blue-900 text-sm mb-2 flex items-center gap-2">
                            <Camera className="w-4 h-4" /> AI Vision Ready
                        </h4>
                        <p className="text-xs text-blue-700 leading-relaxed">
                            Upload site photos to automatically detect hazards (PPE violations, trip hazards, blocked exits) and generate control measures.
                        </p>
                    </div>
                </div>

                {/* RIGHT COL: LIVE HAZARD FEED */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <AlertOctagon className="w-4 h-4" /> Detected Hazards (AI Stream)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hazards.map((h: any) => (
                            <HazardCard key={h._id} hazard={h} />
                        ))}
                        {hazards.length === 0 && (
                            <div className="col-span-2 p-12 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
                                <Activity className="w-12 h-12 mb-4 opacity-20" />
                                <p>System Operational. No hazards detected.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
