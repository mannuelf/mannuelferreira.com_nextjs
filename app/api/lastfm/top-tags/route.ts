import { getUserTopTags } from "@/app/lib/lastfm-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 50;
    const data = await getUserTopTags(limit);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching top tags:", error);
    return NextResponse.json({ error: "Failed to fetch top tags" }, { status: 500 });
  }
}
