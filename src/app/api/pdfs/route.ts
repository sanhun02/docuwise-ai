import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { PDF } from "@/lib/mongo/models";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
        return NextResponse.json(
            { message: "Missing userId" },
            { status: 400 }
        );
    }

    await connectToDB();

    try {
        const pdfs = await PDF.find({ userId });

        if (!pdfs) {
            return NextResponse.json(
                { message: "No files found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            files: pdfs.reverse(),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Unable to retrieve file", error },
            { status: 500 }
        );
    }
}
