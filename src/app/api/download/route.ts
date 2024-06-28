import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { PDF } from "@/lib/mongo/models";

export async function GET(req: NextRequest) {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const filename = searchParams.get("filename");

    if (!userId || !filename) {
        return NextResponse.json(
            { message: "Error retrieving userId or filename" },
            { status: 400 }
        );
    }

    try {
        const pdf = await PDF.findOne({ userId, filename });

        if (!pdf) {
            return NextResponse.json(
                { message: "File not found" },
                { status: 404 }
            );
        }

        return new NextResponse(pdf.content, {
            headers: {
                "Content-Type": pdf.contentType,
                "Content-Disposition": `inline; filename="${pdf.filename}"`,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Unable to retrieve file", error },
            { status: 500 }
        );
    }
}
