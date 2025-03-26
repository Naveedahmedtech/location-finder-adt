"use client";

import { useState } from "react";
import AdminTabs from "@/app/components/admin/AdminTabs";
import Home from "@/app/components/admin/Home";


type Tab = "home" | "about" | "privacy";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>("home");

    const renderSection = () => {
        switch (activeTab) {
            case "home":
                return <Home activeTab={'home'} />;
            case "about":
                return <Home activeTab={'about'} />;
            case "privacy":
                return <Home activeTab={'privacy'} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Manage {activeTab} Content</h1>
            <AdminTabs activeTab={activeTab} onChange={setActiveTab} />
            {renderSection()}
        </div>
    );
};

export default AdminPage;
