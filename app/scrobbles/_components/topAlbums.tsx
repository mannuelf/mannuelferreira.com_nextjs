"use client";

import type { Image as LastFmImage } from "lastfm-nodejs-client/dist/@types/lastfm.types";
import { useTopAlbums } from "../_hooks/useScrobbles";
import { ScrobblesCard } from "./scrobblesCard";

type AlbumProps = {
  name: string;
  url: string;
  image: string;
  playcount: string;
  artist: { "#text": string };
};

export const dynamic = "force-dynamic";

export default function TopAlbums() {
  const { data, isLoading, error } = useTopAlbums();

  if (isLoading) return null;
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
      <div className="pb-2 pl-4">
        <a href="#" id="#topalbums"></a>
        <h2 className="text-2xl font-medium">Top Albums</h2>
        <p>Top Albums of all time</p>
      </div>
      <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        <hr />
      </div>
    </div>
  );
}
