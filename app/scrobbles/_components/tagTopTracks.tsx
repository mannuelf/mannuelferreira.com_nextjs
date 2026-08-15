"use client";

import type { TagTrack } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTagTopTracks } from "../_hooks/useScrobbles";
import { ScrobblesCard } from "./scrobblesCard";

const DEFAULT_LIMIT = 12;
const TAGS = ["electronic", "house", "techno", "ambient", "jazz", "hip-hop", "rock", "classical"];

type TagTrackProps = {
  name: string;
  url: string;
  image: string;
  artist: { name: string; url: string };
  "@attr": { rank: string };
};

export default function TagTopTracks() {
  const [tag, setTag] = useState(TAGS[0]);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const { data, isLoading, error } = useTagTopTracks(tag, limit);

  const handleTagChange = (t: string) => {
    setLimit(DEFAULT_LIMIT);
    setTag(t);
  };

  if (error) return <div>Error loading tag top tracks</div>;

  const tracks = data?.track?.map((track: TagTrack) => {
    const image = track.image?.find((img) => img.size === "extralarge");
    return {
      ...track,
      image: image ? image["#text"] : "",
    } as TagTrackProps;
  });

  return (
    <div>
      <div className="flex items-start justify-between pb-2 pl-4 pr-1" id="#tagtoptracks">
        <div>
          <h2 className="text-2xl font-medium">Top Tracks by Tag</h2>
          <p className="text-sm text-muted-foreground">Global top tracks per genre</p>
        </div>
        <div className="flex flex-wrap gap-1 justify-end max-w-xs">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => handleTagChange(t)}
              className={`px-4 py-1 text-sm rounded-full border transition-colors cursor-pointer ${
                tag === t
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${tag}-${limit}`}
          className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 md:min-h-[1036px] lg:grid-cols-4"
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {tracks && tracks.length
            ? tracks.map((track: TagTrackProps, index: number) => (
                <ScrobblesCard
                  playTitle={track.name}
                  title={track.name}
                  subTitle={track.artist.name}
                  siteUrl={track.url}
                  imageUrl={track.image}
                  key={`${track.name.trim().replace(/\s/gm, "")}-tagtoptrack-${index}`}
                />
              ))
            : null}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center pb-8 pt-2">
        <button
          onClick={() => setLimit((l) => l + DEFAULT_LIMIT)}
          disabled={isLoading}
          className="px-8 py-3 text-base rounded-full bg-black text-white dark:bg-white dark:text-black transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Load more
        </button>
      </div>
    </div>
  );
}
