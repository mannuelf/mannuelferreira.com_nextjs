import Container from '@components/container';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import { FANART_TV } from 'lib/api/fanarttv';
import { ARTIST_ENDPOINT, WEEKLY_ALBUM_CHART } from '@lib/api/lastFm';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FanArtArtistResponse, Album } from '../types/fanarttv';
import { defined } from '@shared/defined';
import MetaTags from '@components/meta-tags';
import Link from 'next/link';
import { CMS_NAME, META_MUSIC, MUSIC_URL, TWITTER_CARD_MUSIC, TWITTER_HANDLE } from '@shared/constants';
import { MUSICBRAINZ } from '@lib/api/musicbrainz-cover-art';
import { MusicCard } from './musicCard';

type Props = {
  weeklyAlbumChart: WeeklyAlbum[];
  data: Artist[];
  error: [];
};

const Music = ({ data, error, weeklyAlbumChart }: Props) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [weeklyAlbums, setWeeklyAlbums] = useState<WeeklyAlbum[]>([]);

  const [isError, setIsError] = useState([]);

  useEffect(() => {
    setIsError(error);
    setArtists(data);
    setWeeklyAlbums(weeklyAlbumChart);
  }, [data, error, weeklyAlbumChart]);

  if (isError.length > 0) {
    return (
      <Layout>
        <Container>
          <h1>Error: {isError}</h1>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <MetaTags
        ogTitle={'Music'}
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
            My scrobbles update live directly from the{' '}
            <a href='https://www.last.fm/api/intro'>
              <Image
                src='https://res.cloudinary.com/mannuel/image/upload/v1630704533/images/Lastfm_logo.svg'
                unoptimized={true}
                width={90}
                height={30}
                alt='LastFm Logo'
              />
            </a>{' '}
            API. My <a href='https://www.last.fm/user/mannuelf'>profile</a> on lastfm.
          </p>
          <p>
            Photos from <a href='https://fanart.tv/'>fanart.tv</a> API.
          </p>
        </div>
        <div className='pb-2'>
          <h2 className='text-2xl font-medium'>Weekly Album Charts</h2>
          <p>Scrobbles this week</p>
        </div>
        <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0 pb-20'>
          {isError.length > 0 ? <div>{error}</div> : null}
          {weeklyAlbums.length > 0
            ? weeklyAlbums.map((album: WeeklyAlbum) => (
                <MusicCard
                  playCount={album.playcount.toString()}
                  playTitle={album.name}
                  subTitle={''}
                  title={album.name}
                  siteUrl={album.artist['#text']}
                  imageUrl={''}
                  key={album.name}
                />
              ))
            : null}
          <hr />
        </div>
        <div className='pb-2'>
          <h2 className='text-2xl font-medium'>Top 100 Artists</h2>
          <p>Scrobbles since 2008</p>
        </div>
        <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0 pb-4'>
          {isError.length > 0 ? <div>{error}</div> : null}
          {artists.length > 0
            ? artists.map((artist: Artist) => (
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
      </Container>
    </Layout>
  );
};

/**
 * LastFM
 * https://www.last.fm/api/show/user.getTopArtists
 * @returns TopArtistsResponse Top artists listens for all time.
 */
export const getTopArtists = async (): Promise<TopArtistsResponse> => {
  try {
    const { data } = await axios.get<TopArtistsResponse>(ARTIST_ENDPOINT);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/**
 * LastFM
 * https://www.last.fm/api/show/user.getWeeklyAlbumChart
 * @returns WeeklyAlbumChartResponse All albums I listened to last week
 */
export const getWeeklyAlbumChart = async (): Promise<WeeklyAlbumChartResponse> => {
  try {
    const { data } = await axios.get<WeeklyAlbumChartResponse>(WEEKLY_ALBUM_CHART);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

/**
 * Musicbrainz: GET Album Artwork
 * https://beta.musicbrainz.org/doc/Cover_Art_Archive/API
 * @param albumMbId
 * @returns Images for given ID
 */
export const getAlbumCoverArt = async (albumMbId: string) => {
  try {
    if (albumMbId === '') return;
    const response: AxiosResponse<MusicBrainzCoverArt.RootObject> = await axios.get(
      `${MUSICBRAINZ.base_url}/release/${albumMbId}`,
    );
    const { data } = response;
    return data;
  } catch (error: any) {
    console.log(`For album cover ${albumMbId} - ${error.message}`);
    // throw new Error(`${error}`);
  }
};

/**
 *
 * @param mbid
 * @returns Array of Artist images and text from Fanarttv
 * https://fanart.tv/api-docs/api-v3/
 */
export const getFanartTvData = async (mbid: string): Promise<FanArtArtistResponse> => {
  const FANART_TV_ENDPOINT = `${FANART_TV.base_url}${mbid}?api_key=${FANART_TV.api_key}`;
  const { data } = await axios.get<FanArtArtistResponse>(FANART_TV_ENDPOINT);
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let error: [] = [];
  let myTopArtists = [];
  let myWeeklyAlbumChart = [];

  try {
    const allArtists: TopArtistsResponse = await getTopArtists();
    const artists: Artist[] = allArtists.topartists.artist;
    const allMbIds: string[] = artists.map((artist: Artist) => artist.mbid);

    const allWeeklyAlbumChart: WeeklyAlbumChartResponse = await getWeeklyAlbumChart();
    const albums = allWeeklyAlbumChart.weeklyalbumchart.album;
    const allAlbumsMbids = albums.map((album: WeeklyAlbum) => album);

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
          artist.artistbackground?.map((artistBackground) => {
            imageUrl = artistBackground.url;
          });
        }
      });
      return imageUrl;
    };

    const topArtistsWithImages = artists.map<Artist>((artist: Artist) => {
      return {
        ...artist,
        image: getTopArtistImage(artist.mbid),
      };
    });

    /**
     * Get and set data for Weekly Album Chart
     */
    let musicBrainzResponse = await Promise.allSettled(
      allAlbumsMbids.map(async (album) => await getAlbumCoverArt(album.mbid)),
    );
    let musicBrainzResult: MusicBrainzCoverArt.RootObject[] = musicBrainzResponse
      .map(({ value }: any) => {
        return value;
      })
      .filter(defined);

    const getAlbumChartImage = (artistMbid: string, albumMbid: string, albumName?: string) => {
      let imageUrl = '';

      musicBrainzResult.find((album) => {
        if (album.release.includes(albumMbid)) {
          imageUrl = album.images?.map((image) => image.image).toString();
        }
      });
      return imageUrl;
    };

    const weeklyAlbumChartWithImages = albums.map<WeeklyAlbum>((album: WeeklyAlbum) => {
      return {
        ...album,
        image: getAlbumChartImage(album.artist.mbid, album.mbid, album.name),
      };
    });

    /**
     * Set all page data to respect props to be given to component
     */
    myTopArtists.push(topArtistsWithImages);
    myWeeklyAlbumChart.push(weeklyAlbumChartWithImages);
  } catch (error) {
    error = error;
  }

  return {
    props: {
      weeklyAlbumChart: myWeeklyAlbumChart[0],
      data: myTopArtists[0],
      error,
    },
  };
};

export default Music;
