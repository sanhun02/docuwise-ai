import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

type Props = {};

const AppNavBar = (props: Props) => {
    return (
        <nav className="py-2 px-4 flex justify-between items-center border-b border-zinc-200">
            <Link href={"/"}>
                <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
            </Link>

            <div className="flex items-center gap-4">
                <Button
                    variant={"outline"}
                    className="flex gap-2 font-medium rounded-lg"
                >
                    <Sparkles color="#FDB515" className="h-4 w-4" />
                    Upgrade
                </Button>

                <UserButton />
            </div>
        </nav>
    );
};

export default AppNavBar;
