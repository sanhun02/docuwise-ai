import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const NavBar = (props: Props) => {
    return (
        <nav>
            <div className="flex">
                <div className="flex items-center gap-1 p-2">
                    <Image
                        src={"logo.svg"}
                        width={40}
                        height={40}
                        alt="logo"
                    ></Image>
                    <h1 className="text-2xl font-medium">DocuWise AI</h1>
                </div>

                <div>
                    <Link href={'/features'}>Features</Link>
                    <Link href={'/pricing'}>Pricing</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
