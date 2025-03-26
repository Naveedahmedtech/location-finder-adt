import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel",
    description: "Admin dashboard area",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <main className="flex-grow p-6 ">{children}</main>
        </div>
    );
};

export default AdminLayout;
