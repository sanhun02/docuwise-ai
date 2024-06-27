"use client";

import React, { useState } from "react";

interface Props {
    userId: string;
    filename: string;
}
function QuestionBar({ userId, filename }: Props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("filename", filename);
        formData.append("userId", userId || "");
        formData.append("question", question);

        try {
            const response = await fetch("/api/ask", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error("Failed to get answer");
                return;
            }

            const data = await response.json();
            console.log("Upload complete", data);
            setAnswer(data.answer);
        } catch (error) {
            console.error("Error during question submission", error);
        }
    };

    return (
        <div className="w-1/2 text-wrap">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question about the PDF"
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {answer && (
                <div>
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
}

export default QuestionBar;
