import { FANART_TV } from "@/lib/fanarttv/fanarttv";
import type { FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";

export async function getFanartData(mbid: string): Promise<FanArtArtistResponse> {
  const response = await fetch(`${FANART_TV.base_url}${mbid}?api_key=${FANART_TV.api_key}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Fanart data: ${response.statusText}`);
  }

  return response.json();
}
