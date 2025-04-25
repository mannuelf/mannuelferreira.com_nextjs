"use client";

import type { Artist } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { useFanartTvData, useTopArtists } from "../_hooks/useScrobbles";
import { ScrobblesCard } from "./scrobblesCard";

type TopArtistProps = {
  image: string;
  name: string;
  url: string;
  playcount: number;
};

export default function TopArtists() {
  const {
    data: topArtistsData,
    isLoading: isLoadingArtists,
    error: artistsError,
  } = useTopArtists();
  const artistMbIds = topArtistsData?.artist.map((artist: Artist) => artist.mbid) || [];

  const { data: fanartData, isLoading: isLoadingFanart } = useFanartTvData(artistMbIds[0] || "");

  if (isLoadingArtists || isLoadingFanart) return null;
  if (artistsError) return <div>Error loading top artists</div>;

  const getTopArtistImage = (mbid: string) => {
    if (!mbid || !fanartData) return "";
    let imageUrl = "";
    if (fanartData.mbid_id === mbid) {
      fanartData.artistbackground?.map((artistBackground) => {
        imageUrl = artistBackground.url;
      });
    }
    return imageUrl;
  };

  const artists = topArtistsData?.artist.map((artist: Artist) => ({
    ...artist,
    image: getTopArtistImage(artist.mbid),
  })) as TopArtistProps[];

  return (
    <div>
      <div className="pb-2 pl-4" id="#topartists">
        <h2 className="text-2xl font-medium">Top Artists</h2>
        <p>Scrobbles since 2008</p>
      </div>
      <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 top-artist sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {artists && artists.length
          ? artists.map((artist: TopArtistProps, index: number) => (
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
