import Container from '@components/container';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import { FANART_TV } from 'lib/api/fanarttv';
import { ARTIST_ENDPOINT, WEEKLY_ALBUM_CHART } from '@lib/api/lastFm';
import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FanArtArtistResponse } from '../types/fanarttv';
import { defined } from '@shared/defined';

type Props = {
  data: Artist[];
  error: [];
};

const Music = ({ data, error }: Props) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isError, setIsError] = useState([]);

  useEffect(() => {
    setIsError(error);
    setArtists(data);
  }, [data, error]);

  if (isError.length > 0)
    return (
      <Layout>
        <Container>
          <h1>Error: {isError}</h1>
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <PageTitle>Music</PageTitle>
        <div className='pt-4 mt-8 mb-8 border-t'>
          <p className='text-lg'>
            I love music, I have been tracking my habits with lastFm, according
            to their data these are my all time favourites.
          </p>
        </div>
        <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0'>
          {isError.length > 0 ? <div>{error}</div> : null}
          {artists
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
                      {artist.name}
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
        <div className='pt-4 mt-8 mb-16 border-t'>
          <p>
            Music listening data from API of{' '}
            <a href='https://www.last.fm/api/intro'>
              <Image
                src='https://res.cloudinary.com/mannuel/image/upload/v1630704533/images/Lastfm_logo.svg'
                unoptimized={true}
                width={90}
                height={30}
                alt='LastFm Logo'
              />
            </a>
          </p>
          <p>
            Photos from <a href='https://fanart.tv/'>fanart.tv</a> API.
          </p>
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
    const { data } = await axios.get<GetWeeklyAlbumChartResponse>(
      WEEKLY_ALBUM_CHART,
    );
    console.log('🔥 DATA >>', data);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  let error: [] = [];
  let pageArtists: Artist[] = [];

  try {
    const allArtists = await getTopArtists();
    const artists = allArtists.topartists.artist;
    const allMbIds = artists.map((artist) => artist.mbid);

    // const allWeeklyAlbumChart = await getWeeklyAlbumChart();
    // console.log('🔥 >>', allWeeklyAlbumChart);

    let fanArtTvResult: FanArtArtistResponse[] = [];

    const myTopArtists = await Promise.allSettled(
      allMbIds.map(async (mbId) => {
        const res = await axios.get(
          `${FANART_TV.base_url}/${mbId}?api_key=${FANART_TV.api_key}`,
        );
        console.log('🔥 res >>', res);

        if (res.status === 200) {
          return res.data;
        }
        return {
          ...res.data,
        };
      }),
    );
    console.log('🔥 myTopArtists >>', myTopArtists);
    fanArtTvResult = myTopArtists
      .map(({ value }: any): FanArtArtistResponse => {
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

    const imagesUpdated = artists.map<Artist>((artist: Artist) => {
      return {
        ...artist,
        image: getArtistImage(artist.mbid),
      } as Artist;
    }) as any;

    pageArtists.push(imagesUpdated);
  } catch (error) {
    error = error;
  }

  return {
    props: {
      data: pageArtists[0] ?? pageArtists[0],
      error,
    },
  };
};

export default Music;
