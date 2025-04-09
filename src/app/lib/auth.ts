import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { API_CONFIG } from "@/config/constants"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "example@email.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null

                try {
                    const loginEndpoint = `${API_CONFIG.SERVER_URL}/auth/login`
                    const body = {
                        username: credentials.username,
                        password: credentials.password,
                    }

                    const res = await fetch(loginEndpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    })

                    if (!res.ok) return null
                    const user = await res.json()

                    if (user && user.token) {
                        return {
                            id: user.id ?? "no-id",
                            name: user.username,
                            token: user.token,
                        }
                    }

                    return null
                } catch (err) {
                    console.error("Login error:", err)
                    return null
                }
            },
        }),
    ],
    pages: {
        signIn: "/api/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.token = user.token
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.token = token.token
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}
