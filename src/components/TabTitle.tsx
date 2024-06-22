import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
    title: string;
    option: string;
};

const TabTitle = ({ title, option }: Props) => {
    return (
        <div className="flex items-center justify-between gap-5">
            <p className="text-2xl font-semibold">{title}</p>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-lg w-8 h-8 p-0 hover:bg-zinc-100"
                        >
                            <Plus className="w-5 h-5 cursor-pointer" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{option}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default TabTitle;
