"use client";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, Loader2, ScanEye } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export function SmartDocumentUpload({ assetId }: { assetId: Id<"assets"> }) {
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

            // Call the SMART AI function (No 'type' argument needed now)
            await processDoc({ storageId });

            window.location.reload();
        } catch (e) {
            console.error(e);
            alert("Upload Failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex gap-2 items-center">
            <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="text-xs bg-white border-blue-200"
            />
            <Button size="sm" onClick={handleUpload} disabled={!file || uploading} className="bg-blue-600 hover:bg-blue-700">
                {uploading ? <Loader2 className="animate-spin w-4 h-4" /> : <ScanEye className="w-4 h-4 mr-2" />}
                {uploading ? "Scanning..." : "Upload & Analyze"}
            </Button>
        </div>
    );
}
