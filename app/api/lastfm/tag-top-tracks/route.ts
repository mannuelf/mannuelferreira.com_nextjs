import { getTagTopTracks } from "@/app/lib/lastfm-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag") || "electronic";
    const limit = Number(searchParams.get("limit")) || 12;
    const data = await getTagTopTracks(tag, limit);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching tag top tracks:", error);
    return NextResponse.json({ error: "Failed to fetch tag top tracks" }, { status: 500 });
  }
}
