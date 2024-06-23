import AppNavBar from "@/components/AppNavBar";
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import SideBar from "@/components/SideBar";
import FileTab from "@/components/FileTab";
import { auth } from "@clerk/nextjs/server";

type Props = {};

const App = (props: Props) => {
    const { userId } = auth();
    return (
        <div className="flex flex-col min-h-screen p-0">
            <AppNavBar />
            <div className="flex flex-1 overflow-hidden p-0">
                <Tabs
                    defaultValue="files"
                    className="flex flex-1 overflow-hidden p-0"
                >
                    <SideBar />
                    <FileTab userId={userId}/>
                </Tabs>
            </div>
        </div>
    );
};

export default App;
