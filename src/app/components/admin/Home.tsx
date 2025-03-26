"use client";

import {useContent} from "@/context/ContentContext";
import LanguageEditor from "@/app/components/admin/LanguageEditor";
import AboutEditor from "@/app/components/admin/AboutEditor";
import PrivacyEditor from "@/app/components/admin/PrivacyEditor";
import {useSession} from "next-auth/react";

const LANGS = ["en", "es", "fr", "pt"];

const AdminHomePage = ({activeTab}: { activeTab: string }) => {
    const {
        currentLanguage,
        setLanguage,
        getPageContent,
        languages,
    } = useContent();

    const session = useSession();
    const token = session?.data?.user?.token;


    const content = getPageContent(activeTab);
    const currentLangData = content?.languages?.[currentLanguage];

    return (
        <div className="p-6">
            {/* Language Switcher */}
            <div className="flex space-x-2 mb-6">
                {LANGS.map((lang) => (
                    <button
                        key={lang}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                            currentLanguage === lang
                                ? "bg-primary text-white"
                                : "bg-background text-textPrimary border-border"
                        }`}
                        onClick={() => setLanguage(lang)}
                        disabled={!languages[lang]}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Language Editor */}
            {currentLangData ? (
                <>
                    {
                        activeTab === "about" ? (
                            <AboutEditor language={currentLanguage} data={currentLangData} token={token} />
                        ) : activeTab === "home" ? (
                            <LanguageEditor language={currentLanguage} data={currentLangData} token={token} />
                        ) : (
                            <PrivacyEditor language={currentLanguage} data={currentLangData} token={token} />
                        )
                    }
                </>
            ) : (
                <p className="text-textSecondary">Loading language content...</p>
            )}
        </div>
    );
};

export default AdminHomePage;
