"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AssetCard } from "@/components/transport/AssetCard";
import { DriverCard } from "@/components/transport/DriverCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert, RefreshCcw, Activity, CalendarDays, AlertTriangle, Truck } from "lucide-react";
import { useState } from "react";

export default function TransportDashboard() {
    const data = useQuery(api.transport.getDashboardData);
    const seed = useMutation(api.transport.seedTransportData);
    const [seeding, setSeeding] = useState(false);

    const handleSeed = async () => {
        setSeeding(true);
        await seed();
        setSeeding(false);
        window.location.reload();
    };

    if (!data) return <div className="p-8 text-slate-400">Connecting to TransportOS Satellites...</div>;

    // Logic to count issues for the top KPIs
    // Logic to count issues for the top KPIs
    const criticalIssues = data.assets.filter((a: any) => a.status === "grounded").length +
        data.operators.filter((o: any) => o.status === "suspended").length;

    const groundedAssets = data.assets.filter((a: any) => a.status === "grounded").length;
    const warningAssets = data.assets.filter((a: any) => {
        // Check for amber status (e.g., PMI due in < 14 days)
        const nextPmi = a.compliance.pmiNextDue;
        const days = Math.ceil((nextPmi - Date.now()) / (1000 * 60 * 60 * 24));
        return days > 0 && days < 14;
    }).length;

    return (
        <div className="min-h-screen bg-slate-100/50 p-6 space-y-6">

            {/* 1. COMMAND BAR */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        TransportOS <span className="text-slate-300 font-light">|</span> Mission Control
                    </h1>
                    <p className="text-xs font-mono text-slate-500 mt-1">
                        SIMULATION DATE: 01 FEB 2025 • ISLE OF WIGHT DEPOT (PO30 5QJ)
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                        <RefreshCcw className="w-4 h-4 mr-2" /> Refresh Data
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleSeed} disabled={seeding}>
                        {seeding ? "Re-Seeding..." : "Reset Simulation Data"}
                    </Button>
                </div>
            </div>

            {/* 2. KPI STRIP */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KpiCard
                    label="Fleet Status"
                    value={`${data.assets.length - groundedAssets}/${data.assets.length}`}
                    sub="Operational"
                    color={groundedAssets > 0 ? "red" : "green"}
                    icon={<Truck className="w-5 h-5" />}
                />
                <KpiCard
                    label="Maintenance"
                    value={warningAssets}
                    sub="Upcoming PMIs"
                    color={warningAssets > 0 ? "orange" : "slate"}
                    icon={<Activity className="w-5 h-5" />}
                />
                <KpiCard
                    label="Compliance Risk"
                    value={criticalIssues > 0 ? "CRITICAL" : "LOW"}
                    sub={`${criticalIssues} Active Violations`}
                    color={criticalIssues > 0 ? "red" : "green"}
                    icon={<ShieldAlert className="w-5 h-5" />}
                />
                <KpiCard
                    label="Next Audit"
                    value="14 DAYS"
                    sub="15 Feb 2025"
                    color="orange"
                    icon={<CalendarDays className="w-5 h-5" />}
                />
                <KpiCard
                    label="Driver Pool"
                    value={`${data.kpi.totalDrivers - data.kpi.suspendedDrivers}/${data.kpi.totalDrivers}`}
                    sub="Active & Valid"
                    color="slate"
                    icon={<UserIcon />}
                />
            </div>

            {/* 3. CRITICAL ALERTS */}
            {data.kpi.groundedAssets > 0 && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 animate-pulse">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle className="font-bold">FLEET GROUNDED</AlertTitle>
                    <AlertDescription className="text-xs">
                        Vehicle OIL 6595 has expired MOT and PMI. Mandatory stop on all dispatches for this asset.
                    </AlertDescription>
                </Alert>
            )}

            {/* 4. MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COL: FLEET (2/3 width) */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Truck className="w-4 h-4" /> Active Fleet
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.assets.map((asset: any) => (
                            <AssetCard
                                key={asset._id}
                                id={asset._id}
                                reg={asset.reg}
                                make={asset.make}
                                model={asset.model}
                                status={asset.status}
                                compliance={asset.compliance}
                                tech={asset.technicalSpecs}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT COL: DRIVERS (1/3 width) */}
                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <UserIcon /> Operator Roster
                    </h2>
                    <div className="space-y-3">
                        {data.operators.map((op: any) => (
                            <DriverCard key={op._id} operator={op} />
                        ))}
                    </div>

                    {/* Audit Log Placeholder */}
                    <div className="mt-8 p-4 bg-slate-200/50 rounded-lg border border-slate-200">
                        <h3 className="text-xs font-bold text-slate-600 mb-2">RECENT SYSTEM LOGS</h3>
                        <div className="space-y-2 text-[10px] font-mono text-slate-500">
                            <p>• [SYSTEM] Compliance Check run 10:00 AM</p>
                            <p>• [AUTO] OIL6595 marked GROUNDED (MOT)</p>
                            <p>• [AUTO] B.Rudge marked SUSPENDED (Licence)</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Helper Components
function KpiCard({ label, value, sub, color, icon }: any) {
    const colors: any = {
        red: "text-red-600 border-red-100 bg-red-50",
        green: "text-green-600 border-green-100 bg-green-50",
        blue: "text-blue-600 border-blue-100 bg-blue-50",
        orange: "text-orange-600 border-orange-100 bg-orange-50",
        slate: "text-slate-600 border-slate-200 bg-white",
    };

    return (
        <div className={`p-4 rounded-xl border ${colors[color]} flex items-center justify-between`}>
            <div>
                <p className="text-[10px] font-bold uppercase opacity-70">{label}</p>
                <p className="text-2xl font-black tracking-tight">{value}</p>
                <p className="text-xs opacity-80 font-medium">{sub}</p>
            </div>
            <div className="opacity-20 p-2 bg-white rounded-full">
                {icon}
            </div>
        </div>
    )
}

function UserIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    )
}
