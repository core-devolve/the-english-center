// src/app/api/videos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import {connectToDatabase} from "@/lib/db";
import Video from "@/model/Video";

// ── ImageKit server client ────────────────────────────────────────────────────
const imagekit = new ImageKit({
  publicKey:   process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey:  process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

// ── DELETE /api/videos/[id] ───────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const video = await Video.findById(params.id);
    if (!video) {
      return NextResponse.json(
        { success: false, error: "Video not found" },
        { status: 404 }
      );
    }

    // ── Delete from ImageKit first ──────────────────────────────────────────
    // Non-fatal: log the error but still remove the DB record so the admin
    // list stays consistent even if the ImageKit call fails.
    try {
      await imagekit.deleteFile(video.fileId);
    } catch (ikErr) {
      console.warn("[DELETE /api/videos] ImageKit delete failed:", ikErr);
    }

    // ── Delete from MongoDB ─────────────────────────────────────────────────
    await Video.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true, data: { id: params.id } });
  } catch (err: any) {
    console.error("[DELETE /api/videos]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Delete failed" },
      { status: 500 }
    );
  }
}

// ── GET /api/videos/[id] ──────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const video = await Video.findById(params.id).lean();
    if (!video) {
      return NextResponse.json(
        { success: false, error: "Video not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: video });
  } catch (err: any) {
    console.error("[GET /api/videos/:id]", err);
    return NextResponse.json(
      { success: false, error: err.message || "Fetch failed" },
      { status: 500 }
    );
  }
}