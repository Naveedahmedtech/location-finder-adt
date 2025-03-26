"use client";

import { ShieldCheck, Info, Lock, Cookie, Mail, Repeat2, User } from "lucide-react";
import { useContent } from "@/context/ContentContext";



const Section = ({
                     title,
                     icon,
                     children,
                 }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) => (
    <section className="border-b border-border pb-6 mb-6">
        <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-xl">
            {icon}
            <h2>{title}</h2>
        </div>
        <div className="text-text">{children}</div>
    </section>
);

const PrivacyPolicyViewer = () => {
    const { currentLanguage, getPageContent } = useContent();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content:any = getPageContent("privacy")?.languages?.[currentLanguage] as any;

    if (!content) {
        return <p className="text-center text-textSecondary mt-10">Privacy policy not available.</p>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-textPrimary">
            <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
                <ShieldCheck size={28} />
                Privacy Policy
            </h1>

            <p className="mb-6 text-base leading-relaxed text-textSecondary">{content.introduction}</p>

            <Section title="Effective Date" icon={<Info size={18} />}>
                <p>{content.effective_date}</p>
            </Section>

            <Section title="Information We Collect" icon={<User size={18} />}>
                {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                {content.information_we_collect.map((item:any, i:any) => (
                    <div key={i} className="mb-4">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-textSecondary">{item.description}</p>
                    </div>
                ))}
            </Section>

            <Section title="How We Use Information" icon={<Repeat2 size={18} />}>
                <div className="space-y-4">
                    {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                    {content.how_we_use_info.map((item:any, i:any) => (
                        <div key={i}>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-textSecondary">{item.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Cookies" icon={<Cookie size={18} />}>
                <p>{content.cookies}</p>
            </Section>

            <Section title="Data Security" icon={<Lock size={18} />}>
                <p>{content.data_security}</p>
            </Section>

            <Section title="Third-Party Services" icon={<ShieldCheck size={18} />}>
                <p>{content.third_party_services}</p>
            </Section>

            <Section title="Your Rights" icon={<User size={18} />}>
                <p>{content.your_rights}</p>
            </Section>

            <Section title="Contact Us" icon={<Mail size={18} />}>
                <p>{content.contact_us}</p>
            </Section>

            <Section title="Policy Updates" icon={<Info size={18} />}>
                <p>{content.changes}</p>
            </Section>
        </div>
    );
};

export default PrivacyPolicyViewer;
