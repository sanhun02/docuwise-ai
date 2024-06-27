import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { PDF } from "@/lib/mongo/models";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";

export async function POST(req: NextRequest) {
    await connectToDB();

    const formData = await req.formData();
    const filename = formData.get("filename") as string;
    const userId = formData.get("userId") as string;
    const question = formData.get("question") as string;

    if (!userId || !filename || !question) {
        return NextResponse.json(
            { message: "Missing userId, filename, or question" },
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

        const client = new MongoClient(process.env.MONGODB_URI || "");
        const namespace = "test.vectors";
        const [dbName, collectionName] = namespace.split(".");
        const collection = client.db(dbName).collection(collectionName);

        const vectorStore = new MongoDBAtlasVectorSearch(
            new OpenAIEmbeddings(),
            {
                collection,
                indexName: "vector_index",
                textKey: "text",
                embeddingKey: "embedding",
            }
        );

        const retriever = vectorStore.asRetriever();

        const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

        const systemTemplate = [
            `You are an assistant for answering questions about project management methodologies `,
            `and best practices. Use the following context to help answer `,
            `the question. If you don't know the answer, say that you `,
            `don't know. Use as many sentences you need, but keep the `,
            `answer concise.`,
            `\n\n`,
            `{context}`,
        ].join("");

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", systemTemplate],
            ["human", "{input}"],
        ]);

        const questionAnswerChain = await createStuffDocumentsChain({
            llm: model,
            prompt,
        });

        const ragChain = await createRetrievalChain({
            retriever,
            combineDocsChain: questionAnswerChain,
        });

        const results = await ragChain.invoke({ input: question });

        await client.close();

        return NextResponse.json({
            answer: results.answer,
            context: results.context,
        });
    } catch (error) {
        console.error("Error processing question:", error);
        
        return NextResponse.json(
            { message: "Unable to process question", error },
            { status: 500 }
        );
    }
}
