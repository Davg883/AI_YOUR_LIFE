
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gavel, TrendingUp, AlertCircle, FileText } from "lucide-react";

export function CaseCard({ caseData }: { caseData: any }) {
    const isCritical = caseData.status === 'critical';

    return (
        <Card className={`@container w-full border-l-4 shadow-sm ${isCritical ? 'border-l-red-600 bg-red-50/30' : 'border-l-indigo-600'}`}>
            <CardHeader className="relative flex flex-col @md:flex-row items-start justify-between pb-2 pt-4 gap-2">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-md ${isCritical ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>
                        <Gavel className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{caseData.opponent}</h3>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{caseData.title}</p>
                    </div>
                </div>
                <Badge variant={isCritical ? 'destructive' : 'default'} className="uppercase text-[10px] absolute top-3 right-3 @md:static">
                    {caseData.status}
                </Badge>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="grid grid-cols-1 @xs:grid-cols-2 gap-4 my-4">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Strategy</span>
                        <p className="text-xs font-bold text-slate-700">{caseData.strategy}</p>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Next Action</span>
                        <div className="flex items-center gap-1 text-red-600">
                            <AlertCircle className="w-3 h-3" />
                            <span className="text-xs font-mono font-bold">
                                {new Date(caseData.nextActionDate).toLocaleDateString('en-GB')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center mb-4">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Exposure</span>
                        <p className="text-sm font-mono font-bold text-slate-900">£{caseData.financialExposure.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Win Probability</span>
                        <div className="flex items-center gap-1 justify-end">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-sm font-mono font-bold text-green-600">{caseData.probabilityOfSuccess}%</span>
                        </div>
                    </div>
                </div>

                <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <FileText className="w-4 h-4 mr-2" /> Open Case File
                </Button>
            </CardContent>
        </Card>
    );
}
