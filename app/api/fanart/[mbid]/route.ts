import { getFanartData } from "@/app/lib/fanart-server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { mbid: string } }) {
  try {
    const { mbid } = await params;
    const data = await getFanartData(mbid);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Fanart data:", error);
    return NextResponse.json({ error: "Failed to fetch Fanart data" }, { status: 500 });
  }
}
