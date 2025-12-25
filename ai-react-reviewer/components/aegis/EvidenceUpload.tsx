"use client";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ScanEye } from "lucide-react";

export function EvidenceUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const processDoc = useAction(api.ingest.processDocument);

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        try {
            const postUrl = await generateUploadUrl();
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });
            const { storageId } = await result.json();

            // AI Auto-Detection (Will route to Aegis if it sees legal terms)
            await processDoc({ storageId });

            window.location.reload();
        } catch (e) {
            console.error(e);
            alert("Analysis Failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex gap-2 items-center bg-white p-1 rounded-lg border">
            <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-xs border-0"
            />
            <Button size="sm" onClick={handleUpload} disabled={!file || uploading} className="bg-indigo-600 hover:bg-indigo-700">
                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <ScanEye className="w-4 h-4 mr-2" />}
                {uploading ? "Reading..." : "Scan Evidence"}
            </Button>
        </div>
    );
}
