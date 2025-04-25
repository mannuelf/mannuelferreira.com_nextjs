"use client";

import { MUSICBRAINZ } from "@/lib/musicbrainz/musicbrainz-cover-art";
import { MusicBrainzCoverArt } from "@/lib/musicbrainz/musicbrainz-cover-art.types";
import LastFmApi from "lastfm-nodejs-client";
import type { WeeklyAlbum } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { useAlbumCoverArt, useWeeklyAlbums } from "../_hooks/useScrobbles";
import { ScrobblesCard } from "./scrobblesCard";

type WeeklyAlbumProps = {
  name: string;
  url: string;
  image: string;
  playcount: string;
  artist: { "#text": string; mbid: string };
  mbid: string;
};

export const dynamic = "force-dynamic";

export async function getWeeklyAlbumChart() {
  const lastFm = LastFmApi();
  const { config, method } = lastFm;

  const data = await lastFm.getWeeklyAlbumChart(
    method.user.getWeeklyAlbumChart,
    config.username,
    "overall",
    "22",
  );
  return data;
}

export const getAlbumCoverArt = async (albumMbId: string) => {
  try {
    const response = await fetch(`${MUSICBRAINZ.base_url}/release/${albumMbId}`, {
      cache: "no-store",
    });
    return (await response.json()) satisfies MusicBrainzCoverArt.RootObject;
  } catch (error: any) {
    const errMessage = `😞 Album cover ${albumMbId} - ${error.message}`;
    throw new Error(errMessage);
  }
};

export default function WeeklyAlbums() {
  const {
    data: weeklyAlbumsData,
    isLoading: isLoadingAlbums,
    error: albumsError,
  } = useWeeklyAlbums();
  const albumMbIds = weeklyAlbumsData?.album.map((album) => album.mbid) || [];

  const { data: coverArtData, isLoading: isLoadingCoverArt } = useAlbumCoverArt(
    albumMbIds[0] || "",
  );

  if (isLoadingAlbums || isLoadingCoverArt) return null;
  if (albumsError) return <div>Error loading weekly albums</div>;

  const getAlbumCoverImage = (albumMbId: string) => {
    if (!albumMbId || !coverArtData) return "";
    let imageUrl = "";
    if (coverArtData.release.includes(albumMbId)) {
      coverArtData.images
        .map((image) => {
          if (image.front) {
            return image.thumbnails;
          }
          return imageUrl;
        })
        .map((thumb) => {
          if (thumb && thumb[500]) {
            imageUrl = thumb[500].toString();
          }
          return imageUrl;
        });
    }
    return imageUrl;
  };

  const albums = weeklyAlbumsData?.album.map((album: WeeklyAlbum) => ({
    ...album,
    image: getAlbumCoverImage(album.mbid),
  })) as WeeklyAlbumProps[];

  return (
    <div>
      <div className="pb-2 pl-4" id="#weeklyalbumcharts">
        <h2 className="text-2xl font-medium">Weekly Album Charts</h2>
        <p>Scrobbles this week</p>
      </div>
      <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {albums && albums.length
          ? albums.map((album: WeeklyAlbumProps, index: number) => (
              <ScrobblesCard
                playCount={album.playcount}
                playTitle={album.name}
                subTitle={album.artist["#text"]}
                title={album.name}
                siteUrl={album.url}
                imageUrl={album.image}
                key={`${album.name.trim().replace(/\s/gm, "")}-weeklyalbum-${index}`}
              />
            ))
          : null}
        <hr />
      </div>
    </div>
  );
}
