import Container from '@components/container';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import { FANART_TV } from 'lib/api/fanarttv';
import { ARTIST_ENDPOINT, WEEKLY_ALBUM_CHART } from '@lib/api/lastFm';
import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FanArtArtistResponse, Album } from '../types/fanarttv';
import { defined } from '@shared/defined';
import MetaTags from '@components/meta-tags';
import Link from 'next/link';
import {
  CMS_NAME,
  META_MUSIC,
  MUSIC_URL,
  TWITTER_CARD_MUSIC,
  TWITTER_HANDLE,
} from '@shared/constants';

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
            I love music and have been tracking my listening habits with lastFm
            since 2008. I have always wanted to play with their data, that is
            what this page is about and of course to share what I have been
            listening to with you all.
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
            API. My <a href='https://www.last.fm/user/mannuelf'>profile</a> on
            lastfm.
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
                <div
                  key={album.name}
                  className='relative h-80 md:h-72 bg-purple-dark'
                  style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${album.image})`,
                  }}
                >
                  <div className='absolute bottom-0 left-0 pb-0'>
                    <h2 className='pb-2 pl-2 text-xl font-light text-white'>
                      <Link href={album.url}>
                        <a>{album.artist['#text']}</a>
                      </Link>
                    </h2>
                    <h2 className='pb-2 pl-2 text-3xl font-light text-white'>
                      <Link href={album.url}>
                        <a>{album.name}</a>
                      </Link>
                    </h2>
                    <h3 className='p-2 text-4xl font-normal text-white bg-black w-min bg-opacity-60'>
                      {album.playcount ? album.playcount : null}
                      <span className='pl-2 text-xs font-light text-white '>
                        plays
                      </span>
                    </h3>
                  </div>
                </div>
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
                <div
                  key={artist.mbid}
                  className='relative h-80 md:h-72 bg-purple-dark'
                  style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${artist.image})`,
                  }}
                >
                  <div className='absolute bottom-0 left-0 pb-0'>
                    <h2 className='pb-2 pl-2 text-3xl font-light text-white'>
                      <Link href={artist.url}>
                        <a>{artist.name}</a>
                      </Link>
                    </h2>
                    <h3 className='p-2 text-4xl font-normal text-white bg-black w-min bg-opacity-60'>
                      {artist.playcount ? artist.playcount : null}
                      <span className='pl-2 text-xs font-light text-white '>
                        plays
                      </span>
                    </h3>
                  </div>
                </div>
              ))
            : null}
        </div>
      </Container>
    </Layout>
  );
};

export const getTopArtists = async () => {
  try {
    const { data } = await axios.get<TopArtistsResponse>(ARTIST_ENDPOINT);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getWeeklyAlbumChart = async () => {
  try {
    const { data } = await axios.get<WeeklyAlbumChartResponse>(
      WEEKLY_ALBUM_CHART,
    );
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getFanartTvData = async (mbid: string) => {
  const FANART_TV_ENDPOINT = `${FANART_TV.base_url}${mbid}?api_key=${FANART_TV.api_key}`;
  const { data } = await axios.get<FanArtArtistResponse>(FANART_TV_ENDPOINT);
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let error: [] = [];
  let myTopArtists: Artist[] = [];
  let myWeeklyAlbumChart: Weeklyalbumchart[] = [];

  try {
    const allArtists = await getTopArtists();
    const artists = allArtists.topartists.artist;
    const allMbIds = artists.map((artist) => artist.mbid);

    const allWeeklyAlbumChart = await getWeeklyAlbumChart();
    const albums = allWeeklyAlbumChart.weeklyalbumchart.album;
    const allAlbumsMbids = albums.map(
      (album: WeeklyAlbum) => album.artist.mbid,
    );

    let fanArtTvResult: FanArtArtistResponse[] = [];

    const fanartTvResponses = await Promise.allSettled(
      allMbIds.map(async (mbId) => {
        const res = await axios.get(
          `https://webservice.fanart.tv/v3/music/${mbId}?api_key=${FANART_TV.api_key}`,
        );
        if (res.status === 200) {
          return res.data;
        }
        return {
          ...res.data,
        };
      }),
    );

    fanArtTvResult = fanartTvResponses
      .map(({ value }: any) => {
        return value;
      })
      .filter(defined);

    const getArtistImage = (mbid: string): string => {
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

    const getAlbumImage = (artistMbid: string, albumMbid?: string): string => {
      let imageUrl = '';
      if (albumMbid === '') {
        // TODO: if no album art id return an empty strign for now
        return imageUrl;
      }
      fanArtTvResult.find((artist, index) => {
        // console.log('🔥 fanArtTvResult', artist.albums);
        console.log('🍉 whatsit', typeof artist.albums, artist.albums);
        for (const fTvAlbumMbid in artist.albums) {
          console.log('🌅 album:', fTvAlbumMbid);

        }
        // if (artist.mbid_id === artistMbid) {
        //   console.log('�', albumMbid);
        // }
      });
      return imageUrl;
    };

    const topArtistsWithImages = artists.map<Artist>((artist: Artist) => {
      return {
        ...artist,
        image: getArtistImage(artist.mbid),
      } as Artist;
    }) as any;

    const weeklyAlbumChartWithImages = albums.map<WeeklyAlbum>(
      (album: WeeklyAlbum) => {
        return {
          ...album,
          image: getAlbumImage(album.artist.mbid, album.mbid),
        } as WeeklyAlbum;
      },
    ) as any;

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
