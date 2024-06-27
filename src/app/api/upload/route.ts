import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { PDF } from "@/lib/mongo/models";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import fs from "fs";
import path from "path";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
        return NextResponse.json(
            { message: "Missing file or userId" },
            { status: 400 }
        );
    }
    
    await connectToDB();

    try {
        const existingPDF = await PDF.findOne({ userId, filename: file.name });

        if (existingPDF) {
            return NextResponse.json(
                { message: "File already uploaded" },
                { status: 409 }
            );
        }

        const client = new MongoClient(process.env.MONGODB_URI || "");
        const namespace = "test.vectors";
        const [dbName, collectionName] = namespace.split(".");
        const collection = client.db(dbName).collection(collectionName);

        const contentBuffer = Buffer.from(await file.arrayBuffer());

        const tmpPath = path.join("/tmp", file.name);
        fs.writeFileSync(tmpPath, contentBuffer);

        const loader = new PDFLoader(tmpPath);
        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const splits = await textSplitter.splitDocuments(docs);

        await MongoDBAtlasVectorSearch.fromDocuments(
            splits.map((doc) => ({
                ...doc,
                metadata: {
                    fileName: file.name,
                },
            })),
            new OpenAIEmbeddings(),
            {
                collection,
                indexName: "vector_index",
                textKey: "text",
                embeddingKey: "embedding",
            }
        );

        const newPDF = new PDF({
            userId,
            filename: file.name,
            content: contentBuffer,
            contentType: file.type,
        });

        await newPDF.save();
        await client.close();

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
