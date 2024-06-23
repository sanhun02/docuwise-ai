"use client";

import React, { useCallback, useState } from "react";
import { IPDF, PDF } from "@/lib/mongo/models";
import mongoose from "mongoose";
import PDFUpload from "./PDFUpload";

type Props = {
    title: string;
    option: string;
    userId: string | null;
};

const TabTitle = ({ title, option, userId }: Props) => {
    // const [file, setFile] = useState<IPDF | string>("");

    // const onDrop = useCallback(async (acceptedFiles: File[]) => {
    //     const file = acceptedFiles[0];

    //     const newPdf = await PDF?.create({
    //         title: file.name,
    //         fileId: new mongoose.Types.ObjectId(),
    //         uploadDate: new Date(),
    //         userId,
    //     });

    //     setFile(newPdf);
    // }, []);

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();

    //     if (event.target.files && event.target.files.length > 0) {
    //         setFile(event.target.files[0]);
    //         handleUpload(event.target.files[0]);
    //     }
    // };

    // const handleUpload = async (input: File) => {
    //     const formData = new FormData();
    //     formData.append("file", input);

    //     console.log(input);

    //     const result = await fetch("/api/upload", {
    //         method: "POST",
    //         formData
    //     });
    //     console.log(result);
    // };

    return (
        <div className="flex items-center justify-between gap-5">
            <p className="text-2xl font-semibold">{title}</p>
            <div>
                {/* <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-lg w-8 h-8 p-0 hover:bg-zinc-100"
                                onClick={() => {
                                    document
                                        .getElementById("file-input")
                                        ?.click();
                                }}
                            >
                                <Plus className="w-5 h-5 cursor-pointer" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{option}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <input
                    id="file-input"
                    accept=".pdf"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                /> */}
                <PDFUpload userId={userId} />
            </div>
        </div>
    );
};

export default TabTitle;
