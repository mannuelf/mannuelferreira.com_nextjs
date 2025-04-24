import { FANART_TV } from "@/lib/fanarttv/fanarttv";
import { Artistbackground, FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";
import LastFmApi from "lastfm-nodejs-client";
import type { Artist } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { ScrobblesCard } from "./scrobblesCard";

type TransformedArtist = {
  image: string;
  name: string;
  url: string;
  playcount: number;
};

export const dynamic = "force-dynamic";

export async function getTopArtists() {
  const lastFm = LastFmApi();
  const { config, method } = lastFm;

  const data = await lastFm.getTopArtists(
    method.user.getTopArtists,
    config.username,
    "overall",
    "50",
  );
  return data;
}

export const getFanartTvData = async (mbid: string): Promise<FanArtArtistResponse> => {
  const FANART_TV_ENDPOINT = `${FANART_TV.base_url}${mbid}?api_key=${FANART_TV.api_key}`;
  const data = await fetch(FANART_TV_ENDPOINT, { cache: "no-store" });
  return data.json() satisfies Promise<FanArtArtistResponse>;
};

export default async function TopArtists() {
  const { topartists } = await getTopArtists();
  const { artist } = topartists;
  const artistMbIds: string[] = artist.map((artist: Artist) => artist.mbid);

  const fanartTvResponses = await Promise.allSettled(
    artistMbIds.map(async (mbId) => {
      if (!mbId) {
        return;
      }
      const res = await fetch(`${FANART_TV.base_url}${mbId}?api_key=${FANART_TV.api_key}`, {
        cache: "no-store",
      });
      if (res.status === 200) {
        return res.json() satisfies Promise<FanArtArtistResponse>;
      }
      return {
        ...res,
      };
    }),
  );
  let fanArtTvResult: FanArtArtistResponse[] = fanartTvResponses
    .map(({ value }: any) => {
      return value;
    })
    .filter(Boolean);

  const getTopArtistImage = (mbid: string): string => {
    if (!mbid) return "";
    let imageUrl = "";
    fanArtTvResult.find((artist) => {
      if (artist.mbid_id === mbid) {
        artist.artistbackground?.map((artistBackground: Artistbackground) => {
          imageUrl = artistBackground.url;
        });
      }
    });
    return imageUrl;
  };

  const topArtistsWithImages = artist.map((artist: Artist, index: number) => {
    return {
      ...artist,
      image: getTopArtistImage(artist.mbid),
    } as TransformedArtist;
  });

  return (
    <div>
      <div className="pb-2 pl-4" id="#topartists">
        <h2 className="text-2xl font-medium">Top Artists</h2>
        <p>Scrobbles since 2008</p>
      </div>
      <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 top-artist sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {topArtistsWithImages && topArtistsWithImages.length
          ? topArtistsWithImages.map((artist: TransformedArtist, index: number) => (
              <ScrobblesCard
                playCount={artist.playcount.toString()}
                playTitle={artist.name}
                subTitle={""}
                title={artist.name}
                siteUrl={artist.url}
                imageUrl={artist.image}
                key={`${artist.name.trim().replace(/\s/gm, "")}-topartist-${index}`}
              />
            ))
          : null}
      </div>
    </div>
  );
}
