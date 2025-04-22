// import Layout from "@/components/Layout/layout";
import Container from "@/components/container";
// import MetaTags from "@/components/meta-tags";
import PageTitle from "@/components/page-title";
import {
  LOGO_LASTFM,
  URL_COVER_ART_ARCHIVE,
  URL_FANARTTV,
  URL_LASTFM_API_DOCS,
  URL_LASTFM_NPM_PKG,
  URL_TWITTER_PROFILE
} from "@/lib/constants";
import { defined } from "@/lib/defined";

import ScrobblesCard from "@/app/scrobbles/_components/scrobblesCard";
import { FANART_TV } from "@/lib/fanarttv/fanarttv";
import { Artistbackground, FanArtArtistResponse } from "@/lib/fanarttv/fanarttv.types";
import { MUSICBRAINZ } from "@/lib/musicbrainz/musicbrainz-cover-art";
import { MusicBrainzCoverArt } from "@/lib/musicbrainz/musicbrainz-cover-art.types";
import LastFmApi from "lastfm-nodejs-client";
import type {
  Artist,
  Image as LastFmImage,
  TopAlbums,
  Track,
  User,
  WeeklyAlbum,
} from "lastfm-nodejs-client/dist/@types/lastfm.types";
import Image from "next/image";

type Props = {
  error: [];
  recentTracks: Track[];
  topArtists: Artist[];
  weeklyAlbumChart: WeeklyAlbum[];
  userProfile: User;
  topAlbums: TopAlbums[];
};

type TransformedTrack = {
  image: string;
  '@attr'?: { nowplaying: string };
  name: string;
  url: string;
  artist: { '#text': string };
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
    // Add other user properties as needed
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
  const auth = await lastFm.auth("", method.auth, "", "");

  const getUser = async () => {
    try {
      const data = await lastFm.getInfo(method.user.getInfo, config.username);
      return data as UserResponse;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const getRecentTracks = async () => {
    const data = await lastFm.getRecentTracks(
      method.user.getRecentTracks,
      config.username,
      "",
      "22",
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
  const { error, recentTracks, topArtists, userProfile, weeklyAlbumChart, topAlbums } = await getData();

  if (error && error?.length > 0) {
    return (
      <div>
        <Container>
          <PageTitle>Scrobbles</PageTitle>
          <div className="pt-4 mt-8 mb-16 border-t">
            {error.length
              ? "😥 Error fetching data from lastFM, hit CTRL+F5 once or twice, maybe thrice, it eventually works."
              : null}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <PageTitle>Scrobbles</PageTitle>
        {userProfile?.user ? (
          <div className="pt-4 mt-8 mb-16 border-t">
            <p className="text-lg">
              My love for collecting music has brought me to keep using lastFm. I have been tracking
              my listening habits with lastFm since 2008. I have always wanted to play with the
              data, that is what this page is about. I of course want to share what I have been
              listening to with you all.
            </p>
            <p>
              If code is what interests you read it{" "}
              <a
                href="https://github.com/mannuelf/mannuelferreira.com_nextjs"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <i className="fab fa-github"></i> here.
              </a>{" "}
            </p>
            <p>
              I have built an API wrapper to the lastFM API in TypeScript, if you want to build something similar the client may help.{" "}
              <a href={URL_LASTFM_NPM_PKG} target="_blank" rel="noopener noreferrer">
                GET IT HERE
              </a>
            </p>
            <p>
              My scrobbles from {""}
              <a href={URL_LASTFM_API_DOCS} target="_blank" rel="noopener noreferrer">
                <Image
                  src={LOGO_LASTFM}
                  unoptimized={true}
                  width={90}
                  height={26}
                  alt="LastFm Logo"
                />
              </a>
              {userProfile?.user ? (
                <>
                  Total plays:{" "}
                  <span className="text-4xl font-bold text-red-600 ">{userProfile.user.playcount}</span>.
                </>
              ) : null}
            </p>
            <p>
              Some photos from{" "}
              <a href={URL_FANARTTV} target="_blank" rel="noopener noreferrer">
                fanart.tv
              </a>{" "}
              API, some from{" "}
              <a href={URL_COVER_ART_ARCHIVE} target="_blank" rel="noopener noreferrer">
                Musicbrainz Cover Art Archive
              </a>
              . Unfortunately not all album artwork is available through Musicbrainz or FanartTv. If
              you know of another API{" "}
              <a href={URL_TWITTER_PROFILE} target="_blank" rel="noopener noreferrer">
                let me know about it
              </a>
              .🤙
            </p>
            <h2 className="text-2xl"></h2>
          </div>
        ) : null}
      </Container>
      <div className="container mx-auto">
        <div className="p-2">
          <div className="pb-2 pl-4" id="#recenttracks">
            <h2 className="text-2xl font-medium">Recent Tracks</h2>
            <p>Listened to today</p>
          </div>
          <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recentTracks && recentTracks.length
              ? recentTracks.map((track: TransformedTrack | undefined) => {
                if (!track) return null;
                return (
                  <ScrobblesCard
                    imageUrl={track.image}
                    nowplaying={track["@attr"]?.nowplaying || ""}
                    playTitle={track.name}
                    siteUrl={track.url}
                    subTitle={track.artist["#text"]}
                    title={track.name}
                    key={track.name.trim().replace(/\s/gm, "")}
                  />
                );
              })
              : null}
            <hr />
          </div>
          <div className="pb-2 pl-4">
            <a href="#" id="#topalbums"></a>
            <h2 className="text-2xl font-medium">Top Albums</h2>
            <p>Top Albums of all time</p>
          </div>
          <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {topAlbums && topAlbums.length
              ? topAlbums.map((album: any) => (
                <ScrobblesCard
                  playCount={album.playcount.toString()}
                  playTitle={album.name}
                  subTitle={album.artist["#text"]}
                  title={album.name}
                  siteUrl={album.url}
                  imageUrl={album.image ? album.image : ""}
                  key={album.name.trim().replace(/\s/gm, "")}
                />
              ))
              : null}
            <hr />
          </div>
          <div className="pb-2 pl-4" id="#weeklyalbumcharts">
            <h2 className="text-2xl font-medium">Weekly Album Charts</h2>
            <p>Scrobbles this week</p>
          </div>
          <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {weeklyAlbumChart && weeklyAlbumChart.length
              ? weeklyAlbumChart.map((album) => (
                <ScrobblesCard
                  playCount={album.playcount.toString()}
                  playTitle={album.name}
                  subTitle={album.artist["#text"]}
                  title={album.name}
                  siteUrl={album.url}
                  imageUrl={album.image ? album.image : ""}
                  key={album.name.trim().replace(/\s/gm, "")}
                />
              ))
              : null}
            <hr />
          </div>
          <div className="pb-2 pl-4" id="#topartists">
            <h2 className="text-2xl font-medium">Top Artists</h2>
            <p>Scrobbles since 2008</p>
          </div>
          <div className="grid grid-flow-row-dense grid-rows-4 gap-2 pb-20 top-artist sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {topArtists && topArtists.length
              ? topArtists.map((artist: TransformedArtist) => (
                <ScrobblesCard
                  playCount={artist.playcount.toString()}
                  playTitle={artist.name}
                  subTitle={""}
                  title={artist.name}
                  siteUrl={artist.url}
                  imageUrl={artist.image}
                  key={artist.name.trim().replace(/\s/gm, "")}
                />
              ))
              : null}
          </div>
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