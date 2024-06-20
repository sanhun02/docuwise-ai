import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative h-screen w-screen flex flex-col">
            <NavBar />
            <div className="flex-grow flex flex-col items-center justify-center gap-10">
                <div className="flex flex-col text-center gap-4">
                    <h1 className="font-bold text-6xl">
                        Transform PDFs with DocuWise AI
                    </h1>
                    <h3 className="font-medium text-2xl opacity-65">
                        Quizzes, Flashcards, Highlights, and More
                    </h3>
                </div>

                <Button className="bg-[#7E01FF] hover:bg-[#7E01FF]/85 text-lg p-6">
                    Get Started For Free
                </Button>
            </div>
        </div>
    );
}
