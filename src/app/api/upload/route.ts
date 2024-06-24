import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { PDF } from "@/lib/mongo/models";

export async function POST(req: NextRequest) {
    await connectToDB();

    // Get the form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
        return NextResponse.json(
            { message: "Missing file or userId" },
            { status: 400 }
        );
    }

    try {
        const existingPDF = await PDF.findOne({ userId, filename: file.name });
        
        if (existingPDF) {
            return NextResponse.json(
                { message: "File already uploaded" },
                { status: 409 }
            );
        }

        const contentBuffer = Buffer.from(await file.arrayBuffer());

        const newPDF = new PDF({
            userId,
            filename: file.name,
            content: contentBuffer,
            contentType: file.type,
        });

        await newPDF.save();

        return NextResponse.json({
            message: "File uploaded successfully!",
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Unable to upload file", error },
            { status: 500 }
        );
    }
}
