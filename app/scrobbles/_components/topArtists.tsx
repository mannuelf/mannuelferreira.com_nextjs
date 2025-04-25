"use client";

import type { FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";
import type { Artist } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { useMultipleArtistsFanart, useTopArtists } from "../_hooks/useScrobbles";
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

  // Get all artist MBIDs that are not empty
  const artistMbIds =
    topArtistsData?.artist
      .filter((artist: Artist) => artist.mbid)
      .map((artist: Artist) => artist.mbid) || [];

  const { data: fanartData, isLoading: isLoadingFanart } = useMultipleArtistsFanart(artistMbIds);

  if (isLoadingArtists || isLoadingFanart) return null;
  if (artistsError) return <div>Error loading top artists</div>;

  const getTopArtistImage = (mbid: string) => {
    if (!mbid || !fanartData) return "";

    // Find the matching fanart data for this artist
    const artistFanart = fanartData.find(
      (data: FanArtArtistResponse | null) => data?.mbid_id === mbid,
    );
    if (!artistFanart?.artistbackground?.length) return "";

    // Return the first available background image
    return artistFanart.artistbackground[0].url;
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
