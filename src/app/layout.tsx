import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "DocuWise AI",
    description:
        "DocuWise AI is a comprehensive SaaS solution for PDF file management, offering innovative features such as question generation, quiz creation, intelligent highlighting, and flashcard generation. Simplify your document workflow and enhance productivity with DocuWise AI.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        poppins.variable
                    )}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
