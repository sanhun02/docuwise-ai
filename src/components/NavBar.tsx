import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

type Props = {};

const NavBar = (props: Props) => {
    return (
        <nav className="flex py-5 px-20 justify-between">
            <div className="flex gap-10 items-center">
                <div>
                    <Link href={"/"} className="flex items-center gap-1">
                        <Image
                            src={"logo.svg"}
                            width={35}
                            height={35}
                            alt="logo"
                        ></Image>
                        <h1 className="text-2xl font-medium">DocuWise <span className="text-[#7E01FF]">AI</span></h1>
                    </Link>
                </div>

                <div className="flex gap-8">
                    <Link className="opacity-65 hover:opacity-100 hover:underline underline-offset-4" href={"/features"}>Features</Link>
                    <Link className="opacity-65 hover:opacity-100 hover:underline underline-offset-4" href={"/pricing"}>Pricing</Link>
                </div>
            </div>

            <Button variant="outline" className="rounded-full text-base">Sign In</Button>
        </nav>
    );
};

export default NavBar;
