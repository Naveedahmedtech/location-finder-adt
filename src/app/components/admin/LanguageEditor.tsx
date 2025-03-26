"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import { API_ENDPOINTS } from "@/config/constants";

interface LanguageContent {
    headline: string;
    intro_paragraph: string;
    cta: string;
    features: string[];
}

interface Props {
    language: string;
    data: any;
    token: string | undefined;
}

const LanguageEditor = ({ language, data, token }: Props) => {
    const [form, setForm] = useState<LanguageContent>({
        headline: data.headline || "",
        intro_paragraph: data.intro_paragraph || "",
        cta: data.cta || "",
        features: Array.isArray(data.features) ? data.features : [],
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setForm({
            headline: data.headline || "",
            intro_paragraph: data.intro_paragraph || "",
            cta: data.cta || "",
            features: Array.isArray(data.features) ? data.features : [],
        });
        setSuccess(false);
        setError(null);
    }, [data, language]);

    const updateField = (key: keyof LanguageContent, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const updateFeature = (index: number, value: string) => {
        const updated = [...form.features];
        updated[index] = value;
        setForm((prev) => ({ ...prev, features: updated }));
    };

    const addFeature = () =>
        setForm((prev) => ({
            ...prev,
            features: [...prev.features, ""],
        }));

    const removeFeature = (index: number) =>
        setForm((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));

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
                endpoint: API_ENDPOINTS.ADD_HOME_CONTENT,
                method: "POST",
                body: payload,
                token
            });

            if (!response) {
                throw new Error("Failed to save content.");
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
                <label className="font-semibold block mb-1">Headline</label>
                <input
                    className="w-full p-3 rounded-lg border border-border bg-background text-textPrimary"
                    value={form.headline}
                    onChange={(e) => updateField("headline", e.target.value)}
                />
            </div>

            <div>
                <label className="font-semibold block mb-1">Intro Paragraph</label>
                <textarea
                    className="w-full p-3 rounded-lg border border-border bg-background text-textPrimary"
                    value={form.intro_paragraph}
                    onChange={(e) => updateField("intro_paragraph", e.target.value)}
                />
            </div>

            <div>
                <label className="font-semibold block mb-1">Call To Action (CTA)</label>
                <textarea
                    className="w-full p-3 rounded-lg border border-border bg-background text-textPrimary"
                    value={form.cta}
                    onChange={(e) => updateField("cta", e.target.value)}
                />
            </div>

            <div>
                <label className="font-semibold block mb-2">Features</label>
                {form.features.map((feature, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            className="flex-1 p-2 rounded-lg border border-border bg-background text-textPrimary"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="ml-2 text-red-500 text-sm hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addFeature}
                    className="text-accent hover:underline text-sm mt-2"
                >
                    + Add Feature
                </button>
            </div>

            {error && <p className="text-sm text-error">{error}</p>}
            {success && <p className="text-sm text-green-600">Content updated successfully!</p>}

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

export default LanguageEditor;
