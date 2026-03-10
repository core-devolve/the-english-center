// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Course from "@/model/Course";

// GET /api/courses — fetch all courses
export async function GET() {
    try {
        await connectToDatabase();
        const courses = await Course.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: courses });
    } catch {
        return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
    }
}

// POST /api/courses — create a new course
export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const {
            category, title, tagline, desc,
            price, originalPrice, isFree,
            level, rating, language,
            certificate, icon, bgFrom, bgTo,
            tag, features,
        } = body;

        // Required field check
        if (!category || !title || !tagline || !desc || !price || !originalPrice || !level || !language || !icon || !bgFrom || !bgTo) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const course = await Course.create({
            category, 
            title, 
            tagline, 
            desc,
            price, 
            originalPrice,
            isFree: isFree ?? false,
            level, 
            rating, 
            language,
            certificate: certificate ?? false,
            icon, 
            bgFrom, 
            bgTo,
            tag: tag || undefined,
            features: features ?? [],
        });

        return NextResponse.json({ success: true, data: course }, { status: 201 });
    } catch {
        return NextResponse.json({ success: false, error: "Failed to create" }, { status: 500 });
    }
}