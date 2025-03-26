"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // 🔒 Prevent full page reload
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid credentials");
        } else {
            router.push("/admin/home");
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="max-w-md mx-auto bg-surface border border-border text-textPrimary p-8 rounded-2xl shadow-md"
        >
            <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full p-3 border border-border rounded-lg bg-background text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border border-border rounded-lg bg-background text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <p className="text-sm text-error text-center">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        loading
                            ? "bg-buttonHover cursor-not-allowed text-textSecondary"
                            : "bg-button hover:bg-buttonHover text-text"
                    }`}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
