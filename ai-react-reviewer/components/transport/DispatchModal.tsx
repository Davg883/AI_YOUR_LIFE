"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, CheckCircle, Play } from "lucide-react";

interface DispatchModalProps {
    vehicleId: Id<"assets">;
    vehicleReg: string;
    status: string;
}

export function DispatchModal({ vehicleId, vehicleReg, status }: DispatchModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<string>("");
    const [validationResult, setValidationResult] = useState<{ allowed: boolean; reason: string } | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch available drivers
    const data = useQuery(api.transport.getDashboardData);
    const validate = useMutation(api.transport.validateDispatch);

    const handleValidate = async () => {
        if (!selectedDriver) return;
        setLoading(true);

        try {
            const result = await validate({
                vehicleId,
                driverId: selectedDriver as Id<"operators">,
            });
            setValidationResult(result);
        } catch (error) {
            console.error("Validation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            setValidationResult(null); // Reset on close
        }}>
            <DialogTrigger asChild>
                <Button
                    className="w-full mt-4"
                    variant={status === "operational" ? "default" : "secondary"}
                >
                    <Play className="w-4 h-4 mr-2" />
                    Dispatch Vehicle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Dispatch {vehicleReg}</DialogTitle>
                    <DialogDescription>
                        Assign a driver to initiate pre-shift compliance checks.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Operator</label>
                        <Select onValueChange={setSelectedDriver}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a driver..." />
                            </SelectTrigger>
                            <SelectContent>
                                {data?.operators.map((op: any) => (
                                    <SelectItem key={op._id} value={op._id}>
                                        {op.name} ({op.status})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Validation Result Display */}
                    {validationResult && (
                        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2">
                            {validationResult.allowed ? (
                                <Alert className="bg-green-50 border-green-200 text-green-800">
                                    <CheckCircle className="h-4 w-4" />
                                    <AlertTitle>Compliance Passed</AlertTitle>
                                    <AlertDescription>
                                        {validationResult.reason}. Shift created.
                                    </AlertDescription>
                                </Alert>
                            ) : (
                                <Alert variant="destructive">
                                    <ShieldAlert className="h-4 w-4" />
                                    <AlertTitle>Dispatch Blocked</AlertTitle>
                                    <AlertDescription className="font-mono text-xs mt-2">
                                        {validationResult.reason}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleValidate}
                        disabled={!selectedDriver || loading || validationResult?.allowed}
                        variant={validationResult?.allowed ? "outline" : "default"}
                    >
                        {loading ? "Validating..." : "Validate & Start"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
