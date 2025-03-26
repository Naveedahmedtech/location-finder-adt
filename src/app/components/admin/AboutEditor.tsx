"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/api";
import { API_ENDPOINTS } from "@/config/constants";

interface AboutEditorProps {
    language: string;
    data: any;
    token: string | undefined;
}

const AboutEditor = ({ language, data, token }: AboutEditorProps) => {
    const [form, setForm] = useState({
        title: data.title || "",
        paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : [],
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setForm({
            title: data.title || "",
            paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : [],
        });
        setSuccess(false);
        setError(null);
    }, [data, language]);

    const updateTitle = (value: string) => {
        setForm((prev) => ({ ...prev, title: value }));
    };

    const updateParagraph = (index: number, value: string) => {
        const updated = [...form.paragraphs];
        updated[index] = value;
        setForm((prev) => ({ ...prev, paragraphs: updated }));
    };

    const addParagraph = () =>
        setForm((prev) => ({
            ...prev,
            paragraphs: [...prev.paragraphs, ""],
        }));

    const removeParagraph = (index: number) =>
        setForm((prev) => ({
            ...prev,
            paragraphs: prev.paragraphs.filter((_:any, i:any) => i !== index),
        }));

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const payload = {
                language,
                content: form,
            };

            const response = await apiRequest({
                endpoint: API_ENDPOINTS.ADD_ABOUT_CONTENT,
                method: "POST",
                body: payload,
                token
            });

            if (!response) {
                throw new Error("Failed to update About content");
            }

            setSuccess(true);
        } catch (err) {
            setError((err as Error).message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="font-semibold block mb-1">Title</label>
                <input
                    className="w-full p-3 rounded-lg border border-border bg-background text-textPrimary"
                    value={form.title}
                    onChange={(e) => updateTitle(e.target.value)}
                />
            </div>

            <div>
                <label className="font-semibold block mb-2">Paragraphs</label>
                {form.paragraphs.map((paragraph:any, index:any) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
            <textarea
                className="flex-1 p-3 rounded-lg border border-border bg-background text-textPrimary"
                rows={3}
                value={paragraph}
                onChange={(e) => updateParagraph(index, e.target.value)}
            />
                        <button
                            type="button"
                            onClick={() => removeParagraph(index)}
                            className="text-red-500 text-sm hover:underline mt-1"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addParagraph}
                    className="text-accent hover:underline text-sm mt-2"
                >
                    + Add Paragraph
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

export default AboutEditor;
