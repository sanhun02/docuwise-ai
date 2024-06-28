import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { Message, StreamingTextResponse, LangChainAdapter } from "ai";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
    await connectToDB();

    const { messages, filename }: { messages: Message[]; filename: string } =
        await req.json();

    if (!messages || !filename) {
        return NextResponse.json(
            { message: "Error retrieving messages or filename" },
            { status: 400 }
        );
    }

    const client = new MongoClient(process.env.MONGODB_URI || "");
    const namespace = "test.vectors";
    const [dbName, collectionName] = namespace.split(".");
    const collection = client.db(dbName).collection(collectionName);

    try {
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

        const model = new ChatOpenAI({
            model: "gpt-3.5-turbo",
            temperature: 0,
        });

        const relevantDocs = await retriever._getRelevantDocuments(
            messages.at(-1)?.content!
        );

        const context = relevantDocs
            .filter((doc) => doc.metadata.fileName === filename)
            .map((doc) => doc.pageContent)
            .join("\n-----\n");

        const systemTemplate = [
            `You are an assistant for answering questions about project management methodologies `,
            `and best practices. Use the following context to help answer `,
            `the question. If you don't know the answer, say that you `,
            `don't know. Use as many sentences you need, but keep the `,
            `answer concise.`,
            `\n\n`,
            `Context:\n`,
            `${context}`,
        ].join("");

        const userMessagesWithContext = [
            new AIMessage(systemTemplate),
            ...messages.map((message) =>
                message.role == "user"
                    ? new HumanMessage(message.content)
                    : new AIMessage(message.content)
            ),
        ];

        const stream = await model.stream(userMessagesWithContext);

        const aiStream = LangChainAdapter.toAIStream(stream);

        await client.close();

        return new StreamingTextResponse(aiStream);
    } catch (error) {
        console.error("Error processing question:", error);

        return NextResponse.json(
            { message: "Unable to process question", error },
            { status: 500 }
        );
    }
}
