// src/api/auth/[...nextauth]/routes.ts
import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };