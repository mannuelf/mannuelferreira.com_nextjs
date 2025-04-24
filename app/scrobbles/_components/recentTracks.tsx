import LastFmApi from "lastfm-nodejs-client";
import type { Track } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { ScrobblesCard } from "./scrobblesCard";

type TransformedTrack = {
  image: string;
  "@attr"?: { nowplaying: string };
  name: string;
  url: string;
  artist: { "#text": string };
};

export const dynamic = "force-dynamic";

export async function getRecentTracks() {
  const lastFm = LastFmApi();
  const { config, method } = lastFm;

  const data = await lastFm.getRecentTracks(method.user.getRecentTracks, config.username, "", "50");
  const { recenttracks } = data;
  return recenttracks;
}

export default async function RecentTracks() {
  const { track } = await getRecentTracks();
  const recentTracksWithImages = track.map((track: Track, index: number) => {
    if (!track.image) return;
    const getImage = track.image.find((img) => img.size === "extralarge");
    return {
      ...track,
      image: getImage ? getImage["#text"] : "",
    } as TransformedTrack;
  });

  return (
    <div>
      <div className="pb-2 pl-4" id="#recenttracks">
        <h2 className="text-2xl font-medium">Recent Tracks</h2>
        <p>Listened to today</p>
      </div>
      <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recentTracksWithImages && recentTracksWithImages.length
          ? recentTracksWithImages.map((track: TransformedTrack | undefined, index: number) => {
              if (!track) return null;
              return (
                <ScrobblesCard
                  imageUrl={track.image}
                  nowplaying={track["@attr"]?.nowplaying || ""}
                  playTitle={track.name}
                  siteUrl={track.url}
                  subTitle={track.artist["#text"]}
                  title={track.name}
                  key={`${track.name.trim().replace(/\s/gm, "")}-recenttrack-${index}`}
                />
              );
            })
          : null}
        <hr />
      </div>
    </div>
  );
}
