"use client";

import type { Image as LastFmImage } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePeriodParam } from "../_hooks/usePeriodParam";
import { useTopAlbums } from "../_hooks/useScrobbles";
import PeriodFilter from "./periodFilter";
import { ScrobblesCard } from "./scrobblesCard";

const DEFAULT_LIMIT = 12;

type AlbumProps = {
  name: string;
  url: string;
  image: string;
  playcount: string;
  artist: { "#text": string };
};

export const dynamic = "force-dynamic";

export default function TopAlbums() {
  const [period, setPeriod] = usePeriodParam("albums_period", "7day");
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const handlePeriodChange = (p: string) => {
    setLimit(DEFAULT_LIMIT);
    setPeriod(p);
  };
  const { data, isLoading, error } = useTopAlbums(1, limit, period);

  if (error) return <div>Error loading top albums</div>;

  const albums = data?.album.map((album: any) => {
    const getImage = album.image.find((img: LastFmImage) => img.size === "extralarge");
    return {
      ...album,
      image: getImage ? getImage["#text"] : "",
    } as AlbumProps;
  });

  return (
    <div>
      <div className="flex items-start justify-between pb-2 pl-4 pr-1" id="#topalbums">
        <div>
          <h2 className="text-2xl font-medium">Top Albums</h2>
          <p>Top Albums of all time</p>
        </div>
        <PeriodFilter value={period} onChange={handlePeriodChange} />
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
          {albums && albums.length
            ? albums.map((album: AlbumProps, index: number) => (
                <ScrobblesCard
                  playCount={album.playcount}
                  playTitle={album.name}
                  subTitle={album.artist["#text"]}
                  title={album.name}
                  siteUrl={album.url}
                  imageUrl={album.image}
                  key={`${album.name.trim().replace(/\s/gm, "")}-topalbum-${index}`}
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
