"use client";

import type { Track } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLovedTracks } from "../_hooks/useScrobbles";
import { ScrobblesCard } from "./scrobblesCard";

const DEFAULT_LIMIT = 12;

type LovedTrackProps = {
  name: string;
  url: string;
  image: string;
  artist: { name: string; url: string };
};

export default function LovedTracks() {
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const { data, isLoading, error } = useLovedTracks(limit);

  if (error) return <div>Error loading loved tracks</div>;

  const tracks = data?.track?.map((track: Track) => {
    const image = track.image?.find((img) => img.size === "extralarge");
    return {
      ...track,
      image: image ? image["#text"] : "",
    } as LovedTrackProps;
  });

  return (
    <div>
      <div className="flex items-start justify-between pb-2 pl-4 pr-1" id="#lovedtracks">
        <div>
          <h2 className="text-2xl font-medium">Loved Tracks</h2>
          <p className="text-sm text-muted-foreground">Tracks I have loved on Last.fm</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={limit}
          className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 md:min-h-[1036px] lg:grid-cols-4"
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {tracks && tracks.length
            ? tracks.map((track: LovedTrackProps, index: number) => (
                <ScrobblesCard
                  playTitle={track.name}
                  title={track.name}
                  subTitle={track.artist.name}
                  siteUrl={track.url}
                  imageUrl={track.image}
                  key={`${track.name.trim().replace(/\s/gm, "")}-lovedtrack-${index}`}
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
