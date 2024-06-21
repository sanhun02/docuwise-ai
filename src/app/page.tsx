"use client";
import NavBar from "@/components/HomeNavBar";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div className="relative h-screen w-screen flex flex-col">
            <NavBar />
            <div className="flex-grow flex flex-col items-center justify-center gap-16">
                <div className="flex flex-col text-center gap-5">
                    <h1 className="font-black text-6xl">
                        Transform PDFs with DocuWise AI
                    </h1>
                    <h3 className="font-medium text-2xl opacity-65">
                        Quizzes, Flashcards, Highlights, and More
                    </h3>
                </div>

                <SignInButton>
                    <Button className="bg-[#7E01FF] hover:bg-[#7E01FF]/80 text-lg p-7 rounded-full">
                        Get Started For Free
                    </Button>
                </SignInButton>
            </div>
        </div>
    );
}
