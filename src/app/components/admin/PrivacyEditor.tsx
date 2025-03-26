"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import { API_ENDPOINTS } from "@/config/constants";

interface Props {
    language: string;
    data: any;
    token: string | undefined;
}

const PrivacyEditor = ({ language, data, token }: Props) => {
    const [form, setForm] = useState<any>(data);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setForm(data);
        setSuccess(false);
        setError(null);
    }, [data, language]);

    const updateField = (
        key: any,
        value: any
    ) => {
        setForm((prev:any) => ({ ...prev, [key]: value }));
    };

    const updateHowWeUseInfo = (
        index: number,
        field: keyof any,
        value: string
    ) => {
        const updated = [...form.how_we_use_info];
        updated[index][field] = value;
        setForm((prev:any) => ({ ...prev, how_we_use_info: updated }));
    };

    const updateInfoWeCollect = (
        index: number,
        field: keyof any,
        value: string
    ) => {
        const updated = [...form.information_we_collect];
        updated[index][field] = value;
        setForm((prev:any) => ({ ...prev, information_we_collect: updated }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setSuccess(false);
            setError(null);

            const payload = {
                language,
                content: form,
            };

            const response = await apiRequest({
                endpoint: API_ENDPOINTS.ADD_PRIVACY_CONTENT,
                method: "POST",
                body: payload,
                token
            });

            if (!response) {
                throw new Error("Failed to update Privacy Policy content.");
            }

            setSuccess(true);
        } catch (err) {
            setError((err as Error).message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="font-semibold block mb-1">Introduction</label>
                <textarea
                    className="w-full p-3 border border-border rounded-lg bg-background text-textPrimary"
                    value={form.introduction}
                    onChange={(e) => updateField("introduction", e.target.value)}
                />
            </div>

            <div>
                <label className="font-semibold block mb-1">Effective Date</label>
                <input
                    className="w-full p-3 border border-border rounded-lg bg-background text-textPrimary"
                    value={form.effective_date}
                    onChange={(e) => updateField("effective_date", e.target.value)}
                />
            </div>

            <div>
                <label className="font-semibold block mb-2">How We Use Info</label>
                {form.how_we_use_info.map((item:any, index:any) => (
                    <div key={index} className="space-y-2 mb-4">
                        <input
                            className="w-full p-2 border border-border rounded-lg bg-background text-textPrimary"
                            placeholder="Title"
                            value={item.title}
                            onChange={(e) =>
                                updateHowWeUseInfo(index, "title", e.target.value)
                            }
                        />
                        <textarea
                            className="w-full p-2 border border-border rounded-lg bg-background text-textPrimary"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) =>
                                updateHowWeUseInfo(index, "description", e.target.value)
                            }
                        />
                    </div>
                ))}
            </div>

            <div>
                <label className="font-semibold block mb-2">Information We Collect</label>
                {form.information_we_collect.map((entry:any, index:any) => (
                    <div key={index} className="space-y-2 mb-4">
                        <input
                            className="w-full p-2 border border-border rounded-lg bg-background text-textPrimary"
                            placeholder="Title"
                            value={entry.title}
                            onChange={(e) =>
                                updateInfoWeCollect(index, "title", e.target.value)
                            }
                        />
                        <textarea
                            className="w-full p-2 border border-border rounded-lg bg-background text-textPrimary"
                            placeholder="Description"
                            value={entry.description}
                            onChange={(e) =>
                                updateInfoWeCollect(index, "description", e.target.value)
                            }
                        />
                    </div>
                ))}
            </div>

            {[
                "cookies",
                "data_security",
                "third_party_services",
                "your_rights",
                "contact_us",
                "changes",
            ].map((field) => (
                <div key={field}>
                    <label className="font-semibold block mb-1 capitalize">
                        {field.replaceAll("_", " ")}
                    </label>
                    <textarea
                        className="w-full p-3 border border-border rounded-lg bg-background text-textPrimary"
                        value={form[field as keyof any] as string}
                        onChange={(e) =>
                            updateField(field as keyof any, e.target.value)
                        }
                    />
                </div>
            ))}

            {error && <p className="text-sm text-error">{error}</p>}
            {success && (
                <p className="text-sm text-green-600">Privacy policy updated!</p>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`bg-button text-text py-2 px-6 rounded-lg transition ${
                    loading ? "opacity-60 cursor-not-allowed" : "hover:bg-buttonHover"
                }`}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
};

export default PrivacyEditor;
