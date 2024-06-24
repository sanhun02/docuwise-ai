import React from "react";
import PDFUpload from "./PDFUpload";

type Props = {
    title: string;
    option: string;
    userId: string | null;
    onUploadSuccess: (filename: string) => void;
};

const TabTitle = ({ title, option, userId, onUploadSuccess }: Props) => {
    return (
        <div className="flex items-center justify-between gap-5">
            <p className="text-2xl font-semibold">{title}</p>
            <div>
                <PDFUpload userId={userId} onUploadSuccess={onUploadSuccess} />
            </div>
        </div>
    );
};

export default TabTitle;
