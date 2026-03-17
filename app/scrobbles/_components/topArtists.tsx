"use client";

import type { FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";
import type { Artist } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMultipleArtistsFanart, useTopArtists } from "../_hooks/useScrobbles";
import { usePeriodParam } from "../_hooks/usePeriodParam";
import PeriodFilter from "./periodFilter";
import { ScrobblesCard } from "./scrobblesCard";

const DEFAULT_LIMIT = 12;

type TopArtistProps = {
  image: string;
  name: string;
  url: string;
  playcount: number;
};

export default function TopArtists() {
  const [period, setPeriod] = usePeriodParam("artists_period", "overall");
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const handlePeriodChange = (p: string) => {
    setLimit(DEFAULT_LIMIT);
    setPeriod(p);
  };

  const {
    data: topArtistsData,
    isLoading: isLoadingArtists,
    error: artistsError,
  } = useTopArtists(1, limit, period);

  const artistMbIds =
    topArtistsData?.artist
      .filter((artist: Artist) => artist.mbid)
      .map((artist: Artist) => artist.mbid) || [];

  const { data: fanartData, isLoading: isLoadingFanart } = useMultipleArtistsFanart(artistMbIds);

  if (artistsError) return <div>Error loading top artists</div>;

  const getTopArtistImage = (mbid: string) => {
    if (!mbid || !fanartData) return "";
    const artistFanart = fanartData.find(
      (data: FanArtArtistResponse | null) => data?.mbid_id === mbid,
    );
    if (!artistFanart?.artistbackground?.length) return "";
    return artistFanart.artistbackground[0].url;
  };

  const artists = topArtistsData?.artist.map((artist: Artist) => ({
    ...artist,
    image: getTopArtistImage(artist.mbid),
  })) as TopArtistProps[];

  const isLoading = isLoadingArtists || isLoadingFanart;

  return (
    <div>
      <div className="flex items-start justify-between pb-2 pl-4 pr-1" id="#topartists">
        <div>
          <h2 className="text-2xl font-medium">Top Artists</h2>
          <p>Scrobbles since 2008</p>
        </div>
        <PeriodFilter value={period} onChange={handlePeriodChange} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${period}-${limit}`}
          className="grid grid-flow-row-dense gap-2 top-artist sm:grid-cols-2 md:grid-cols-2 md:min-h-[1036px] lg:grid-cols-3"
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
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
