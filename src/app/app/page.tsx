import AppNavBar from "@/components/AppNavBar";
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import SideBar from "@/components/SideBar";
import FileTab from "@/components/FileTab";

type Props = {};

const App = (props: Props) => {
    return (
        <div className="flex flex-col min-h-screen p-0">
            <AppNavBar />
            <div className="flex flex-1 overflow-hidden p-0">
                <Tabs
                    defaultValue="files"
                    className="flex flex-1 overflow-hidden p-0"
                >
                    <SideBar />
                    <FileTab />
                </Tabs>
            </div>
        </div>
    );
};

export default App;
