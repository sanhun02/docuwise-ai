"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabTitle from "./TabTitle";
import PDFViewer from "./PDFViewer";
import { useEffect, useState } from "react";
import QuestionBar from "./QuestionBar";
import mongoose from "mongoose";
import { IPDF } from "@/lib/mongo/models";
import TabCards from "./TabCards";
import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";

type Props = {
    userId: string | null;
};

const FileTab = ({ userId }: Props) => {
    const [filename, setFilename] = useState<string>("");
    const [files, setFiles] = useState<
        (mongoose.Document<unknown, {}, IPDF> &
            IPDF &
            Required<{ _id: unknown }>)[]
    >([]);
    const [activeTab, setActiveTab] = useState<string>("");

    const getFileNames = async () => {
        try {
            const response = await fetch(`/api/pdfs?id=${userId}`, {
                method: "GET",
            });

            if (!response.ok) {
                console.error("Failed to get fileNames");
                return;
            }

            const data = await response.json();

            setFiles(data.files);

            if (!activeTab && data.files.length > 0) {
                setActiveTab(data.files[0].filename);
            }
        } catch (error) {
            console.error("Error getting fileNames", error);
        }
    };

    const handleUploadSuccess = (uploadedFilename: string) => {
        setFilename(uploadedFilename);
        getFileNames();
        setActiveTab(uploadedFilename);
    };

    const onTabChange = (value: string) => {
        setActiveTab(value);
    };

    useEffect(() => {
        getFileNames();
    }, [userId]);

    return (
        <div className="w-full h-full p-0">
            <TabsContent
                value="files"
                className="flex flex-col justify-start h-full p-0"
            >
                <Tabs
                    defaultValue={files[0]?.filename}
                    value={activeTab}
                    onValueChange={onTabChange}
                    className="flex h-full p-0"
                >
                    <div className="w-[17rem] p-4 flex flex-col gap-8 h-full border-r">
                        <TabTitle
                            title="Files"
                            option="Add A File"
                            userId={userId}
                            onUploadSuccess={handleUploadSuccess}
                        />
                        <TabCards tabList={files} />
                    </div>

                    {files &&
                        files.map((file) => (
                            <TabsContent
                                key={file.filename}
                                value={file.filename}
                                className={`w-full flex ${
                                    activeTab === file.filename
                                        ? "data-[state=active]:flex"
                                        : "data-[state=inactive]:hidden"
                                }`}
                            >
                                <PDFViewer
                                    userId={userId ? userId : ""}
                                    filename={file.filename}
                                />
                                <Tabs defaultValue="chat" className="w-full h-full">
                                    <TabsList>
                                        <TabsTrigger value="chat">Chat</TabsTrigger>
                                        <TabsTrigger value="notes">Notes</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="chat" className="h-full">
                                        <QuestionBar
                                            userId={userId ? userId : ""}
                                            filename={file.filename}
                                        />
                                    </TabsContent>
                                    <TabsContent value="notes">
                                        Notes
                                    </TabsContent>
                                </Tabs>
                            </TabsContent>
                        ))}
                </Tabs>
            </TabsContent>
        </div>
    );
};

export default FileTab;
