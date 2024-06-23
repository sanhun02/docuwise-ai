import React from "react";
import { useDropzone } from "react-dropzone";

interface Props {
    userId: string | null;
}

function PDFUpload({ userId }: Props) {
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
            } catch (error) {
                console.log("Error during file upload", error);
            }
        },
    });

    return (
        <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
}

export default PDFUpload;
