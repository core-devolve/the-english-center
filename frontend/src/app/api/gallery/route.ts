// app/api/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";  // ✅ your existing connection
import Upload from "@/model/upload";

export async function GET() {
  try {
    await connectToDatabase();
    const moments = await Upload.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: moments });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { url, title, description, category, date } = await req.json();
    if (!url || !title || !description || !category || !date)
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    const moment = await Upload.create({ url, title, description, category, date });
    return NextResponse.json({ success: true, data: moment }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}