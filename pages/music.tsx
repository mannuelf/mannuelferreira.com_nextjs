import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import Container from '@components/container';
import artistImages from '@lib/api/artistImages';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';
import { FANART_TV } from '@lib/api/fanarttv';

type Props = {
  music: TopArtists;
  error: string;
};

const Music = ({ music, error }: Props) => {
  const [data, setData] = useState<any | []>([]);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    setIsError(error);
    setData(music.topartists.artist);
  }, [music, error]);

  if (isError)
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
          {data
            ? data?.map((artist: Artist, index: number) => (
                <div
                  key={index}
                  className='static relative h-80 md:h-72 bg-purple-dark'
                  style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${artistImages.filter(
                      (photo) =>
                        photo.name.includes(artist.name) ?? photo.photo,
                    )})`,
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

export const getTopArtists = async (): Promise<TopArtists> => {
  try {
    const response = await axios({ url: ARTIST_ENDPOINT, method: 'GET' });
    const { data } = response;
    data['images'] = artistImages;

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getArtistCoverImage = async (): Promise<any> => {
  try {
    const artistId = '678d88b2-87b0-403b-b63d-5da7465aecc3';
    const response = await axios({
      url:
        'http://webservice.fanart.tv/v3/music/' + artistId + '?api_key=' +
        FANART_TV.api_key,
      method: 'GET',
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  let music: [] = [];
  let error: string = '';
  let artistCoverImage;

  try {
    const response: TopArtists = await getTopArtists();
    const responseArtistCoverImage = await getArtistCoverImage();
    artistCoverImage =
      responseArtistCoverImage ?? responseArtistCoverImage.data;
    music = response ?? response.topartists.artist;
  } catch (error) {
    error = error;
  }

  return {
    props: {
      music,
      artistCoverImage,
      error,
    },
  };
};

export default Music;
