
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HazardCardProps {
    hazard: {
        _id: string;
        description: string;
        severity: "low" | "medium" | "critical";
        controlMeasure: string;
        imageUrl: string;
        rectified: boolean;
    };
}

export function HazardCard({ hazard }: HazardCardProps) {
    const isCritical = hazard.severity === "critical";

    return (
        <div className={`group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md ${isCritical ? 'border-red-200' : 'border-slate-200'}`}>

            {/* Header / Image Area */}
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {hazard.imageUrl && hazard.imageUrl.startsWith("http") ? (
                    <img src={hazard.imageUrl} alt="Hazard" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                        <Info className="w-8 h-8" />
                    </div>
                )}

                <div className="absolute top-2 right-2">
                    <Badge variant={isCritical ? "destructive" : "secondary"} className="uppercase font-bold shadow-sm">
                        {hazard.severity}
                    </Badge>
                </div>

                {hazard.rectified && (
                    <div className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center backdrop-blur-[1px]">
                        <Badge className="bg-white text-emerald-700 hover:bg-white text-sm font-bold flex gap-1">
                            <CheckCircle2 className="w-4 h-4" /> RECTIFIED
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                    {isCritical ? <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />}
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                        {hazard.description}
                    </h3>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs">
                    <span className="block font-bold text-slate-400 uppercase text-[10px] mb-1">AI Recommendation</span>
                    <p className="font-mono text-slate-700">{hazard.controlMeasure}</p>
                </div>
            </div>
        </div>
    );
}
