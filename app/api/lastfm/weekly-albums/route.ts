import { getWeeklyAlbums } from "@/app/lib/lastfm-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 22;
    const data = await getWeeklyAlbums(limit);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weekly albums:", error);
    return NextResponse.json({ error: "Failed to fetch weekly albums" }, { status: 500 });
  }
}
