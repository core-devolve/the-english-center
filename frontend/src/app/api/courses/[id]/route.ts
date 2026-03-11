import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Course from "@/model/Course";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}