import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface Props {
    userId: string | null;
    onUploadSuccess: (filename: string) => void;
}

function PDFUpload({ userId, onUploadSuccess }: Props) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file.size > 10 * 1024 * 1024) {
                console.error("File too large");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", userId || "");

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    console.error("Upload failed");
                    return;
                }

                const data = await response.json();
                console.log("Upload complete", data);
                onUploadSuccess(file.name);
            } catch (error) {
                console.log("Error during file upload", error);
            }
        },
    });

    return (
        <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />

            <Button variant={"outline"} className="h-9 w-9 rounded-lg p-0"><Plus className="h-5 w-5" /></Button>
        </div>
    );
}

export default PDFUpload;
