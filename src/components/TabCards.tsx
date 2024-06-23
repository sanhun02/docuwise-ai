import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
    tabList: string[];
};

function TabCards({ tabList }: Props) {
    return (
        <TabsList className="flex flex-col justify-start w-full h-full bg-transparent text-zinc-400 rounded-none overflow-y-auto">
            {tabList.map((tab, ind) => (
                <TabsTrigger
                    key={tab + ind}
                    value={tab + ind}
                    className="capitalize flex text-sm gap-1 py-3 px-2 w-full justify-between items-center data-[state=active]:text-zinc-600 data-[state=active]:bg-zinc-100 data-[state=active]:rounded-md"
                >
                    <p className="overflow-hidden text-nowrap">{tab}</p>
                </TabsTrigger>
            ))}
        </TabsList>
    );
}

export default TabCards;
