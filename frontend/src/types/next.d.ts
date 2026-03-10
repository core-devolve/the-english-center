import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string; // ← add kiya
        } & DefaultSession["user"];
    }

    interface User {
        role: string; // ← add kiya
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string; // ← add kiya
    }
}