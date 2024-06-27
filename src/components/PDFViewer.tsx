interface Props {
    userId: string;
    filename: string;
}

function PDFViewer({ userId, filename }: Props) {
    const pdfUrl = `/api/download?userId=${userId}&filename=${filename}`;

    return (
        <div className="flex flex-col gap-5 h-full pb-10 px-5 w-1/2 border-r">
            <p className="font-semibold text-lg w-full overflow-hidden truncate">
                {filename}
            </p>

            {filename && (
                <iframe
                    src={pdfUrl}
                    className="border-none shadow-lg w-full rounded-xl h-full"
                ></iframe>
            )}
        </div>
    );
}

export default PDFViewer;
