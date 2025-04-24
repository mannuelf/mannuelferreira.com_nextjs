import { MUSICBRAINZ } from "@/lib/musicbrainz/musicbrainz-cover-art";
import { MusicBrainzCoverArt } from "@/lib/musicbrainz/musicbrainz-cover-art.types";
import LastFmApi from "lastfm-nodejs-client";
import type { WeeklyAlbum } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { ScrobblesCard } from "./scrobblesCard";

type TransformedWeeklyAlbum = {
  name: string;
  url: string;
  image: string;
  playcount: string;
  artist: { "#text": string; mbid: string };
  mbid: string;
};

export const dynamic = 'force-dynamic';

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
    const response = await fetch(`${MUSICBRAINZ.base_url}/release/${albumMbId}`, { cache: 'no-store' });
    return (await response.json()) satisfies MusicBrainzCoverArt.RootObject;
  } catch (error: any) {
    const errMessage = `😞 Album cover ${albumMbId} - ${error.message}`;
    throw new Error(errMessage);
  }
};

export default async function WeeklyAlbums() {
  const { weeklyalbumchart } = await getWeeklyAlbumChart();
  const { album } = weeklyalbumchart;

  let musicBrainzResponse = await Promise.allSettled(
    album.map(async (album) => await getAlbumCoverArt(album.mbid)),
  );
  let musicBrainzResult: MusicBrainzCoverArt.RootObject[] = musicBrainzResponse
    .map(({ value }: any) => {
      return value;
    })
    .filter(Boolean);

  const getAlbumCoverImage = (
    artistMbId: string,
    albumMbId: string,
    albumTitle?: string,
    artistName?: string,
  ) => {
    let imageUrl = "";
    if (albumMbId === "") return "";
    musicBrainzResult.find((album) => {
      if (album.release.includes(albumMbId)) {
        album.images
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
    });
    return imageUrl;
  };

  const weeklyAlbumChartWithImages = album.map((album: WeeklyAlbum, index: number) => {
    return {
      ...album,
      image: getAlbumCoverImage(album.artist.mbid, album.mbid, album.name, album.artist["#text"]),
    } as TransformedWeeklyAlbum;
  });

  return (
    <div>
      <div className="pb-2 pl-4" id="#weeklyalbumcharts">
        <h2 className="text-2xl font-medium">Weekly Album Charts</h2>
        <p>Scrobbles this week</p>
      </div>
      <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {weeklyAlbumChartWithImages && weeklyAlbumChartWithImages.length
          ? weeklyAlbumChartWithImages.map((album: TransformedWeeklyAlbum, index: number) => (
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