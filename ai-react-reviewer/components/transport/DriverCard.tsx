import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, AlertTriangle, CheckCircle2 } from "lucide-react";

interface DriverCardProps {
    operator: any;
}

export function DriverCard({ operator }: DriverCardProps) {
    return (
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <div className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-900">{operator.name}</h4>
                            <p className="text-xs text-slate-500">Licence: {operator.licence.categories.join(", ")}</p>
                        </div>
                    </div>
                    <Badge variant={operator.status === 'active' ? 'outline' : 'destructive'} className="text-[10px]">
                        {operator.status.toUpperCase()}
                    </Badge>
                </div>

                <div className="space-y-2 bg-slate-50 p-2 rounded border border-slate-100">
                    <DriverStatusRow label="Licence Check" date={operator.licence.expiry} />
                    <DriverStatusRow label="CPC Card" date={operator.cpcExpiry} />
                    <DriverStatusRow label="ADR Card" date={operator.adr.expiry} />
                </div>
            </div>
        </Card>
    )
}

function DriverStatusRow({ label, date }: { label: string, date: number }) {
    const now = Date.now();
    const expired = date < now;
    return (
        <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">{label}</span>
            <span className={`font-mono ${expired ? "text-red-600 font-bold" : "text-slate-700"}`}>
                {new Date(date).toLocaleDateString('en-GB')}
            </span>
        </div>
    )
}
