"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ContentProvider } from "@/context/ContentContext";

type Props = {
    children: React.ReactNode;
};

const ClientProviders = ({ children }: Props) => {
    return (
        <SessionProvider>
            <ThemeProvider>
                <ContentProvider>{children}</ContentProvider>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default ClientProviders;
