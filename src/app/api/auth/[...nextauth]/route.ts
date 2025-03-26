// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {NextAuthOptions} from "next-auth";
import {API_CONFIG} from "@/config/constants";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Email", type: "text", placeholder: "example@email.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials) {
                    console.warn("Missing credentials.");
                    return null;
                }

                try {
                    const loginEndpoint = `${API_CONFIG.SERVER_URL}/auth/login`;

                    console.log("Sending credentials to:", loginEndpoint);
                    const body = {
                        username: credentials.username,
                        password: credentials.password,
                    }
                    console.log("sending payload to:", body);
                    const res = await fetch(loginEndpoint, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(body),
                    });

                    console.log("FastAPI response status:", res.status);

                    if (!res.ok) {
                        const errorBody = await res.json().catch(() => ({}));
                        console.error("Login failed:", errorBody);
                        return null;
                    }

                    const user = await res.json();
                    console.log("User response from FastAPI:", user);

                    if (user && user.token) {
                        return {
                            id: user.id ?? "no-id",
                            name: user.username,
                            token: user.token,
                        };
                    }

                    console.warn("User or token missing from response.");
                    return null;
                } catch (err) {
                    console.error("Exception during login:", err);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/api/auth/signin", // built-in signin page
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.token = token.token;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
