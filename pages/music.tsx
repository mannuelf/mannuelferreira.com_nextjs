import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import Container from '@components/container';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';
import { FANART_TV } from '@lib/api/fanarttv';

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
            ? artists[0].map((artist: Artist) => (
                <div
                  key={artist.mbid}
                  className='static relative h-80 md:h-72 bg-purple-dark'
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
            Images thanks to Wikimedia Commons{' '}
            <a href='https://creativecommons.org/licenses/by/3.0'>3.0</a> and{' '}
            <a href='https://creativecommons.org/licenses/by/2.0'>2.0</a>.
          </p>
          <p>
            All data courtesy of the{' '}
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

let errors: [] = [];
let serverCount = 0;

export const getTopArtists = async (): Promise<TopArtists> => {
  try {
    const response = await axios({ url: ARTIST_ENDPOINT, method: 'GET' });
    const { data } = response;
    return data;
  } catch (error) {
    errors.push(error);
  }
};

export const getFanartTvData = async (mbid: string): Promise<any> => {
  try {
    const { data } = await axios({
      url: FANART_TV.base_url + mbid + '?api_key=' + FANART_TV.api_key,
      method: 'GET',
    });
    return data;
  } catch (error) {
    errors.push(error);
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  let data: [] = [];
  let error: [] = [];

  serverCount++
  console.log('serverCount', serverCount);
  
  try {
    const topArtists: TopArtists = await getTopArtists();
    const artists: Artist[] = topArtists.topartists.artist;
    const allMbids: string[] = artists.map((artist) => artist.mbid);

    let fanArtTvResult = [];

    let artistCount = 0;
    console.log('> artistCount', artistCount);
    for (const mbid in allMbids) {
      artistCount++;
      fanArtTvResult.push(await getFanartTvData(mbid));
    }
    console.log('< artistCount', artistCount);
    

    const findArtistImage = (mbid: string): string => {
      let imageUrl = '';
      fanArtTvResult.find((artist) => {
        if (artist.mbid_id === mbid) {
          return artist.artistbackground.map((backgroundImage) => {
            imageUrl = backgroundImage.url;
            return backgroundImage.url;
          });
        }
      });
      return imageUrl;
    };

    const cleanArtists: Artist[] = artists.map((artist: Artist) => {
      return {
        ...artist,
        image: findArtistImage(artist.mbid),
      };
    });

    data.push(cleanArtists);
  } catch (error) {
    errors.push(error);
    error = errors;
  }

  return {
    props: {
      data,
      error,
    },
  };
};

export default Music;
