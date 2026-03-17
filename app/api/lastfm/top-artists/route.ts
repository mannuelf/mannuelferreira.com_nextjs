import { getTopArtists } from "@/app/lib/lastfm-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 50;
    const period = searchParams.get("period") || "overall";
    const data = await getTopArtists(limit, period);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return NextResponse.json({ error: "Failed to fetch top artists" }, { status: 500 });
  }
}
