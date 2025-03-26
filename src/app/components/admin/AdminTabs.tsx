"use client";

import { ReactNode } from "react";
import { HomeIcon, InfoIcon, ShieldCheckIcon } from "lucide-react";
import {AdminTab, AdminTabsProps} from "@/types";

const tabs: { label: string; key: AdminTab; icon: ReactNode }[] = [
    { label: "Home", key: "home", icon: <HomeIcon size={16} /> },
    { label: "About", key: "about", icon: <InfoIcon size={16} /> },
    { label: "Privacy Policy", key: "privacy", icon: <ShieldCheckIcon size={16} /> },
];

const AdminTabs = ({ activeTab, onChange }: AdminTabsProps) => {
    return (
        <div
            className="inline-flex space-x-2 mb-6 bg-surface rounded-xl p-1 border border-border"
            role="tablist"
        >
            {tabs.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                    <button
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                            isActive
                                ? "bg-primary text-text shadow-sm"
                                : "text-textSecondary hover:bg-muted"
                        }`}
                        role="tab"
                        aria-selected={isActive}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

export default AdminTabs;
