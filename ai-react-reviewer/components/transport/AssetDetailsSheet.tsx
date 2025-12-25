import React, { useState } from 'react';
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Truck, Activity, FileText, AlertTriangle, CheckCircle2,
    History, Scale, Fuel, Thermometer, Wrench, UploadCloud,
    ArrowUpDown
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { SmartDocumentUpload } from "./SmartDocumentUpload";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
    SortingState,
} from "@tanstack/react-table";

export function AssetDetailsSheet({ assetId, reg }: { assetId: Id<"assets">, reg: string }) {
    const details = useQuery(api.transport.getAssetDetails, { id: assetId });
    if (!details) return <Button variant="outline" className="w-full" disabled>Loading...</Button>;

    const { asset, history } = details;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="w-full mt-2 border-slate-300">
                    <FileText className="w-4 h-4 mr-2" /> Digital Logbook
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[500px] sm:w-[800px] overflow-y-auto bg-slate-50 p-0">

                {/* Header */}
                <div className="bg-white p-6 border-b border-slate-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge variant="outline" className="mb-2">{asset.vin}</Badge>
                            <SheetTitle className="text-3xl font-black text-slate-900 flex items-center gap-2">
                                {asset.reg}
                            </SheetTitle>
                            <SheetDescription className="text-slate-500 font-medium">
                                {asset.make} {asset.model} • {asset.year || "2015"}
                            </SheetDescription>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-slate-400 uppercase">Current Status</div>
                            <Badge className={asset.status === 'grounded' ? 'bg-red-600' : 'bg-green-600'}>
                                {asset.status.toUpperCase()}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* TABS INTERFACE */}
                <div className="p-6">
                    <Tabs defaultValue="compliance" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="compliance">Compliance</TabsTrigger>
                            <TabsTrigger value="technical">Technical Spec</TabsTrigger>
                            <TabsTrigger value="history">History Log</TabsTrigger>
                        </TabsList>

                        {/* TAB 1: COMPLIANCE (The Red/Green Board) */}
                        <TabsContent value="compliance" className="space-y-6">
                            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Statutory Certificates</h3>
                                <ComplianceRow label="MOT Certificate" date={asset.compliance.motExpiry} />
                                <ComplianceRow label="ADR (Hazchem)" date={asset.compliance.adrExpiry} />
                                <ComplianceRow label="Tachograph Calibration" date={asset.compliance.tachographCalibrationExpiry} />
                                <ComplianceRow label="VED (Road Tax)" date={asset.compliance.vedExpiry} />
                            </div>

                            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Maintenance Schedule</h3>
                                <ComplianceRow label="PMI (Safety Inspection)" date={asset.compliance.pmiNextDue} type="PMI" />
                                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <Scale className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm font-medium text-slate-700">Brake Test</span>
                                    </div>
                                    <span className="text-xs text-slate-500">Required at every PMI</span>
                                </div>
                            </div>

                            {/* The SMART Upload Area */}
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <UploadCloud className="w-4 h-4" /> Update Records
                                </h3>
                                <p className="text-xs text-blue-700 mb-4">
                                    Upload any document (MOT, PMI, Brake Test). TransportOS will analyze it and update compliance dates automatically.
                                </p>
                                <SmartDocumentUpload assetId={assetId} />
                            </div>
                        </TabsContent>

                        {/* TAB 2: TECHNICAL SPECS (Tank Codes etc) */}
                        <TabsContent value="technical" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <TechCard label="Tank Code" value={asset.technicalSpecs.tankCode} icon={<Fuel />} />
                                <TechCard label="Manufacturer" value={asset.technicalSpecs.tankManufacturer} icon={<Truck />} />
                                <TechCard label="Axle Configuration" value="4x2 Rigid" icon={<Activity />} />
                                <TechCard label="PMI Interval" value={`${asset.technicalSpecs.pmiIntervalWeeks} Weeks`} icon={<History />} />
                            </div>

                            <div className="bg-white p-4 rounded-xl border shadow-sm">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hazardous Capabilities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {asset.hazchemProfile.unNumbers.map((un: string) => (
                                        <Badge key={un} variant="secondary" className="font-mono">
                                            {un}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="mt-4 space-y-2">
                                    <BooleanRow label="Switch Loading Approved" value={asset.hazchemProfile.switchLoading} />
                                    <BooleanRow label="Vapour Recovery" value={asset.hazchemProfile.vapourRecovery} />
                                </div>
                            </div>
                        </TabsContent>

                        {/* TAB 3: HISTORY LOG (TanStack Table) */}
                        <TabsContent value="history">
                            <div className="bg-white rounded-xl border shadow-sm overflow-hidden min-h-[400px]">
                                <HistoryTable data={history} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </SheetContent>
        </Sheet>
    );
}

// History Table Component using TanStack Table
function HistoryTable({ data }: { data: any[] }) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const columnHelper = createColumnHelper<any>();

    const columns = [
        columnHelper.accessor("date", {
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="p-0 hover:bg-transparent"
                    >
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: (info) => <div className="font-mono text-xs">{new Date(info.getValue()).toLocaleDateString("en-GB")}</div>,
        }),
        columnHelper.accessor("type", {
            header: "Type",
            cell: (info) => <Badge variant="outline" className="py-0">{info.getValue()}</Badge>,
        }),
        columnHelper.accessor("odometer", {
            header: "Odometer",
            cell: (info) => <div className="font-mono text-xs text-slate-500">{info.getValue() ? `${info.getValue().toLocaleString()} km` : "-"}</div>,
        }),
        columnHelper.accessor("result", {
            header: "Result",
            cell: (info) => (
                <Badge variant={info.getValue() === "pass" ? "outline" : "destructive"} className="h-5 text-[10px]">
                    {info.getValue()?.toUpperCase()}
                </Badge>
            ),
        }),
        columnHelper.accessor("notes", {
            header: "Notes",
            cell: (info) => <span className="text-xs text-slate-600 truncate max-w-[150px] inline-block" title={info.getValue()}>{info.getValue()}</span>,
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    return (
        <div className="w-full">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase border-b border-slate-200">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="p-3">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-3">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="h-24 text-center text-slate-400">
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// Helper Components for consistent UI (Existing)
function ComplianceRow({ label, date, type }: any) {
    const now = Date.now();
    const isExpired = date < now;
    const isWarning = !isExpired && (date - now) < (30 * 24 * 60 * 60 * 1000); // 30 days

    return (
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3">
                {type === 'PMI' ? <Wrench className="w-4 h-4 text-slate-500" /> : <FileText className="w-4 h-4 text-slate-500" />}
                <span className="text-sm font-medium text-slate-700">{label}</span>
            </div>
            <div className="text-right">
                <div className={`text-sm font-bold font-mono ${isExpired ? 'text-red-600' : isWarning ? 'text-orange-500' : 'text-green-600'}`}>
                    {new Date(date).toLocaleDateString('en-GB')}
                </div>
                {isExpired && <div className="text-[10px] text-red-500 font-bold uppercase">Expired</div>}
            </div>
        </div>
    )
}

function TechCard({ label, value, icon }: any) {
    return (
        <div className="bg-white p-3 rounded-lg border shadow-sm flex flex-col gap-1">
            <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] uppercase font-bold">{label}</span>
                {React.cloneElement(icon, { className: "w-3 h-3" })}
            </div>
            <span className="text-sm font-bold text-slate-800 truncate">{value}</span>
        </div>
    )
}

function BooleanRow({ label, value }: any) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600">{label}</span>
            {value ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">YES</Badge>
            ) : (
                <Badge variant="outline">NO</Badge>
            )}
        </div>
    )
}
