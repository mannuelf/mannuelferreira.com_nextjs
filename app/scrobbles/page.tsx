import Container from "@/components/container";
import PageTitle from "@/components/page-title";
import { defined } from "@/lib/defined";
import RecentTracks from "./_components/recentTracks";
import TopAlbums from "./_components/topAlbums";
import TopArtists from "./_components/topArtists";
import UserProfile from "./_components/userProfile";
import WeeklyAlbums from "./_components/weeklyAlbums";

import { FANART_TV } from "@/lib/fanarttv/fanarttv";
import { Artistbackground, FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";
import { MUSICBRAINZ } from "@/lib/musicbrainz/musicbrainz-cover-art";
import { MusicBrainzCoverArt } from "@/lib/musicbrainz/musicbrainz-cover-art.types";
import LastFmApi from "lastfm-nodejs-client";
import type {
  Artist,
  Image as LastFmImage,
  TopAlbums as TopAlbumsResponse,
  Track,
  User,
  WeeklyAlbum,
} from "lastfm-nodejs-client/dist/@types/lastfm.types";

type Props = {
  error: [];
  recentTracks: Track[];
  topArtists: Artist[];
  weeklyAlbumChart: WeeklyAlbum[];
  userProfile: User;
  topAlbums: TopAlbumsResponse;
};

type TransformedTrack = {
  image: string;
  "@attr"?: { nowplaying: string };
  name: string;
  url: string;
  artist: { "#text": string };
};

type TransformedArtist = {
  image: string;
  name: string;
  url: string;
  playcount: number;
};

type UserResponse = {
  user: {
    playcount: string;
    name: string;
    url: string;
  };
};

async function getData() {
  let myErrors: string[] = [];
  let myRecentTracks = [];
  let myTopArtists = [];
  let myWeeklyAlbumChart = [];
  let myTopAlbums = [];

  const lastFm = LastFmApi();
  const { config, method } = lastFm;
  // const auth = await lastFm.auth("", method.auth, "", "");

  const getUser = async () => {
    try {
      const data = await lastFm.getInfo(method.user.getInfo, config.username);
      return data as UserResponse;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const getRecentTracks = async () => {
    const data = await lastFm.getRecentTracks(
      method.user.getRecentTracks,
      config.username,
      "",
      "50",
    );
    const { recenttracks } = data;
    return recenttracks;
  };

  const getTopArtists = async () => {
    const data = await lastFm.getTopArtists(
      method.user.getTopArtists,
      config.username,
      "overall",
      "50",
    );

    const { topartists } = data;
    return topartists;
  };

  const getWeeklyAlbumChart = async () => {
    const data = await lastFm.getWeeklyAlbumChart(
      method.user.getWeeklyAlbumChart,
      config.username,
      "overall",
      "22",
    );
    const { weeklyalbumchart } = data;
    return weeklyalbumchart;
  };

  const getTopAlbums = async () => {
    const data = await lastFm.getTopAlbums(
      method.user.getTopAlbums,
      config.username,
      "overall",
      "50",
    );
    return data;
  };

  try {
    const { artist } = await getTopArtists();
    const artistMbIds: string[] = artist.map((artist: Artist) => artist.mbid);

    const { topalbums } = await getTopAlbums();
    const theTopAlbums = topalbums.album.map((album) => album);

    const { album } = await getWeeklyAlbumChart();
    const weeklyAlbums = album.map((album: WeeklyAlbum) => album);

    const { track } = await getRecentTracks();
    const recentTracksAlbums = track.map((track: Track) => track.album);

    const combinedAlbums = [...weeklyAlbums, ...recentTracksAlbums];

    /**
     * Get and set data for Top Artist Grid
     */
    const fanartTvResponses = await Promise.allSettled(
      artistMbIds.map(async (mbId) => {
        if (!mbId) {
          return;
        }
        const res = await fetch(`${FANART_TV.base_url}${mbId}?api_key=${FANART_TV.api_key}`);
        if (res.status === 200) {
          return res.json() satisfies Promise<FanArtArtistResponse>;
        }
        return {
          ...res,
        };
      }),
    );
    let fanArtTvResult: FanArtArtistResponse[] = fanartTvResponses
      .map(({ value }: any) => {
        return value;
      })
      .filter(defined);

    const getTopArtistImage = (mbid: string): string => {
      if (!mbid) return "";
      let imageUrl = "";
      fanArtTvResult.find((artist) => {
        if (artist.mbid_id === mbid) {
          artist.artistbackground?.map((artistBackground: Artistbackground) => {
            imageUrl = artistBackground.url;
          });
        }
      });
      return imageUrl;
    };

    const topArtistsWithImages = artist.map((artist: Artist) => {
      return {
        ...artist,
        image: getTopArtistImage(artist.mbid),
      } as TransformedArtist;
    });

    /**
     * Get and set data for Weekly Album Chart
     */
    let musicBrainzResponse = await Promise.allSettled(
      combinedAlbums.map(async (album) => await getAlbumCoverArt(album.mbid)),
    );
    let musicBrainzResult: MusicBrainzCoverArt.RootObject[] = musicBrainzResponse
      .map(({ value }: any) => {
        return value;
      })
      .filter(defined);

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

    const weeklyAlbumChartWithImages = album.map((album: WeeklyAlbum) => {
      return {
        ...album,
        image: getAlbumCoverImage(album.artist.mbid, album.mbid, album.name, album.artist["#text"]),
      };
    });

    const recentTracksWithImages = track.map((track: Track) => {
      if (!track.image) return;
      const getImage = track.image.find((img: LastFmImage) => img.size === "extralarge");
      return {
        ...track,
        image: getImage ? getImage["#text"] : "",
      } as TransformedTrack;
    });

    const topAlbumsWithImages = theTopAlbums.map((album: any) => {
      const getImage = album.image.find((img: LastFmImage) => img.size === "extralarge");
      return {
        ...album,
        image: getImage ? getImage["#text"] : "",
      };
    });

    /**
     * Set all page data to respect props to be given to component
     */
    myTopArtists.push(topArtistsWithImages);
    myWeeklyAlbumChart.push(weeklyAlbumChartWithImages);
    myRecentTracks.push(recentTracksWithImages);
    myTopAlbums.push(topAlbumsWithImages);
  } catch (error) {
    console.log("🔥🔥🔥ERROR", error);
    myErrors.push(error as string);
  }

  return {
    error: myErrors ? myErrors : [],
    recentTracks: myRecentTracks[0] ? myRecentTracks[0] : [],
    topArtists: myTopArtists[0] ? myTopArtists[0] : [],
    topAlbums: myTopAlbums[0] ? myTopAlbums[0] : [],
    weeklyAlbumChart: myWeeklyAlbumChart[0] ? myWeeklyAlbumChart[0] : [],
    userProfile: await getUser(),
  };
}

export default async function Scrobbles() {
  return (
    <div>
      <Container>
        <PageTitle>Scrobbles</PageTitle>
        <UserProfile />
      </Container>
      <div className="container mx-auto">
        <div className="p-2">
          <RecentTracks />
          <TopAlbums />
          <WeeklyAlbums />
          <TopArtists />
        </div>
      </div>
    </div>
  );
}

/**
 * TODO: extract this to npm package
 * GET: Album Cover Artwork
 * @param albumMbId
 * @param artistName
 * @returns ```{ images: [], release: ''}```
 */
export const getAlbumCoverArt = async (albumMbId: string) => {
  try {
    const response = await fetch(`${MUSICBRAINZ.base_url}/release/${albumMbId}`);
    return (await response.json()) satisfies MusicBrainzCoverArt.RootObject;
  } catch (error: any) {
    const errMessage = `😞 Album cover ${albumMbId} - ${error.message}`;
    throw new Error(errMessage);
  }
};

/**
 * TODO: extract to npm package
 * GET: FanartTv data
 * Docs: https://fanart.tv/api-docs/api-v3/
 * @param mbid
 * @returns Array of Artist images and text from Fanarttv
 */
export const getFanartTvData = async (mbid: string): Promise<FanArtArtistResponse> => {
  const FANART_TV_ENDPOINT = `${FANART_TV.base_url}${mbid}?api_key=${FANART_TV.api_key}`;
  const data = await fetch(FANART_TV_ENDPOINT);
  return data.json() satisfies Promise<FanArtArtistResponse>;
};

export const getFanartTvAlbumData = async (mbid: string): Promise<FanArtArtistResponse> => {
  const FANART_TV_ENDPOINT = `${FANART_TV.base_url}/albums/${mbid}?api_key=${FANART_TV.api_key}`;
  const data = await fetch(FANART_TV_ENDPOINT);
  return data.json() satisfies Promise<FanArtArtistResponse>;
};
