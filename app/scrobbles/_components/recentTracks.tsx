"use client";

import type { Track } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { useRecentTracks } from "../_hooks/useScrobbles";
import { ScrobblesCard } from "./scrobblesCard";

type TrackProps = {
  image: string;
  "@attr"?: { nowplaying: string };
  name: string;
  url: string;
  artist: { "#text": string };
};

export default function RecentTracks() {
  const { data, isLoading, error } = useRecentTracks();

  if (isLoading) return null;
  if (error) return <div>Error loading recent tracks</div>;

  const tracks = data?.track
    .map((track: Track) => {
      if (!track.image) return null;
      const getImage = track.image.find((img) => img.size === "extralarge");
      return {
        ...track,
        image: getImage ? getImage["#text"] : "",
      } as TrackProps;
    })
    .filter(Boolean) as TrackProps[];

  return (
    <div>
      <div className="pb-2 pl-4" id="#recenttracks">
        <h2 className="text-2xl font-medium">Recent Tracks</h2>
        <p>Listened to today</p>
      </div>
      <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tracks && tracks.length
          ? tracks.map((track: TrackProps, index: number) => (
              <ScrobblesCard
                imageUrl={track.image}
                nowplaying={track["@attr"]?.nowplaying || ""}
                playTitle={track.name}
                siteUrl={track.url}
                subTitle={track.artist["#text"]}
                title={track.name}
                key={`${track.name.trim().replace(/\s/gm, "")}-recenttrack-${index}`}
              />
            ))
          : null}
        <hr />
      </div>
    </div>
  );
}
