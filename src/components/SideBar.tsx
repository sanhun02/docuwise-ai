import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Files } from "lucide-react";
import { SquarePen } from "lucide-react";
import { GalleryVerticalEnd } from "lucide-react";
import { NotebookText } from "lucide-react";

type Props = {};

const functions = ["files", "notes", "quizzes", "flashcards"];

const SideBar = (props: Props) => {
    return (
        <div className="flex flex-col">
            <TabsList className="flex flex-col px-2 py-4 gap-5 justify-start h-full bg-transparent text-zinc-400 border-r rounded-none overflow-y-auto">
                {functions.map((func: string, ind: number) => (
                    <TabsTrigger
                        key={ind}
                        value={func}
                        className="capitalize flex flex-col text-xs gap-1 p-1.5 w-full justify-center items-center cursor-pointer data-[state=active]:text-zinc-600 data-[state=active]:bg-zinc-100 data-[state=active]:rounded-lg"
                    >
                        {ind == 0 ? (
                            <Files />
                        ) : ind == 1 ? (
                            <NotebookText />
                        ) : ind == 2 ? (
                            <SquarePen />
                        ) : (
                            <GalleryVerticalEnd />
                        )}
                        {func}
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>
    );
};

export default SideBar;
