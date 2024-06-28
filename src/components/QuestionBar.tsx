"use client";

import { useChat } from "ai/react";

interface Props {
    userId: string;
    filename: string;
}
function QuestionBar({ userId, filename }: Props) {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        body: { filename }
    });

    return (
        <div className="flex flex-col w-full justify-between max-h-[calc(100vh-8rem)] px-5 pb-2 gap-5">
            <div className="h-auto max-h-[calc(100vh-13rem)] overflow-y-auto">
                {messages.length > 0
                    ? messages.map((m) => (
                          <div key={m.id} className="whitespace-pre-wrap">
                              {m.role === "user" ? "User: " : "AI: "}
                              {m.content}
                          </div>
                      ))
                    : null}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    className="fixed bottom-8 w-full max-w-md p-2 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}

export default QuestionBar;
