// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/model/user";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                secretPath: { label: "Secret", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials) throw new Error("Missing credentials");

                console.log("SECRET CHECK:", credentials.secretPath, "===", process.env.ADMIN_SECRET_PATH);

                if (credentials.secretPath !== process.env.ADMIN_SECRET_PATH) {
                    throw new Error("Unauthorized");
                }

                await connectToDatabase();
                const user = await User.findOne({ email: credentials.email });

                if (!user) throw new Error("Invalid email or password");

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) throw new Error("Invalid email or password");

                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role, // ← DB se role le rahe hain
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role; // ← role token mein daala
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as any).role = token.role; // ← role session mein daala
            }
            return session;
        },
    },
    pages: {
        signIn: `/${process.env.ADMIN_SECRET_PATH}/login`, // ← fixed path
        error: `/${process.env.ADMIN_SECRET_PATH}/login`,
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};