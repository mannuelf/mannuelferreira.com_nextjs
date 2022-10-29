import Container from '@components/container';
import Layout from '@components/Layout/layout';
import MetaTags from '@components/meta-tags';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  LOGO_LASTFM,
  META_MUSIC,
  MUSIC_URL,
  TWITTER_CARD_MUSIC,
  TWITTER_HANDLE,
  URL_COVERART_ARCHIVE,
  URL_FANARTTV,
  URL_LASTFM_API_DOCS,
  URL_TWITTER_PROFILE,
} from '@shared/constants';
import { defined } from '@shared/defined';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { FANART_TV } from '@lib/fanarttv/fanarttv';
import { Artistbackground, FanArtArtistResponse } from '@lib/fanarttv/fanarttv.types';
import LastFmApi from '@lib/lastFm';
import config from '@lib/lastFm/config';
import { Artist, Track, User, WeeklyAlbum } from '@lib/lastFm/lastFm.types';
import { MUSICBRAINZ } from '@lib/musicbrainz/musicbrainz-cover-art';
import { MusicBrainzCoverArt } from '@lib/musicbrainz/musicbrainz-cover-art.types';
import Image from 'next/image';
import ScrobblesCard from './scrobblesCard';

type Props = {
  error: [];
  recentTracks: Track[];
  topArtists: Artist[];
  weeklyAlbumChart: WeeklyAlbum[];
  userProfile: User;
};

const Scrobbles = ({ error, recentTracks, topArtists, userProfile, weeklyAlbumChart }: Props) => {
  const [allRecentTracks, setAllRecentTrack] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isError, setIsError] = useState([]);
  const [weeklyAlbums, setWeeklyAlbums] = useState<WeeklyAlbum[]>([]);
  const [user, setUser] = useState<User>();

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
        {user ? (
          <div className='pt-4 mt-8 mb-16 border-t'>
            <p className='text-lg'>
              I love music and have been tracking my listening habits with lastFm since 2008. I have always wanted to
              play with their data, that is what this page is about and of course to share what I have been listening to
              with you all.
            </p>
            <p>
              My scrobbles from {''}
              <a href={URL_LASTFM_API_DOCS} target='_blank' rel='noopener noreferrer'>
                <Image src={LOGO_LASTFM} unoptimized={true} width={120} height={36} alt='LastFm Logo' />
              </a>
              {'  '}
              API.{' '}
              {user ? (
                <>
                  Total plays: <span className='font-medium text-4xl text-red-600 '>{user?.playcount}</span>.
                </>
              ) : null}
            </p>
            <p>
              Some photos from{' '}
              <a href={URL_FANARTTV} target='_blank' rel='noopener noreferrer'>
                fanart.tv
              </a>{' '}
              API, some from{' '}
              <a href={URL_COVERART_ARCHIVE} target='_blank' rel='noopener noreferrer'>
                Musicbrainz Cover Art Archive
              </a>
              . Unfortunately not all album artwork is available through Musicbrainz or FanartTv. If you know of another
              API{' '}
              <a href={URL_TWITTER_PROFILE} target='_blank' rel='noopener noreferrer'>
                let me know about it
              </a>
              .🤙
            </p>
            <h2 className='text-2xl'></h2>
          </div>
        ) : null}
      </Container>
      <div className='container mx-auto'>
        <div className=''>
          {isError.length > 0 ? <div>{error}</div> : null}
          <div className='pb-2 pl-4'>
            <h2 className='text-2xl font-medium'>Recent Tracks 🎹</h2>
            <p>Listened to today</p>
          </div>
          <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0 pb-20'>
            {allRecentTracks.length > 0
              ? allRecentTracks.map((track, index) => (
                  <ScrobblesCard
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
                  <ScrobblesCard
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
            <h2 className='text-2xl font-medium'>Top Artists</h2>
            <p>Scrobbles since 2008</p>
          </div>
          <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0 pb-4'>
            {artists.length > 0
              ? artists.map((artist) => (
                  <ScrobblesCard
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
 * TODO: extract this to npm package
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
 * TODO: extract to npm package
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

  const auth = await lastFm.auth('', config.method.auth, '');

  const getUser = async () => {
    const data = await lastFm.getInfo(config.method.user.getInfo, config.username, 10);
    const { user } = data;
    return user;
  };

  const getLovedTracks = async () => {
    const data = await lastFm.getLovedTracks(config.method.user.loved_tracks, config.username, 10);
    const { lovedtracks } = data;
    return lovedtracks;
  };

  const getRecentTracks = async () => {
    const data = await lastFm.getRecentTracks(config.method.user.recent_tracks, config.username, 10);
    const { recenttracks } = data;
    return recenttracks;
  };

  const getTopArtists = async () => {
    const data = await lastFm.getTopArtists(config.method.user.top_artists, config.username, 10);
    const { topartists } = data;
    return topartists;
  };

  const getWeeklyAlbumChart = async () => {
    const data = await lastFm.getWeeklyAlbumChart(config.method.user.weekly_album_chart, config.username, 10);
    const { weeklyalbumchart } = data;
    return weeklyalbumchart;
  };

  try {
    const getArtists = await getTopArtists();
    const artists = getArtists.artist;
    const artistMbIds: string[] = artists.map((artist) => artist.mbid);

    const getWeeklyAlbums = await getWeeklyAlbumChart();
    const albums = getWeeklyAlbums.album;
    const weeklyAlbums = albums.map((album) => album);

    const getAllRecentTracks = await getRecentTracks();
    const recentTracks = getAllRecentTracks.track;
    const recentTracksAlbums = recentTracks.map((track) => track.album);

    const combinedAlbums = [...weeklyAlbums, ...recentTracksAlbums];

    /**
     * Get and set data for Top Artist Grid
     */
    const fanartTvResponses = await Promise.allSettled(
      artistMbIds.map(async (mbId) => {
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

    const topArtistsWithImages = artists.map((artist: Artist) => {
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

    const recentTracksWithImages = recentTracks.map((track) => {
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
      lovedTracks: await getLovedTracks(),
    },
  };
};

export default Scrobbles;
