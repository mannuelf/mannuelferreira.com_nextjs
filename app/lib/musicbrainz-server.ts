import { MUSICBRAINZ } from "@/lib/musicbrainz/musicbrainz-cover-art";
import type { MusicBrainzCoverArt } from "@/lib/musicbrainz/musicbrainz-cover-art.types";

export async function getMusicBrainzCoverArt(
  albumMbId: string,
): Promise<MusicBrainzCoverArt.RootObject> {
  const response = await fetch(`${MUSICBRAINZ.base_url}/release/${albumMbId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch MusicBrainz data: ${response.statusText}`);
  }

  return response.json();
}
