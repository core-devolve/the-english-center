// src/api/enqury/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import enqury from "@/model/admission";

export async function GET() {
    try {
        await connectToDatabase();
        const messages = await enqury.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: messages })

    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {

    try {
        await connectToDatabase();
        const {
            name,
            phone,
            email,
            city,
            level,
            schedule,
            message,
        } = await req.json()

        if (!name || !phone || !email || !city || !level || !schedule || !message) {
            NextResponse.json({ success: false, error: "All fields required" }, { status: 400 })
        }

        const messages = await enqury.create({
            name,
            phone,
            email,
            city,
            level,
            schedule,
            message,
        })

        return NextResponse.json({ success: true, data: messages }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
    }
}