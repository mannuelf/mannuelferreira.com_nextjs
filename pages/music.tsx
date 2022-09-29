import { useEffect, useState } from 'react';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';
import { FANART_TV } from '@lib/api/fanarttv';
import { FanArtArtistResponse } from '../types/fanarttv';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Container from '@components/container';
import Image from 'next/image';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import testData from './testdata';

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
            Images thanks to <a href='https://fanart.tv/'>fanart.tv</a> API.
          </p>
          <p>
            All music listening data courtesy of the{' '}
            <a href='https://www.last.fm/api/intro'>LastFm API</a>.
          </p>
          <Image
            src='https://res.cloudinary.com/mannuel/image/upload/v1630704533/images/Lastfm_logo.svg'
            unoptimized={true}
            width={90}
            height={30}
            alt='LastFm Logo'
          />
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

export const getFanartTvData = async (mbid: string) => {
  let result: FanArtArtistResponse = {
    name: '',
    mbid_id: '',
    albums: undefined,
    hdmusiclogo: [],
    artistbackground: [],
    musiclogo: [],
    artistthumb: [],
    musicbanner: [],
  };
  try {
    const FANART_TV_ENDPOINT = `${FANART_TV.base_url}${mbid}?api_key=${FANART_TV.api_key}`;
    const response = await axios.get<FanArtArtistResponse>(FANART_TV_ENDPOINT);
    console.log('getFanartTvData:', response.statusText);
    result = response.data;
    return result;
  } catch (error) {
    return result;
    //throw new Error(`${error}`);
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  let error: [] = [];
  let pageArtists: Artist[] = [];

  try {
    const allArtists = await getTopArtists();
    const artists = allArtists.topartists.artist;
    const allMbIds = artists.map((artist) => artist.mbid);

    let fanArtTvResult: FanArtArtistResponse[] = [];
    /*allMbIds.forEach(async (mbId) => {
      fanArtTvResult.push(await getFanartTvData(mbId));
    });*/

    /*
    allMbIds.forEach(async (mbId) => {
      return fanArtTvResult.push(Promise.all([getFanartTvData(mbId)]));
    });
    */

    allMbIds.forEach(async (mbId) =>
      fanArtTvResult.push(await getFanartTvData(mbId)),
    );

    console.log('>>', fanArtTvResult.length, fanArtTvResult);

    const getArtistImage = (mbid: string): string => {
      let imageUrl = '';
      fanArtTvResult.find((artist) => {
        if (artist.mbid_id === mbid) {
          return artist.artistbackground.map((artistBackground) => {
            return artistBackground.url;
          });
        }
      });
      return imageUrl;
    };

    const [setArtist]: Artist[] = artists.flatMap((artist) => ({
      ...artist,
      image: getArtistImage(artist.mbid),
    }));

    pageArtists.push(setArtist);
  } catch (error) {
    error = error;
  }

  return {
    props: {
      data: pageArtists,
      error,
    },
  };
};

export default Music;
