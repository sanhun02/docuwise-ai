import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

type Props = {};

const NavBar = (props: Props) => {
    return (
        <nav className="flex py-5 px-20 justify-between">
            <div className="flex gap-10 items-center">
                <div>
                    <Link href={"/"} className="flex items-center gap-1">
                        <Image
                            src={"logo.svg"}
                            width={37}
                            height={37}
                            alt="logo"
                        ></Image>
                        <h1 className="text-2xl font-medium">
                            DocuWise AI
                        </h1>
                    </Link>
                </div>

                <div className="flex gap-8">
                    <Link
                        className="hover:underline underline-offset-4"
                        href={"/features"}
                    >
                        Features
                    </Link>
                    <Link
                        className="hover:underline underline-offset-4"
                        href={"/pricing"}
                    >
                        Pricing
                    </Link>
                </div>
            </div>

            <SignInButton>
                <Button variant={"outline"} className="rounded-full">
                    Sign In
                </Button>
            </SignInButton>
        </nav>
    );
};

export default NavBar;
