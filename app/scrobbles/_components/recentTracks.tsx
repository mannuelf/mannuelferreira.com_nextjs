"use client";

import type { Track } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePeriodParam } from "../_hooks/usePeriodParam";
import { useRecentTracks } from "../_hooks/useScrobbles";
import PeriodFilter from "./periodFilter";
import { ScrobblesCard } from "./scrobblesCard";

const DEFAULT_LIMIT = 12;

type TrackProps = {
  image: string;
  "@attr"?: { nowplaying: string };
  name: string;
  url: string;
  artist: { "#text": string };
};

export default function RecentTracks() {
  const [period, setPeriod] = usePeriodParam("recent_period", "7day");
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const handlePeriodChange = (p: string) => {
    setLimit(DEFAULT_LIMIT);
    setPeriod(p);
  };
  const { data, isLoading, error } = useRecentTracks(1, limit, period);

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
      <div className="flex items-start justify-between pb-2 pl-4 pr-1" id="#recenttracks">
        <div>
          <h2 className="text-2xl font-medium">Recent Tracks</h2>
          <p>Listened to today</p>
        </div>
        <PeriodFilter value={period} onChange={handlePeriodChange} variant="recent" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${period}-${limit}`}
          className="grid grid-flow-row-dense gap-2 sm:grid-cols-2 md:grid-cols-3 md:min-h-[1036px] lg:grid-cols-4"
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
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
