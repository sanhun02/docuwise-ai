import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import mongoose from "mongoose";
import { IPDF } from "@/lib/mongo/models";

type Props = {
    tabList: (mongoose.Document<unknown, {}, IPDF> &
        IPDF &
        Required<{ _id: unknown }>)[];
};

function TabCards({ tabList }: Props) {
    return (
        <TabsList className="flex flex-col justify-start w-full h-full bg-transparent text-zinc-400 rounded-none overflow-y-auto">
            {tabList.map((tab) => (
                <TabsTrigger
                    key={tab.filename}
                    value={tab.filename}
                    className="capitalize flex text-sm gap-1 py-3 px-2 w-full justify-between items-center data-[state=active]:text-zinc-600 data-[state=active]:bg-zinc-100 data-[state=active]:rounded-md"
                >
                    <p className="overflow-hidden text-nowrap">{tab.filename}</p>
                </TabsTrigger>
            ))}
        </TabsList>
    );
}

export default TabCards;
