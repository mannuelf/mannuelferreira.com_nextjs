import Container from '@components/container';
import Layout from '@components/Layout/layout';
import MetaTags from '@components/meta-tags';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  META_MUSIC,
  MUSIC_URL,
  TWITTER_CARD_MUSIC,
  TWITTER_HANDLE,
  URL_LASTFM_API_DOCS,
  URL_TWITTER_PROFILE,
} from '@shared/constants';
import { defined } from '@shared/defined';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { FANART_TV } from '@lib/fanarttv/fanarttv';
import { Artistbackground, FanArtArtistResponse } from '@lib/fanarttv/fanarttv.types';
import { ARTIST_ENDPOINT, RECENT_TRACKS, USER, WEEKLY_ALBUM_CHART } from '@lib/lastFm/lastFm';
import { LastFm } from '@lib/lastFm/lastFm.types';
import { MUSICBRAINZ } from '@lib/musicbrainz/musicbrainz-cover-art';
import { MusicBrainzCoverArt } from '@lib/musicbrainz/musicbrainz-cover-art.types';
import { LOGO_LASTFM, URL_COVERART_ARCHIVE, URL_FANARTTV, URL_LASTFM_PROFILE } from '../shared/constants';
import MusicCard from './musicCard';
import LastFmApi from '@lib/lastFm';

type Props = {
  error: [];
  recentTracks: LastFm.Track[];
  topArtists: LastFm.Artist[];
  weeklyAlbumChart: LastFm.WeeklyAlbum[];
  userProfile: LastFm.User;
};

const Scrobbles = ({ error, recentTracks, topArtists, userProfile, weeklyAlbumChart }: Props) => {
  const [allRecentTracks, setAllRecentTrack] = useState<LastFm.Track[]>([]);
  const [artists, setArtists] = useState<LastFm.Artist[]>([]);
  const [isError, setIsError] = useState([]);
  const [weeklyAlbums, setWeeklyAlbums] = useState<LastFm.WeeklyAlbum[]>([]);
  const [user, setUser] = useState<LastFm.User>();

  useEffect(() => {
    setIsError(error);
    setArtists(topArtists);
    setWeeklyAlbums(weeklyAlbumChart);
    setAllRecentTrack(recentTracks);
    setUser(userProfile);
  }, [error, recentTracks, topArtists, userProfile, weeklyAlbumChart]);

  return (
    <Layout>
      <MetaTags
        ogTitle={'Scrobbles'}
        ogImage={TWITTER_CARD_MUSIC}
        ogDescription={META_MUSIC}
        ogUrl={MUSIC_URL}
        ogSiteName={CMS_NAME}
        ogTwitterCard='summary_large_image'
        ogTwitterSite={TWITTER_HANDLE}
        ogTwitterCreator={TWITTER_HANDLE}
      />
      <Container>
        <PageTitle>Scrobbles</PageTitle>
        <div className='pt-4 mt-8 mb-16 border-t'>
          <p className='text-lg'>
            I love music and have been tracking my listening habits with lastFm since 2008. I have always wanted to play
            with their data, that is what this page is about and of course to share what I have been listening to with
            you all.
          </p>
          <p>
            My scrobbles updates from the {''}
            <a href={URL_LASTFM_API_DOCS} target='_blank' rel='noopener noreferrer'>
              <Image src={LOGO_LASTFM} unoptimized={true} width={90} height={30} alt='LastFm Logo' />
            </a>{' '}
            API. My <a href={URL_LASTFM_PROFILE}>profile</a> on lastfm. Some photos from{' '}
            <a href={URL_FANARTTV} target='_blank' rel='noopener noreferrer'>
              fanart.tv
            </a>{' '}
            API. Some from{' '}
            <a href={URL_COVERART_ARCHIVE} target='_blank' rel='noopener noreferrer'>
              Musicbrainz Cover Art Archive
            </a>
            . Unfortunately not all album artwork is available through Musicbrainz or FanartTv. If you know of another
            API{' '}
            <a href={URL_TWITTER_PROFILE} target='_blank' rel='noopener noreferrer'>
              let me know about it 🤙
            </a>
            .
          </p>
          <h2 className='text-2xl'>
            Total Scrobbles: <span className='font-medium'>{user?.playcount}</span>
          </h2>
        </div>
      </Container>
      <div className='container'>
        <div className='w-screen'>
          {isError.length > 0 ? <div>{error}</div> : null}
          <div className='pb-2 pl-4'>
            <h2 className='text-2xl font-medium'>Recent Tracks 🎹</h2>
            <p>Listened to today</p>
          </div>
          <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0 pb-20'>
            {allRecentTracks.length > 0
              ? allRecentTracks.map((track, index) => (
                  <MusicCard
                    imageUrl={track.image ? track.image : ''}
                    nowplaying={track['@attr'] ? track['@attr'].nowplaying : ''}
                    playTitle={track.name}
                    siteUrl={track.url}
                    subTitle={track.artist['#text']}
                    title={track.name}
                    key={index}
                  />
                ))
              : null}
            <hr />
          </div>
          <div className='pb-2 pl-4'>
            <h2 className='text-2xl font-medium'>Weekly Album Charts</h2>
            <p>Scrobbles this week</p>
          </div>
          <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0 pb-20'>
            {weeklyAlbums.length > 0
              ? weeklyAlbums.map((album, index) => (
                  <MusicCard
                    playCount={album.playcount.toString()}
                    playTitle={album.name}
                    subTitle={album.artist['#text']}
                    title={album.name}
                    siteUrl={album.url}
                    imageUrl={album.image ? album.image : ''}
                    key={index}
                  />
                ))
              : null}
            <hr />
          </div>
          <div className='pb-2 pl-4'>
            <h2 className='text-2xl font-medium'>Top 100 Artists</h2>
            <p>Scrobbles since 2008</p>
          </div>
          <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0 pb-4'>
            {artists.length > 0
              ? artists.map((artist) => (
                  <MusicCard
                    playCount={artist.playcount.toString()}
                    playTitle={artist.name}
                    subTitle={''}
                    title={artist.name}
                    siteUrl={artist.url}
                    imageUrl={artist.image}
                    key={artist.name}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

/**
 * GET: Recent Tracks - LastFM
 * Docs: https://www.last.fm/api/show/user.getRecentTracks
 * @returns RecentTracksResponse All tracks I listened to today.
 */
export const getRecentTracks = async (): Promise<LastFm.RecentTracksResponse> => {
  try {
    const { data } = await axios.get<LastFm.RecentTracksResponse>(RECENT_TRACKS);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/**
 * GET: Top Artists: LastFM
 * Docs: https://www.last.fm/api/show/user.getTopArtists
 * @returns
 * ```
 * topartists: {
    artist: Artist[];
    '@attr': Attribs;
  };
  images: []
  ```
 */
export const getTopArtists = async (): Promise<LastFm.TopArtistsResponse> => {
  try {
    const { data } = await axios.get<LastFm.TopArtistsResponse>(ARTIST_ENDPOINT);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/**
 * GET: Weekly Album Charts - LastFM
 * Docs: https://www.last.fm/api/show/user.getWeeklyAlbumChart
 * @returns WeeklyAlbumChartResponse All albums I listened to last week
 */
export const getWeeklyAlbumChart = async (): Promise<LastFm.WeeklyAlbumChartResponse> => {
  try {
    const { data } = await axios.get<LastFm.WeeklyAlbumChartResponse>(WEEKLY_ALBUM_CHART);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/**
 * GET: Album Cover Artwork
 * @param albumMbId
 * @param artistName
 * @returns ```{ images: [], release: ''}```
 */
export const getAlbumCoverArt = async (albumMbId: string) => {
  try {
    const response: AxiosResponse<MusicBrainzCoverArt.RootObject> = await axios.get(
      `${MUSICBRAINZ.base_url}/release/${albumMbId}`,
    );
    const { data } = response;
    return data;
  } catch (error: any) {
    const errMessage = `😞 Album cover ${albumMbId} - ${error.message}`;
    throw new Error(errMessage);
  }
};

/**
 * GET: FanartTv data
 * Docs: https://fanart.tv/api-docs/api-v3/
 * @param mbid
 * @returns Array of Artist images and text from Fanarttv
 */
export const getFanartTvData = async (mbid: string): Promise<FanArtArtistResponse> => {
  const FANART_TV_ENDPOINT = `${FANART_TV.base_url}${mbid}?api_key=${FANART_TV.api_key}`;
  const { data } = await axios.get<FanArtArtistResponse>(FANART_TV_ENDPOINT);
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let error: [] = [];
  let myRecentTracks = [];
  let myTopArtists = [];
  let myWeeklyAlbumChart = [];

  const lastFm = LastFmApi();

  const getUser = async () => {
    const data = await lastFm.getInfo('mannuelf');
    const { user } = data;
    return user;
  };

  try {
    const allArtists = await getTopArtists();
    const artists = allArtists.topartists.artist;
    const allMbIds: string[] = artists.map((artist) => artist.mbid);

    const allWeeklyAlbumChart = await getWeeklyAlbumChart();
    const albums = allWeeklyAlbumChart.weeklyalbumchart.album;
    const allAlbums = albums.map((album) => album);

    const allRecentTracks = await getRecentTracks();
    const { recenttracks } = allRecentTracks;
    const tracks = recenttracks.track;
    const trackAlbums = recenttracks.track.map((track) => track.album);

    const combinedAlbums = [...allAlbums, ...trackAlbums];

    /**
     * Get and set data for Top Artist Grid
     */
    const fanartTvResponses = await Promise.allSettled(
      allMbIds.map(async (mbId) => {
        const res = await axios.get(`${FANART_TV.base_url}${mbId}?api_key=${FANART_TV.api_key}`);
        if (res.status === 200) {
          return res.data;
        }
        return {
          ...res.data,
        };
      }),
    );
    let fanArtTvResult: FanArtArtistResponse[] = fanartTvResponses
      .map(({ value }: any) => {
        return value;
      })
      .filter(defined);

    const getTopArtistImage = (mbid: string): string => {
      let imageUrl = '';
      fanArtTvResult.find((artist) => {
        if (artist.mbid_id === mbid) {
          artist.artistbackground?.map((artistBackground: Artistbackground) => {
            imageUrl = artistBackground.url;
          });
        }
      });
      return imageUrl;
    };

    const topArtistsWithImages = artists.map((artist) => {
      return {
        ...artist,
        image: getTopArtistImage(artist.mbid),
      };
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

    const getAlbumCoverImage = (artistMbId: string, albumMbId: string, albumTitle?: string, artistName?: string) => {
      let imageUrl = '';
      if (albumMbId === '') return '';
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

    const weeklyAlbumChartWithImages = albums.map((album) => {
      return {
        ...album,
        image: getAlbumCoverImage(album.artist.mbid, album.mbid, album.name, album.artist['#text']),
      };
    });

    const recentTracksWithImages = tracks.map((track) => {
      return {
        ...track,
        image: getAlbumCoverImage(track.artist.mbid, track.album.mbid, track.album['#text'], track.artist['#text']),
      };
    });

    /**
     * Set all page data to respect props to be given to component
     */
    myTopArtists.push(topArtistsWithImages);
    myWeeklyAlbumChart.push(weeklyAlbumChartWithImages);
    myRecentTracks.push(recentTracksWithImages);
  } catch (error) {
    error = error;
  }

  return {
    props: {
      error,
      recentTracks: myRecentTracks[0],
      topArtists: myTopArtists[0],
      weeklyAlbumChart: myWeeklyAlbumChart[0],
      userProfile: await getUser(),
    },
  };
};

export default Scrobbles;
