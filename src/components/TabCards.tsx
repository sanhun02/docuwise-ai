import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ellipsis } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
    tabList: string[];
};

function TabCards({ tabList }: Props) {
    return (
        <TabsList className="flex flex-col justify-start w-full h-full bg-transparent text-zinc-400 rounded-none overflow-y-auto">
            {tabList.map((tab, ind) => (
                <TabsTrigger
                    value={tab + ind}
                    className="capitalize flex text-sm gap-1.5 py-3 px-2 w-full justify-between items-center data-[state=active]:text-zinc-600 data-[state=active]:bg-zinc-100 data-[state=active]:rounded-md"
                >
                    <p className="overflow-hidden text-nowrap">{tab}</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Ellipsis className="w-5 h-5" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Options</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="flex">
                                <p>Rename</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex">
                                <p>Delete</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TabsTrigger>
            ))}
        </TabsList>
    );
}

export default TabCards;
