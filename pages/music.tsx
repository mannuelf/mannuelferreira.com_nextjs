import React, { useEffect, useState, FC, SetStateAction } from 'react';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next';
import Image from 'next/image';
import axios from 'axios';
import Layout from '@components/Layout/layout';
import PageTitle from '@components/page-title';
import Container from '@components/container';
import artistImages from '@lib/api/artistImages';
import { ARTIST_ENDPOINT } from '@lib/api/lastFm';

type Props = {
  music: TopArtists;
  error: string;
};

const Music = ({ music, error }: Props) => {
  const [data, setData] = useState<any | []>([]);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    setIsError(error);
    setData(music);
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
        <div className='border-t pt-4 mt-8 mb-8'>
          <p className='text-lg'>
            I love music, I have been tracking my habits with lastFm, according
            to their data these are my all time favourites.
          </p>
        </div>
        <div className='grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-4 gap-0'>
          {data &&
            data?.map((artist: Artist, index: number) => (
              <div
                key={index}
                className='static relative h-80 md:h-72 bg-purple-dark'
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${artist.cover.photo})`,
                }}
              >
                <div className='absolute bottom-0 left-0 pb-0'>
                  <h2 className='text-3xl font-light text-white pl-2 pb-2'>
                    {artist.name}
                  </h2>
                  <h3 className='text-4xl font-normal text-white w-min p-2 bg-black bg-opacity-60'>
                    {artist.playcount}
                    <span className='text-xs font-light text-white pl-2 '>
                      plays
                    </span>
                  </h3>
                </div>
              </div>
            ))}
        </div>
        <div className='border-t pt-4 mt-8 mb-16'>
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
    const response = axios({ url: ARTIST_ENDPOINT, method: 'GET' });
    const { data } = await response;
    console.log(data);
    
    data['images'] = artistImages;
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  let music: [] = [];
  let photos: [] = [];
  let error: string = '';

  try {
    const response: TopArtists | any = await getTopArtists();
    music = response.topartists.artist;
    photos = response.images;

    const toMerge: [] = [...music, ...photos];
    let set = new Set();
    let addArtistImage: any = toMerge.filter((artist: ArtistImage) => {
      if (!set.has(artist.name)) {
        set.add(artist.name);
        for (let i = 0; i < music.length; i++) {
          delete music[i]['image']; // - star img from lastFm
          let cover: TopArtists | any = music[i];
          if (artist.name === music[i]['name']) {
            let result: any = photos.filter(
              (photo: ArtistImage) => photo.name === artist.name,
            );
            cover['cover'] = result[0];
          }
        }
        return true;
      }
      return false;
    }, set);

    music = addArtistImage;
  } catch (error) {
    error = error;
  }

  return {
    props: {
      music,
      error,
    },
  };
};

export default Music;
