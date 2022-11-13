import Container from '@components/container';
import Layout from '@components/Layout/layout';
import MetaTags from '@components/meta-tags';
import PageTitle from '@components/page-title';
import {
  CMS_NAME,
  LOGO_LASTFM,
  META_MUSIC,
  MUSIC_URL,
  NPM_LOGO,
  TWITTER_CARD_MUSIC,
  TWITTER_HANDLE,
  URL_COVERART_ARCHIVE,
  URL_FANARTTV,
  URL_LASTFM_API_DOCS,
  URL_LASTFM_NPM_PKG,
  URL_TWITTER_PROFILE,
} from '@shared/constants';
import { defined } from '@shared/defined';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { FANART_TV } from '@lib/fanarttv/fanarttv';
import { Artistbackground, FanArtArtistResponse } from '@lib/fanarttv/fanarttv.types';
import LastFmApi from 'lastfm-nodejs-client';
import type { Artist, Track, User, WeeklyAlbum } from 'lastfm-nodejs-client/@types';
import type { Image as LastFmImage } from 'lastfm-nodejs-client/@types';

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
  const [isError, setIsError] = useState<[]>();
  const [weeklyAlbums, setWeeklyAlbums] = useState<WeeklyAlbum[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setIsError(error);
    setArtists(topArtists);
    setWeeklyAlbums(weeklyAlbumChart);
    setAllRecentTrack(recentTracks);
    setUser(userProfile);
  }, [error, recentTracks, topArtists, userProfile, weeklyAlbumChart]);

  console.log('⚠️ ERROR', isError);

  if (isError && isError?.length > 0) {
    return (
      <Layout>
        <Container>
          <PageTitle>Scrobbles</PageTitle>
          <div className='pt-4 mt-8 mb-16 border-t'>
            {isError.length
              ? '😥 Error fetching data from lastFM, hit CTRL+F5 once or twice, maybe thrice, it eventually works.'
              : null}
          </div>
        </Container>
      </Layout>
    );
  }

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
              My love for collecting music has brought me to keep using lastFm. I have been tracking
              my listening habits with lastFm since 2008. I have always wanted to play with the
              data, that is what this page is about. I of course want to share what I have been
              listening to with you all.
            </p>
            <p>
              If code is what interests you read it{' '}
              <a
                href='https://github.com/mannuelf/mannuelferreira.com_nextjs/blob/main/pages/scrobbles.tsx'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                <i className='fab fa-github'></i> here.
              </a>{' '}
            </p>
            <p>
              I have extracted an API client to{' '}
              <a href={URL_LASTFM_NPM_PKG} target='_blank' rel='noopener noreferrer'>
                <span>
                  <Image src={NPM_LOGO} alt='Larcasts' width={42} height={28} layout='fixed' />
                </span>
              </a>
              , if you want to build something similar the client may help.
            </p>
            <p>
              My scrobbles from {''}
              <a href={URL_LASTFM_API_DOCS} target='_blank' rel='noopener noreferrer'>
                <Image
                  src={LOGO_LASTFM}
                  unoptimized={true}
                  width={120}
                  height={36}
                  alt='LastFm Logo'
                />
              </a>
              {'  '}
              API.{' '}
              {user ? (
                <>
                  Total plays:{' '}
                  <span className='font-medium text-4xl text-red-600 '>{user?.playcount}</span>.
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
              . Unfortunately not all album artwork is available through Musicbrainz or FanartTv. If
              you know of another API{' '}
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
        <div className='p-2'>
          <div className='pb-2 pl-4'>
            <h2 className='text-2xl font-medium'>Recent Tracks</h2>
            <p>Listened to today</p>
          </div>
          <div className='grid grid-flow-row-dense  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-2 pb-20'>
            {allRecentTracks && allRecentTracks.length
              ? allRecentTracks.map((track) => (
                  <ScrobblesCard
                    imageUrl={track.image ? track.image.toString() : ''}
                    nowplaying={track['@attr'] ? track['@attr'].nowplaying : ''}
                    playTitle={track.name}
                    siteUrl={track.url}
                    subTitle={track.artist['#text']}
                    title={track.name}
                    key={track.name.trim().replace(/\s/gm, '')}
                  />
                ))
              : null}
            <hr />
          </div>
          <div className='pb-2 pl-4'>
            <h2 className='text-2xl font-medium'>Weekly Album Charts</h2>
            <p>Scrobbles this week</p>
          </div>
          <div className='grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-2 pb-20'>
            {weeklyAlbums && weeklyAlbums.length
              ? weeklyAlbums.map((album) => (
                  <ScrobblesCard
                    playCount={album.playcount.toString()}
                    playTitle={album.name}
                    subTitle={album.artist['#text']}
                    title={album.name}
                    siteUrl={album.url}
                    imageUrl={album.image ? album.image : ''}
                    key={album.name.trim().replace(/\s/gm, '')}
                  />
                ))
              : null}
            <hr />
          </div>
          <div className='pb-2 pl-4'>
            <h2 className='text-2xl font-medium'>Top Artists</h2>
            <p>Scrobbles since 2008</p>
          </div>
          <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-4 gap-2 pb-4'>
            {artists && artists.length
              ? artists.map((artist) => (
                  <ScrobblesCard
                    playCount={artist.playcount.toString()}
                    playTitle={artist.name}
                    subTitle={''}
                    title={artist.name}
                    siteUrl={artist.url}
                    imageUrl={artist.image ?? ''}
                    key={artist.name.trim().replace(/\s/gm, '')}
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

export const getFanartTvAlbumData = async (mbid: string): Promise<FanArtArtistResponse> => {
  const FANART_TV_ENDPOINT = `${FANART_TV.base_url}/albums/${mbid}?api_key=${FANART_TV.api_key}`;
  const { data } = await axios.get<FanArtArtistResponse>(FANART_TV_ENDPOINT);
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let myErrors: string[] = [];
  let myRecentTracks = [];
  let myTopArtists = [];
  let myWeeklyAlbumChart = [];

  const lastFm = LastFmApi();
  const { config, method } = lastFm;
  const auth = await lastFm.auth('', method.auth, '', '');

  const getUser = async () => {
    const data = await lastFm.getInfo(method.user.getInfo, config.username, 'overall', '');
    const { user } = data;
    return user;
  };

  const getLovedTracks = async () => {
    const data = await lastFm.getLovedTracks(
      method.user.loved_tracks,
      config.username,
      'overall',
      '12',
    );
    const { lovedtracks } = data;
    return lovedtracks;
  };

  const getRecentTracks = async () => {
    const data = await lastFm.getRecentTracks(method.user.recent_tracks, config.username, '', '52');
    const { recenttracks } = data;
    return recenttracks;
  };

  const getTopArtists = async () => {
    const data = await lastFm.getTopArtists(
      method.user.top_artists,
      config.username,
      'overall',
      '201',
    );

    const { topartists } = data;
    return topartists;
  };

  const getWeeklyAlbumChart = async () => {
    const data = await lastFm.getWeeklyAlbumChart(
      method.user.weekly_album_chart,
      config.username,
      'overall',
      '52',
    );
    const { weeklyalbumchart } = data;
    return weeklyalbumchart;
  };

  try {
    const { artist } = await getTopArtists();
    const artistMbIds: string[] = artist.map((artist: Artist) => artist.mbid);

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
      if (!mbid) return '';
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

    const topArtistsWithImages = artist.map((artist: Artist) => {
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

    const getAlbumCoverImage = (
      artistMbId: string,
      albumMbId: string,
      albumTitle?: string,
      artistName?: string,
    ) => {
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

    const weeklyAlbumChartWithImages = album.map((album: WeeklyAlbum) => {
      return {
        ...album,
        image: getAlbumCoverImage(album.artist.mbid, album.mbid, album.name, album.artist['#text']),
      };
    });

    const recentTracksWithImages = track.map((track: Track) => {
      const getImage = track.image.find((img: LastFmImage) => img.size === 'extralarge');
      return {
        ...track,
        image: getImage ? getImage['#text'] : '',
      };
    });

    /**
     * Set all page data to respect props to be given to component
     */
    myTopArtists.push(topArtistsWithImages);
    myWeeklyAlbumChart.push(weeklyAlbumChartWithImages);
    myRecentTracks.push(recentTracksWithImages);
  } catch (error) {
    console.log('🔥🔥🔥ERROR', error);
    myErrors.push(error as string);
  }

  return {
    props: {
      error: myErrors ? myErrors : [],
      recentTracks: myRecentTracks[0] ? myRecentTracks[0] : [],
      topArtists: myTopArtists[0] ? myTopArtists[0] : [],
      weeklyAlbumChart: myWeeklyAlbumChart[0] ? myWeeklyAlbumChart[0] : [],
      userProfile: await getUser(),
    },
  };
};

export default Scrobbles;
