import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabTitle from "./TabTitle";
import TabCards from "./TabCards";
import { Button } from "./ui/button";

type Props = {
    userId: string | null;
};

const fileNames = [
    "doc1",
    "doc2",
    "doc3",
    "doc4",
    "doc5",
    "doc6",
    "doc7",
    "doc8",
    "doc9",
    "doc10",
];

const FileTab = ({userId}: Props) => {
    return (
        <div className="w-full h-full p-0">
            <TabsContent
                value="files"
                className="flex flex-col justify-start h-full p-0"
            >
                <Tabs defaultValue="doc10" className="flex h-full p-0">
                    <div className="w-1/6 p-4 flex flex-col gap-8 h-full border-r">
                        <TabTitle
                            title="Files"
                            option="Add A File"
                            userId={userId}
                        />
                        <TabCards tabList={fileNames} />
                    </div>
                    <TabsContent value="doc10">
                        <Button>Press Me</Button>
                    </TabsContent>
                </Tabs>
            </TabsContent>
        </div>
    );
};

export default FileTab;
