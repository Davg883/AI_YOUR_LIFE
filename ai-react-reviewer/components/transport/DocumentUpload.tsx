"use client";

import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Loader2, FileText } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function DocumentUpload({ assetId }: { assetId: Id<"assets"> }) {
    const [file, setFile] = useState<File | null>(null);
    const [docType, setDocType] = useState("MOT");
    const [uploading, setUploading] = useState(false);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const processDoc = useAction(api.ingest.processDocument);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        try {
            // 1. Get URL
            const postUrl = await generateUploadUrl();

            // 2. Upload File
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();

            // 3. Trigger AI Analysis
            await processDoc({ storageId, type: docType });

            // 4. Reload to show green bars
            window.location.reload();
        } catch (e) {
            console.error(e);
            alert("Upload Failed - Check Console");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mt-4 p-4 border rounded-lg bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Update Compliance
                </h4>
                <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger className="w-[100px] h-8 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="MOT">MOT</SelectItem>
                        <SelectItem value="PMI">PMI</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-2 items-center">
                <Input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="text-xs bg-white"
                />
                <Button size="sm" onClick={handleUpload} disabled={!file || uploading}>
                    {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
                    <span className="ml-2">{uploading ? "AI Scanning..." : "Upload"}</span>
                </Button>
            </div>
        </div>
    );
}
