import { getMusicBrainzCoverArt } from "@/app/lib/musicbrainz-server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { mbid: string } }) {
  try {
    const { mbid } = await params;
    const data = await getMusicBrainzCoverArt(mbid);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching MusicBrainz data:", error);
    return NextResponse.json({ error: "Failed to fetch MusicBrainz data" }, { status: 500 });
  }
}
